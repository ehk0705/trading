/*
    Serveur Node.js pour Trading Station IA
    API Render + PostgreSQL
    ------------------------------------------------------------
    Fichier : server.js
    Auteur : Hocine Korichi, Ing.
*/

const express = require("express");
const cors = require("cors");
const path = require("path");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

/* =========================
   CORS
========================= */

const originesAutorisees = [
    "http://localhost",
    "http://localhost:80",
    "http://localhost:3000",
    "http://127.0.0.1",
    "http://127.0.0.1:80",
    "http://127.0.0.1:3000",
    "https://ehk0705.github.io",
    "https://trading-g8ie.onrender.com",
    "https://trading-pattern-api.onrender.com"
];

const optionsCors = {
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }

        if (originesAutorisees.includes(origin)) {
            return callback(null, true);
        }

        return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Accept",
        "Origin",
        "X-Requested-With"
    ],
    exposedHeaders: ["Content-Type"],
    credentials: false,
    optionsSuccessStatus: 204
};

app.use(cors(optionsCors));

app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (!origin || originesAutorisees.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin || "*");
    } else {
        res.header("Access-Control-Allow-Origin", "*");
    }

    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Accept, Origin, X-Requested-With"
    );
    res.header("Access-Control-Max-Age", "86400");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

/* =========================
   MIDDLEWARES
========================= */

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(express.static(path.join(__dirname)));

/* =========================
   POSTGRESQL
========================= */

let pool = null;

function verifierDatabaseUrl() {
    if (!process.env.DATABASE_URL) {
        const erreur = new Error("DATABASE_URL n'est pas configurée sur Render.");
        erreur.code = "DATABASE_URL_ABSENTE";
        throw erreur;
    }
}

