/*
    Serveur Node.js pour l'analyse IA des patterns
    ----------------------------------------------------
    Installation :
        npm install
        npm start

    Adresse locale :
        http://localhost:3000/pattern-ia.html

    Fonction :
        - récupère les bougies Binance ;
        - calcule RSI, MACD, EMA ;
        - compare le segment actuel à des segments historiques ;
        - retourne un signal probabiliste.
*/

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname)));

app.post("/api/analyse-pattern", async (req, res) => {
    try {
        const {
            actif = "BINANCE:BTCUSDT",
            intervalle = "1h",
            longueurPattern = 40,
            horizon = 12,
            seuil = 1.5
        } = req.body || {};

        const symbole = convertirSymboleBinance(actif);
        const limite = Math.min(1000, Math.max(300, Number(longueurPattern) * 12));

        const bougies = await recupererBougiesBinance(symbole, intervalle, limite);

        if (!bougies || bougies.length < Number(longueurPattern) + Number(horizon) + 100) {
            return res.json({
                ok: false,
                message: "Historique insuffisant pour cette analyse."
            });
        }

        const analyse = analyserSimilarite({
            actif,
            symbole,
            intervalle,
            bougies,
            longueurPattern: Number(longueurPattern),
            horizon: Number(horizon),
            seuil: Number(seuil)
        });

        res.json(analyse);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            ok: false,
            message: "Erreur pendant l'analyse du pattern."
        });
    }
});

function convertirSymboleBinance(actif) {
    return String(actif).replace("BINANCE:", "").trim().toUpperCase();
}

async function recupererBougiesBinance(symbole, intervalle, limite) {
    const url = `https://api.binance.com/api/v3/klines?symbol=${encodeURIComponent(symbole)}&interval=${encodeURIComponent(intervalle)}&limit=${limite}`;

    const reponse = await fetch(url);

    if (!reponse.ok) {
        throw new Error(`Erreur Binance : ${reponse.status}`);
    }

    const data = await reponse.json();

    return data.map(k => ({
        temps: k[0],
        open: Number(k[1]),
        high: Number(k[2]),
        low: Number(k[3]),
        close: Number(k[4]),
        volume: Number(k[5])
    }));
}

