/*
    Serveur Node.js pour Trading Station IA
    API Render + PostgreSQL
    ------------------------------------------------------------
    Fichier : server.js
    Auteur : Hocine Korichi, Ing.

    Version enrichie :
    - PostgreSQL trading_capture ;
    - route /api/marche avec plusieurs sources de marché ;
    - Binance pour les cryptomonnaies compatibles ;
    - Yahoo Finance Chart pour actions, indices, or, dollar index et certains actifs non Binance ;
    - calcul prix actuel, support, résistance, RSI, EMA, MACD, ATR, volume et tendance.
*/

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Accept", "Authorization"]
}));

app.options("*", cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

let pool = null;

function obtenirPool() {
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL n'est pas configurée sur Render.");
    }

    if (!pool) {
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        });
    }

    return pool;
}

function reponseErreur(res, statutHttp, message, erreur = null) {
    console.error(message, erreur);
    return res.status(statutHttp).json({
        ok: false,
        statut: "erreur",
        message,
        detail: erreur && erreur.message ? erreur.message : String(erreur || "")
    });
}

function texteOuNull(valeur) {
    if (valeur === undefined || valeur === null) return null;
    const texte = String(valeur).trim();
    return texte === "" ? null : texte;
}

function booleenOuFaux(valeur) {
    return valeur === true || valeur === "true" || valeur === 1 || valeur === "1";
}

async function assurerTableTradingCapture() {
    const db = obtenirPool();

    await db.query(`
        CREATE TABLE IF NOT EXISTS trading_capture (
            id SERIAL PRIMARY KEY,
            actif TEXT,
            indicateur TEXT,
            intervalle TEXT,
            nom_fichier TEXT,
            nom_capture TEXT,
            categorie_analyse TEXT,
            configuration_json JSONB,
            screenshot_base64 TEXT,
            date_capture TIMESTAMPTZ DEFAULT NOW()
        );
    `);

    const colonnes = [
        ["actif_libelle", "TEXT"],
        ["indicateur_libelle", "TEXT"],
        ["intervalle_libelle", "TEXT"],
        ["type_bougie", "TEXT"],
        ["type_bougie_libelle", "TEXT"],
        ["source_parametres", "TEXT"],
        ["lecture_directe_graphique", "BOOLEAN DEFAULT FALSE"]
    ];

    for (const [nom, type] of colonnes) {
        await db.query(`ALTER TABLE trading_capture ADD COLUMN IF NOT EXISTS ${nom} ${type};`);
    }
}

app.get("/", (req, res) => {
    res.json({
        ok: true,
        statut: "ok",
        message: "Serveur Node.js actif.",
        service: "Trading Station IA",
        date: new Date().toISOString()
    });
});

app.get("/api/test", (req, res) => {
    res.json({
        ok: true,
        statut: "ok",
        message: "API accessible.",
        date: new Date().toISOString()
    });
});

app.get("/api/verifier-db", async (req, res) => {
    try {
        const db = obtenirPool();
        const resultat = await db.query("SELECT NOW() AS maintenant;");
        res.json({
            ok: true,
            statut: "ok",
            message: "Connexion PostgreSQL réussie.",
            databaseUrlConfiguree: true,
            dateServeur: resultat.rows[0].maintenant
        });
    } catch (erreur) {
        return reponseErreur(res, 500, "Erreur de connexion PostgreSQL.", erreur);
    }
});

app.get("/api/creer-table", async (req, res) => {
    try {
        await assurerTableTradingCapture();
        res.json({
            ok: true,
            statut: "ok",
            table: "trading_capture",
            message: "La table trading_capture existe ou vient d'être créée.",
            date: new Date().toISOString()
        });
    } catch (erreur) {
        return reponseErreur(res, 500, "Impossible de créer ou vérifier la table trading_capture.", erreur);
    }
});

app.get("/api/verifier-table", async (req, res) => {
    try {
        await assurerTableTradingCapture();
        res.json({
            ok: true,
            statut: "ok",
            tableExiste: true,
            table: "trading_capture",
            message: "La table trading_capture existe.",
            date: new Date().toISOString()
        });
    } catch (erreur) {
        return reponseErreur(res, 500, "Impossible de vérifier la table trading_capture.", erreur);
    }
});