function obtenirPool() {
    verifierDatabaseUrl();

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

async function ajouterColonneNomCapture() {
    const db = obtenirPool();

    await db.query(`
        ALTER TABLE trading_capture
        ADD COLUMN IF NOT EXISTS nom_capture VARCHAR(255);
    `);

    await db.query(`
        CREATE UNIQUE INDEX IF NOT EXISTS idx_trading_capture_nom_capture_unique
        ON trading_capture (nom_capture)
        WHERE nom_capture IS NOT NULL;
    `);
}

async function creerTableSiAbsente() {
    const db = obtenirPool();

    await db.query(`
        CREATE TABLE IF NOT EXISTS trading_capture (
            id SERIAL PRIMARY KEY,
            actif VARCHAR(100) NOT NULL,
            indicateur VARCHAR(100),
            intervalle VARCHAR(50),
            nom_fichier VARCHAR(255),
            configuration_json JSONB NOT NULL,
            screenshot_base64 TEXT,
            date_capture TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    await ajouterColonneNomCapture();
}

function reponseErreur(res, status, message, erreur = null) {
    return res.status(status).json({
        ok: false,
        statut: "erreur",
        message,
        detail: erreur ? erreur.message : ""
    });
}

/* =========================
   ROUTE RACINE
========================= */

app.get("/", (req, res) => {
    res.json({
        ok: true,
        statut: "ok",
        message: "Serveur Trading API actif - version 2026-05-10 avec nom_capture.",
        serveur: "trading",
        databaseUrlConfiguree: Boolean(process.env.DATABASE_URL),
        routes: [
            "GET /api/test",
            "GET /api/cors-test",
            "GET /api/creer-table",
            "GET /api/ajouter-nom-capture",
            "GET /api/verifier-db",
            "GET /api/verifier-table",
            "GET /api/verifier-captures",
            "GET /api/structure-table",
            "GET /api/contenu-table",
            "POST /api/analyse",
            "POST /api/marche",
            "POST /api/analyse-pattern",
            "POST /api/captures",
            "GET /api/captures",
            "GET /api/captures/:id"
        ],
        date: new Date().toISOString()
    });
});

/* =========================
   TEST API
========================= */

app.get("/api/test", (req, res) => {
    res.json({
        ok: true,
        statut: "ok",
        message: "API accessible",
        serveur: "trading",
        databaseUrlConfiguree: Boolean(process.env.DATABASE_URL),
        origin: req.headers.origin || null,
        date: new Date().toISOString()
    });
});

app.get("/api/cors-test", (req, res) => {
    res.json({
        ok: true,
        statut: "ok",
        message: "CORS fonctionne.",
        origin: req.headers.origin || null,
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

/* =========================
   TABLE POSTGRESQL
========================= */

app.get("/api/creer-table", async (req, res) => {
    try {
        await creerTableSiAbsente();

        res.json({
            ok: true,
            statut: "ok",
            table: "trading_capture",
            message: "La table trading_capture existe ou vient d'être créée. La colonne nom_capture a été ajoutée si elle était absente.",
            date: new Date().toISOString()
        });
    } catch (erreur) {
        return reponseErreur(res, 500, "Impossible de créer ou modifier la table trading_capture.", erreur);
    }
});

app.get("/api/ajouter-nom-capture", async (req, res) => {
    try {
        await creerTableSiAbsente();
        await ajouterColonneNomCapture();

        res.json({
            ok: true,
            statut: "ok",
            table: "trading_capture",
            colonne: "nom_capture",
            message: "La colonne nom_capture a été ajoutée ou existait déjà.",
            date: new Date().toISOString()
        });
    } catch (erreur) {
        return reponseErreur(res, 500, "Impossible d'ajouter la colonne nom_capture.", erreur);
    }
});

app.get("/api/verifier-table", async (req, res) => {
    try {
        await creerTableSiAbsente();

        const db = obtenirPool();

        const resultatTable = await db.query(`
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
            AND table_name = 'trading_capture';
        `);

        const resultatNomCapture = await db.query(`
            SELECT column_name
            FROM information_schema.columns
            WHERE table_schema = 'public'
            AND table_name = 'trading_capture'
            AND column_name = 'nom_capture';
        `);

        const resultatIndex = await db.query(`
            SELECT indexname
            FROM pg_indexes
            WHERE schemaname = 'public'
            AND tablename = 'trading_capture'
            AND indexname = 'idx_trading_capture_nom_capture_unique';
        `);

        const tableExiste = resultatTable.rows.length > 0;
        const nomCaptureExiste = resultatNomCapture.rows.length > 0;
        const indexNomCaptureExiste = resultatIndex.rows.length > 0;

        res.json({
            ok: true,
            statut: "ok",
            table: "trading_capture",
            tableExiste,
            nomCaptureExiste,
            indexNomCaptureExiste,
            message: tableExiste
                ? "La table trading_capture existe bien."
                : "La table trading_capture n'existe pas. Ouvrir /api/creer-table pour la créer."
        });
    } catch (erreur) {
        return reponseErreur(res, 500, "Erreur lors de la vérification de la table.", erreur);
    }
});

app.get("/api/verifier-captures", async (req, res) => {
    try {
        await creerTableSiAbsente();

        const db = obtenirPool();

        const resultat = await db.query(`
            SELECT COUNT(*) AS total
            FROM trading_capture;
        `);

        res.json({
            ok: true,
            statut: "ok",
            table: "trading_capture",
            totalCaptures: Number(resultat.rows[0].total)
        });
    } catch (erreur) {
        return reponseErreur(res, 500, "Impossible de lire la table trading_capture.", erreur);
    }
});

/* =========================
   STRUCTURE DE LA TABLE
========================= */

app.get("/api/structure-table", async (req, res) => {
    try {
        await creerTableSiAbsente();

        const db = obtenirPool();

        const resultat = await db.query(`
            SELECT
                column_name AS colonne,
                data_type AS type,
                is_nullable AS nullable,
                column_default AS valeur_par_defaut
            FROM information_schema.columns
            WHERE table_schema = 'public'
            AND table_name = 'trading_capture'
            ORDER BY ordinal_position;
        `);

        res.json({
            ok: true,
            statut: "ok",
            table: "trading_capture",
            colonnes: resultat.rows
        });
    } catch (erreur) {
        return reponseErreur(res, 500, "Impossible de lire la structure de la table.", erreur);
    }
});

/* =========================
   CONTENU DE LA TABLE
========================= */

app.get("/api/contenu-table", async (req, res) => {
    try {
        await creerTableSiAbsente();

        const db = obtenirPool();

        const resultat = await db.query(`
            SELECT
                id,
                actif,
                indicateur,
                intervalle,
                nom_fichier,
                nom_capture,
                configuration_json,
                CASE
                    WHEN screenshot_base64 IS NULL THEN false
                    ELSE true
                END AS contient_screenshot,
                CASE
                    WHEN screenshot_base64 IS NULL THEN 0
                    ELSE LENGTH(screenshot_base64)
                END AS taille_screenshot,
                date_capture
            FROM trading_capture
            ORDER BY date_capture DESC
            LIMIT 100;
        `);

        res.json({
            ok: true,
            statut: "ok",
            table: "trading_capture",
            totalRetourne: resultat.rows.length,
            contenu: resultat.rows
        });
    } catch (erreur) {
        return reponseErreur(res, 500, "Impossible de lire le contenu de la table.", erreur);
    }
});

/* =========================
   ANALYSE SIMPLE
========================= */

app.post("/api/analyse", async (req, res) => {
    try {
        res.json({
            ok: true,
            statut: "ok",
            message: "Configuration reçue par le serveur.",
            configuration: req.body,
            date: new Date().toISOString()
        });
    } catch (erreur) {
        return reponseErreur(res, 500, "Erreur dans /api/analyse.", erreur);
    }
});

/* =========================
   CAPTURES
========================= */

app.post("/api/captures", async (req, res) => {
    try {
        await creerTableSiAbsente();

        const db = obtenirPool();

        const {
            actif,
            symbole,
            indicateur,
            intervalle,
            nom_fichier,
            nom_capture,
            configuration_json,
            configuration,
            screenshot_base64,
            image,
            screenshot
        } = req.body || {};

        const actifFinal = actif || symbole || "NON_RENSEIGNE";
        const configurationFinale = configuration_json || configuration || req.body || {};
        const screenshotFinal = screenshot_base64 || screenshot || image || null;

        const nomCaptureFinal = nom_capture || nom_fichier || null;

        const resultat = await db.query(
            `
            INSERT INTO trading_capture
            (
                actif,
                indicateur,
                intervalle,
                nom_fichier,
                nom_capture,
                configuration_json,
                screenshot_base64
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING
                id,
                actif,
                indicateur,
                intervalle,
                nom_fichier,
                nom_capture,
                date_capture
            `,
            [
                actifFinal,
                indicateur || null,
                intervalle || null,
                nom_fichier || nomCaptureFinal,
                nomCaptureFinal,
                configurationFinale,
                screenshotFinal
            ]
        );

        res.json({
            ok: true,
            statut: "ok",
            message: "Configuration enregistrée dans la base de données.",
            capture: resultat.rows[0]
        });

    } catch (erreur) {
        console.error("Erreur POST /api/captures :", erreur);

        res.status(500).json({
            ok: false,
            statut: "erreur",
            message: "Erreur lors de l'enregistrement de la capture.",
            detail: erreur.message || String(erreur)
        });
    }
});

app.get("/api/captures", async (req, res) => {
    try {
        await creerTableSiAbsente();

        const db = obtenirPool();

        const resultat = await db.query(`
            SELECT
                id,
                actif,
                indicateur,
                intervalle,
                nom_fichier,
                nom_capture,
                date_capture
            FROM trading_capture
            ORDER BY date_capture DESC
            LIMIT 100;
        `);

        res.json({
            ok: true,
            statut: "ok",
            captures: resultat.rows
        });
    } catch (erreur) {
        console.error("Erreur GET /api/captures :", erreur);
        return reponseErreur(res, 500, "Impossible de charger les captures.", erreur);
    }
});

app.get("/api/captures/:id", async (req, res) => {
    try {
        await creerTableSiAbsente();

        const db = obtenirPool();
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                ok: false,
                statut: "erreur",
                message: "Identifiant invalide."
            });
        }

        const resultat = await db.query(
            `
            SELECT *
            FROM trading_capture
            WHERE id = $1;
            `,
            [id]
        );

        if (resultat.rows.length === 0) {
            return res.status(404).json({
                ok: false,
                statut: "erreur",
                message: "Capture introuvable."
            });
        }

        res.json({
            ok: true,
            statut: "ok",
            capture: resultat.rows[0]
        });
    } catch (erreur) {
        console.error("Erreur GET /api/captures/:id :", erreur);
        return reponseErreur(res, 500, "Impossible de charger la capture.", erreur);
    }
});

/* =========================
   DONNÉES DE MARCHÉ
========================= */

app.post("/api/marche", async (req, res) => {
    try {
        const {
            actif = "BINANCE:BTCUSDT",
            intervalle = "60",
            indicateur = "RSI",
            categorieAnalyse = "analyse_technique"
        } = req.body || {};

        const actifNormalise = String(actif).trim().toUpperCase();

        if (!actifNormalise.startsWith("BINANCE:")) {
            return res.json(genererDonneesMarcheSimulees({
                actif,
                intervalle,
                indicateur,
                categorieAnalyse,
                raison: "Actif non compatible avec Binance API. Données simulées."
            }));
        }

        const symbole = convertirSymboleBinance(actifNormalise);
        const intervalleBinance = convertirIntervalleBinance(intervalle);

        let bougies = [];

        try {
            bougies = await recupererBougiesBinance(symbole, intervalleBinance, 200);
        } catch (erreurBinance) {
            return res.json(genererDonneesMarcheSimulees({
                actif,
                intervalle,
                indicateur,
                categorieAnalyse,
                raison: "Binance inaccessible ou symbole refusé : " + erreurBinance.message
            }));
        }

        if (!bougies || bougies.length < 60) {
            return res.json(genererDonneesMarcheSimulees({
                actif,
                intervalle,
                indicateur,
                categorieAnalyse,
                raison: "Historique Binance insuffisant."
            }));
        }

        const analyse = analyserBougiesMarche({
            actif,
            symbole,
            intervalle,
            intervalleBinance,
            indicateur,
            categorieAnalyse,
            bougies
        });

        res.json(analyse);
    } catch (erreur) {
        return reponseErreur(res, 500, "Erreur pendant la récupération des données de marché.", erreur);
    }
});

/* =========================
   ANALYSE DE PATTERN
========================= */

app.post("/api/analyse-pattern", async (req, res) => {
    try {
        const {
            actif = "BINANCE:BTCUSDT",
            intervalle = "1h",
            longueurPattern = 40,
            horizon = 12,
            seuil = 1.5
        } = req.body || {};

        const actifNormalise = String(actif).trim().toUpperCase();

        if (!actifNormalise.startsWith("BINANCE:")) {
            return res.json({
                ok: false,
                statut: "non_disponible",
                message: "L'analyse de pattern automatique utilise Binance. Choisir un actif BINANCE, par exemple BINANCE:BTCUSDT.",
                actif,
                date: new Date().toISOString()
            });
        }

        const symbole = convertirSymboleBinance(actifNormalise);
        const intervalleBinance = convertirIntervalleBinance(intervalle);
        const limite = Math.min(1000, Math.max(300, Number(longueurPattern) * 12));

        const bougies = await recupererBougiesBinance(symbole, intervalleBinance, limite);

        if (!bougies || bougies.length < Number(longueurPattern) + Number(horizon) + 100) {
            return res.json({
                ok: false,
                statut: "historique_insuffisant",
                message: "Historique insuffisant pour cette analyse.",
                actif,
                symbole,
                intervalle: intervalleBinance
            });
        }

        const analyse = analyserSimilarite({
            actif,
            symbole,
            intervalle: intervalleBinance,
            bougies,
            longueurPattern: Number(longueurPattern),
            horizon: Number(horizon),
            seuil: Number(seuil)
        });

        res.json(analyse);
    } catch (erreur) {
        return reponseErreur(res, 500, "Erreur pendant l'analyse du pattern.", erreur);
    }
});

/* =========================
   FONCTIONS MARCHÉ
========================= */

function analyserBougiesMarche({ actif, symbole, intervalle, intervalleBinance, indicateur, categorieAnalyse, bougies }) {
    const closes = bougies.map(b => b.close);
    const volumes = bougies.map(b => b.volume);

    const rsiSeries = calculerRSISeries(closes, 14);
    const ema20Series = calculerEMASeries(closes, 20);
    const ema50Series = calculerEMASeries(closes, 50);
    const macdSeries = calculerMACDSeries(closes);

    const dernierIndex = bougies.length - 1;
    const derniereBougie = bougies[dernierIndex];

    const prixActuel = derniereBougie.close;
    const rsi = rsiSeries[dernierIndex] || 50;
    const ema20 = ema20Series[dernierIndex] || prixActuel;
    const ema50 = ema50Series[dernierIndex] || prixActuel;
    const macd = macdSeries.histogramme[dernierIndex] || 0;

    const recentes = bougies.slice(-30);
    const support = Math.min(...recentes.map(b => b.low));
    const resistance = Math.max(...recentes.map(b => b.high));

    const volumeMoyen = moyenne(volumes.slice(-30));
    const volumeActuel = derniereBougie.volume;

    let volume = "neutre";

    if (volumeActuel > volumeMoyen * 1.25) {
        volume = "fort";
    } else if (volumeActuel > volumeMoyen) {
        volume = "hausse";
    } else if (volumeActuel < volumeMoyen * 0.75) {
        volume = "faible";
    }

    let tendance = "range";

    if (prixActuel > ema20 && ema20 > ema50) {
        tendance = "haussiere";
    } else if (prixActuel < ema20 && ema20 < ema50) {
        tendance = "baissiere";
    }

    return {
        ok: true,
        statut: "ok",
        actif,
        symbole,
        intervalle,
        intervalleBinance,
        indicateur,
        categorieAnalyse,
        prixActuel: arrondir(prixActuel),
        support: arrondir(support),
        resistance: arrondir(resistance),
        rsi: arrondir(rsi),
        ema20: arrondir(ema20),
        ema50: arrondir(ema50),
        macd: arrondir(macd),
        volume,
        tendance,
        derniereBougie: {
            open: arrondir(derniereBougie.open),
            high: arrondir(derniereBougie.high),
            low: arrondir(derniereBougie.low),
            close: arrondir(derniereBougie.close),
            volume: arrondir(derniereBougie.volume),
            temps: derniereBougie.temps
        },
        source: "binance",
        nombreBougies: bougies.length,
        dateMiseAJour: new Date().toISOString()
    };
}

function genererDonneesMarcheSimulees({ actif, intervalle, indicateur, categorieAnalyse, raison }) {
    const base = obtenirPrixSimulation(actif);
    const variation = Math.sin(Date.now() / 1000000) * 0.015;
    const prixActuel = base * (1 + variation);
    const support = prixActuel * 0.97;
    const resistance = prixActuel * 1.03;
    const rsi = 50 + Math.round(variation * 1000);

    let tendance = "range";

    if (rsi > 55) {
        tendance = "haussiere";
    } else if (rsi < 45) {
        tendance = "baissiere";
    }

    return {
        ok: true,
        statut: "simulation",
        actif,
        symbole: actif,
        intervalle,
        intervalleBinance: null,
        indicateur,
        categorieAnalyse,
        prixActuel: arrondir(prixActuel),
        support: arrondir(support),
        resistance: arrondir(resistance),
        rsi: arrondir(rsi),
        ema20: arrondir(prixActuel * 0.995),
        ema50: arrondir(prixActuel * 0.985),
        macd: arrondir((prixActuel * 0.995) - (prixActuel * 0.985)),
        volume: "neutre",
        tendance,
        derniereBougie: {
            open: arrondir(prixActuel * 0.99),
            high: arrondir(prixActuel * 1.015),
            low: arrondir(prixActuel * 0.985),
            close: arrondir(prixActuel),
            volume: 0,
            temps: Date.now()
        },
        source: "simulation_locale",
        avertissement: raison,
        nombreBougies: 0,
        dateMiseAJour: new Date().toISOString()
    };
}

function obtenirPrixSimulation(actif) {
    const symbole = String(actif).toUpperCase();

    if (symbole.includes("BTC")) return 65000;
    if (symbole.includes("ETH")) return 3200;
    if (symbole.includes("XAU") || symbole.includes("GOLD")) return 2350;
    if (symbole.includes("AAPL")) return 190;
    if (symbole.includes("TSLA")) return 180;
    if (symbole.includes("NVDA")) return 900;
    if (symbole.includes("MSFT")) return 420;
    if (symbole.includes("AMZN")) return 185;
    if (symbole.includes("GOOGL")) return 170;
    if (symbole.includes("SPX")) return 5200;
    if (symbole.includes("DXY")) return 105;

    return 100;
}

function convertirSymboleBinance(actif) {
    return String(actif).replace("BINANCE:", "").trim().toUpperCase();
}

function convertirIntervalleBinance(intervalle) {
    const valeur = String(intervalle).trim();

    const correspondances = {
        "1": "1m",
        "3": "3m",
        "5": "5m",
        "15": "15m",
        "30": "30m",
        "45": "45m",
        "60": "1h",
        "120": "2h",
        "240": "4h",
        "D": "1d",
        "W": "1w",
        "M": "1M",
        "1m": "1m",
        "3m": "3m",
        "5m": "5m",
        "15m": "15m",
        "30m": "30m",
        "45m": "45m",
        "1h": "1h",
        "2h": "2h",
        "4h": "4h",
        "1d": "1d",
        "1w": "1w",
        "1M": "1M"
    };

    return correspondances[valeur] || "1h";
}

async function recupererBougiesBinance(symbole, intervalle, limite) {
    const url =
        "https://api.binance.com/api/v3/klines?symbol=" +
        encodeURIComponent(symbole) +
        "&interval=" +
        encodeURIComponent(intervalle) +
        "&limit=" +
        encodeURIComponent(limite);

    const reponse = await fetch(url);

    if (!reponse.ok) {
        const texte = await reponse.text();
        throw new Error("Erreur Binance " + reponse.status + " : " + texte);
    }

    const data = await reponse.json();

    if (!Array.isArray(data)) {
        throw new Error("Réponse Binance invalide.");
    }

    return data.map(k => ({
        temps: k[0],
        open: Number(k[1]),
        high: Number(k[2]),
        low: Number(k[3]),
        close: Number(k[4]),
        volume: Number(k[5])
    }));
}

/* =========================
   ANALYSE DE SIMILARITÉ
========================= */

function analyserSimilarite({ actif, symbole, intervalle, bougies, longueurPattern, horizon, seuil }) {
    const closes = bougies.map(b => b.close);
    const rsiSeries = calculerRSISeries(closes, 14);
    const ema20Series = calculerEMASeries(closes, 20);
    const ema50Series = calculerEMASeries(closes, 50);
    const macdSeries = calculerMACDSeries(closes);

    const dernierIndex = bougies.length - 1;
    const debutActuel = dernierIndex - longueurPattern + 1;

    const patternActuel = extraireFeatures(
        bougies,
        rsiSeries,
        ema20Series,
        ema50Series,
        macdSeries,
        debutActuel,
        longueurPattern
    );

    if (!patternActuel) {
        return {
            ok: false,
            statut: "erreur",
            message: "Impossible d'extraire le pattern actuel."
        };
    }

    const comparaisons = [];
    const dernierDebutHistorique = bougies.length - longueurPattern - horizon - 10;

    for (let i = 60; i < dernierDebutHistorique; i++) {
        const patternHistorique = extraireFeatures(
            bougies,
            rsiSeries,
            ema20Series,
            ema50Series,
            macdSeries,
            i,
            longueurPattern
        );

        if (!patternHistorique) continue;

        const distance = distanceEuclidienne(patternActuel.vecteur, patternHistorique.vecteur);
        const closeFin = bougies[i + longueurPattern - 1].close;
        const closeFutur = bougies[i + longueurPattern - 1 + horizon].close;
        const variationFuture = ((closeFutur - closeFin) / closeFin) * 100;

        comparaisons.push({ distance, variationFuture });
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
        variationMoyenne,
        scoreTechnique
    });

    return {
        ok: true,
        statut: "ok",
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
        resume: construireResume(
            decision.signal,
            pctHausse,
            pctBaisse,
            pctNeutre,
            variationMoyenne,
            indicateurs
        ),
        recommandation: construireRecommandation(decision.signal, indicateurs),
        risque: construireRisque(decision.signal, bougies),
        dateMiseAJour: new Date().toISOString()
    };
}

function extraireFeatures(bougies, rsiSeries, ema20Series, ema50Series, macdSeries, debut, longueur) {
    const fin = debut + longueur;

    if (debut < 0 || fin > bougies.length) return null;

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

    const rsi = rsiSeries.slice(debut, fin).filter(x => Number.isFinite(x));
    const macd = macdSeries.histogramme.slice(debut, fin).filter(x => Number.isFinite(x));
    const emaEcart = [];

    for (let i = debut; i < fin; i++) {
        if (ema20Series[i] && ema50Series[i]) {
            emaEcart.push((ema20Series[i] - ema50Series[i]) / bougies[i].close);
        }
    }

    const vecteur = [
        ...normaliser(rendements),
        ...normaliser(meches),
        ...normaliser(volumes),
        moyenne(rsi) / 100,
        moyenne(macd),
        moyenne(emaEcart)
    ].filter(x => Number.isFinite(x));

    return { vecteur };
}

/* =========================
   INDICATEURS TECHNIQUES
========================= */

function calculerRSISeries(valeurs, periode = 14) {
    const rsi = Array(valeurs.length).fill(null);

    if (!Array.isArray(valeurs) || valeurs.length <= periode) return rsi;

    let gains = 0;
    let pertes = 0;

    for (let i = 1; i <= periode; i++) {
        const diff = valeurs[i] - valeurs[i - 1];

        if (diff >= 0) {
            gains += diff;
        } else {
            pertes -= diff;
        }
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

    if (!Array.isArray(valeurs) || valeurs.length < periode) return ema;

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

    return {
        macd,
        signal,
        histogramme
    };
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
        tendance = "haussiere";
    } else if (prixActuel < ema20 && ema20 < ema50) {
        tendance = "baissiere";
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

    if (indicateurs.tendance === "haussiere") score += 18;
    if (indicateurs.tendance === "baissiere") score -= 18;

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

/* =========================
   TEXTES DE SORTIE
========================= */

function construireResume(signal, pctHausse, pctBaisse, pctNeutre, variationMoyenne, indicateurs) {
    return "Le segment actuel ressemble à des configurations historiques où la hausse a représenté " +
        pctHausse + " %, la baisse " + pctBaisse + " % et le scénario neutre " + pctNeutre +
        " %. La variation moyenne observée ensuite est de " + arrondir(variationMoyenne) +
        " %. La tendance actuelle est " + indicateurs.tendance +
        ", avec un RSI de " + arrondir(indicateurs.rsi) +
        ". Signal retenu : " + signal + ".";
}

function construireRecommandation(signal, indicateurs) {
    if (signal === "ACHETER") {
        return "Entrée possible seulement si la bougie en cours confirme la direction. Éviter d'acheter après une grande mèche haussière sans volume.";
    }

    if (signal === "VENDRE") {
        return "Vente possible seulement si le prix reste sous la moyenne courte ou casse un support récent. Éviter de vendre sur un excès déjà trop avancé.";
    }

    return "Attendre une confirmation. Le rapport entre les cas historiques haussiers et baissiers n'est pas assez net.";
}

function construireRisque(signal, bougies) {
    const recentes = bougies.slice(-20);
    const dernierPrix = bougies[bougies.length - 1].close;
    const plusBas = Math.min(...recentes.map(b => b.low));
    const plusHaut = Math.max(...recentes.map(b => b.high));

    if (signal === "ACHETER") {
        return {
            stopLoss: "sous le dernier creux : " + arrondir(plusBas),
            takeProfit: "vers la zone haute récente : " + arrondir(plusHaut),
            prudence: "ne pas entrer si le prix est déjà trop éloigné de l'EMA 20"
        };
    }

    if (signal === "VENDRE") {
        return {
            stopLoss: "au-dessus du dernier sommet : " + arrondir(plusHaut),
            takeProfit: "vers la zone basse récente : " + arrondir(plusBas),
            prudence: "ne pas vendre si le prix est déjà trop éloigné de l'EMA 20"
        };
    }

    return {
        stopLoss: "non défini",
        takeProfit: "non défini",
        prudence: "attendre une zone plus claire autour du prix actuel : " + arrondir(dernierPrix)
    };
}

/* =========================
   OUTILS MATHÉMATIQUES
========================= */

function moyenne(valeurs) {
    const valides = valeurs.filter(v => Number.isFinite(v));

    if (valides.length === 0) return 0;

    return valides.reduce((s, v) => s + v, 0) / valides.length;
}

function ecartType(valeurs) {
    const valides = valeurs.filter(v => Number.isFinite(v));

    if (valides.length === 0) return 0;

    const m = moyenne(valides);
    const variance = moyenne(valides.map(v => Math.pow(v - m, 2)));

    return Math.sqrt(variance);
}

function normaliser(valeurs) {
    const valides = valeurs.filter(v => Number.isFinite(v));

    if (valides.length === 0) return [];

    const m = moyenne(valides);
    const e = ecartType(valides) || 1;

    return valeurs.map(v => Number.isFinite(v) ? (v - m) / e : 0);
}

function distanceEuclidienne(a, b) {
    const n = Math.min(a.length, b.length);

    if (n === 0) return Number.POSITIVE_INFINITY;

    let somme = 0;

    for (let i = 0; i < n; i++) {
        somme += Math.pow(a[i] - b[i], 2);
    }

    return Math.sqrt(somme / n);
}

function pourcentage(partie, total) {
    if (!total) return 0;

    return Math.round((partie / total) * 100);
}

function arrondir(nombre, decimales = 2) {
    if (!Number.isFinite(Number(nombre))) return null;

    const facteur = Math.pow(10, decimales);

    return Math.round(Number(nombre) * facteur) / facteur;
}

/* =========================
   ROUTE INTROUVABLE
========================= */

app.use((req, res) => {
    res.status(404).json({
        ok: false,
        statut: "erreur",
        message: "Route introuvable",
        routeDemandee: req.path
    });
});

/* =========================
   LANCEMENT SERVEUR
========================= */

app.listen(PORT, "0.0.0.0", () => {
    console.log("Serveur Trading API actif sur le port " + PORT);
});