function analyserSimilarite({ actif, symbole, intervalle, bougies, longueurPattern, horizon, seuil }) {
    const closes = bougies.map(b => b.close);
    const volumes = bougies.map(b => b.volume);

    const rsiSeries = calculerRSISeries(closes, 14);
    const ema20Series = calculerEMASeries(closes, 20);
    const ema50Series = calculerEMASeries(closes, 50);
    const macdSeries = calculerMACDSeries(closes);

    const dernierIndex = bougies.length - 1;
    const debutActuel = dernierIndex - longueurPattern + 1;

    const patternActuel = extraireFeatures(bougies, rsiSeries, ema20Series, ema50Series, macdSeries, debutActuel, longueurPattern);

    const comparaisons = [];

    /*
        On évite les segments trop proches du segment actuel pour ne pas comparer
        le pattern avec lui-même.
    */
    const dernierDebutHistorique = bougies.length - longueurPattern - horizon - 10;

    for (let i = 60; i < dernierDebutHistorique; i++) {
        const patternHistorique = extraireFeatures(bougies, rsiSeries, ema20Series, ema50Series, macdSeries, i, longueurPattern);

        if (!patternHistorique) {
            continue;
        }

        const distance = distanceEuclidienne(patternActuel.vecteur, patternHistorique.vecteur);
        const closeFin = bougies[i + longueurPattern - 1].close;
        const closeFutur = bougies[i + longueurPattern - 1 + horizon].close;
        const variationFuture = ((closeFutur - closeFin) / closeFin) * 100;

        comparaisons.push({
            distance,
            variationFuture
        });
    }

    comparaisons.sort((a, b) => a.distance - b.distance);

    const voisins = comparaisons.slice(0, 50);

    const hausse = voisins.filter(v => v.variationFuture >= seuil).length;
    const baisse = voisins.filter(v => v.variationFuture <= -seuil).length;
    const neutre = voisins.length - hausse - baisse;

    const pctHausse = pourcentage(hausse, voisins.length);
    const pctBaisse = pourcentage(baisse, voisins.length);
    const pctNeutre = pourcentage(neutre, voisins.length);
    const variationMoyenne = moyenne(voisins.map(v => v.variationFuture));

    const indicateurs = extraireIndicateursActuels({
        closes,
        volumes,
        rsiSeries,
        ema20Series,
        ema50Series,
        macdSeries,
        bougies
    });

    const scoreTechnique = calculerScoreTechnique(indicateurs);
    const decision = determinerSignal({
        pctHausse,
        pctBaisse,
        pctNeutre,
        variationMoyenne,
        scoreTechnique
    });

    return {
        ok: true,
        actif,
        symbole,
        intervalle,
        longueurPattern,
        horizon,
        signal: decision.signal,
        confiance: decision.confiance,
        scoreTechnique,
        statistiques: {
            total: voisins.length,
            hausse: pctHausse,
            baisse: pctBaisse,
            neutre: pctNeutre,
            variationMoyenne: arrondir(variationMoyenne)
        },
        indicateurs: {
            prixActuel: arrondir(indicateurs.prixActuel),
            rsi: arrondir(indicateurs.rsi),
            macd: arrondir(indicateurs.macd),
            ema20: arrondir(indicateurs.ema20),
            ema50: arrondir(indicateurs.ema50),
            tendance: indicateurs.tendance
        },
        resume: construireResume(decision.signal, pctHausse, pctBaisse, pctNeutre, variationMoyenne, indicateurs),
        recommandation: construireRecommandation(decision.signal, indicateurs),
        risque: construireRisque(decision.signal, bougies)
    };
}

function extraireFeatures(bougies, rsiSeries, ema20Series, ema50Series, macdSeries, debut, longueur) {
    const fin = debut + longueur;

    if (debut < 0 || fin > bougies.length) {
        return null;
    }

    const segment = bougies.slice(debut, fin);
    const closes = segment.map(b => b.close);
    const volumes = segment.map(b => b.volume);

    const rendements = [];
    for (let i = 1; i < closes.length; i++) {
        rendements.push((closes[i] - closes[i - 1]) / closes[i - 1]);
    }

    const meches = segment.map(b => {
        const corps = Math.abs(b.close - b.open);
        const amplitude = Math.max(b.high - b.low, 0.00000001);
        return corps / amplitude;
    });

    const volumeNormalise = normaliser(volumes);
    const rendementNormalise = normaliser(rendements);
    const mechesNormalisees = normaliser(meches);

    const rsi = rsiSeries.slice(debut, fin).filter(x => Number.isFinite(x));
    const macd = macdSeries.histogramme.slice(debut, fin).filter(x => Number.isFinite(x));
    const emaEcart = [];

    for (let i = debut; i < fin; i++) {
        if (ema20Series[i] && ema50Series[i]) {
            emaEcart.push((ema20Series[i] - ema50Series[i]) / bougies[i].close);
        }
    }

    const vecteur = [
        ...rendementNormalise,
        ...mechesNormalisees,
        ...volumeNormalise,
        moyenne(rsi) / 100,
        moyenne(macd),
        moyenne(emaEcart)
    ].filter(x => Number.isFinite(x));

    return { vecteur };
}