app.get("/api/captures", async (req, res) => {
    try {
        await assurerTableTradingCapture();
        const db = obtenirPool();
        const resultat = await db.query(`
            SELECT
                id,
                actif,
                indicateur,
                intervalle,
                actif_libelle,
                indicateur_libelle,
                intervalle_libelle,
                type_bougie,
                type_bougie_libelle,
                source_parametres,
                lecture_directe_graphique,
                nom_fichier,
                nom_capture,
                categorie_analyse,
                date_capture
            FROM trading_capture
            ORDER BY date_capture DESC, id DESC
            LIMIT 200;
        `);

        res.json({ ok: true, statut: "ok", captures: resultat.rows });
    } catch (erreur) {
        return reponseErreur(res, 500, "Impossible de lire les captures.", erreur);
    }
});

app.get("/api/captures/:id", async (req, res) => {
    try {
        await assurerTableTradingCapture();
        const db = obtenirPool();
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return reponseErreur(res, 400, "ID de capture invalide.");
        }

        const resultat = await db.query(`
            SELECT *
            FROM trading_capture
            WHERE id = $1
            LIMIT 1;
        `, [id]);

        if (resultat.rows.length === 0) {
            return reponseErreur(res, 404, "Capture introuvable.");
        }

        res.json({ ok: true, statut: "ok", capture: resultat.rows[0] });
    } catch (erreur) {
        return reponseErreur(res, 500, "Impossible de charger la capture.", erreur);
    }
});

app.post("/api/captures", async (req, res) => {
    try {
        await assurerTableTradingCapture();
        const db = obtenirPool();
        const corps = req.body || {};

        const actif = texteOuNull(corps.actif) || texteOuNull(corps?.configuration_json?.graphique?.actif) || "NON_RENSEIGNE";
        const indicateur = texteOuNull(corps.indicateur) || texteOuNull(corps?.configuration_json?.graphique?.indicateur);
        const intervalle = texteOuNull(corps.intervalle) || texteOuNull(corps?.configuration_json?.graphique?.intervalle);
        const actifLibelle = texteOuNull(corps.actif_libelle) || texteOuNull(corps?.configuration_json?.graphique?.actifLibelle);
        const indicateurLibelle = texteOuNull(corps.indicateur_libelle) || texteOuNull(corps?.configuration_json?.graphique?.indicateurLibelle);
        const intervalleLibelle = texteOuNull(corps.intervalle_libelle) || texteOuNull(corps?.configuration_json?.graphique?.intervalleLibelle);
        const typeBougie = texteOuNull(corps.type_bougie) || texteOuNull(corps?.configuration_json?.graphique?.typeBougie);
        const typeBougieLibelle = texteOuNull(corps.type_bougie_libelle) || texteOuNull(corps?.configuration_json?.graphique?.typeBougieLibelle);
        const sourceParametres = texteOuNull(corps.source_parametres) || texteOuNull(corps?.configuration_json?.graphique?.sourceParametres);
        const lectureDirecteGraphique = booleenOuFaux(corps.lecture_directe_graphique || corps?.configuration_json?.graphique?.lectureDirecteGraphique);
        const nomFichier = texteOuNull(corps.nom_fichier) || texteOuNull(corps.nom_capture) || "capture-" + new Date().toISOString();
        const nomCapture = texteOuNull(corps.nom_capture) || nomFichier;
        const categorieAnalyse = texteOuNull(corps.categorie_analyse) || texteOuNull(corps.categorieAnalyse) || texteOuNull(corps?.configuration_json?.analyseIA?.categorieLibelle);
        const configurationJson = corps.configuration_json || corps.configurationJson || corps;
        const screenshotBase64 = texteOuNull(corps.screenshot_base64) || texteOuNull(corps.screenshotBase64);

        const resultat = await db.query(`
            INSERT INTO trading_capture (
                actif,
                indicateur,
                intervalle,
                actif_libelle,
                indicateur_libelle,
                intervalle_libelle,
                type_bougie,
                type_bougie_libelle,
                source_parametres,
                lecture_directe_graphique,
                nom_fichier,
                nom_capture,
                categorie_analyse,
                configuration_json,
                screenshot_base64
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14::jsonb,$15)
            RETURNING id, actif, indicateur, intervalle, nom_capture, date_capture;
        `, [
            actif,
            indicateur,
            intervalle,
            actifLibelle,
            indicateurLibelle,
            intervalleLibelle,
            typeBougie,
            typeBougieLibelle,
            sourceParametres,
            lectureDirecteGraphique,
            nomFichier,
            nomCapture,
            categorieAnalyse,
            JSON.stringify(configurationJson),
            screenshotBase64
        ]);

        res.json({
            ok: true,
            statut: "ok",
            message: "Capture enregistrée dans trading_capture.",
            capture: resultat.rows[0]
        });
    } catch (erreur) {
        return reponseErreur(res, 500, "Impossible d'enregistrer la capture.", erreur);
    }
});

