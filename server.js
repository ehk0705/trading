/*
    Serveur Node.js pour Trading Station IA
    API Render + PostgreSQL
    ------------------------------------------------------------
    Fichier : server.js
    Auteur : Hocine Korichi, Ing.

    Version compatible avec index_advanced.html :
    - insertion des champs principaux dans trading_capture ;
    - conservation de tous les paramètres TradingView détaillés dans configuration_json ;
    - compatibilité avec les anciens champs nom_fichier / nom_capture ;
    - route protégée pour vider la table avec ADMIN_DELETE_PASSWORD.
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
            ssl: {
                rejectUnauthorized: false
            }
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

        res.json({
            ok: true,
            statut: "ok",
            captures: resultat.rows
        });
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

        const resultat = await db.query(
            "SELECT * FROM trading_capture WHERE id = $1;",
            [id]
        );

        if (resultat.rows.length === 0) {
            return reponseErreur(res, 404, "Capture introuvable.");
        }

        res.json({
            ok: true,
            statut: "ok",
            capture: resultat.rows[0]
        });
    } catch (erreur) {
        return reponseErreur(res, 500, "Impossible de lire la capture.", erreur);
    }
});

app.post("/api/captures", async (req, res) => {
    try {
        await assurerTableTradingCapture();
        const db = obtenirPool();
        const body = req.body || {};

        const configurationJson = body.configuration_json || body.configurationJson || {};

        const actif = texteOuNull(body.actif || configurationJson?.graphique?.actif) || "NON_RENSEIGNE";
        const indicateur = texteOuNull(body.indicateur || configurationJson?.graphique?.indicateur);
        const intervalle = texteOuNull(body.intervalle || configurationJson?.graphique?.intervalle);

        const actifLibelle = texteOuNull(body.actif_libelle || configurationJson?.graphique?.actifLibelle);
        const indicateurLibelle = texteOuNull(body.indicateur_libelle || configurationJson?.graphique?.indicateurLibelle);
        const intervalleLibelle = texteOuNull(body.intervalle_libelle || configurationJson?.graphique?.intervalleLibelle);

        const typeBougie = texteOuNull(body.type_bougie || configurationJson?.graphique?.typeBougie);
        const typeBougieLibelle = texteOuNull(body.type_bougie_libelle || configurationJson?.graphique?.typeBougieLibelle);
        const sourceParametres = texteOuNull(body.source_parametres || configurationJson?.graphique?.source);
        const lectureDirecteGraphique = booleenOuFaux(body.lecture_directe_graphique || configurationJson?.graphique?.lectureDirecteGraphique);

        const categorieAnalyse = texteOuNull(
            body.categorie_analyse ||
            body.categorieAnalyse ||
            configurationJson?.analyseIA?.categorieLibelle ||
            configurationJson?.analyseIA?.categorie ||
            configurationJson?.snapshot?.categorieAnalyseLibelle ||
            configurationJson?.snapshot?.categorieAnalyse
        );

        const nomFichier = texteOuNull(body.nom_fichier) || `capture-${Date.now()}`;
        const nomCapture = texteOuNull(body.nom_capture) || nomFichier;
        const screenshotBase64 = texteOuNull(body.screenshot_base64);

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
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14::jsonb, $15)
            RETURNING id, actif, indicateur, intervalle, nom_capture, categorie_analyse, date_capture;
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

async function obtenirDonneesBinance(actif, intervalle) {
    const symboleBinance = normaliserSymboleBinance(actif);
    if (!symboleBinance) {
        throw new Error("Symbole non compatible avec Binance. Utiliser par exemple BINANCE:BTCUSDT ou BINANCE:ETHUSDT.");
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

    if (bougies.length < 30) {
        throw new Error("Historique insuffisant pour calculer support, résistance et indicateurs.");
    }

    const closes = bougies.map((b) => b.cloture);
    const volumes = bougies.map((b) => b.volume);
    const derniereBougie = bougies[bougies.length - 1];
    const bougiesSupportResistance = bougies.slice(-50);
    const support = Math.min(...bougiesSupportResistance.map((b) => b.bas));
    const resistance = Math.max(...bougiesSupportResistance.map((b) => b.haut));
    const plusBasRecent = Math.min(...bougies.slice(-20).map((b) => b.bas));
    const plusHautRecent = Math.max(...bougies.slice(-20).map((b) => b.haut));
    const prixPrecedent = bougies.length >= 2 ? bougies[bougies.length - 2].cloture : null;
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
        source: "binance_api_publique",
        symboleBinance,
        intervalleBinance,
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
        nombreTransactions: derniereBougie.nombreTransactions,
        tendance,
        decisionTechniquePreliminaire,
        methodeSupportResistance: "plus_bas_plus_haut_des_50_dernieres_bougies",
        derniereBougie: {
            tempsOuverture: new Date(derniereBougie.tempsOuverture).toISOString(),
            tempsFermeture: new Date(derniereBougie.tempsFermeture).toISOString(),
            ouverture: arrondirNombre(derniereBougie.ouverture),
            haut: arrondirNombre(derniereBougie.haut),
            bas: arrondirNombre(derniereBougie.bas),
            cloture: arrondirNombre(derniereBougie.cloture),
            volume: arrondirNombre(derniereBougie.volume, 4)
        }
    };
}

app.post("/api/marche", async (req, res) => {
    const actif = req.body?.actif || "NON_RENSEIGNE";
    const intervalle = req.body?.intervalle || "D";
    const indicateur = req.body?.indicateur || "RSI";
    const categorieAnalyse = req.body?.categorieAnalyse || req.body?.categorie_analyse || null;

    try {
        const donnees = await obtenirDonneesBinance(actif, intervalle);

        res.json({
            ok: true,
            statut: "ok",
            message: "Données de marché calculées à partir des bougies publiques Binance.",
            actif,
            intervalle,
            indicateur,
            categorieAnalyse,
            dateMiseAJour: new Date().toISOString(),
            ...donnees
        });
    } catch (erreur) {
        res.json({
            ok: false,
            statut: "donnees_insuffisantes",
            message: "Impossible de calculer les données de marché pour cet actif avec la source actuelle.",
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
            source: "serveur_nodejs_source_non_disponible",
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