function calculerRSISeries(valeurs, periode = 14) {
    const rsi = Array(valeurs.length).fill(null);

    let gains = 0;
    let pertes = 0;

    for (let i = 1; i <= periode; i++) {
        const diff = valeurs[i] - valeurs[i - 1];
        if (diff >= 0) gains += diff;
        else pertes -= diff;
    }

    let gainMoyen = gains / periode;
    let perteMoyenne = pertes / periode;

    rsi[periode] = calculerRSI(gainMoyen, perteMoyenne);

    for (let i = periode + 1; i < valeurs.length; i++) {
        const diff = valeurs[i] - valeurs[i - 1];
        const gain = diff > 0 ? diff : 0;
        const perte = diff < 0 ? -diff : 0;

        gainMoyen = ((gainMoyen * (periode - 1)) + gain) / periode;
        perteMoyenne = ((perteMoyenne * (periode - 1)) + perte) / periode;

        rsi[i] = calculerRSI(gainMoyen, perteMoyenne);
    }

    return rsi;
}

function calculerRSI(gainMoyen, perteMoyenne) {
    if (perteMoyenne === 0) return 100;
    const rs = gainMoyen / perteMoyenne;
    return 100 - (100 / (1 + rs));
}

function calculerEMASeries(valeurs, periode) {
    const ema = Array(valeurs.length).fill(null);
    const multiplicateur = 2 / (periode + 1);

    let somme = 0;
    for (let i = 0; i < periode; i++) {
        somme += valeurs[i];
    }

    ema[periode - 1] = somme / periode;

    for (let i = periode; i < valeurs.length; i++) {
        ema[i] = (valeurs[i] - ema[i - 1]) * multiplicateur + ema[i - 1];
    }

    return ema;
}

function calculerMACDSeries(closes) {
    const ema12 = calculerEMASeries(closes, 12);
    const ema26 = calculerEMASeries(closes, 26);

    const macd = closes.map((_, i) => {
        if (ema12[i] === null || ema26[i] === null) return null;
        return ema12[i] - ema26[i];
    });

    const macdValides = macd.map(v => v === null ? 0 : v);
    const signal = calculerEMASeries(macdValides, 9);

    const histogramme = macd.map((v, i) => {
        if (v === null || signal[i] === null) return null;
        return v - signal[i];
    });

    return { macd, signal, histogramme };
}

function extraireIndicateursActuels({ closes, rsiSeries, ema20Series, ema50Series, macdSeries, bougies }) {
    const i = closes.length - 1;

    const prixActuel = closes[i];
    const rsi = rsiSeries[i] || 50;
    const ema20 = ema20Series[i] || prixActuel;
    const ema50 = ema50Series[i] || prixActuel;
    const macd = macdSeries.histogramme[i] || 0;

    let tendance = "neutre";

    if (prixActuel > ema20 && ema20 > ema50) {
        tendance = "haussière";
    } else if (prixActuel < ema20 && ema20 < ema50) {
        tendance = "baissière";
    }

    return {
        prixActuel,
        rsi,
        ema20,
        ema50,
        macd,
        tendance,
        derniereBougie: bougies[i]
    };
}

function calculerScoreTechnique(indicateurs) {
    let score = 50;

    if (indicateurs.tendance === "haussière") score += 18;
    if (indicateurs.tendance === "baissière") score -= 18;

    if (indicateurs.rsi > 55 && indicateurs.rsi < 70) score += 10;
    if (indicateurs.rsi < 45 && indicateurs.rsi > 30) score -= 10;

    if (indicateurs.rsi >= 70) score -= 8;
    if (indicateurs.rsi <= 30) score += 8;

    if (indicateurs.macd > 0) score += 8;
    if (indicateurs.macd < 0) score -= 8;

    return Math.max(0, Math.min(100, Math.round(score)));
}

function determinerSignal({ pctHausse, pctBaisse, variationMoyenne, scoreTechnique }) {
    if (pctHausse >= 58 && variationMoyenne > 0 && scoreTechnique >= 55) {
        return {
            signal: "ACHETER",
            confiance: Math.min(90, Math.round((pctHausse + scoreTechnique) / 2))
        };
    }

    if (pctBaisse >= 58 && variationMoyenne < 0 && scoreTechnique <= 45) {
        return {
            signal: "VENDRE",
            confiance: Math.min(90, Math.round((pctBaisse + (100 - scoreTechnique)) / 2))
        };
    }

    return {
        signal: "ATTENDRE",
        confiance: Math.round(Math.max(pctHausse, pctBaisse, 50))
    };
}