function arrondirNombre(valeur, decimales = 6) {
    const nombre = Number(valeur);
    if (!Number.isFinite(nombre)) return null;
    const facteur = Math.pow(10, decimales);
    return Math.round(nombre * facteur) / facteur;
}

function moyenneSimple(valeurs) {
    const nombres = valeurs.filter((v) => Number.isFinite(Number(v))).map(Number);
    if (nombres.length === 0) return null;
    return nombres.reduce((a, b) => a + b, 0) / nombres.length;
}

function calculerEMA(valeurs, periode) {
    const nombres = valeurs.filter((v) => Number.isFinite(Number(v))).map(Number);
    if (nombres.length < periode) return null;
    const multiplicateur = 2 / (periode + 1);
    let ema = moyenneSimple(nombres.slice(0, periode));
    for (let i = periode; i < nombres.length; i++) {
        ema = (nombres[i] - ema) * multiplicateur + ema;
    }
    return ema;
}

function serieEMA(valeurs, periode) {
    const nombres = valeurs.filter((v) => Number.isFinite(Number(v))).map(Number);
    if (nombres.length < periode) return [];
    const multiplicateur = 2 / (periode + 1);
    let ema = moyenneSimple(nombres.slice(0, periode));
    const resultat = [ema];
    for (let i = periode; i < nombres.length; i++) {
        ema = (nombres[i] - ema) * multiplicateur + ema;
        resultat.push(ema);
    }
    return resultat;
}

function calculerRSI(closes, periode = 14) {
    const valeurs = closes.map(Number).filter(Number.isFinite);
    if (valeurs.length <= periode) return null;

    let gains = 0;
    let pertes = 0;
    for (let i = 1; i <= periode; i++) {
        const variation = valeurs[i] - valeurs[i - 1];
        if (variation >= 0) gains += variation;
        else pertes -= variation;
    }

    let gainMoyen = gains / periode;
    let perteMoyenne = pertes / periode;

    for (let i = periode + 1; i < valeurs.length; i++) {
        const variation = valeurs[i] - valeurs[i - 1];
        const gain = variation > 0 ? variation : 0;
        const perte = variation < 0 ? -variation : 0;
        gainMoyen = ((gainMoyen * (periode - 1)) + gain) / periode;
        perteMoyenne = ((perteMoyenne * (periode - 1)) + perte) / periode;
    }

    if (perteMoyenne === 0) return 100;
    const rs = gainMoyen / perteMoyenne;
    return 100 - (100 / (1 + rs));
}

function calculerMACD(closes) {
    const ema12Serie = serieEMA(closes, 12);
    const ema26Serie = serieEMA(closes, 26);
    if (ema12Serie.length === 0 || ema26Serie.length === 0) {
        return { macd: null, signalMacd: null, histogrammeMacd: null };
    }

    const decalage = ema12Serie.length - ema26Serie.length;
    const macdSerie = ema26Serie.map((ema26, index) => ema12Serie[index + decalage] - ema26);
    const signalSerie = serieEMA(macdSerie, 9);
    const macd = macdSerie[macdSerie.length - 1];
    const signalMacd = signalSerie.length ? signalSerie[signalSerie.length - 1] : null;

    return {
        macd,
        signalMacd,
        histogrammeMacd: Number.isFinite(macd) && Number.isFinite(signalMacd) ? macd - signalMacd : null
    };
}

function calculerATR(bougies, periode = 14) {
    if (!Array.isArray(bougies) || bougies.length <= periode) return null;
    const trueRanges = [];
    for (let i = 1; i < bougies.length; i++) {
        const haut = bougies[i].haut;
        const bas = bougies[i].bas;
        const cloturePrecedente = bougies[i - 1].cloture;
        trueRanges.push(Math.max(
            haut - bas,
            Math.abs(haut - cloturePrecedente),
            Math.abs(bas - cloturePrecedente)
        ));
    }
    return moyenneSimple(trueRanges.slice(-periode));
}

