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

app.post("/api/marche", async (req, res) => {
    const actif = req.body?.actif || "NON_RENSEIGNE";
    const intervalle = req.body?.intervalle || "D";
    const indicateur = req.body?.indicateur || "RSI";

    res.json({
        ok: true,
        statut: "ok",
        message: "Données de marché simulées par le serveur. À remplacer par une vraie source de données si nécessaire.",
        actif,
        intervalle,
        indicateur,
        prixActuel: null,
        support: null,
        resistance: null,
        rsi: null,
        ema20: null,
        ema50: null,
        macd: null,
        volume: "non_disponible",
        tendance: "neutre",
        source: "serveur_nodejs_placeholder",
        dateMiseAJour: new Date().toISOString()
    });
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