function construireResume(signal, pctHausse, pctBaisse, pctNeutre, variationMoyenne, indicateurs) {
    return `Le segment actuel ressemble à des configurations historiques où la hausse a représenté ${pctHausse} %, la baisse ${pctBaisse} % et le scénario neutre ${pctNeutre} %. La variation moyenne observée ensuite est de ${arrondir(variationMoyenne)} %. La tendance actuelle est ${indicateurs.tendance}, avec un RSI de ${arrondir(indicateurs.rsi)}. Signal retenu : ${signal}.`;
}

function construireRecommandation(signal, indicateurs) {
    if (signal === "ACHETER") {
        return "Entrée possible seulement si la bougie en cours confirme la direction. Éviter d’acheter après une grande mèche haussière sans volume.";
    }

    if (signal === "VENDRE") {
        return "Vente possible seulement si le prix reste sous la moyenne courte ou casse un support récent. Éviter de vendre sur un excès déjà trop avancé.";
    }

    return "Attendre une confirmation. Le rapport entre les cas historiques haussiers et baissiers n’est pas assez net pour justifier une entrée agressive.";
}

function construireRisque(signal, bougies) {
    const recentes = bougies.slice(-20);
    const dernierPrix = bougies[bougies.length - 1].close;
    const plusBas = Math.min(...recentes.map(b => b.low));
    const plusHaut = Math.max(...recentes.map(b => b.high));

    if (signal === "ACHETER") {
        return {
            stopLoss: `sous le dernier creux : ${arrondir(plusBas)}`,
            takeProfit: `vers la zone haute récente : ${arrondir(plusHaut)}`,
            prudence: "ne pas entrer si le prix est déjà trop éloigné de l’EMA 20"
        };
    }

    if (signal === "VENDRE") {
        return {
            stopLoss: `au-dessus du dernier sommet : ${arrondir(plusHaut)}`,
            takeProfit: `vers la zone basse récente : ${arrondir(plusBas)}`,
            prudence: "ne pas entrer si une forte mèche basse montre un rejet acheteur"
        };
    }

    return {
        stopLoss: `non prioritaire tant qu’il n’y a pas d’entrée`,
        takeProfit: `non prioritaire tant qu’il n’y a pas d’entrée`,
        prudence: `prix actuel : ${arrondir(dernierPrix)} ; attendre une cassure ou un rejet clair`
    };
}

function distanceEuclidienne(a, b) {
    const n = Math.min(a.length, b.length);
    if (n === 0) return Infinity;

    let somme = 0;
    for (let i = 0; i < n; i++) {
        const diff = a[i] - b[i];
        somme += diff * diff;
    }

    return Math.sqrt(somme / n);
}

function normaliser(tableau) {
    const m = moyenne(tableau);
    const ecart = ecartType(tableau);

    if (!Number.isFinite(ecart) || ecart === 0) {
        return tableau.map(() => 0);
    }

    return tableau.map(x => (x - m) / ecart);
}

function moyenne(tableau) {
    const valeurs = tableau.filter(x => Number.isFinite(x));
    if (valeurs.length === 0) return 0;
    return valeurs.reduce((a, b) => a + b, 0) / valeurs.length;
}

function ecartType(tableau) {
    const m = moyenne(tableau);
    const variance = moyenne(tableau.map(x => (x - m) ** 2));
    return Math.sqrt(variance);
}

function pourcentage(nombre, total) {
    if (!total) return 0;
    return Math.round((nombre / total) * 100);
}

function arrondir(nombre) {
    if (!Number.isFinite(nombre)) return 0;
    return Math.round(nombre * 100) / 100;
}

app.listen(PORT, () => {
    console.log(`Serveur lancé : http://localhost:${PORT}`);
});