function determinerTendance(prixActuel, ema20, ema50, ema200) {
    if (![prixActuel, ema20, ema50].every((v) => Number.isFinite(Number(v)))) return "neutre";
    if (prixActuel > ema20 && ema20 > ema50 && (!Number.isFinite(Number(ema200)) || ema50 > ema200)) return "haussiere";
    if (prixActuel < ema20 && ema20 < ema50 && (!Number.isFinite(Number(ema200)) || ema50 < ema200)) return "baissiere";
    return "neutre";
}

function determinerDecisionTechnique({ prixActuel, support, resistance, rsi, tendance }) {
    if (![prixActuel, support, resistance].every((v) => Number.isFinite(Number(v)))) return "attente";
    if (tendance === "haussiere" && Number(rsi) < 70 && prixActuel > support) return "achat_possible";
    if (tendance === "baissiere" && Number(rsi) > 30 && prixActuel < resistance) return "vente_possible";
    return "attente";
}

function normaliserSymboleBinance(actif) {
    const texte = String(actif || "").trim().toUpperCase();
    if (!texte) return null;
    if (texte.startsWith("BINANCE:")) return texte.replace("BINANCE:", "").replace(/[^A-Z0-9]/g, "");
    if (/^[A-Z0-9]{6,15}$/.test(texte)) return texte;
    return null;
}

function convertirIntervalleBinance(intervalle) {
    const valeur = String(intervalle || "D").trim();
    const correspondances = {
        "1": "1m",
        "3": "3m",
        "5": "5m",
        "15": "15m",
        "30": "30m",
        "45": "30m",
        "60": "1h",
        "120": "2h",
        "240": "4h",
        "D": "1d",
        "1D": "1d",
        "W": "1w",
        "1W": "1w",
        "M": "1M",
        "1M": "1M"
    };
    return correspondances[valeur] || "1d";
}

function convertirIntervalleYahoo(intervalle) {
    const valeur = String(intervalle || "D").trim();
    const correspondances = {
        "1": { interval: "1m", range: "5d" },
        "2": { interval: "2m", range: "5d" },
        "5": { interval: "5m", range: "1mo" },
        "15": { interval: "15m", range: "1mo" },
        "30": { interval: "30m", range: "1mo" },
        "60": { interval: "60m", range: "3mo" },
        "120": { interval: "60m", range: "3mo" },
        "240": { interval: "60m", range: "6mo" },
        "D": { interval: "1d", range: "1y" },
        "1D": { interval: "1d", range: "1y" },
        "W": { interval: "1wk", range: "5y" },
        "1W": { interval: "1wk", range: "5y" },
        "M": { interval: "1mo", range: "10y" },
        "1M": { interval: "1mo", range: "10y" }
    };
    return correspondances[valeur] || { interval: "1d", range: "1y" };
}

function symbolesYahooPossibles(actif) {
    const texteOriginal = String(actif || "").trim();
    const texte = texteOriginal.toUpperCase();

    const table = {
        "NASDAQ:AAPL": ["AAPL"],
        "NASDAQ:TSLA": ["TSLA"],
        "NASDAQ:NVDA": ["NVDA"],
        "NASDAQ:MSFT": ["MSFT"],
        "NASDAQ:AMZN": ["AMZN"],
        "NASDAQ:GOOGL": ["GOOGL"],
        "SP:SPX": ["^GSPC"],
        "TVC:DXY": ["DX-Y.NYB"],
        "OANDA:XAUUSD": ["GC=F", "XAUUSD=X"],
        "COINBASE:BTCUSD": ["BTC-USD"],
        "BINANCE:BTCUSDT": ["BTC-USD"],
        "BINANCE:ETHUSDT": ["ETH-USD"]
    };

    if (table[texte]) return table[texte];

    if (texte.startsWith("NASDAQ:")) return [texteOriginal.split(":")[1]];
    if (texte.startsWith("NYSE:")) return [texteOriginal.split(":")[1]];
    if (texte.startsWith("AMEX:")) return [texteOriginal.split(":")[1]];
    if (texte.startsWith("COINBASE:BTCUSD")) return ["BTC-USD"];
    if (texte.startsWith("COINBASE:ETHUSD")) return ["ETH-USD"];

    return [];
}

function construireReponseMarche({ actif, intervalle, indicateur, categorieAnalyse, source, symboleSource, intervalleSource, bougies }) {
    if (!Array.isArray(bougies) || bougies.length < 30) {
        throw new Error("Historique insuffisant pour calculer support, résistance et indicateurs.");
    }

    const closes = bougies.map((b) => b.cloture);
    const volumes = bougies.map((b) => b.volume).filter((v) => Number.isFinite(Number(v)));
    const derniereBougie = bougies[bougies.length - 1];
    const avantDerniereBougie = bougies.length >= 2 ? bougies[bougies.length - 2] : null;
    const bougiesSupportResistance = bougies.slice(-50);
    const support = Math.min(...bougiesSupportResistance.map((b) => b.bas));
    const resistance = Math.max(...bougiesSupportResistance.map((b) => b.haut));
    const plusBasRecent = Math.min(...bougies.slice(-20).map((b) => b.bas));
    const plusHautRecent = Math.max(...bougies.slice(-20).map((b) => b.haut));
    const prixPrecedent = avantDerniereBougie ? avantDerniereBougie.cloture : null;
    const variationPourcent = prixPrecedent ? ((derniereBougie.cloture - prixPrecedent) / prixPrecedent) * 100 : null;
    const ema20 = calculerEMA(closes, 20);
    const ema50 = calculerEMA(closes, 50);
    const ema200 = calculerEMA(closes, 200);
    const rsi = calculerRSI(closes, 14);
    const macd = calculerMACD(closes);
    const atr14 = calculerATR(bougies, 14);
    const volumeMoyen20 = moyenneSimple(volumes.slice(-20));
    const tendance = determinerTendance(derniereBougie.cloture, ema20, ema50, ema200);
    const decisionTechniquePreliminaire = determinerDecisionTechnique({
        prixActuel: derniereBougie.cloture,
        support,
        resistance,
        rsi,
        tendance
    });

    return {
        ok: true,
        statut: "ok",
        message: "Données de marché calculées.",
        actif,
        intervalle,
        indicateur,
        categorieAnalyse,
        dateMiseAJour: new Date().toISOString(),
        source,
        symboleSource,
        intervalleSource,
        nombreBougies: bougies.length,
        prixActuel: arrondirNombre(derniereBougie.cloture),
        ouverture: arrondirNombre(derniereBougie.ouverture),
        haut: arrondirNombre(derniereBougie.haut),
        bas: arrondirNombre(derniereBougie.bas),
        support: arrondirNombre(support),
        resistance: arrondirNombre(resistance),
        plusBasRecent: arrondirNombre(plusBasRecent),
        plusHautRecent: arrondirNombre(plusHautRecent),
        variationPourcent: arrondirNombre(variationPourcent, 4),
        rsi: arrondirNombre(rsi, 2),
        ema20: arrondirNombre(ema20),
        ema50: arrondirNombre(ema50),
        ema200: arrondirNombre(ema200),
        macd: arrondirNombre(macd.macd),
        signalMacd: arrondirNombre(macd.signalMacd),
        histogrammeMacd: arrondirNombre(macd.histogrammeMacd),
        atr14: arrondirNombre(atr14),
        volume: arrondirNombre(derniereBougie.volume, 4),
        volumeMoyen20: arrondirNombre(volumeMoyen20, 4),
        tendance,
        decisionTechniquePreliminaire,
        methodeSupportResistance: "plus_bas_plus_haut_des_50_dernieres_bougies",
        derniereBougie: {
            tempsOuverture: derniereBougie.tempsOuverture ? new Date(derniereBougie.tempsOuverture).toISOString() : null,
            tempsFermeture: derniereBougie.tempsFermeture ? new Date(derniereBougie.tempsFermeture).toISOString() : null,
            ouverture: arrondirNombre(derniereBougie.ouverture),
            haut: arrondirNombre(derniereBougie.haut),
            bas: arrondirNombre(derniereBougie.bas),
            cloture: arrondirNombre(derniereBougie.cloture),
            volume: arrondirNombre(derniereBougie.volume, 4)
        }
    };
}

async function obtenirDonneesBinance(actif, intervalle) {
    const symboleBinance = normaliserSymboleBinance(actif);
    if (!symboleBinance) {
        throw new Error("Symbole non compatible avec Binance.");
    }

    const intervalleBinance = convertirIntervalleBinance(intervalle);
    const limite = 220;
    const url = `https://api.binance.com/api/v3/klines?symbol=${encodeURIComponent(symboleBinance)}&interval=${encodeURIComponent(intervalleBinance)}&limit=${limite}`;

    const reponse = await fetch(url, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    const texte = await reponse.text();
    let json;
    try {
        json = JSON.parse(texte);
    } catch (erreur) {
        throw new Error("Réponse Binance non JSON : " + texte.slice(0, 300));
    }

    if (!reponse.ok) {
        throw new Error(json.msg || json.message || "Erreur Binance HTTP " + reponse.status);
    }

    if (!Array.isArray(json) || json.length === 0) {
        throw new Error("Binance n'a retourné aucune bougie.");
    }

    const bougies = json.map((k) => ({
        tempsOuverture: Number(k[0]),
        ouverture: Number(k[1]),
        haut: Number(k[2]),
        bas: Number(k[3]),
        cloture: Number(k[4]),
        volume: Number(k[5]),
        tempsFermeture: Number(k[6]),
        volumeQuote: Number(k[7]),
        nombreTransactions: Number(k[8])
    })).filter((b) => [b.ouverture, b.haut, b.bas, b.cloture].every(Number.isFinite));

    return {
        source: "binance_api_publique",
        symboleSource: symboleBinance,
        intervalleSource: intervalleBinance,
        bougies
    };
}

async function obtenirDonneesYahoo(actif, intervalle) {
    const symboles = symbolesYahooPossibles(actif);
    if (!symboles.length) {
        throw new Error("Symbole non compatible avec Yahoo Finance Chart.");
    }

    const parametres = convertirIntervalleYahoo(intervalle);
    let derniereErreur = null;

    for (const symboleYahoo of symboles) {
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symboleYahoo)}?range=${encodeURIComponent(parametres.range)}&interval=${encodeURIComponent(parametres.interval)}&includePrePost=false&events=history`;

        try {
            const reponse = await fetch(url, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "User-Agent": "Mozilla/5.0 TradingStationIA/1.0"
                }
            });

            const texte = await reponse.text();
            let json;
            try {
                json = JSON.parse(texte);
            } catch (erreur) {
                throw new Error("Réponse Yahoo non JSON : " + texte.slice(0, 300));
            }

            if (!reponse.ok) {
                throw new Error("Erreur Yahoo HTTP " + reponse.status + " : " + texte.slice(0, 300));
            }

            const resultat = json?.chart?.result?.[0];
            const erreurYahoo = json?.chart?.error;

            if (erreurYahoo) {
                throw new Error(erreurYahoo.description || erreurYahoo.code || "Erreur Yahoo Finance.");
            }

            if (!resultat || !Array.isArray(resultat.timestamp)) {
                throw new Error("Yahoo Finance n'a retourné aucune série temporelle.");
            }

            const quote = resultat?.indicators?.quote?.[0];
            if (!quote) {
                throw new Error("Yahoo Finance n'a pas retourné de bloc quote.");
            }

            const bougies = resultat.timestamp.map((temps, index) => ({
                tempsOuverture: Number(temps) * 1000,
                tempsFermeture: Number(temps) * 1000,
                ouverture: Number(quote.open?.[index]),
                haut: Number(quote.high?.[index]),
                bas: Number(quote.low?.[index]),
                cloture: Number(quote.close?.[index]),
                volume: Number(quote.volume?.[index] ?? 0)
            })).filter((b) => [b.ouverture, b.haut, b.bas, b.cloture].every(Number.isFinite));

            if (bougies.length < 30) {
                throw new Error("Yahoo Finance a retourné un historique insuffisant.");
            }

            return {
                source: "yahoo_finance_chart",
                symboleSource: symboleYahoo,
                intervalleSource: parametres.interval,
                rangeSource: parametres.range,
                bougies
            };
        } catch (erreur) {
            derniereErreur = erreur;
        }
    }

    throw derniereErreur || new Error("Aucune donnée Yahoo Finance disponible.");
}

async function obtenirDonneesMarcheMultiSource(actif, intervalle) {
    const erreurs = [];
    const sources = [];

    if (normaliserSymboleBinance(actif)) {
        sources.push(obtenirDonneesBinance);
    }

    sources.push(obtenirDonneesYahoo);

    for (const source of sources) {
        try {
            return await source(actif, intervalle);
        } catch (erreur) {
            erreurs.push(erreur.message);
        }
    }

    throw new Error(erreurs.join(" | "));
}

app.post("/api/marche", async (req, res) => {
    const actif = req.body?.actif || "NON_RENSEIGNE";
    const intervalle = req.body?.intervalle || "D";
    const indicateur = req.body?.indicateur || "RSI";
    const categorieAnalyse = req.body?.categorieAnalyse || req.body?.categorie_analyse || null;

    try {
        const donneesSource = await obtenirDonneesMarcheMultiSource(actif, intervalle);
        const resultat = construireReponseMarche({
            actif,
            intervalle,
            indicateur,
            categorieAnalyse,
            source: donneesSource.source,
            symboleSource: donneesSource.symboleSource,
            intervalleSource: donneesSource.intervalleSource,
            bougies: donneesSource.bougies
        });

        if (donneesSource.rangeSource) resultat.rangeSource = donneesSource.rangeSource;
        res.json(resultat);
    } catch (erreur) {
        res.json({
            ok: false,
            statut: "donnees_insuffisantes",
            message: "Impossible de calculer les données de marché avec les sources disponibles.",
            detail: erreur.message,
            actif,
            intervalle,
            indicateur,
            categorieAnalyse,
            prixActuel: null,
            support: null,
            resistance: null,
            rsi: null,
            ema20: null,
            ema50: null,
            ema200: null,
            macd: null,
            signalMacd: null,
            histogrammeMacd: null,
            atr14: null,
            volume: "non_disponible",
            volumeMoyen20: null,
            tendance: "neutre",
            decisionTechniquePreliminaire: "attente",
            source: "serveur_nodejs_sources_non_disponibles",
            sourcesTentees: ["binance_api_publique", "yahoo_finance_chart"],
            dateMiseAJour: new Date().toISOString()
        });
    }
});

app.post("/api/analyse", async (req, res) => {
    res.json({
        ok: true,
        statut: "ok",
        message: "Analyse reçue par le serveur.",
        recommandation: "Analyse à compléter côté IA ou moteur d'analyse.",
        donneesRecues: req.body || {},
        date: new Date().toISOString()
    });
});

async function viderCaptures(req, res) {
    try {
        const motDePasseRecu = String(req.body?.motDePasse || req.body?.password || "").trim();
        const motDePasseServeur = String(process.env.ADMIN_DELETE_PASSWORD || "").trim();

        if (!motDePasseServeur) {
            return reponseErreur(res, 500, "ADMIN_DELETE_PASSWORD n'est pas configuré sur Render.");
        }

        if (!motDePasseRecu || motDePasseRecu !== motDePasseServeur) {
            return reponseErreur(res, 401, "Mot de passe administrateur invalide.");
        }

        await assurerTableTradingCapture();
        const db = obtenirPool();
        const resultat = await db.query("DELETE FROM trading_capture RETURNING id;");

        res.json({
            ok: true,
            statut: "ok",
            message: "Table trading_capture vidée.",
            nombreSuppressions: resultat.rowCount,
            date: new Date().toISOString()
        });
    } catch (erreur) {
        return reponseErreur(res, 500, "Impossible de vider la table trading_capture.", erreur);
    }
}

app.post("/api/vider-captures", viderCaptures);
app.delete("/api/vider-captures", viderCaptures);
app.post("/api/vider-table", viderCaptures);
app.delete("/api/vider-table", viderCaptures);
app.post("/api/vider-trading-capture", viderCaptures);
app.delete("/api/vider-trading-capture", viderCaptures);

app.get("/api/vider-captures-test", (req, res) => {
    res.json({
        ok: true,
        statut: "ok",
        message: "La route de vidage existe. Utiliser POST /api/vider-captures avec motDePasse."
    });
});

app.use((req, res) => {
    res.status(404).json({
        ok: false,
        statut: "erreur",
        message: "Route introuvable",
        methode: req.method,
        routeDemandee: req.originalUrl,
        routesDisponibles: [
            "GET /",
            "GET /api/test",
            "GET /api/verifier-db",
            "GET /api/creer-table",
            "GET /api/verifier-table",
            "GET /api/captures",
            "GET /api/captures/:id",
            "POST /api/captures",
            "POST /api/marche",
            "POST /api/analyse",
            "POST /api/vider-captures",
            "DELETE /api/vider-captures"
        ]
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Serveur Trading Station IA actif sur le port ${PORT}`);
});
