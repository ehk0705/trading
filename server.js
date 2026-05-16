node_modules/ 
.env 
*.exe 
*.zip 
*.msi 
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Capture Configuration TradingView IA</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <script src="https://s3.tradingview.com/tv.js"></script>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #07111f;
            color: white;
        }

        header {
            background: #0f172a;
            border-bottom: 2px solid #00d9ff;
            padding: 14px 20px;
        }

        .top-bar {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px;
        }

        .logo {
            font-size: 22px;
            font-weight: bold;
            color: #00d9ff;
            margin-right: 20px;
        }

        .logo span {
            color: #facc15;
        }

        .control-group {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        label {
            font-weight: bold;
            color: #00d9ff;
            font-size: 13px;
        }

        select,
        input,
        textarea {
            background: #020617;
            color: white;
            border: 1px solid #334155;
            border-radius: 6px;
            padding: 7px;
            font-size: 13px;
            max-width: 100%;
        }

        button {
            border: none;
            border-radius: 7px;
            padding: 8px 10px;
            font-weight: bold;
            cursor: pointer;
            font-size: 12px;
            white-space: nowrap;
        }

        button:hover {
            opacity: 0.85;
        }

        .btn-tv {
            background: #2962ff;
            color: white;
        }

        .btn-capture {
            background: #00d9ff;
            color: #00111a;
        }

        .btn-save {
            background: #22c55e;
            color: #03130a;
        }

        .btn-copy {
            background: #facc15;
            color: #1a1300;
        }

        .btn-export {
            background: #a855f7;
            color: white;
        }

        .btn-import {
            background: #14b8a6;
            color: #001a16;
        }

        .btn-api {
            background: #fb923c;
            color: #1a0b00;
        }

        .btn-ai {
            background: #38bdf8;
            color: #00111a;
        }

        .btn-decision {
            background: #eab308;
            color: #1a1300;
        }

        .btn-clear {
            background: #ef4444;
            color: white;
        }

        .btn-dark {
            background: #334155;
            color: white;
        }

        main {
            display: grid;
            grid-template-columns: minmax(0, 2.3fr) minmax(320px, 0.7fr);
            gap: 14px;
            padding: 14px;
        }

        .chart-panel,
        .side-panel {
            background: #111827;
            border: 1px solid #263244;
            border-radius: 12px;
            padding: 14px;
        }

        .chart-panel {
            min-width: 0;
        }

        .side-panel {
            min-width: 320px;
            overflow: hidden;
        }

        .chart-title-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            margin-bottom: 10px;
            width: 100%;
        }

        .chart-title-row h2 {
            margin: 0;
            padding-bottom: 0;
            border-bottom: none;
            line-height: 1.1;
            flex: 0 0 auto;
        }

        .chart-title-icons {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 8px;
            flex-shrink: 0;
            margin-left: auto;
        }

        .chart-title-icons img {
            width: 36px;
            height: 36px;
            object-fit: cover;
            border-radius: 6px;
            border: 1px solid #334155;
            background: #020617;
            padding: 1px;
        }

        #tradingview_chart {
            height: 700px;
            width: 100%;
            border-radius: 10px;
            overflow: hidden;
            background: #020617;
        }

        h2 {
            color: #00d9ff;
            font-size: 18px;
            margin-top: 0;
            border-bottom: 1px solid #263244;
            padding-bottom: 8px;
        }

        h3 {
            color: #facc15;
            font-size: 15px;
            margin-bottom: 8px;
        }

        .form-block {
            margin-bottom: 12px;
            min-width: 0;
        }

        .form-block label {
            display: block;
            margin-bottom: 5px;
        }

        .form-block input,
        .form-block select,
        .form-block textarea {
            width: 100%;
        }

        pre {
            background: #020617;
            color: #a7f3d0;
            padding: 12px;
            border-radius: 10px;
            border: 1px solid #263244;
            min-height: 260px;
            max-height: 420px;
            overflow: auto;
            font-size: 12px;
            white-space: pre-wrap;
            word-break: break-word;
        }

        .button-zone {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 12px 0;
        }

        .button-zone button {
            flex: 1 1 120px;
        }

        .status {
            background: #020617;
            border: 1px solid #263244;
            border-radius: 8px;
            padding: 10px;
            color: #facc15;
            font-size: 13px;
            margin-top: 10px;
        }

        .server-status {
            padding: 12px;
            border-radius: 8px;
            font-weight: bold;
            margin-bottom: 12px;
            text-align: center;
            font-size: 13px;
        }

        .server-status.neutral {
            background: #334155;
            color: #ffffff;
        }

        .server-status.ok {
            background: #064e3b;
            color: #86efac;
        }

        .server-status.error {
            background: #7f1d1d;
            color: #fecaca;
        }

        .server-status.warning {
            background: #713f12;
            color: #fde68a;
        }

        .server-info {
            background: #020617;
            border: 1px solid #334155;
            border-radius: 8px;
            padding: 10px;
            font-family: Consolas, monospace;
            font-size: 12px;
            color: #d1d5db;
            white-space: pre-wrap;
            word-break: break-word;
            min-height: 90px;
            max-height: 220px;
            overflow: auto;
        }

        .analysis-category-box {
            background: #0b1220;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 12px;
            margin: 14px 0;
        }

        .analysis-category-box h2 {
            margin-top: 0;
            color: #38bdf8;
        }

        .analysis-category-box label {
            display: block;
            margin-bottom: 6px;
        }

        .analysis-category-box select {
            width: 100%;
        }

        .category-description {
            margin-top: 10px;
            padding: 10px;
            background: #020617;
            border: 1px solid #334155;
            border-radius: 8px;
            color: #d1d5db;
            font-size: 12px;
            line-height: 1.5;
        }

        .ai-section {
            margin-top: 14px;
            background: #0b1220;
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 14px;
        }

        .ai-section h3 {
            margin-top: 0;
            color: #38bdf8;
        }

        .ai-result-box {
            background: #020617;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 14px;
            min-height: 220px;
            max-height: 520px;
            overflow: auto;
            white-space: pre-wrap;
            word-break: break-word;
            font-family: Consolas, monospace;
            font-size: 13px;
            color: #d1d5db;
        }

        .note {
            color: #cbd5e1;
            font-size: 12px;
            line-height: 1.5;
            margin-top: 8px;
        }

        footer {
            text-align: center;
            color: #94a3b8;
            font-size: 12px;
            padding: 16px;
            border-top: 1px solid #263244;
        }

        @media (max-width: 1200px) {
            main {
                grid-template-columns: minmax(0, 2fr) minmax(320px, 0.8fr);
            }

            #tradingview_chart {
                height: 650px;
            }
        }

        @media (max-width: 1000px) {
            main {
                grid-template-columns: 1fr;
            }

            .side-panel {
                min-width: 0;
            }

            #tradingview_chart {
                height: 520px;
            }
        }

        @media (max-width: 700px) {
            header {
                padding: 12px;
            }

            .top-bar {
                flex-direction: column;
                align-items: stretch;
            }

            .control-group {
                flex-direction: column;
                align-items: stretch;
            }

            button {
                width: 100%;
            }

            .button-zone button {
                flex: 1 1 100%;
            }

            .logo {
                text-align: center;
                margin-right: 0;
            }

            .chart-title-row {
                justify-content: space-between;
                flex-wrap: nowrap;
            }

            .chart-title-icons img {
                width: 30px;
                height: 30px;
            }

            #tradingview_chart {
                height: 460px;
            }
        }
    </style>
</head>

<body>

<header>
    <div class="top-bar">
        <div class="logo">TRADING STATION <span>IA</span></div>

        <div class="control-group">
            <label for="asset-selector">ACTIF :</label>
            <select id="asset-selector" onchange="actualiserGraphique()" title="Choisir l’actif à afficher dans le graphique.">
                <option value="BINANCE:BTCUSDT">Bitcoin / USDT</option>
                <option value="COINBASE:BTCUSD">Bitcoin / USD</option>
                <option value="BINANCE:ETHUSDT">Ethereum / USDT</option>
                <option value="OANDA:XAUUSD">Or / Dollar - XAUUSD</option>
                <option value="NASDAQ:AAPL">Apple - AAPL</option>
                <option value="NASDAQ:TSLA">Tesla - TSLA</option>
                <option value="NASDAQ:NVDA">Nvidia - NVDA</option>
                <option value="NASDAQ:MSFT">Microsoft - MSFT</option>
                <option value="NASDAQ:AMZN">Amazon - AMZN</option>
                <option value="NASDAQ:GOOGL">Google - GOOGL</option>
                <option value="SP:SPX">S&P 500</option>
                <option value="TVC:DXY">Dollar Index - DXY</option>
            </select>
        </div>

        <div class="control-group">
            <label for="interval-selector">INTERVALLE :</label>
            <select id="interval-selector" onchange="actualiserGraphique()" title="Choisir l’unité de temps du graphique.">
                <option value="1">1 minute</option>
                <option value="5">5 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 heure</option>
                <option value="240">4 heures</option>
                <option value="D">1 jour</option>
                <option value="W">1 semaine</option>
                <option value="M">1 mois</option>
            </select>
        </div>

        <div class="control-group">
            <label for="indicator-selector">INDICATEUR :</label>
            <select id="indicator-selector" onchange="actualiserGraphique()" title="Choisir l’indicateur principal utilisé pour l’analyse.">
                <option value="RSI">RSI</option>
                <option value="MACD">MACD</option>
                <option value="EMA">EMA</option>
                <option value="SUPERTREND">Supertrend</option>
                <option value="BOLLINGER">Bandes de Bollinger</option>
                <option value="ATR">ATR</option>
                <option value="VOLUME">Volume</option>
                <option value="LIQUIDITY_ZONE">Zones de liquidité</option>
            </select>
        </div>

        <button class="btn-tv" onclick="ouvrirTradingView()" title="Ouvre TradingView avec l’actif et l’intervalle sélectionnés.">Ouvrir dans TradingView</button>
        <button class="btn-capture" onclick="capturerConfigurationTradingView()" title="Capture la configuration actuelle, y compris la catégorie d’analyse choisie.">Capturer configuration</button>
        <button class="btn-save" onclick="sauvegarderConfiguration()" title="Sauvegarde la configuration capturée dans le navigateur.">Sauvegarder</button>
        <button class="btn-save" onclick="rechargerConfigurationTradingView()" title="Recharge la dernière configuration sauvegardée localement.">Recharger</button>
        <button class="btn-copy" onclick="copierConfiguration()" title="Copie la configuration actuelle au format JSON.">Copier JSON</button>
        <button class="btn-export" onclick="exporterJSON()" title="Exporte la configuration dans un fichier JSON.">Exporter JSON</button>
        <button class="btn-import" onclick="ouvrirImportJSON()" title="Importe une configuration JSON déjà sauvegardée.">Importer JSON</button>
        <button class="btn-api" onclick="envoyerVersAPI()" title="Envoie la configuration brute au serveur Node.js sur Render.">Envoyer IA</button>
        <button class="btn-ai" onclick="analyserSnapshotIA()" title="Analyse la configuration ou le snapshot chargé selon la catégorie choisie.">Analyse IA</button>
        <button class="btn-decision" onclick="ouvrirPageDecision()" title="Ouvre une page dédiée aux décisions IA : acheter, vendre ou attendre.">Page décisions</button>
        <button class="btn-clear" onclick="effacerConfiguration()" title="Efface la configuration affichée et les résultats de l’analyse IA.">Effacer</button>
    </div>
</header>

<main>

    <section class="chart-panel">
        <div class="chart-title-row">
            <h2>Graphique TradingView intégré</h2>

            <div class="chart-title-icons">
                <img src="img/bitcoin.jfif" alt="Symbole du Bitcoin">
                <img src="img/lingot-or.jfif" alt="Lingot d'or">
            </div>
        </div>

        <div id="tradingview_chart"></div>

        <input type="file" id="fichier-import-json" accept="application/json,.json" style="display:none;" onchange="importerJSONDepuisFichier(event)">

        <section class="ai-section">
            <h3>Résultats de l’analyse IA</h3>
            <div id="resultat-analyse-ia" class="ai-result-box">Aucune analyse IA lancée.</div>
        </section>

        <div class="note">
            Cette page capture les paramètres contrôlés par ton interface : actif, intervalle,
            indicateur, stratégie, risque, catégorie d’analyse et lien de snapshot.
        </div>
    </section>

    <aside class="side-panel">

        <h2>Serveur Node.js Render</h2>

        <div id="etatServeur" class="server-status neutral">
            Serveur non testé
        </div>

        <div class="form-block">
            <label for="api-url">Adresse API Render</label>
            <input type="text" id="api-url" value="https://tading.onrender.com/api/analyse"
                   title="Adresse de l’API Node.js déployée sur Render.">
        </div>

        <div class="button-zone">
            <button class="btn-copy" onclick="testerServeur()" title="Teste la route /api/test du serveur Render.">Tester serveur</button>
            <button class="btn-dark" onclick="testerRouteAnalyse()" title="Teste directement la route /api/analyse.">Tester /api/analyse</button>
            <button class="btn-tv" onclick="ouvrirServeurRender()" title="Ouvre l’adresse principale du serveur Render.">Ouvrir serveur</button>
        </div>

        <div id="infosServeur" class="server-info">
Aucun test effectué.
        </div>

        <section class="analysis-category-box">
            <h2>Catégorie d’analyse</h2>

            <label for="categorie-analyse-btc">Choisir une catégorie</label>

            <select id="categorie-analyse-btc" title="Choisir le type d’analyse IA à appliquer au Bitcoin ou au marché.">
                <option value="macroeconomie">Macroéconomie</option>
                <option value="monnaie_bitcoin">Monnaie Bitcoin</option>
                <option value="donnees_on_chain">Données on-chain</option>
                <option value="minage">Minage</option>
                <option value="analyse_technique" selected>Analyse technique</option>
                <option value="derives">Dérivés</option>
                <option value="liquidite_marche">Liquidité de marché</option>
                <option value="institutionnel">Institutionnel</option>
                <option value="sentiment">Sentiment</option>
                <option value="reglementation_risques">Réglementation et risques</option>
            </select>

            <div id="description-categorie-analyse" class="category-description">
                Analyse technique : graphiques, tendances, supports, résistances, RSI et moyennes mobiles.
            </div>
        </section>

        <h3>Configuration capturée</h3>

        <pre id="resultat-configuration">Aucune configuration capturée.</pre>

        <div id="status" class="status">
            En attente de capture.
        </div>
    </aside>

</main>

<footer>
    Page de capture de configuration TradingView pour analyse IA.
</footer>

<script>
    let widgetTradingView = null;
    let configurationActuelle = null;

    function valeurElement(id, valeurDefaut = "") {
        const element = document.getElementById(id);
        return element ? element.value : valeurDefaut;
    }

    function libelleElement(id, valeurDefaut = "") {
        const element = document.getElementById(id);

        if (!element || element.selectedIndex < 0) {
            return valeurDefaut;
        }

        return element.options[element.selectedIndex].text;
    }

    function nombreElement(id, valeurDefaut = 0) {
        const element = document.getElementById(id);

        if (!element) {
            return valeurDefaut;
        }

        return Number(element.value || valeurDefaut);
    }

    function getApiAnalyseUrl() {
        return document.getElementById("api-url").value.trim();
    }

    function getApiBaseUrl() {
        const apiAnalyseUrl = getApiAnalyseUrl();
        return apiAnalyseUrl.replace(/\/api\/analyse\/?$/, "");
    }

    function getApiTestUrl() {
        return getApiBaseUrl() + "/api/test";
    }

    function afficherEtatServeur(type, message) {
        const etat = document.getElementById("etatServeur");
        etat.className = "server-status " + type;
        etat.textContent = message;
    }

    function afficherInfosServeur(texte) {
        document.getElementById("infosServeur").textContent = texte;
    }

    function afficherAnalyseIA(texte) {
        document.getElementById("resultat-analyse-ia").textContent = texte;
    }

    function getCategorieAnalyseBTC() {
        return valeurElement("categorie-analyse-btc", "analyse_technique");
    }

    function getLibelleCategorieAnalyseBTC() {
        return libelleElement("categorie-analyse-btc", "Analyse technique");
    }

    function getDescriptionCategorieAnalyseBTC() {
        const descriptions = {
            macroeconomie: "Macroéconomie : taux, inflation, liquidité mondiale, dollar, obligations et bilan de la Fed.",
            monnaie_bitcoin: "Monnaie Bitcoin : offre maximale, émission, halving et inflation de BTC.",
            donnees_on_chain: "Données on-chain : adresses, transactions, MVRV, realized price et flux des plateformes.",
            minage: "Minage : taux de hachage, difficulté, revenus et ventes des mineurs.",
            analyse_technique: "Analyse technique : graphiques, tendances, supports, résistances, RSI et moyennes mobiles.",
            derives: "Dérivés : contrats à terme, options, funding rates, open interest et liquidations.",
            liquidite_marche: "Liquidité de marché : volumes, carnets d’ordres, spreads et profondeur de marché.",
            institutionnel: "Institutionnel : FNB Bitcoin, achats d’entreprises, fonds, banques et adoption officielle.",
            sentiment: "Sentiment : réseaux sociaux, Google Trends, médias, peur et avidité.",
            reglementation_risques: "Réglementation et risques : lois, fiscalité, SEC, plateformes, garde et géopolitique."
        };

        const categorie = getCategorieAnalyseBTC();
        return descriptions[categorie] || descriptions.analyse_technique;
    }

    function actualiserDescriptionCategorie() {
        const zone = document.getElementById("description-categorie-analyse");

        if (zone) {
            zone.textContent = getDescriptionCategorieAnalyseBTC();
        }
    }

    function obtenirStyleTradingView() {
        const typeBougie = valeurElement("type-bougie", "bougies_japonaises");

        switch (typeBougie) {
            case "barres":
                return "0";
            case "bougies_japonaises":
                return "1";
            case "ligne":
                return "3";
            case "heikin_ashi":
                return "8";
            case "renko":
                return "4";
            case "kagi":
                return "5";
            case "point_figure":
                return "6";
            default:
                return "1";
        }
    }

    function creerWidgetTradingView() {
        const symbole = document.getElementById("asset-selector").value;
        const intervalle = document.getElementById("interval-selector").value;

        document.getElementById("tradingview_chart").innerHTML = "";

        widgetTradingView = new TradingView.widget({
            autosize: true,
            symbol: symbole,
            interval: intervalle,
            timezone: "America/Toronto",
            theme: "dark",
            style: obtenirStyleTradingView(),
            locale: "fr",
            toolbar_bg: "#0f172a",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: "tradingview_chart",
            hide_side_toolbar: false,
            details: true,
            hotlist: true,
            calendar: false,
            studies: choisirEtudeTradingView()
        });
    }

    function choisirEtudeTradingView() {
        const indicateur = document.getElementById("indicator-selector").value;

        if (indicateur === "RSI") {
            return ["RSI@tv-basicstudies"];
        }

        if (indicateur === "MACD") {
            return ["MACD@tv-basicstudies"];
        }

        if (indicateur === "EMA") {
            return ["MASimple@tv-basicstudies"];
        }

        if (indicateur === "BOLLINGER") {
            return ["BB@tv-basicstudies"];
        }

        if (indicateur === "VOLUME") {
            return ["Volume@tv-basicstudies"];
        }

        return [];
    }

    function actualiserGraphique() {
        creerWidgetTradingView();
        afficherStatus("Graphique actualisé.");
    }

    function ouvrirTradingView() {
        const symbole = document.getElementById("asset-selector").value;
        const intervalle = document.getElementById("interval-selector").value;

        const url = "https://www.tradingview.com/chart/?symbol="
            + encodeURIComponent(symbole)
            + "&interval="
            + encodeURIComponent(intervalle);

        window.open(url, "_blank");
    }

    function ouvrirServeurRender() {
        const baseUrl = getApiBaseUrl();

        if (!baseUrl) {
            alert("Adresse API manquante.");
            return;
        }

        window.open(baseUrl, "_blank");
    }

    async function testerServeur() {
        const urlTest = getApiTestUrl();
        const debut = performance.now();

        afficherEtatServeur("warning", "Test du serveur en cours...");
        afficherInfosServeur("Test de la route :\n" + urlTest);

        try {
            const reponse = await fetch(urlTest, {
                method: "GET",
                cache: "no-store"
            });

            const duree = Math.round(performance.now() - debut);
            const texte = await reponse.text();

            let contenu;

            try {
                contenu = JSON.stringify(JSON.parse(texte), null, 2);
            } catch (erreurJson) {
                contenu = texte;
            }

            if (!reponse.ok) {
                throw new Error("Réponse HTTP " + reponse.status + "\n\n" + contenu);
            }

            afficherEtatServeur("ok", "Serveur connecté");

            afficherInfosServeur(
                "TEST RÉUSSI\n" +
                "-----------\n" +
                "Route : " + urlTest + "\n" +
                "Statut HTTP : " + reponse.status + "\n" +
                "Temps de réponse : " + duree + " ms\n\n" +
                "Réponse serveur :\n" +
                contenu
            );

        } catch (erreur) {
            afficherEtatServeur("error", "Serveur inaccessible");

            afficherInfosServeur(
                "TEST ÉCHOUÉ\n" +
                "-----------\n" +
                "Route testée : " + urlTest + "\n\n" +
                "Causes possibles :\n" +
                "- Render est en veille ;\n" +
                "- le service Render n’est pas encore réveillé ;\n" +
                "- la route /api/test n’existe pas dans server.js ;\n" +
                "- le serveur Node.js a planté ;\n" +
                "- l’adresse API est incorrecte ;\n" +
                "- CORS bloque la requête.\n\n" +
                "Détail technique :\n" +
                erreur.message
            );
        }
    }

    async function testerRouteAnalyse() {
        const apiUrl = getApiAnalyseUrl();
        const debut = performance.now();

        afficherEtatServeur("warning", "Test de /api/analyse en cours...");
        afficherInfosServeur("Test de la route :\n" + apiUrl);

        try {
            const reponse = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-store",
                body: JSON.stringify({
                    test: true,
                    message: "Test depuis analyse-configuration.html",
                    dateTest: new Date().toISOString()
                })
            });

            const duree = Math.round(performance.now() - debut);
            const texte = await reponse.text();

            let contenu;

            try {
                contenu = JSON.stringify(JSON.parse(texte), null, 2);
            } catch (erreurJson) {
                contenu = texte;
            }

            if (!reponse.ok) {
                throw new Error("Réponse HTTP " + reponse.status + "\n\n" + contenu);
            }

            afficherEtatServeur("ok", "Route /api/analyse connectée");

            afficherInfosServeur(
                "TEST /api/analyse RÉUSSI\n" +
                "------------------------\n" +
                "Route : " + apiUrl + "\n" +
                "Statut HTTP : " + reponse.status + "\n" +
                "Temps de réponse : " + duree + " ms\n\n" +
                "Réponse serveur :\n" +
                contenu
            );

        } catch (erreur) {
            afficherEtatServeur("error", "Route /api/analyse inaccessible");

            afficherInfosServeur(
                "TEST /api/analyse ÉCHOUÉ\n" +
                "-------------------------\n" +
                "Route testée : " + apiUrl + "\n\n" +
                "Vérifie :\n" +
                "- que server.js contient bien app.post('/api/analyse', ...);\n" +
                "- que CORS est activé ;\n" +
                "- que Render est réveillé ;\n" +
                "- que l’adresse API est correcte.\n\n" +
                "Détail technique :\n" +
                erreur.message
            );
        }
    }

    function capturerConfigurationTradingView() {
        const actifSelect = document.getElementById("asset-selector");
        const intervalleSelect = document.getElementById("interval-selector");
        const indicateurSelect = document.getElementById("indicator-selector");

        configurationActuelle = {
            nom: "Configuration TradingView IA",
            dateCapture: new Date().toISOString(),

            serveur: {
                apiAnalyse: getApiAnalyseUrl(),
                apiTest: getApiTestUrl(),
                hebergeur: "Render",
                type: "Node.js"
            },

            graphique: {
                actif: actifSelect.value,
                actifLibelle: actifSelect.options[actifSelect.selectedIndex].text,
                intervalle: intervalleSelect.value,
                intervalleLibelle: intervalleSelect.options[intervalleSelect.selectedIndex].text,
                indicateur: indicateurSelect.value,
                indicateurLibelle: indicateurSelect.options[indicateurSelect.selectedIndex].text,
                typeBougie: valeurElement("type-bougie", "bougies_japonaises"),
                typeBougieLibelle: libelleElement("type-bougie", "Bougies japonaises"),
                source: "widget_tradingview_integre"
            },

            analyseIA: {
                categorie: getCategorieAnalyseBTC(),
                categorieLibelle: getLibelleCategorieAnalyseBTC(),
                descriptionCategorie: getDescriptionCategorieAnalyseBTC(),
                strategie: valeurElement("strategie-selector", "suivi_tendance"),
                statut: "pret_pour_analyse"
            },

            risque: {
                capitalInitial: nombreElement("capital-input", 1000),
                risqueParPositionPourcent: nombreElement("risk-input", 1),
                stopLossPourcent: nombreElement("stoploss-input", 2),
                takeProfitPourcent: nombreElement("takeprofit-input", 4),
                levier: nombreElement("levier-input", 1),
                sens: valeurElement("sens-selector", "achat_vente")
            },

            snapshot: {
                url: valeurElement("snapshot-url", ""),
                categorieAnalyse: getCategorieAnalyseBTC(),
                categorieAnalyseLibelle: getLibelleCategorieAnalyseBTC(),
                descriptionCategorieAnalyse: getDescriptionCategorieAnalyseBTC()
            },

            notes: valeurElement("notes-analyse", "").trim(),

            limites: {
                captureCompleteTradingView: false,
                dessinsInternesTradingView: false,
                remarque: "La page capture les paramètres contrôlés par l’interface HTML, la catégorie d’analyse et le lien éventuel du snapshot."
            }
        };

        afficherConfiguration(configurationActuelle);
        afficherStatus("Configuration et catégorie d’analyse capturées avec succès.");
        alert("Configuration capturée avec la catégorie d’analyse.");
    }

    function afficherConfiguration(configuration) {
        document.getElementById("resultat-configuration").textContent =
            JSON.stringify(configuration, null, 4);
    }

    function afficherStatus(message) {
        document.getElementById("status").textContent = message;
    }

    function sauvegarderConfiguration() {
        if (!configurationActuelle) {
            capturerConfigurationTradingView();
        }

        localStorage.setItem("configurationTradingViewIA", JSON.stringify(configurationActuelle));

        afficherStatus("Configuration sauvegardée dans le navigateur.");
        alert("Configuration sauvegardée.");
    }

    function rechargerConfigurationTradingView() {
        const data = localStorage.getItem("configurationTradingViewIA");

        if (!data) {
            alert("Aucune configuration sauvegardée.");
            return;
        }

        try {
            configurationActuelle = JSON.parse(data);

            appliquerConfiguration(configurationActuelle);
            afficherConfiguration(configurationActuelle);
            afficherStatus("Configuration rechargée.");

            alert("Configuration rechargée.");
        } catch (erreur) {
            alert("Erreur : configuration sauvegardée invalide.");
        }
    }

    function appliquerConfiguration(configuration) {
        if (!configuration || !configuration.graphique) {
            return;
        }

        definirValeur("asset-selector", configuration.graphique.actif);
        definirValeur("interval-selector", configuration.graphique.intervalle);
        definirValeur("indicator-selector", configuration.graphique.indicateur);
        definirValeur("type-bougie", configuration.graphique.typeBougie);

        if (configuration.analyseIA && configuration.analyseIA.categorie) {
            definirValeur("categorie-analyse-btc", configuration.analyseIA.categorie);
            actualiserDescriptionCategorie();
        }

        if (configuration.risque) {
            definirValeur("capital-input", configuration.risque.capitalInitial);
            definirValeur("risk-input", configuration.risque.risqueParPositionPourcent);
            definirValeur("stoploss-input", configuration.risque.stopLossPourcent);
            definirValeur("takeprofit-input", configuration.risque.takeProfitPourcent);
            definirValeur("levier-input", configuration.risque.levier);
            definirValeur("sens-selector", configuration.risque.sens);
        }

        if (configuration.snapshot) {
            definirValeur("snapshot-url", configuration.snapshot.url);
        }

        if (configuration.serveur && configuration.serveur.apiAnalyse) {
            definirValeur("api-url", configuration.serveur.apiAnalyse);
        }

        if (configuration.notes !== undefined) {
            definirValeur("notes-analyse", configuration.notes);
        }

        creerWidgetTradingView();
    }

    function definirValeur(id, valeur) {
        const element = document.getElementById(id);

        if (element && valeur !== undefined && valeur !== null) {
            element.value = valeur;
        }
    }

    function copierConfiguration() {
        if (!configurationActuelle) {
            capturerConfigurationTradingView();
        }

        const texte = JSON.stringify(configurationActuelle, null, 4);

        navigator.clipboard.writeText(texte)
            .then(function () {
                afficherStatus("Configuration copiée dans le presse-papiers.");
                alert("JSON copié.");
            })
            .catch(function () {
                alert("Impossible de copier le JSON.");
            });
    }

    function nettoyerNomFichier(valeur) {
        return String(valeur || "non-defini")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9-_]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");
    }

    function genererTimestampFichier() {
        const maintenant = new Date();

        const annee = maintenant.getFullYear();
        const mois = String(maintenant.getMonth() + 1).padStart(2, "0");
        const jour = String(maintenant.getDate()).padStart(2, "0");
        const heure = String(maintenant.getHours()).padStart(2, "0");
        const minute = String(maintenant.getMinutes()).padStart(2, "0");
        const seconde = String(maintenant.getSeconds()).padStart(2, "0");

        return annee + mois + jour + "-" + heure + minute + seconde;
    }

    function genererNomFichierJSON(configuration) {
        const actif = nettoyerNomFichier(configuration.graphique.actif);
        const indicateur = nettoyerNomFichier(configuration.graphique.indicateur);
        const intervalle = nettoyerNomFichier(configuration.graphique.intervalle);
        const categorie = nettoyerNomFichier(configuration.analyseIA?.categorie || "analyse");
        const timestamp = genererTimestampFichier();

        return actif + "-" + indicateur + "-" + intervalle + "-" + categorie + "-" + timestamp + ".json";
    }

    function exporterJSON() {
        if (!configurationActuelle) {
            capturerConfigurationTradingView();
        }

        const contenu = JSON.stringify(configurationActuelle, null, 4);
        const fichier = new Blob([contenu], { type: "application/json" });

        const lien = document.createElement("a");
        lien.href = URL.createObjectURL(fichier);
        lien.download = genererNomFichierJSON(configurationActuelle);
        lien.click();

        URL.revokeObjectURL(lien.href);

        afficherStatus("Configuration exportée en JSON avec la catégorie d’analyse.");
        alert("Fichier JSON exporté.");
    }

    function ouvrirImportJSON() {
        document.getElementById("fichier-import-json").click();
    }

    function importerJSONDepuisFichier(event) {
        const fichier = event.target.files[0];

        if (!fichier) {
            return;
        }

        const lecteur = new FileReader();

        lecteur.onload = function(e) {
            try {
                const contenu = e.target.result;
                const configuration = JSON.parse(contenu);

                if (!configuration.graphique) {
                    throw new Error("Le fichier JSON ne contient pas de bloc graphique.");
                }

                configurationActuelle = configuration;

                appliquerConfiguration(configurationActuelle);
                afficherConfiguration(configurationActuelle);

                localStorage.setItem("configurationTradingViewIA", JSON.stringify(configurationActuelle));

                afficherStatus("Configuration JSON importée avec sa catégorie d’analyse.");
                alert("Configuration JSON importée avec succès.");

            } catch (erreur) {
                alert("Import impossible. Le fichier JSON est invalide.\n\nDétail : " + erreur.message);
            }

            event.target.value = "";
        };

        lecteur.readAsText(fichier);
    }

    function genererAnalyseLocale(configuration) {
        const graphique = configuration.graphique || {};
        const risque = configuration.risque || {};
        const snapshot = configuration.snapshot || {};
        const analyseIA = configuration.analyseIA || {};

        const actif = graphique.actif || "Actif non défini";
        const intervalle = graphique.intervalleLibelle || graphique.intervalle || "Intervalle non défini";
        const indicateur = graphique.indicateur || "Indicateur non défini";
        const categorie = analyseIA.categorieLibelle || getLibelleCategorieAnalyseBTC();
        const descriptionCategorie = analyseIA.descriptionCategorie || getDescriptionCategorieAnalyseBTC();

        let niveauRisque = "modéré";
        let remarqueRisque = "Le risque paraît raisonnable si le stop loss est respecté.";

        if (Number(risque.risqueParPositionPourcent) > 2) {
            niveauRisque = "élevé";
            remarqueRisque = "Le risque par position est élevé. Réduire le risque à 1 % ou 2 % maximum serait plus prudent.";
        }

        if (Number(risque.stopLossPourcent) <= 0) {
            niveauRisque = "très élevé";
            remarqueRisque = "Aucun stop loss valide n’est défini. C’est une mauvaise pratique.";
        }

        const presenceSnapshot = snapshot.url && snapshot.url.trim() !== "";

        return (
            "ANALYSE IA LOCALE\n" +
            "=================\n\n" +

            "Source analysée : " + (presenceSnapshot ? "snapshot fourni ou importé" : "configuration du graphique") + "\n" +
            "Actif : " + actif + "\n" +
            "Intervalle : " + intervalle + "\n" +
            "Indicateur : " + indicateur + "\n" +
            "Catégorie choisie : " + categorie + "\n" +
            "Description : " + descriptionCategorie + "\n" +
            "Snapshot : " + (presenceSnapshot ? snapshot.url : "aucun lien de snapshot disponible") + "\n\n" +

            "LECTURE TECHNIQUE\n" +
            "-----------------\n" +
            "- L’analyse tient compte de la catégorie sélectionnée.\n" +
            "- Les résultats restent basés sur les paramètres capturés, pas sur une lecture complète des pixels du graphique.\n" +
            "- Confirmer les signaux avec le volume, les supports, les résistances et les zones de liquidité.\n\n" +

            "GESTION DU RISQUE\n" +
            "-----------------\n" +
            "Capital : " + (risque.capitalInitial ?? 1000) + "\n" +
            "Risque par position : " + (risque.risqueParPositionPourcent ?? 1) + " %\n" +
            "Stop loss : " + (risque.stopLossPourcent ?? 2) + " %\n" +
            "Take profit : " + (risque.takeProfitPourcent ?? 4) + " %\n" +
            "Levier : " + (risque.levier ?? 1) + "\n" +
            "Niveau de risque estimé : " + niveauRisque + "\n" +
            remarqueRisque + "\n\n" +

            "RECOMMANDATIONS\n" +
            "---------------\n" +
            "1. Interpréter le graphique selon la catégorie choisie : " + categorie + ".\n" +
            "2. Ne pas entrer en position uniquement sur un seul indicateur.\n" +
            "3. Vérifier si le prix est proche d’un support ou d’une résistance importante.\n" +
            "4. Vérifier la liquidité, le volume et les mèches avant toute décision.\n" +
            "5. Utiliser un ratio gain/perte minimal de 1:2 si possible.\n\n" +

            "AVERTISSEMENT\n" +
            "-------------\n" +
            "Cette analyse est pédagogique. Ce n’est pas un conseil financier."
        );
    }

    async function analyserSnapshotIA() {
        if (!configurationActuelle) {
            capturerConfigurationTradingView();
        }

        afficherAnalyseIA("Analyse IA en cours...");

        const apiUrl = getApiAnalyseUrl();

        const chargeUtile = {
            action: "analyse_snapshot_ou_configuration",
            demande: "Analyser le snapshot capturé ou chargé selon la catégorie choisie, puis produire des recommandations.",
            categorieAnalyse: getCategorieAnalyseBTC(),
            categorieAnalyseLibelle: getLibelleCategorieAnalyseBTC(),
            descriptionCategorieAnalyse: getDescriptionCategorieAnalyseBTC(),
            configuration: configurationActuelle
        };

        try {
            const reponse = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(chargeUtile)
            });

            const texte = await reponse.text();

            let resultat;

            try {
                resultat = JSON.parse(texte);
            } catch (erreurJson) {
                throw new Error("Le serveur n’a pas retourné du JSON.\n\nRéponse reçue :\n" + texte);
            }

            if (!reponse.ok) {
                throw new Error("Réponse serveur incorrecte : " + reponse.status);
            }

            afficherAnalyseIA(
                "ANALYSE IA REÇUE DU SERVEUR\n" +
                "===========================\n\n" +
                JSON.stringify(resultat, null, 4)
            );

            afficherEtatServeur("ok", "Analyse IA terminée");
            afficherStatus("Analyse IA terminée.");
            alert("Analyse IA terminée.");

        } catch (erreur) {
            const analyseLocale = genererAnalyseLocale(configurationActuelle);

            afficherAnalyseIA(
                analyseLocale +
                "\n\n" +
                "NOTE TECHNIQUE\n" +
                "--------------\n" +
                "Le serveur Render n’a pas répondu correctement. Une analyse locale simplifiée a donc été affichée.\n\n" +
                "Détail technique :\n" +
                erreur.message
            );

            afficherEtatServeur("warning", "Analyse locale affichée");
            afficherStatus("Analyse IA locale affichée.");
        }
    }

    function ouvrirPageDecision() {
        if (!configurationActuelle) {
            capturerConfigurationTradingView();
        }

        localStorage.setItem("configurationTradingViewIA", JSON.stringify(configurationActuelle));

        window.open("decisions.html", "_blank");
    }

    function effacerConfiguration() {
        if (!confirm("Voulez-vous vraiment effacer la configuration affichée ?")) {
            return;
        }

        configurationActuelle = null;

        document.getElementById("resultat-configuration").textContent =
            "Aucune configuration capturée.";

        afficherAnalyseIA("Aucune analyse IA lancée.");

        afficherStatus("Configuration effacée.");
        alert("Configuration effacée.");
    }

    async function envoyerVersAPI() {
        if (!configurationActuelle) {
            capturerConfigurationTradingView();
        }

        const apiUrl = getApiAnalyseUrl();

        if (!apiUrl) {
            alert("Adresse API manquante.");
            return;
        }

        try {
            afficherStatus("Envoi vers l’API IA...");
            afficherEtatServeur("warning", "Envoi vers l’API IA...");

            const reponse = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(configurationActuelle)
            });

            const texte = await reponse.text();

            let resultat;

            try {
                resultat = JSON.parse(texte);
            } catch (erreurJson) {
                throw new Error("Le serveur n’a pas retourné du JSON.\n\nRéponse reçue :\n" + texte);
            }

            if (!reponse.ok) {
                throw new Error("Réponse serveur incorrecte : " + reponse.status);
            }

            const sortie = {
                configurationEnvoyee: configurationActuelle,
                resultatIA: resultat
            };

            document.getElementById("resultat-configuration").textContent =
                JSON.stringify(sortie, null, 4);

            afficherStatus("Réponse IA reçue.");
            afficherEtatServeur("ok", "Analyse IA reçue");
            afficherInfosServeur("Analyse IA reçue avec succès depuis :\n" + apiUrl);

            alert("Analyse IA reçue.");

        } catch (erreur) {
            afficherStatus("Erreur lors de l’appel API.");
            afficherEtatServeur("error", "Erreur API");

            afficherInfosServeur(
                "ERREUR LORS DE L’ENVOI À L’API\n" +
                "-------------------------------\n" +
                "Adresse : " + apiUrl + "\n\n" +
                "Causes possibles :\n" +
                "- serveur Render en veille ;\n" +
                "- serveur Node.js arrêté ;\n" +
                "- adresse API incorrecte ;\n" +
                "- route /api/analyse absente ;\n" +
                "- CORS non activé ;\n" +
                "- réponse non JSON.\n\n" +
                "Détail technique :\n" +
                erreur.message
            );

            alert("Impossible d’envoyer la configuration à l’API.");
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        creerWidgetTradingView();

        const selectCategorie = document.getElementById("categorie-analyse-btc");

        if (selectCategorie) {
            selectCategorie.addEventListener("change", function () {
                actualiserDescriptionCategorie();

                if (configurationActuelle) {
                    configurationActuelle.analyseIA.categorie = getCategorieAnalyseBTC();
                    configurationActuelle.analyseIA.categorieLibelle = getLibelleCategorieAnalyseBTC();
                    configurationActuelle.analyseIA.descriptionCategorie = getDescriptionCategorieAnalyseBTC();

                    if (configurationActuelle.snapshot) {
                        configurationActuelle.snapshot.categorieAnalyse = getCategorieAnalyseBTC();
                        configurationActuelle.snapshot.categorieAnalyseLibelle = getLibelleCategorieAnalyseBTC();
                        configurationActuelle.snapshot.descriptionCategorieAnalyse = getDescriptionCategorieAnalyseBTC();
                    }

                    afficherConfiguration(configurationActuelle);
                }
            });

            actualiserDescriptionCategorie();
        }
    });
</script>

</body>
</html>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Analyse de stratégie TradingView</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            background: #0b1020;
            color: #ffffff;
        }

        header {
            background: #111827;
            border-bottom: 1px solid #243044;
            padding: 14px 25px;
            text-align: center;
        }

        header h1 {
            margin: 0;
            color: #00e5ff;
            font-size: 26px;
        }

        header p {
            margin: 6px 0 0;
            color: #cbd5e1;
            font-size: 14px;
        }

        nav {
            background: #0f172a;
            padding: 8px;
            text-align: center;
            border-bottom: 1px solid #243044;
        }

        nav a {
            color: #facc15;
            text-decoration: none;
            margin: 0 10px;
            font-weight: bold;
            font-size: 14px;
        }

        nav a:hover {
            text-decoration: underline;
        }

        main {
            width: 95%;
            max-width: 1350px;
            margin: 12px auto 25px auto;
        }

        .layout {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 20px;
            align-items: start;
        }

        .card {
            background: #111827;
            border: 1px solid #243044;
            border-radius: 12px;
            padding: 14px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.35);
        }

        .card h2 {
            margin-top: 0;
            margin-bottom: 10px;
            color: #00e5ff;
            font-size: 20px;
        }

        .form-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
        }

        label {
            display: block;
            margin-bottom: 6px;
            color: #facc15;
            font-weight: bold;
            font-size: 14px;
        }

        select,
        input,
        textarea {
            width: 100%;
            padding: 10px;
            background: #020617;
            color: #ffffff;
            border: 1px solid #334155;
            border-radius: 8px;
            font-size: 14px;
        }

        textarea {
            min-height: 90px;
            resize: vertical;
        }

        .button-row,
        .button-row-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            align-items: center;
        }

        .button-row {
            margin-top: 12px;
        }

        .button-row-actions {
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid #243044;
        }

        button,
        .btn-link {
            border: none;
            padding: 9px 11px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            font-size: 13px;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            min-height: 38px;
            white-space: nowrap;
        }

        .btn-primary {
            background: #00e5ff;
            color: #001018;
        }

        .btn-secondary {
            background: #facc15;
            color: #111827;
        }

        .btn-danger {
            background: #ef4444;
            color: #ffffff;
        }

        .btn-dark {
            background: #334155;
            color: #ffffff;
        }

        .btn-pine-action {
            background: #16a34a;
            color: #ffffff;
        }

        .btn-pine-view {
            background: #2563eb;
            color: #ffffff;
        }

        .tv-icon {
            margin-right: 2px;
        }

        button:hover,
        .btn-link:hover {
            opacity: 0.85;
        }

        .chart-box {
            height: 430px;
            background: #020617;
            border: 1px solid #334155;
            border-radius: 12px;
            overflow: hidden;
        }

        #tradingview-widget {
            width: 100%;
            height: 100%;
        }

        .result-card-inline {
            margin-top: 16px;
        }

        .result-card-inline h2 {
            margin-top: 0;
        }

        .result-box {
            background: #020617;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 14px;
            min-height: 320px;
            max-height: 620px;
            overflow-y: auto;
            white-space: pre-wrap;
            font-family: Consolas, monospace;
            font-size: 14px;
            color: #d1d5db;
        }

        .status {
            padding: 12px;
            border-radius: 8px;
            font-weight: bold;
            margin-bottom: 12px;
            text-align: center;
        }

        .status.neutral {
            background: #334155;
            color: #ffffff;
        }

        .status.ok {
            background: #064e3b;
            color: #86efac;
        }

        .status.error {
            background: #7f1d1d;
            color: #fecaca;
        }

        .status.warning {
            background: #713f12;
            color: #fde68a;
        }

        .note {
            color: #cbd5e1;
            font-size: 14px;
            line-height: 1.5;
        }

        .info-categorie {
            margin-top: 14px;
            padding: 12px;
            background: #020617;
            border: 1px solid #334155;
            border-radius: 8px;
            color: #cbd5e1;
            font-size: 13px;
            line-height: 1.5;
        }

        .info-categorie strong {
            color: #00e5ff;
        }

        .label-categorie,
        .label-avance {
            color: #00e5ff;
            font-weight: bold;
        }

        #actifsConnexes {
            min-height: auto;
        }

        footer {
            margin-top: 30px;
            padding: 18px;
            text-align: center;
            background: #111827;
            color: #cbd5e1;
            border-top: 1px solid #243044;
            font-size: 13px;
        }

        @media (max-width: 900px) {
            .layout {
                grid-template-columns: 1fr;
            }

            .form-grid {
                grid-template-columns: 1fr;
            }

            .chart-box {
                height: 360px;
            }

            header h1 {
                font-size: 22px;
            }

            .result-box {
                min-height: 300px;
                max-height: 520px;
            }

            .button-row button,
            .button-row-actions button {
                flex: 1 1 100%;
                width: 100%;
            }
        }
    </style>
</head>

<body>

<header>
    <h1>Analyse de stratégie TradingView</h1>
    <p>Analyse des paramètres de marché, des indicateurs, des catégories Bitcoin, des snapshots et des multi-charts.</p>
</header>

<nav>
    <a href="index.html">Accueil</a>
    <a href="https://www.tradingview.com/chart/" target="_blank">TradingView</a>
    <a href="create-strategy.html">Comment créer une stratégie</a>
</nav>

<main>

    <section class="layout">

        <div>
            <div class="card">
                <h2>Graphique TradingView</h2>

                <div class="chart-box">
                    <div id="tradingview-widget"></div>
                </div>

                <div class="button-row">
                    <button class="btn-pine-action" onclick="afficherScriptPine()">
                        <span class="tv-icon">🧩</span>
                        <span>Générer Pine</span>
                    </button>

                    <button class="btn-pine-view" onclick="afficherPineScript()">
                        <span class="tv-icon">👁️</span>
                        <span>Afficher Pine Script</span>
                    </button>

                    <button class="btn-pine-action" onclick="copierScriptPine()">
                        <span class="tv-icon">📋</span>
                        <span>Copier Pine</span>
                    </button>

                    <button 
                        class="btn-secondary" 
                        onclick="ouvrirTradingView()"
                        title="Recommandation : ta page HTML → Node.js → génération Pine Script → copier-coller dans Pine Editor"
                    >
                        Ouvrir dans TradingView
                    </button>

                    <button class="btn-dark" onclick="rafraichirGraphique()">
                        Rafraîchir le graphique
                    </button>
                </div>

                <div class="button-row-actions">
                    <button class="btn-primary" onclick="analyserStrategie()">
                        Analyser la stratégie
                    </button>

                    <button class="btn-secondary" onclick="testerServeur()">
                        Tester le serveur
                    </button>

                    <button class="btn-danger" onclick="viderResultats()">
                        Effacer
                    </button>
                </div>
            </div>

            <div class="card result-card-inline">
                <h2>Résultat de l’analyse</h2>

                <div id="resultatAnalyse" class="result-box">
Aucune analyse lancée.
                </div>
            </div>
        </div>

        <div class="card">
            <h2>Paramètres d’analyse</h2>

            <div id="etatServeur" class="status neutral">
                Serveur non testé
            </div>

            <div class="form-grid">

                <div>
                    <label for="actif">Actif</label>
                    <select id="actif" onchange="mettreAJourActifsConnexes(); rafraichirGraphique();">
                        <option value="BINANCE:BTCUSDT">Bitcoin / USDT</option>
                        <option value="COINBASE:BTCUSD">Bitcoin / USD - Coinbase</option>
                        <option value="BINANCE:ETHUSDT">Ethereum / USDT</option>
                        <option value="OANDA:XAUUSD">Or / Dollar - XAUUSD</option>
                        <option value="NASDAQ:AAPL">Apple</option>
                        <option value="NASDAQ:TSLA">Tesla</option>
                        <option value="NASDAQ:NVDA">Nvidia</option>
                        <option value="NASDAQ:MSFT">Microsoft</option>
                        <option value="NASDAQ:GOOGL">Google</option>
                    </select>
                </div>

                <div>
                    <label for="intervalle">Intervalle</label>
                    <select id="intervalle" onchange="rafraichirGraphique()">
                        <option value="1">1 minute</option>
                        <option value="5">5 minutes</option>
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 heure</option>
                        <option value="240">4 heures</option>
                        <option value="D" selected>1 jour</option>
                        <option value="W">1 semaine</option>
                        <option value="M">1 mois</option>
                    </select>
                </div>

                <div>
                    <label for="indicateur">Indicateur principal</label>
                    <select id="indicateur" onchange="rafraichirGraphique()">
                        <option value="RSI">RSI</option>
                        <option value="MACD">MACD</option>
                        <option value="EMA">EMA</option>
                        <option value="SMA">Moyenne mobile simple</option>
                        <option value="SUPERTREND">Supertrend</option>
                        <option value="VOLUME">Volume</option>
                        <option value="PRICE_ACTION">Price Action</option>
                        <option value="LIQUIDITY">Zones de liquidité</option>
                    </select>
                </div>

                <div>
                    <label for="strategie">Type de stratégie</label>
                    <select id="strategie">
                        <option value="suivi_tendance">Suivi de tendance</option>
                        <option value="retournement">Retournement</option>
                        <option value="cassure">Cassure de niveau</option>
                        <option value="scalping">Scalping</option>
                        <option value="swing">Swing trading</option>
                    </select>
                </div>

                <div>
                    <label for="categorieAnalyse" class="label-categorie">Catégorie d’analyse</label>
                    <select id="categorieAnalyse" onchange="mettreAJourDescriptionCategorie()">
                        <option value="macroeconomie">Macroéconomie</option>
                        <option value="monnaie_bitcoin">Monnaie Bitcoin</option>
                        <option value="donnees_on_chain">Données on-chain</option>
                        <option value="minage">Minage</option>
                        <option value="analyse_technique">Analyse technique</option>
                        <option value="derives">Dérivés</option>
                        <option value="liquidite_marche">Liquidité de marché</option>
                        <option value="institutionnel">Institutionnel</option>
                        <option value="sentiment">Sentiment</option>
                        <option value="reglementation_risques">Réglementation et risques</option>
                    </select>
                </div>

                <div>
                    <label for="modeAnalyseAvancee" class="label-avance">Mode d’analyse avancée</label>
                    <select id="modeAnalyseAvancee" onchange="mettreAJourActifsConnexes()">
                        <option value="simple">Analyse simple</option>
                        <option value="snapshots">Snapshots</option>
                        <option value="multi_charts">Multi-charts</option>
                        <option value="carnet_ordres">Carnet des ordres</option>
                        <option value="complet">Analyse complète</option>
                    </select>
                </div>

                <div>
                    <label for="actifsConnexes" class="label-avance">Actif connexe à analyser</label>
                    <select id="actifsConnexes"></select>
                </div>

                <div>
                    <label for="capital">Capital initial</label>
                    <input type="number" id="capital" value="1000">
                </div>

                <div>
                    <label for="risque">Risque par position (%)</label>
                    <input type="number" id="risque" value="1" step="0.1">
                </div>

                <div>
                    <label for="stopLoss">Stop loss (%)</label>
                    <input type="number" id="stopLoss" value="2" step="0.1">
                </div>

                <div>
                    <label for="takeProfit">Take profit (%)</label>
                    <input type="number" id="takeProfit" value="4" step="0.1">
                </div>

                <div>
                    <label for="levier">Levier</label>
                    <input type="number" id="levier" value="1" step="1">
                </div>

                <div>
                    <label for="sens">Sens de trading</label>
                    <select id="sens">
                        <option value="achat_vente">Achat et vente</option>
                        <option value="achat">Achat seulement</option>
                        <option value="vente">Vente seulement</option>
                    </select>
                </div>

            </div>

            <div id="descriptionCategorie" class="info-categorie">
                <strong>Catégorie choisie :</strong> Macroéconomie.
                Taux, inflation, liquidité mondiale, dollar, obligations, bilan de la Fed.
            </div>

            <div id="descriptionAnalyseAvancee" class="info-categorie">
                <strong>Analyse avancée :</strong> les actifs connexes sélectionnés seront transmis à Node.js avec l’actif principal.
            </div>

            <div style="margin-top: 14px;">
                <label for="notes">Notes personnelles</label>
                <textarea id="notes" placeholder="Exemple : surveiller les mèches, les zones de liquidité, les supports, les résistances, les données on-chain ou la macroéconomie..."></textarea>
            </div>

        </div>

    </section>

    <section class="card" style="margin-top: 20px;">
        <h2>Conseils d’utilisation</h2>

        <p class="note">
            Cette page récupère les paramètres choisis et les envoie au serveur Node.js.
            Le serveur doit ensuite récupérer les données de marché, les données on-chain,
            les données de dominance, les données de dérivés ou le carnet des ordres.
        </p>

        <p class="note">
            Pour Bitcoin, l’analyse avancée peut comparer le prix de BTC avec la dominance Bitcoin,
            la capitalisation totale du marché crypto, la dominance USDT, la dominance USDC,
            le dollar américain, l’or et d’autres actifs connexes.
        </p>

        <p class="note">
            Le carnet des ordres ne peut pas être lu directement depuis le graphique TradingView intégré.
            Il doit être récupéré côté serveur avec une API externe, par exemple Binance, Coinbase ou Kraken.
        </p>
    </section>

</main>

<footer>
    Développé par Hocine Korichi, ingénieur — Page d’analyse TradingView
</footer>

<script src="https://s3.tradingview.com/tv.js"></script>

<script>
    const API_URL = "https://tading.onrender.com/api/analyse";

    let widgetTradingView = null;
    let actifsConnexesDisponibles = [];
    let scriptPineGenere = "";

    function lireParametres() {
        const actif = document.getElementById("actif");
        const intervalle = document.getElementById("intervalle");
        const indicateur = document.getElementById("indicateur");
        const strategie = document.getElementById("strategie");
        const categorieAnalyse = document.getElementById("categorieAnalyse");
        const modeAnalyseAvancee = document.getElementById("modeAnalyseAvancee");
        const capital = document.getElementById("capital");
        const risque = document.getElementById("risque");
        const stopLoss = document.getElementById("stopLoss");
        const takeProfit = document.getElementById("takeProfit");
        const levier = document.getElementById("levier");
        const sens = document.getElementById("sens");
        const notes = document.getElementById("notes");

        return {
            actif: actif.value,
            libelleActif: actif.options[actif.selectedIndex].text,
            intervalle: intervalle.value,
            libelleIntervalle: intervalle.options[intervalle.selectedIndex].text,
            indicateur: indicateur.value,
            libelleIndicateur: indicateur.options[indicateur.selectedIndex].text,
            strategie: strategie.value,
            libelleStrategie: strategie.options[strategie.selectedIndex].text,
            categorieAnalyse: categorieAnalyse.value,
            libelleCategorieAnalyse: categorieAnalyse.options[categorieAnalyse.selectedIndex].text,
            descriptionCategorieAnalyse: obtenirDescriptionCategorie(categorieAnalyse.value),
            modeAnalyseAvancee: modeAnalyseAvancee.value,
            libelleModeAnalyseAvancee: modeAnalyseAvancee.options[modeAnalyseAvancee.selectedIndex].text,
            actifsConnexes: lireActifsConnexesSelectionnes(),
            capital: Number(capital.value),
            risque: Number(risque.value),
            stopLoss: Number(stopLoss.value),
            takeProfit: Number(takeProfit.value),
            levier: Number(levier.value),
            sens: sens.value,
            libelleSens: sens.options[sens.selectedIndex].text,
            notes: notes.value.trim(),
            source: "analyse-strategy.html",
            dateEnvoi: new Date().toISOString()
        };
    }

    function obtenirDescriptionCategorie(categorie) {
        switch (categorie) {
            case "macroeconomie":
                return "Taux, inflation, liquidité mondiale, dollar, obligations, bilan de la Fed.";
            case "monnaie_bitcoin":
                return "Offre maximale, émission, halving, inflation de BTC.";
            case "donnees_on_chain":
                return "Adresses, transactions, MVRV, realized price, flux des plateformes.";
            case "minage":
                return "Taux de hachage, difficulté, revenus et ventes des mineurs.";
            case "analyse_technique":
                return "Graphiques, tendances, supports, résistances, RSI, moyennes mobiles.";
            case "derives":
                return "Contrats à terme, options, funding rates, open interest, liquidations.";
            case "liquidite_marche":
                return "Volumes, carnets d’ordres, spreads, profondeur de marché.";
            case "institutionnel":
                return "FNB Bitcoin, achats d’entreprises, fonds, banques, adoption officielle.";
            case "sentiment":
                return "Réseaux sociaux, Google Trends, médias, peur et avidité.";
            case "reglementation_risques":
                return "Lois, fiscalité, SEC, plateformes, garde, géopolitique.";
            default:
                return "Catégorie non reconnue.";
        }
    }

    function mettreAJourDescriptionCategorie() {
        const categorieAnalyse = document.getElementById("categorieAnalyse");
        const description = obtenirDescriptionCategorie(categorieAnalyse.value);

        document.getElementById("descriptionCategorie").innerHTML =
            "<strong>Catégorie choisie :</strong> " +
            categorieAnalyse.options[categorieAnalyse.selectedIndex].text +
            ". " +
            description;
    }

    function obtenirActifsConnexes(actifPrincipal) {
        if (actifPrincipal === "BINANCE:BTCUSDT" || actifPrincipal === "COINBASE:BTCUSD") {
            return [
                { symbole: "CRYPTOCAP:BTC.D", nom: "Bitcoin dominance" },
                { symbole: "CRYPTOCAP:TOTAL", nom: "Crypto total market cap" },
                { symbole: "CRYPTOCAP:TOTAL2", nom: "Crypto market cap sans Bitcoin" },
                { symbole: "CRYPTOCAP:TOTAL3", nom: "Crypto market cap sans Bitcoin ni Ethereum" },
                { symbole: "CRYPTOCAP:USDT.D", nom: "USDT dominance" },
                { symbole: "CRYPTOCAP:USDC.D", nom: "USDC dominance" },
                { symbole: "CRYPTOCAP:OTHERS.D", nom: "Dominance des altcoins" },
                { symbole: "BINANCE:ETHUSDT", nom: "Ethereum / USDT" },
                { symbole: "OANDA:XAUUSD", nom: "Or / Dollar" },
                { symbole: "TVC:DXY", nom: "Indice dollar américain" },
                { symbole: "TVC:US10Y", nom: "Rendement obligataire américain 10 ans" },
                { symbole: "NASDAQ:QQQ", nom: "Nasdaq 100 ETF" }
            ];
        }

        if (actifPrincipal === "BINANCE:ETHUSDT") {
            return [
                { symbole: "BINANCE:BTCUSDT", nom: "Bitcoin / USDT" },
                { symbole: "CRYPTOCAP:BTC.D", nom: "Bitcoin dominance" },
                { symbole: "CRYPTOCAP:TOTAL", nom: "Crypto total market cap" },
                { symbole: "CRYPTOCAP:TOTAL2", nom: "Crypto market cap sans Bitcoin" },
                { symbole: "CRYPTOCAP:ETH.D", nom: "Ethereum dominance" },
                { symbole: "CRYPTOCAP:USDT.D", nom: "USDT dominance" },
                { symbole: "NASDAQ:QQQ", nom: "Nasdaq 100 ETF" }
            ];
        }

        if (actifPrincipal === "OANDA:XAUUSD") {
            return [
                { symbole: "TVC:DXY", nom: "Indice dollar américain" },
                { symbole: "TVC:US10Y", nom: "Rendement obligataire américain 10 ans" },
                { symbole: "BINANCE:BTCUSDT", nom: "Bitcoin / USDT" },
                { symbole: "NASDAQ:QQQ", nom: "Nasdaq 100 ETF" }
            ];
        }

        return [
            { symbole: "TVC:DXY", nom: "Indice dollar américain" },
            { symbole: "NASDAQ:QQQ", nom: "Nasdaq 100 ETF" },
            { symbole: "CRYPTOCAP:TOTAL", nom: "Crypto total market cap" },
            { symbole: "BINANCE:BTCUSDT", nom: "Bitcoin / USDT" }
        ];
    }

    function mettreAJourActifsConnexes() {
        const actif = document.getElementById("actif").value;
        const modeAnalyseAvancee = document.getElementById("modeAnalyseAvancee").value;
        const selectActifsConnexes = document.getElementById("actifsConnexes");
        const descriptionAnalyseAvancee = document.getElementById("descriptionAnalyseAvancee");

        if (!selectActifsConnexes) {
            return;
        }

        actifsConnexesDisponibles = obtenirActifsConnexes(actif);
        selectActifsConnexes.innerHTML = "";

        const optionTous = document.createElement("option");
        optionTous.value = "__TOUS__";
        optionTous.textContent = "Tous les actifs connexes recommandés";
        optionTous.selected = true;
        selectActifsConnexes.appendChild(optionTous);

        actifsConnexesDisponibles.forEach(function (item) {
            const option = document.createElement("option");
            option.value = item.symbole;
            option.textContent = item.nom + " — " + item.symbole;
            selectActifsConnexes.appendChild(option);
        });

        let texteMode = "";

        switch (modeAnalyseAvancee) {
            case "simple":
                texteMode = "Analyse simple : seul l’actif principal est prioritaire. Tu peux choisir un actif connexe si nécessaire.";
                break;
            case "snapshots":
                texteMode = "Snapshots : Node.js recevra l’actif principal et l’actif connexe choisi, ou tous les actifs recommandés.";
                break;
            case "multi_charts":
                texteMode = "Multi-charts : Node.js comparera l’actif principal avec l’actif connexe choisi, ou avec tous les actifs recommandés.";
                break;
            case "carnet_ordres":
                texteMode = "Carnet des ordres : Node.js devra appeler une API externe pour récupérer les ordres d’achat, de vente, les volumes et la profondeur de marché.";
                break;
            case "complet":
                texteMode = "Analyse complète : snapshots, multi-charts, actif connexe et carnet des ordres seront demandés au serveur.";
                break;
            default:
                texteMode = "Mode d’analyse non reconnu.";
        }

        descriptionAnalyseAvancee.innerHTML =
            "<strong>Analyse avancée :</strong> " + texteMode;
    }

    function lireActifsConnexesSelectionnes() {
        const selectActifsConnexes = document.getElementById("actifsConnexes");

        if (!selectActifsConnexes || selectActifsConnexes.selectedIndex < 0) {
            return [];
        }

        if (selectActifsConnexes.value === "__TOUS__") {
            return actifsConnexesDisponibles.map(function (item) {
                return {
                    symbole: item.symbole,
                    libelle: item.nom + " — " + item.symbole
                };
            });
        }

        return [
            {
                symbole: selectActifsConnexes.value,
                libelle: selectActifsConnexes.options[selectActifsConnexes.selectedIndex].text
            }
        ];
    }

    function genererScriptPine() {
        const params = lireParametres();

        const nomStrategie = "Strategie " + params.libelleIndicateur + " - " + params.actif + " - " + params.intervalle;

        let conditionAchat = "ta.crossover(close, emaLongue)";
        let conditionVente = "ta.crossunder(close, emaLongue)";

        if (params.indicateur === "RSI") {
            conditionAchat = "rsi < 30";
            conditionVente = "rsi > 70";
        }

        if (params.indicateur === "MACD") {
            conditionAchat = "ta.crossover(macdLine, signalLine)";
            conditionVente = "ta.crossunder(macdLine, signalLine)";
        }

        if (params.indicateur === "EMA" || params.indicateur === "SMA") {
            conditionAchat = "ta.crossover(emaCourte, emaLongue)";
            conditionVente = "ta.crossunder(emaCourte, emaLongue)";
        }

        const stopLossValeur = params.stopLoss / 100;
        const takeProfitValeur = params.takeProfit / 100;

        return `//@version=5
// Script généré automatiquement depuis la page HTML d'analyse.
// Actif sélectionné : ${params.actif}
// Libellé actif : ${params.libelleActif}
// Intervalle : ${params.libelleIntervalle}
// Indicateur : ${params.libelleIndicateur}
// Stratégie : ${params.libelleStrategie}
// Catégorie d'analyse : ${params.libelleCategorieAnalyse}
// Mode avancé : ${params.libelleModeAnalyseAvancee}
// Capital initial : ${params.capital}
// Risque par position : ${params.risque}%
// Stop loss : ${params.stopLoss}%
// Take profit : ${params.takeProfit}%
// Levier : ${params.levier}
// Sens de trading : ${params.libelleSens}
// Notes : ${params.notes || "Aucune note"}

strategy("${nomStrategie}", overlay=true, initial_capital=${params.capital}, default_qty_type=strategy.percent_of_equity, default_qty_value=${params.risque})

sourcePrix = close

emaCourte = ta.ema(sourcePrix, 20)
emaLongue = ta.ema(sourcePrix, 50)
smaLongue = ta.sma(sourcePrix, 50)
rsi = ta.rsi(sourcePrix, 14)
[macdLine, signalLine, histLine] = ta.macd(sourcePrix, 12, 26, 9)

conditionAchat = ${conditionAchat}
conditionVente = ${conditionVente}

prixStopAchat = strategy.position_avg_price * (1 - ${stopLossValeur})
prixProfitAchat = strategy.position_avg_price * (1 + ${takeProfitValeur})

prixStopVente = strategy.position_avg_price * (1 + ${stopLossValeur})
prixProfitVente = strategy.position_avg_price * (1 - ${takeProfitValeur})

autoriserAchat = "${params.sens}" == "achat" or "${params.sens}" == "achat_vente"
autoriserVente = "${params.sens}" == "vente" or "${params.sens}" == "achat_vente"

if conditionAchat and autoriserAchat
    strategy.entry("Achat", strategy.long)

if conditionVente and autoriserVente
    strategy.entry("Vente", strategy.short)

strategy.exit("Sortie achat", from_entry="Achat", stop=prixStopAchat, limit=prixProfitAchat)
strategy.exit("Sortie vente", from_entry="Vente", stop=prixStopVente, limit=prixProfitVente)

plot(emaCourte, title="EMA 20")
plot(emaLongue, title="EMA 50")
plot(smaLongue, title="SMA 50")

// Rappel : TradingView ne permet pas d'injecter automatiquement ce script dans Pine Editor depuis une page HTML externe.
// Méthode recommandée : générer le script, le copier, ouvrir TradingView, puis le coller dans Pine Editor.`;
    }

    function afficherScriptPine() {
        scriptPineGenere = genererScriptPine();

        document.getElementById("resultatAnalyse").textContent =
            "SCRIPT PINE GÉNÉRÉ\n" +
            "------------------\n\n" +
            scriptPineGenere;

        document.getElementById("etatServeur").className = "status ok";
        document.getElementById("etatServeur").textContent = "Script Pine généré";

        alert("Le script Pine a été généré avec succès.");
    }

    function afficherPineScript() {
        if (!scriptPineGenere) {
            scriptPineGenere = genererScriptPine();
        }

        document.getElementById("resultatAnalyse").textContent =
            "AFFICHAGE DU SCRIPT PINE\n" +
            "------------------------\n\n" +
            scriptPineGenere;

        document.getElementById("etatServeur").className = "status ok";
        document.getElementById("etatServeur").textContent = "Script Pine affiché";

        alert("Le script Pine est maintenant affiché dans la zone des résultats.");
    }

    async function copierScriptPine() {
        const resultatBox = document.getElementById("resultatAnalyse");

        if (!scriptPineGenere) {
            scriptPineGenere = genererScriptPine();
        }

        try {
            await navigator.clipboard.writeText(scriptPineGenere);

            resultatBox.textContent =
                "SCRIPT PINE COPIÉ DANS LE PRESSE-PAPIERS\n" +
                "----------------------------------------\n\n" +
                scriptPineGenere;

            document.getElementById("etatServeur").className = "status ok";
            document.getElementById("etatServeur").textContent = "Script Pine copié";

            alert("Le script Pine a été copié dans le presse-papiers.");

        } catch (erreur) {
            const zoneCopie = document.createElement("textarea");
            zoneCopie.value = scriptPineGenere;
            document.body.appendChild(zoneCopie);
            zoneCopie.select();

            try {
                document.execCommand("copy");

                resultatBox.textContent =
                    "SCRIPT PINE COPIÉ DANS LE PRESSE-PAPIERS\n" +
                    "----------------------------------------\n\n" +
                    scriptPineGenere;

                document.getElementById("etatServeur").className = "status ok";
                document.getElementById("etatServeur").textContent = "Script Pine copié";

                alert("Le script Pine a été copié dans le presse-papiers.");

            } catch (erreurCopie) {
                resultatBox.textContent =
                    "Impossible de copier automatiquement le script Pine.\n\n" +
                    "Tu peux le sélectionner manuellement ci-dessous :\n\n" +
                    scriptPineGenere;

                document.getElementById("etatServeur").className = "status error";
                document.getElementById("etatServeur").textContent = "Copie impossible";

                alert("Impossible de copier automatiquement le script Pine.");
            }

            document.body.removeChild(zoneCopie);
        }
    }

    function chargerGraphique() {
        const params = lireParametres();

        document.getElementById("tradingview-widget").innerHTML = "";

        widgetTradingView = new TradingView.widget({
            container_id: "tradingview-widget",
            autosize: true,
            symbol: params.actif,
            interval: params.intervalle,
            timezone: "America/Toronto",
            theme: "dark",
            style: "1",
            locale: "fr",
            toolbar_bg: "#111827",
            enable_publishing: false,
            allow_symbol_change: true,
            hide_side_toolbar: false,
            studies: choisirEtudeTradingView(params.indicateur)
        });
    }

    function choisirEtudeTradingView(indicateur) {
        switch (indicateur) {
            case "RSI":
                return ["RSI@tv-basicstudies"];
            case "MACD":
                return ["MACD@tv-basicstudies"];
            case "EMA":
                return ["MASimple@tv-basicstudies"];
            case "SMA":
                return ["MASimple@tv-basicstudies"];
            case "VOLUME":
                return ["Volume@tv-basicstudies"];
            default:
                return [];
        }
    }

    function rafraichirGraphique() {
        chargerGraphique();
    }

    function ouvrirTradingView() {
        const params = lireParametres();

        const parametresUrl = new URLSearchParams();

        parametresUrl.set("symbol", params.actif);
        parametresUrl.set("interval", params.intervalle);
        parametresUrl.set("indicateur", params.indicateur);
        parametresUrl.set("strategie", params.strategie);
        parametresUrl.set("categorieAnalyse", params.categorieAnalyse);
        parametresUrl.set("modeAnalyseAvancee", params.modeAnalyseAvancee);
        parametresUrl.set("capital", params.capital);
        parametresUrl.set("risque", params.risque);
        parametresUrl.set("stopLoss", params.stopLoss);
        parametresUrl.set("takeProfit", params.takeProfit);
        parametresUrl.set("levier", params.levier);
        parametresUrl.set("sens", params.sens);
        parametresUrl.set("actifsConnexes", JSON.stringify(params.actifsConnexes));

        if (params.notes) {
            parametresUrl.set("notes", params.notes);
        }

        const url = "https://www.tradingview.com/chart/?" + parametresUrl.toString();

        window.open(url, "_blank");
    }

    async function testerServeur() {
        const etat = document.getElementById("etatServeur");

        etat.className = "status warning";
        etat.textContent = "Test du serveur en cours...";

        try {
            const reponse = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    test: true,
                    message: "Test depuis analyse-strategy.html",
                    categorieAnalyse: document.getElementById("categorieAnalyse").value,
                    modeAnalyseAvancee: document.getElementById("modeAnalyseAvancee").value,
                    actifsConnexes: lireActifsConnexesSelectionnes()
                })
            });

            if (!reponse.ok) {
                throw new Error("Réponse serveur invalide : " + reponse.status);
            }

            const resultat = await reponse.json();

            etat.className = "status ok";
            etat.textContent = "Serveur connecté";

            document.getElementById("resultatAnalyse").textContent =
                "Test réussi.\n\nRéponse du serveur :\n" +
                JSON.stringify(resultat, null, 2);

        } catch (erreur) {
            etat.className = "status error";
            etat.textContent = "Serveur inaccessible";

            document.getElementById("resultatAnalyse").textContent =
                "Erreur de connexion au serveur Node.js.\n\n" +
                "Vérifie :\n" +
                "- que le serveur est bien déployé ;\n" +
                "- que l’adresse API_URL est correcte ;\n" +
                "- que CORS est activé dans server.js ;\n" +
                "- que l’URL commence par https://.\n\n" +
                "Détail technique :\n" + erreur.message;
        }
    }

    async function analyserStrategie() {
        const params = lireParametres();
        const resultatBox = document.getElementById("resultatAnalyse");
        const etat = document.getElementById("etatServeur");

        resultatBox.textContent = "Analyse en cours...";
        etat.className = "status warning";
        etat.textContent = "Analyse en cours";

        try {
            const reponse = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(params)
            });

            if (!reponse.ok) {
                throw new Error("Erreur serveur : " + reponse.status);
            }

            const resultat = await reponse.json();

            etat.className = "status ok";
            etat.textContent = "Analyse terminée";

            resultatBox.textContent =
                "PARAMÈTRES ENVOYÉS\n" +
                "-----------------\n" +
                "Actif : " + params.libelleActif + "\n" +
                "Symbole : " + params.actif + "\n" +
                "Intervalle : " + params.libelleIntervalle + "\n" +
                "Indicateur : " + params.libelleIndicateur + "\n" +
                "Stratégie : " + params.libelleStrategie + "\n" +
                "Catégorie d’analyse : " + params.libelleCategorieAnalyse + "\n" +
                "Code catégorie : " + params.categorieAnalyse + "\n" +
                "Description catégorie : " + params.descriptionCategorieAnalyse + "\n" +
                "Mode avancé : " + params.libelleModeAnalyseAvancee + "\n" +
                "Code mode avancé : " + params.modeAnalyseAvancee + "\n\n" +

                "ACTIFS CONNEXES TRANSMIS\n" +
                "------------------------\n" +
                (
                    params.actifsConnexes.length > 0
                        ? params.actifsConnexes.map(function (a) {
                            return "- " + a.libelle;
                        }).join("\n")
                        : "Aucun actif connexe sélectionné."
                ) +
                "\n\n" +

                "GESTION DU RISQUE\n" +
                "-----------------\n" +
                "Capital : " + params.capital + "\n" +
                "Risque : " + params.risque + "%\n" +
                "Stop loss : " + params.stopLoss + "%\n" +
                "Take profit : " + params.takeProfit + "%\n" +
                "Levier : " + params.levier + "\n" +
                "Sens : " + params.libelleSens + "\n" +
                "Notes : " + (params.notes || "Aucune note") + "\n\n" +

                "RÉPONSE DU SERVEUR NODE.JS\n" +
                "--------------------------\n" +
                JSON.stringify(resultat, null, 2);

        } catch (erreur) {
            etat.className = "status error";
            etat.textContent = "Erreur d’analyse";

            resultatBox.textContent =
                "Impossible d’obtenir l’analyse.\n\n" +
                "Causes possibles :\n" +
                "- le serveur Node.js n’est pas lancé ;\n" +
                "- l’adresse API_URL est fausse ;\n" +
                "- Render n’a pas encore démarré le service ;\n" +
                "- CORS n’est pas activé ;\n" +
                "- la route /api/analyse n’existe pas.\n\n" +
                "Détail technique :\n" + erreur.message;
        }
    }

    function viderResultats() {
        document.getElementById("resultatAnalyse").textContent = "Aucune analyse lancée.";
        document.getElementById("etatServeur").className = "status neutral";
        document.getElementById("etatServeur").textContent = "Serveur non testé";
        scriptPineGenere = "";
    }

    window.addEventListener("load", function () {
        mettreAJourDescriptionCategorie();
        mettreAJourActifsConnexes();
        chargerGraphique();
    });
</script>

</body>
</html>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Créer des stratégies TradingView avec Pine Script</title>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      background: #0f172a;
      color: #e5e7eb;
    }

    header {
      background: linear-gradient(135deg, #111827, #1e3a8a);
      padding: 35px 20px;
      text-align: center;
      border-bottom: 3px solid #facc15;
    }

    header h1 {
      font-size: 2rem;
      color: #facc15;
      margin-bottom: 10px;
    }

    header p {
      max-width: 850px;
      margin: auto;
      color: #d1d5db;
      font-size: 1rem;
    }

    nav {
      background: #020617;
      padding: 12px;
      text-align: center;
      position: sticky;
      top: 0;
      z-index: 10;
      border-bottom: 1px solid #334155;
    }

    nav a {
      color: #facc15;
      text-decoration: none;
      margin: 0 10px;
      font-weight: bold;
      font-size: 0.95rem;
    }

    nav a:hover {
      color: #ffffff;
    }

    main {
      max-width: 1100px;
      margin: auto;
      padding: 25px 15px;
    }

    section {
      background: #111827;
      margin-bottom: 25px;
      padding: 22px;
      border-radius: 12px;
      border: 1px solid #334155;
      box-shadow: 0 4px 12px rgba(0,0,0,0.35);
    }

    h2 {
      color: #facc15;
      margin-bottom: 15px;
      font-size: 1.4rem;
      border-bottom: 1px solid #374151;
      padding-bottom: 8px;
    }

    h3 {
      color: #93c5fd;
      margin-top: 15px;
      margin-bottom: 10px;
    }

    p {
      margin-bottom: 12px;
    }

    ul,
    ol {
      margin-left: 22px;
      margin-bottom: 12px;
    }

    li {
      margin-bottom: 8px;
    }

    .important {
      background: #1e293b;
      border-left: 5px solid #facc15;
      padding: 14px;
      border-radius: 8px;
      margin: 15px 0;
    }

    .warning {
      background: #450a0a;
      border-left: 5px solid #ef4444;
      padding: 14px;
      border-radius: 8px;
      margin: 15px 0;
      color: #fee2e2;
    }

    .success {
      background: #052e16;
      border-left: 5px solid #22c55e;
      padding: 14px;
      border-radius: 8px;
      margin: 15px 0;
      color: #dcfce7;
    }

    .info {
      background: #082f49;
      border-left: 5px solid #06b6d4;
      padding: 14px;
      border-radius: 8px;
      margin: 15px 0;
      color: #e0f2fe;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 18px;
      margin-top: 15px;
    }

    .card {
      background: #020617;
      padding: 18px;
      border-radius: 10px;
      border: 1px solid #334155;
    }

    .card h3 {
      color: #facc15;
      margin-bottom: 10px;
    }

    pre {
      background: #020617;
      color: #d1fae5;
      padding: 18px;
      border-radius: 10px;
      overflow-x: auto;
      border: 1px solid #334155;
      font-size: 0.9rem;
      margin-top: 15px;
    }

    code {
      font-family: Consolas, monospace;
    }

    .btn,
    .btn-guide {
      display: inline-block;
      background: #facc15;
      color: #111827;
      padding: 12px 18px;
      border-radius: 8px;
      font-weight: bold;
      text-decoration: none;
      margin-top: 10px;
      border: none;
      cursor: pointer;
    }

    .btn:hover,
    .btn-guide:hover {
      background: #fde047;
    }

    .guide-section {
      margin-top: 35px;
      background: #111827;
    }

    .guide-intro {
      background: #1e293b;
      border-left: 5px solid #38bdf8;
      padding: 14px;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .guide-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 18px;
      margin-top: 15px;
    }

    .guide-card {
      background: #020617;
      padding: 18px;
      border-radius: 10px;
      border: 1px solid #334155;
    }

    .guide-card img {
      width: 100%;
      max-height: 220px;
      object-fit: cover;
      border-radius: 10px;
      border: 1px solid #334155;
      margin-bottom: 12px;
    }

    .copy-zone {
      background: #020617;
      color: #d1fae5;
      padding: 14px;
      border-radius: 10px;
      overflow-x: auto;
      border: 1px solid #334155;
      font-size: 0.88rem;
      margin-top: 12px;
      margin-bottom: 12px;
      white-space: pre-wrap;
    }

    .guide-success {
      margin-top: 25px;
      padding: 18px;
      background: #052e16;
      border-left: 5px solid #22c55e;
      border-radius: 10px;
    }

    .guide-warning {
      margin-top: 25px;
      padding: 18px;
      background: #450a0a;
      border-left: 5px solid #ef4444;
      border-radius: 10px;
      color: #fee2e2;
    }

    .method-box {
      background: #082f49;
      border-left: 5px solid #06b6d4;
      padding: 18px;
      border-radius: 10px;
      margin-top: 18px;
    }

    .method-steps {
      counter-reset: step-counter;
      list-style: none;
      margin-left: 0;
    }

    .method-steps li {
      counter-increment: step-counter;
      background: #020617;
      border: 1px solid #334155;
      padding: 14px;
      border-radius: 10px;
      margin-bottom: 12px;
      position: relative;
      padding-left: 52px;
    }

    .method-steps li::before {
      content: counter(step-counter);
      position: absolute;
      left: 15px;
      top: 14px;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #facc15;
      color: #111827;
      font-weight: bold;
      text-align: center;
      line-height: 26px;
    }

    .keyboard {
      display: inline-block;
      background: #111827;
      border: 1px solid #475569;
      color: #facc15;
      padding: 3px 8px;
      border-radius: 6px;
      font-family: Consolas, monospace;
      font-weight: bold;
    }

    footer {
      text-align: center;
      padding: 22px;
      background: #020617;
      color: #9ca3af;
      border-top: 1px solid #334155;
      font-size: 0.9rem;
    }

    @media (max-width: 600px) {
      header h1 {
        font-size: 1.5rem;
      }

      nav a {
        display: inline-block;
        margin: 6px;
        font-size: 0.85rem;
      }

      section {
        padding: 17px;
      }

      pre,
      .copy-zone {
        font-size: 0.78rem;
      }
    }
  </style>
</head>

<body>

<header>
  <h1>Créer des stratégies pour TradingView</h1>
  <p>
    Page pédagogique pour comprendre comment créer, tester et améliorer des scripts de stratégies
    avec Pine Script dans TradingView.
  </p>
</header>

<nav>
  <a href="#intro">Introduction</a>
  <a href="#difference">Indicateur ou stratégie</a>
  <a href="#elements">Éléments clés</a>
  <a href="#exemples">Exemples</a>
  <a href="#script">Script Pine</a>
  <a href="#methode">Méthode</a>
  <a href="#risques">Risques</a>
  <a href="#guide-utilisation">Guide d’utilisation</a>
  <a href="#coller-script">Pine Editor</a>
  <a href="index.html">Retour</a>
</nav>

<main>

  <section id="intro">
    <h2>1. Introduction</h2>

    <p>
      TradingView permet d’analyser les marchés financiers avec des graphiques, des indicateurs
      techniques et des scripts personnalisés.
    </p>

    <p>
      Pour créer ses propres règles d’achat et de vente, on utilise le langage
      <strong>Pine Script</strong>. Ce langage permet de programmer des indicateurs,
      des alertes et des stratégies de trading.
    </p>

    <div class="important">
      Une stratégie TradingView ne sert pas seulement à afficher un signal.
      Elle permet aussi de tester automatiquement une méthode sur les données passées.
    </div>
  </section>

  <section id="difference">
    <h2>2. Différence entre indicateur et stratégie</h2>

    <div class="grid">
      <div class="card">
        <h3>Indicateur</h3>
        <p>
          Un indicateur affiche une information sur le graphique.
        </p>
        <ul>
          <li>RSI</li>
          <li>MACD</li>
          <li>Moyennes mobiles</li>
          <li>Bandes de Bollinger</li>
          <li>Supertrend</li>
        </ul>
        <p>
          Il aide à lire le marché, mais il ne simule pas automatiquement des achats ou des ventes.
        </p>
      </div>

      <div class="card">
        <h3>Stratégie</h3>
        <p>
          Une stratégie contient des règles précises.
        </p>
        <ul>
          <li>Condition d’achat</li>
          <li>Condition de vente</li>
          <li>Stop loss</li>
          <li>Take profit</li>
          <li>Gestion du risque</li>
        </ul>
        <p>
          Elle permet de faire un backtest pour mesurer les résultats d’une méthode.
        </p>
      </div>
    </div>
  </section>

  <section id="elements">
    <h2>3. Éléments essentiels d’une stratégie</h2>

    <p>
      Une bonne stratégie doit être construite avec des règles simples, testables et compréhensibles.
    </p>

    <ul>
      <li><strong>Actif :</strong> Bitcoin, Ethereum, or, Nasdaq, Apple, etc.</li>
      <li><strong>Unité de temps :</strong> 1 minute, 15 minutes, 1 heure, 1 jour.</li>
      <li><strong>Signal d’entrée :</strong> moment où la stratégie ouvre une position.</li>
      <li><strong>Signal de sortie :</strong> moment où la stratégie ferme la position.</li>
      <li><strong>Stop loss :</strong> limite de perte acceptée.</li>
      <li><strong>Take profit :</strong> objectif de gain.</li>
      <li><strong>Filtre de tendance :</strong> éviter d’acheter contre la tendance principale.</li>
      <li><strong>Gestion du capital :</strong> ne jamais risquer trop sur une seule position.</li>
    </ul>
  </section>

  <section id="exemples">
    <h2>4. Exemples de stratégies possibles</h2>

    <div class="grid">
      <div class="card">
        <h3>Stratégie RSI</h3>
        <p>
          Achat lorsque le RSI sort d’une zone de survente.
          Vente lorsque le RSI entre en zone de surachat.
        </p>
      </div>

      <div class="card">
        <h3>Stratégie MACD</h3>
        <p>
          Achat lorsque la ligne MACD croise à la hausse sa ligne de signal.
          Vente lorsque le croisement inverse apparaît.
        </p>
      </div>

      <div class="card">
        <h3>Stratégie EMA</h3>
        <p>
          Achat lorsque une moyenne mobile courte passe au-dessus d’une moyenne mobile longue.
          Vente dans le cas inverse.
        </p>
      </div>

      <div class="card">
        <h3>Stratégie Supertrend</h3>
        <p>
          Achat lorsque le Supertrend passe en tendance haussière.
          Vente lorsqu’il passe en tendance baissière.
        </p>
      </div>
    </div>
  </section>

  <section id="script">
    <h2>5. Exemple simple de stratégie Pine Script</h2>

    <p>
      Voici un exemple de stratégie basée sur deux moyennes mobiles exponentielles.
      Elle achète quand la moyenne courte croise au-dessus de la moyenne longue.
      Elle vend quand le croisement inverse apparaît.
    </p>

<pre><code>//@version=5
strategy("Stratégie simple EMA", overlay=true)

// Paramètres
emaCourte = input.int(20, title="EMA courte")
emaLongue = input.int(50, title="EMA longue")

// Calcul des moyennes mobiles
ema20 = ta.ema(close, emaCourte)
ema50 = ta.ema(close, emaLongue)

// Affichage sur le graphique
plot(ema20, color=color.green, title="EMA courte")
plot(ema50, color=color.red, title="EMA longue")

// Conditions d'achat et de vente
achat = ta.crossover(ema20, ema50)
vente = ta.crossunder(ema20, ema50)

// Exécution des ordres
if achat
    strategy.entry("Achat", strategy.long)

if vente
    strategy.close("Achat")
</code></pre>

    <div class="important">
      Ce script est volontairement simple. Il sert de base pédagogique.
      Il ne doit pas être utilisé seul pour trader avec de l’argent réel.
    </div>
  </section>

  <section id="methode">
    <h2>6. Méthode pour créer une stratégie</h2>

    <h3>Étape 1 : définir l’idée</h3>
    <p>
      Il faut commencer par une règle claire :
      acheter quand tel signal apparaît, vendre quand tel autre signal apparaît.
    </p>

    <h3>Étape 2 : choisir les indicateurs</h3>
    <p>
      Par exemple : RSI, MACD, EMA, volume, Supertrend ou zones de support et résistance.
    </p>

    <h3>Étape 3 : écrire le script Pine</h3>
    <p>
      Le script doit traduire les règles de trading en conditions logiques.
    </p>

    <h3>Étape 4 : tester la stratégie</h3>
    <p>
      TradingView permet de faire un backtest pour voir les performances passées.
    </p>

    <h3>Étape 5 : corriger et améliorer</h3>
    <p>
      Une stratégie doit être testée sur plusieurs actifs, plusieurs périodes et plusieurs conditions de marché.
    </p>
  </section>

  <section id="risques">
    <h2>7. Attention aux risques</h2>

    <div class="warning">
      Le trading comporte un risque élevé de perte. Une stratégie rentable dans le passé
      peut devenir mauvaise dans le futur. Aucun script ne garantit un gain.
    </div>

    <p>
      Une stratégie sérieuse doit toujours intégrer :
    </p>

    <ul>
      <li>une limite de perte ;</li>
      <li>une taille de position raisonnable ;</li>
      <li>un objectif clair ;</li>
      <li>un test sur plusieurs périodes ;</li>
      <li>une validation avant toute utilisation réelle.</li>
    </ul>

    <a href="https://www.tradingview.com/pine-script-docs/" target="_blank" class="btn">
      Documentation Pine Script
    </a>
  </section>

  <section id="guide-utilisation" class="guide-section">
    <h2>8. Guide d’utilisation : ouvrir TradingView avec un script Pine Script</h2>

    <p class="guide-intro">
      Cette section explique comment utiliser une page HTML pour préparer un script Pine Script,
      le copier, l’ouvrir dans TradingView, puis l’ajouter ou le mettre à jour sur le graphique.
      Il faut retenir une limite importante : TradingView permet d’ouvrir un graphique avec un actif
      et une unité de temps, mais ne permet pas d’injecter automatiquement un script Pine Script privé
      dans Pine Editor depuis une simple adresse URL.
    </p>

    <div class="guide-grid">

      <div class="guide-card">
        <img src="img/tradingview-chart.jfif" alt="Graphique TradingView avec un actif sélectionné">

        <h3>1. Ouvrir TradingView avec un actif</h3>

        <p>
          Il est possible d’ouvrir TradingView directement avec un symbole, par exemple Bitcoin,
          Ethereum, l’or, le Nasdaq ou une action comme Apple.
        </p>

        <div class="copy-zone">
https://www.tradingview.com/chart/?symbol=BINANCE:BTCUSDT&interval=60
        </div>

        <p>
          Cette méthode ouvre le graphique de l’actif choisi avec une unité de temps donnée.
          Par contre, elle ne charge pas automatiquement un script Pine Script personnalisé.
        </p>

        <a class="btn-guide"
           href="https://www.tradingview.com/chart/?symbol=BINANCE:BTCUSDT&interval=60"
           target="_blank">
          Ouvrir Bitcoin dans TradingView
        </a>
      </div>

      <div class="guide-card">
        <img src="img/pine-editor.jfif" alt="Éditeur Pine Script dans TradingView">

        <h3>2. Limite importante</h3>

        <p>
          On ne peut pas appeler TradingView avec un paramètre contenant directement le code Pine Script.
          Une adresse comme celle-ci ne fonctionne pas :
        </p>

        <div class="copy-zone">
https://www.tradingview.com/chart/?script=mon_script_pine
        </div>

        <p>
          Le Pine Editor doit être ouvert dans TradingView.
          Le script doit ensuite être collé, sauvegardé, puis ajouté au graphique manuellement.
        </p>
      </div>

      <div class="guide-card">
        <img src="img/copier-script.jfif" alt="Copie d’un script Pine Script depuis une page HTML">

        <h3>3. Première utilisation du script</h3>

        <p>
          Lorsqu’un script Pine Script est créé pour la première fois, la bonne méthode est la suivante :
        </p>

        <ol>
          <li>Copier le script depuis la page HTML.</li>
          <li>Ouvrir TradingView.</li>
          <li>Ouvrir Pine Editor.</li>
          <li>Coller le script dans Pine Editor.</li>
          <li>Cliquer sur <strong>Save</strong> ou <strong>Sauvegarder</strong>.</li>
          <li>Cliquer sur <strong>Add to chart</strong> ou <strong>Ajouter au graphique</strong>.</li>
        </ol>

        <div class="important">
          Il ne faut pas seulement sauvegarder le script. Il faut aussi l’ajouter au graphique.
        </div>
      </div>

      <div class="guide-card">
        <img src="img/backtest-strategy.jfif" alt="Test d’une stratégie dans TradingView">

        <h3>4. Mettre à jour un script déjà ajouté</h3>

        <p>
          Si le script est déjà affiché sur le graphique et que tu modifies son code,
          il n’est pas nécessaire de rafraîchir la page du navigateur.
        </p>

        <ol>
          <li>Modifier le code dans Pine Editor.</li>
          <li>Cliquer sur <strong>Save</strong> ou <strong>Sauvegarder</strong>.</li>
          <li>Cliquer sur <strong>Update on chart</strong> ou <strong>Mettre à jour sur le graphique</strong>, si ce bouton apparaît.</li>
          <li>Si ce bouton n’apparaît pas, supprimer l’ancien indicateur du graphique.</li>
          <li>Cliquer de nouveau sur <strong>Add to chart</strong>.</li>
        </ol>
      </div>

    </div>

    <div class="info">
      <h3>Faut-il rafraîchir la page TradingView ?</h3>

      <p>
        Non. Rafraîchir la page du navigateur n’est pas la bonne méthode.
        Le bon réflexe est d’utiliser les boutons de Pine Editor :
      </p>

      <div class="copy-zone">
Première utilisation :
Save
↓
Add to chart

Après modification du script :
Save
↓
Update on chart

Si Update on chart n’apparaît pas :
supprimer l’ancien indicateur
↓
Add to chart
      </div>
    </div>

    <div class="guide-success">
      <h3>Exemple pratique intégré</h3>

      <p>
        Le bouton ci-dessous copie un exemple simple de script Pine Script basé sur le RSI.
        Après la copie, ouvre TradingView, puis colle le code dans Pine Editor.
      </p>

      <button class="btn-guide" onclick="copierScriptPine()">
        Copier le script Pine Script
      </button>

      <a class="btn-guide"
         href="https://www.tradingview.com/chart/?symbol=BINANCE:BTCUSDT&interval=60"
         target="_blank">
        Ouvrir TradingView
      </a>

<pre id="script-pine-guide" class="copy-zone">
//@version=5
indicator("Exemple RSI pédagogique", overlay=false)

rsi = ta.rsi(close, 14)

plot(rsi, title="RSI", color=color.blue)

hline(70, "Zone de surachat")
hline(30, "Zone de survente")
hline(50, "Zone neutre")
</pre>
    </div>

    <div class="guide-warning">
      <h3>Attention</h3>

      <p>
        Ce script est fourni uniquement à des fins pédagogiques.
        Il ne constitue pas un conseil financier. Une stratégie doit toujours être testée,
        corrigée et validée avant toute utilisation réelle.
      </p>
    </div>
  </section>

  <section id="coller-script">
    <h2>9. Ouvrir Pine Editor dans TradingView</h2>

    <p>
      Après avoir ouvert TradingView avec l’actif sélectionné, il faut ouvrir
      <strong>Pine Editor</strong> pour coller, sauvegarder et appliquer le script Pine Script.
    </p>

    <div class="important">
      TradingView ne permet pas à une page HTML externe de coller automatiquement
      le script dans Pine Editor. Le collage doit être fait manuellement.
    </div>

    <div class="method-box">
      <h3>Méthode actuelle recommandée</h3>

      <ol class="method-steps">
        <li>
          Ouvrir TradingView avec l’actif choisi depuis le bouton de la page principale.
        </li>

        <li>
          Vérifier que le graphique complet est ouvert.
        </li>

        <li>
          Ouvrir <strong>Pine Editor</strong> dans l’interface TradingView.
        </li>

        <li>
          Dans l’éditeur, sélectionner tout le contenu existant avec
          <span class="keyboard">Ctrl + A</span>.
        </li>

        <li>
          Coller le script copié avec
          <span class="keyboard">Ctrl + V</span>.
        </li>

        <li>
          Cliquer sur <strong>Save</strong> ou <strong>Sauvegarder</strong>.
        </li>

        <li>
          Pour une première utilisation, cliquer sur <strong>Add to chart</strong>
          ou <strong>Ajouter au graphique</strong>.
        </li>

        <li>
          Après une modification du code, cliquer sur <strong>Update on chart</strong>
          ou <strong>Mettre à jour sur le graphique</strong>, si ce bouton apparaît.
        </li>

        <li>
          Si le bouton de mise à jour n’apparaît pas, supprimer l’ancien indicateur du graphique,
          puis cliquer de nouveau sur <strong>Add to chart</strong>.
        </li>
      </ol>
    </div>

    <div class="guide-success">
      <h3>Résumé rapide</h3>

      <p>
        La méthode à retenir est la suivante :
      </p>

      <div class="copy-zone">
Ouvrir TradingView
↓
Ouvrir Pine Editor
↓
Ctrl + A
↓
Ctrl + V
↓
Save / Sauvegarder
↓
Add to chart / Ajouter au graphique
      </div>
    </div>

    <div class="success">
      <h3>Après modification du script</h3>

      <p>
        Si le script est déjà présent sur le graphique, il ne faut pas recharger la page.
        Il faut faire :
      </p>

      <div class="copy-zone">
Modifier le code
↓
Save / Sauvegarder
↓
Update on chart / Mettre à jour sur le graphique
      </div>
    </div>

    <div class="warning">
      Si l’icône ou l’onglet Pine Editor n’apparaît pas, il faut vérifier que tu es connecté
      à ton compte TradingView, que tu utilises un ordinateur et que le graphique complet est bien ouvert.
      Sur téléphone, Pine Editor peut être absent ou difficile à trouver.
    </div>
  </section>

</main>

<footer>
  <p>
    Page pédagogique consacrée à la création de stratégies TradingView avec Pine Script.
  </p>
  <p>
    Auteur : Hocine Korichi, ingénieur. Avril 2026.
  </p>
</footer>

<script>
function copierScriptPine() {
  const script = document.getElementById("script-pine-guide").innerText;

  navigator.clipboard.writeText(script)
    .then(function () {
      alert("Script Pine Script copié. Collez-le maintenant dans Pine Editor sur TradingView.");
    })
    .catch(function () {
      alert("La copie automatique a échoué. Sélectionnez le script manuellement.");
    });
}
</script>

</body>
</html>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Décision IA Trading</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #07111f;
            color: white;
        }

        header {
            background: #0f172a;
            border-bottom: 2px solid #00d9ff;
            padding: 8px 12px;
        }

        .header-bar {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 40px;
        }

        .header-actions {
            position: absolute;
            left: 0;
            top: 0;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        h1 {
            color: #00d9ff;
            margin: 0;
            font-size: 22px;
            text-align: center;
        }

        .btn-accueil {
            background: #334155;
            color: white;
            margin: 0;
            padding: 9px 14px;
        }

        .btn-analyse-top {
            background: #facc15;
            color: #1a1300;
            margin: 0;
            padding: 9px 14px;
        }

        main {
            max-width: 1200px;
            margin: auto;
            padding: 10px 14px 16px;
        }

        .card {
            background: #111827;
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 12px;
            margin-bottom: 10px;
        }

        h2 {
            color: #38bdf8;
            margin-top: 0;
            margin-bottom: 10px;
            font-size: 18px;
        }

        label {
            display: block;
            margin-bottom: 4px;
            color: #38bdf8;
            font-weight: bold;
            font-size: 12px;
        }

        input,
        select {
            width: 100%;
            padding: 6px 8px;
            background: #020617;
            border: 1px solid #334155;
            border-radius: 7px;
            color: white;
            font-size: 14px;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px 12px;
        }

        .field {
            margin-bottom: 6px;
        }

        pre {
            background: #020617;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 12px;
            color: #d1d5db;
            white-space: pre-wrap;
            word-break: break-word;
            min-height: 150px;
            max-height: 440px;
            overflow: auto;
        }

        button {
            border: none;
            border-radius: 8px;
            padding: 8px 12px;
            font-weight: bold;
            cursor: pointer;
            background: #38bdf8;
            color: #00111a;
            margin-right: 8px;
            margin-bottom: 8px;
        }

        button:hover {
            opacity: 0.85;
        }

        .btn-retour {
            background: #334155;
            color: white;
        }

        .btn-local {
            background: #22c55e;
            color: #03130a;
        }

        .btn-analyse {
            background: #facc15;
            color: #1a1300;
        }

        .decision {
            font-size: 28px;
            font-weight: bold;
            padding: 12px;
            border-radius: 12px;
            text-align: center;
            margin-bottom: 10px;
        }

        .achat {
            background: #064e3b;
            color: #86efac;
        }

        .vente {
            background: #7f1d1d;
            color: #fecaca;
        }

        .attente {
            background: #713f12;
            color: #fde68a;
        }

        .erreur {
            background: #7f1d1d;
            color: #fecaca;
        }

        .info {
            color: #cbd5e1;
            font-size: 13px;
            line-height: 1.5;
        }

        .file-info {
            background: #020617;
            border: 1px solid #334155;
            border-radius: 8px;
            padding: 8px 10px;
            color: #facc15;
            font-size: 12px;
            margin-top: 4px;
        }

        @media (max-width: 800px) {
            .grid {
                grid-template-columns: 1fr;
            }

            button {
                width: 100%;
                margin-right: 0;
            }

            .header-bar {
                align-items: stretch;
                justify-content: flex-start;
                flex-direction: column;
                gap: 8px;
            }

            .header-actions {
                position: static;
                width: 100%;
                flex-direction: column;
                gap: 8px;
            }

            .btn-accueil,
            .btn-analyse-top {
                width: 100%;
            }

            h1 {
                font-size: 20px;
            }

            .decision {
                font-size: 22px;
            }
        }
    </style>
</head>

<body>

<header>
    <div class="header-bar">
        <div class="header-actions">
            <button id="btn-retour"
                    type="button"
                    class="btn-retour btn-accueil"
                    onclick="retour()">
                Accueil
            </button>

            <button id="btn-analyser"
                    type="button"
                    class="btn-analyse btn-analyse-top"
                    onclick="analyserDecisionDepuisBouton()"
                    title="Relit les champs modifiés et relance l’analyse.">
                Analyser de nouveau
            </button>

            <button id="btn-rafraichir-marche"
                    type="button"
                    class="btn-local btn-analyse-top"
                    onclick="rafraichirDonneesMarcheDecision(true)"
                    title="Récupère automatiquement le prix actuel, le support, la résistance et les indicateurs depuis le serveur.">
                Actualiser marché
            </button>
        </div>

        <h1>Décision IA Trading</h1>
    </div>
</header>


<main>

    <section class="card">
        <h2>Paramètres de configuration</h2>

        <div class="grid">
            <div class="field">
                <label for="champ-actif">Actif</label>
                <input type="text" id="champ-actif" placeholder="Exemple : BINANCE:BTCUSDT">
            </div>

            <div class="field">
                <label for="champ-indicateur">Indicateur</label>
                <input type="text" id="champ-indicateur" placeholder="Exemple : RSI, MACD, EMA">
            </div>

            <div class="field">
                <label for="champ-intervalle">Intervalle</label>
                <input type="text" id="champ-intervalle" placeholder="Exemple : 1, 5, 60, D, W">
            </div>

            <div class="field">
                <label for="champ-categorie">Catégorie</label>
                <input type="text" id="champ-categorie" placeholder="Exemple : analyse_technique">
            </div>
        </div>
    </section>

    <section class="card">
        <h2>Données concrètes du marché</h2>

        <div class="grid">
            <div class="field">
                <label for="prix-actuel">Prix actuel</label>
                <input type="number" id="prix-actuel" placeholder="Exemple : 104500" step="0.01">
            </div>

            <div class="field">
                <label for="support">Support principal</label>
                <input type="number" id="support" placeholder="Exemple : 102800" step="0.01">
            </div>

            <div class="field">
                <label for="resistance">Résistance principale</label>
                <input type="number" id="resistance" placeholder="Exemple : 106200" step="0.01">
            </div>

            <div class="field">
                <label for="rsi">RSI</label>
                <input type="number" id="rsi" placeholder="Exemple : 58" min="0" max="100" step="0.1">
            </div>

            <div class="field">
                <label for="volume">Volume</label>
                <select id="volume">
                    <option value="neutre">Neutre</option>
                    <option value="hausse">En hausse</option>
                    <option value="baisse">En baisse</option>
                    <option value="fort">Fort volume</option>
                    <option value="faible">Faible volume</option>
                </select>
            </div>

            <div class="field">
                <label for="tendance">Tendance</label>
                <select id="tendance">
                    <option value="neutre">Neutre</option>
                    <option value="haussiere">Haussière</option>
                    <option value="baissiere">Baissière</option>
                    <option value="range">Range / latérale</option>
                </select>
            </div>
        </div>
    </section>

    <section class="card">
        <h2>Gestion du risque</h2>

        <div class="grid">
            <div class="field">
                <label for="capital-compte">Capital du compte</label>
                <input type="number" id="capital-compte" placeholder="Exemple : 1000" step="0.01">
            </div>

            <div class="field">
                <label for="risque-position">Risque par position (%)</label>
                <input type="number" id="risque-position" placeholder="Exemple : 1" min="0" max="100" step="0.1">
            </div>

            <div class="field">
                <label for="montant-risque">Montant risqué</label>
                <input type="number" id="montant-risque" placeholder="Exemple : 10" step="0.01">
            </div>

            <div class="field">
                <label for="stop-loss">Stop loss manuel</label>
                <input type="number" id="stop-loss" placeholder="Exemple : 102800" step="0.01">
            </div>

            <div class="field">
                <label for="take-profit-1">Take profit 1 manuel</label>
                <input type="number" id="take-profit-1" placeholder="Exemple : 106500" step="0.01">
            </div>

            <div class="field">
                <label for="take-profit-2">Take profit 2 manuel</label>
                <input type="number" id="take-profit-2" placeholder="Exemple : 108000" step="0.01">
            </div>

            <div class="field">
                <label for="levier">Effet de levier</label>
                <input type="number" id="levier" placeholder="Exemple : 1" min="1" step="1">
            </div>

            <div class="field">
                <label for="type-position">Type de position</label>
                <select id="type-position">
                    <option value="spot">Spot</option>
                    <option value="long">Long</option>
                    <option value="short">Short</option>
                    <option value="futures">Futures</option>
                </select>
            </div>

            <div class="field">
                <label for="profil-risque">Profil de risque</label>
                <select id="profil-risque">
                    <option value="prudent">Prudent</option>
                    <option value="normal" selected>Normal</option>
                    <option value="agressif">Agressif</option>
                </select>
            </div>
        </div>
    </section>

    <div id="decision-box" class="decision attente">
        Aucune décision
    </div>

    <div class="card">
 

        <!--
        Bouton désactivé volontairement :
        la sauvegarde locale est maintenant chargée automatiquement au démarrage de la page.

        <button id="btn-local"
                type="button"
                class="btn-local"
                onclick="chargerConfigurationLocale()"
                title="Charge la dernière configuration sauvegardée dans le navigateur.">
            Charger sauvegarde locale
        </button>
        -->
        <!-- Bouton Retour déplacé dans l’en-tête et renommé Accueil. -->
        <!-- Bouton « Analyser de nouveau » déplacé dans l’en-tête, juste après « Accueil ». -->
        <input
            type="file"
            id="fichier-json"
            accept="application/json,.json"
            style="display:none;"
            onchange="chargerConfigurationDepuisFichier(event)"
        >

        <div id="fichier-selectionne" class="file-info">
            Aucun fichier JSON chargé.
        </div>

    </div>

    <!--
    Bloc masqué : Configuration chargée
    Le champ <pre id="configuration-json"> est conservé dans la page,
    mais il est invisible pour ne pas afficher le JSON à l'écran.
    -->
    <section class="card" style="display:none;">
        <h2>Configuration chargée</h2>
        <pre id="configuration-json">Aucune configuration chargée.</pre>
    </section>

    <section class="card">
        <h2>Analyse et recommandations concrètes</h2>
        <pre id="resultat-analyse">Aucune analyse lancée.</pre>
    </section>

</main>

<script>
    let configuration = null;

    function afficherDecision(decision, classe) {
        const box = document.getElementById("decision-box");

        if (!box) {
            alert("Erreur : zone decision-box introuvable.");
            return;
        }

        box.className = "decision " + classe;
        box.textContent = decision;
    }

    function afficherConfiguration(config) {
        document.getElementById("configuration-json").textContent =
            JSON.stringify(config, null, 4);
    }

    function afficherResultatAnalyse(texte) {
        document.getElementById("resultat-analyse").textContent = texte;
    }

    function nombreChamp(id) {
        const element = document.getElementById(id);

        if (!element || element.value === "") {
            return null;
        }

        const valeur = Number(element.value);

        if (Number.isNaN(valeur)) {
            return null;
        }

        return valeur;
    }

    function valeurChamp(id, valeurDefaut = "") {
        const element = document.getElementById(id);
        return element ? element.value : valeurDefaut;
    }

    function definirValeurChamp(id, valeur) {
        const element = document.getElementById(id);

        if (!element) {
            return;
        }

        if (valeur !== undefined && valeur !== null) {
            element.value = valeur;
        }
    }

    function premiereValeurValide(...valeurs) {
        for (const valeur of valeurs) {
            if (valeur !== undefined && valeur !== null && valeur !== "") {
                return valeur;
            }
        }

        return null;
    }

    function estNombreValide(valeur) {
        const nombre = Number(valeur);
        return Number.isFinite(nombre) && nombre !== 0;
    }

    function donneesMarcheSuffisantes(config) {
        if (!config || !config.marche) {
            return false;
        }

        return (
            estNombreValide(config.marche.prixActuel) &&
            estNombreValide(config.marche.support) &&
            estNombreValide(config.marche.resistance)
        );
    }

    function normaliserVolumeMarche(volume, volumeMoyen20) {
        const texte = String(volume || "").toLowerCase();

        if (["neutre", "hausse", "baisse", "fort", "faible"].includes(texte)) {
            return texte;
        }

        const valeurVolume = Number(volume);
        const valeurMoyenne = Number(volumeMoyen20);

        if (Number.isFinite(valeurVolume) && Number.isFinite(valeurMoyenne) && valeurMoyenne > 0) {
            const ratio = valeurVolume / valeurMoyenne;

            if (ratio >= 1.5) return "fort";
            if (ratio >= 1.1) return "hausse";
            if (ratio <= 0.6) return "faible";
            if (ratio <= 0.9) return "baisse";
        }

        return "neutre";
    }

    function normaliserTendanceMarche(tendance) {
        const texte = String(tendance || "").toLowerCase();

        if (["haussiere", "baissiere", "range", "neutre"].includes(texte)) {
            return texte;
        }

        if (texte.includes("haus")) return "haussiere";
        if (texte.includes("bais")) return "baissiere";
        if (texte.includes("lat") || texte.includes("range")) return "range";

        return "neutre";
    }

    function convertirSensEnTypePosition(sens) {
        if (sens === "achat") return "long";
        if (sens === "vente") return "short";
        return "spot";
    }

    function remplirChampsConfigurationPrincipale(config) {
        if (!config) {
            return;
        }

        const graphique = config.graphique || {};
        const analyseIA = config.analyseIA || {};

        definirValeurChamp("champ-actif", graphique.actif || "");
        definirValeurChamp("champ-indicateur", graphique.indicateur || "");
        definirValeurChamp("champ-intervalle", graphique.intervalle || "");
        definirValeurChamp("champ-categorie", analyseIA.categorie || "");
    }

    function ajouterConfigurationPrincipaleDansJSON() {
        if (!configuration) {
            return;
        }

        if (!configuration.graphique) {
            configuration.graphique = {};
        }

        if (!configuration.analyseIA) {
            configuration.analyseIA = {};
        }

        configuration.graphique.actif =
            valeurChamp("champ-actif", configuration.graphique.actif || "");

        configuration.graphique.indicateur =
            valeurChamp("champ-indicateur", configuration.graphique.indicateur || "");

        configuration.graphique.intervalle =
            valeurChamp("champ-intervalle", configuration.graphique.intervalle || "");

        configuration.analyseIA.categorie =
            valeurChamp("champ-categorie", configuration.analyseIA.categorie || "");

        localStorage.setItem("configurationTradingViewIA", JSON.stringify(configuration));

        afficherConfiguration(configuration);
    }

    function ouvrirChoixFichierJSON() {
        const input = document.getElementById("fichier-json");

        if (!input) {
            alert("Erreur : champ fichier-json introuvable.");
            return;
        }

        input.click();
    }

    function chargerConfiguration() {
        ouvrirChoixFichierJSON();
    }

    async function chargerConfigurationDepuisFichier(event) {
        const fichier = event.target.files[0];

        if (!fichier) {
            return;
        }

        if (!fichier.name.toLowerCase().endsWith(".json")) {
            afficherDecision("Fichier invalide", "erreur");

            afficherConfiguration({
                erreur: "Le fichier choisi n’est pas un fichier JSON."
            });

            afficherResultatAnalyse("Impossible d’analyser ce fichier.");
            return;
        }

        const lecteur = new FileReader();

        lecteur.onload = async function(e) {
            try {
                const contenu = e.target.result;
                const objet = JSON.parse(contenu);

                if (!objet.graphique) {
                    throw new Error("Le fichier JSON ne contient pas de bloc 'graphique'.");
                }

                configuration = objet;

                remplirChampsConfigurationPrincipale(configuration);
                remplirChampsMarcheDepuisConfiguration(configuration);
                afficherConfiguration(configuration);

                localStorage.setItem("configurationTradingViewIA", JSON.stringify(configuration));

                document.getElementById("fichier-selectionne").textContent =
                    "Fichier chargé : " + fichier.name;

                afficherDecision("Configuration JSON chargée", "attente");

                afficherResultatAnalyse(
                    "Configuration JSON chargée.\n" +
                    "Les champs du formulaire ont été remplis avec les valeurs du JSON."
                );

            } catch (erreur) {
                configuration = null;

                afficherDecision("JSON invalide", "erreur");

                document.getElementById("configuration-json").textContent =
                    "Erreur : fichier JSON invalide.\n\n" +
                    "Détail technique : " + erreur.message;

                afficherResultatAnalyse(
                    "Impossible d’analyser une configuration invalide."
                );
            }

            event.target.value = "";
        };

        lecteur.readAsText(fichier);
    }

    async function chargerConfigurationLocale(afficherAlerte = true) {
        const data = localStorage.getItem("configurationTradingViewIA");

        if (!data) {
            if (afficherAlerte) {
                alert("Aucune sauvegarde locale trouvée.");
            }

            afficherDecision("Aucune sauvegarde locale", "attente");

            afficherResultatAnalyse(
                "Aucune sauvegarde locale trouvée.\n\n" +
                "Tu peux charger un fichier JSON avec le bouton « Charger configuration JSON »."
            );

            return;
        }

        try {
            configuration = JSON.parse(data);

            if (!configuration.graphique) {
                throw new Error("La sauvegarde locale ne contient pas de bloc 'graphique'.");
            }

            remplirChampsConfigurationPrincipale(configuration);
            remplirChampsMarcheDepuisConfiguration(configuration);
            afficherConfiguration(configuration);

            document.getElementById("fichier-selectionne").textContent =
                "Configuration chargée automatiquement depuis la sauvegarde locale.";

            afficherDecision("Configuration chargée automatiquement", "attente");

            if (!donneesMarcheSuffisantes(configuration)) {
                afficherResultatAnalyse(
                    "Configuration locale chargée automatiquement.\n" +
                    "Les données de marché sont absentes ou incomplètes.\n\n" +
                    "Actualisation automatique via /api/marche en cours..."
                );

                await rafraichirDonneesMarcheDecision(true);
                return;
            }

            ajouterMarcheDansConfiguration();
            afficherConfiguration(configuration);

            afficherResultatAnalyse(
                "Configuration locale chargée automatiquement.\n" +
                "Tous les champs disponibles ont été remplis avec les valeurs sauvegardées.\n\n" +
                "Analyse automatique en cours..."
            );

            /*
                Analyse automatique après chargement local.
                Le bouton « Analyser décision » reste disponible
                si tu modifies ensuite les champs manuellement.
            */
            analyserDecision();

        } catch (erreur) {
            configuration = null;

            afficherDecision("Sauvegarde invalide", "erreur");

            afficherResultatAnalyse(
                "Sauvegarde locale invalide.\n\n" +
                "Détail technique : " + erreur.message
            );

            if (afficherAlerte) {
                alert("Sauvegarde locale invalide.");
            }
        }
    }

    function obtenirApiAnalyseDepuisConfiguration() {
        if (configuration && configuration.serveur && configuration.serveur.apiAnalyse) {
            return configuration.serveur.apiAnalyse;
        }

        return "https://trading-g8ie.onrender.com/api/analyse";
    }

    function obtenirApiMarcheDepuisConfiguration() {
        if (configuration && configuration.serveur && configuration.serveur.apiMarche) {
            return configuration.serveur.apiMarche;
        }

        const apiAnalyse = obtenirApiAnalyseDepuisConfiguration();
        return apiAnalyse.replace(/\/api\/analyse\/?$/, "/api/marche");
    }

    async function rafraichirDonneesMarcheDecision(analyserApresActualisation = false) {
        if (!configuration || !configuration.graphique) {
            afficherDecision("Aucune configuration valide", "erreur");
            afficherResultatAnalyse("Aucune configuration valide à actualiser.");
            return;
        }

        ajouterConfigurationPrincipaleDansJSON();

        const apiMarche = obtenirApiMarcheDepuisConfiguration();

        try {
            afficherDecision("Actualisation marché...", "attente");

            afficherResultatAnalyse(
                "Actualisation des données concrètes du marché en cours...\n\n" +
                "Adresse appelée :\n" +
                apiMarche
            );

            const reponse = await fetch(apiMarche, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-store",
                body: JSON.stringify({
                    actif: configuration.graphique.actif,
                    intervalle: configuration.graphique.intervalle,
                    indicateur: configuration.graphique.indicateur,
                    categorieAnalyse: configuration.analyseIA?.categorie || "analyse_technique"
                })
            });

            const texte = await reponse.text();
            let donneesMarche;

            try {
                donneesMarche = JSON.parse(texte);
            } catch (erreurJson) {
                throw new Error("Le serveur n’a pas retourné du JSON. Réponse reçue : " + texte);
            }

            if (!reponse.ok) {
                throw new Error("Réponse HTTP " + reponse.status + " : " + JSON.stringify(donneesMarche));
            }

            if (donneesMarche.ok === false) {
                throw new Error(donneesMarche.message || donneesMarche.detail || "Données de marché insuffisantes.");
            }

            const volumeEtat = normaliserVolumeMarche(
                donneesMarche.volume ?? configuration.marche?.volume,
                donneesMarche.volumeMoyen20 ?? configuration.marche?.volumeMoyen20
            );

            configuration.marche = {
                ...(configuration.marche || {}),
                prixActuel: donneesMarche.prixActuel ?? configuration.marche?.prixActuel ?? null,
                support: donneesMarche.support ?? configuration.marche?.support ?? null,
                resistance: donneesMarche.resistance ?? configuration.marche?.resistance ?? null,
                rsi: donneesMarche.rsi ?? configuration.marche?.rsi ?? null,
                volume: volumeEtat,
                volumeEtat: volumeEtat,
                volumeBrut: donneesMarche.volume ?? configuration.marche?.volumeBrut ?? null,
                volumeMoyen20: donneesMarche.volumeMoyen20 ?? configuration.marche?.volumeMoyen20 ?? null,
                tendance: normaliserTendanceMarche(donneesMarche.tendance ?? configuration.marche?.tendance ?? "neutre"),
                ema20: donneesMarche.ema20 ?? configuration.marche?.ema20 ?? null,
                ema50: donneesMarche.ema50 ?? configuration.marche?.ema50 ?? null,
                ema200: donneesMarche.ema200 ?? configuration.marche?.ema200 ?? null,
                macd: donneesMarche.macd ?? configuration.marche?.macd ?? null,
                signalMacd: donneesMarche.signalMacd ?? configuration.marche?.signalMacd ?? null,
                histogrammeMacd: donneesMarche.histogrammeMacd ?? configuration.marche?.histogrammeMacd ?? null,
                atr14: donneesMarche.atr14 ?? configuration.marche?.atr14 ?? null,
                plusBasRecent: donneesMarche.plusBasRecent ?? configuration.marche?.plusBasRecent ?? null,
                plusHautRecent: donneesMarche.plusHautRecent ?? configuration.marche?.plusHautRecent ?? null,
                source: donneesMarche.source ?? "serveur_nodejs",
                symboleSource: donneesMarche.symboleSource ?? configuration.marche?.symboleSource ?? null,
                intervalleSource: donneesMarche.intervalleSource ?? configuration.marche?.intervalleSource ?? null,
                api: apiMarche,
                dateMiseAJour: donneesMarche.dateMiseAJour || new Date().toISOString()
            };

            localStorage.setItem("configurationTradingViewIA", JSON.stringify(configuration));

            remplirChampsConfigurationPrincipale(configuration);
            remplirChampsMarcheDepuisConfiguration(configuration);
            afficherConfiguration(configuration);

            afficherResultatAnalyse(
                "Données concrètes du marché actualisées.\n\n" +
                "Actif : " + configuration.graphique.actif + "\n" +
                "Indicateur : " + configuration.graphique.indicateur + "\n" +
                "Intervalle : " + configuration.graphique.intervalle + "\n" +
                "Catégorie : " + (configuration.analyseIA?.categorie || "analyse_technique") + "\n\n" +
                "Prix actuel : " + configuration.marche.prixActuel + "\n" +
                "Support : " + configuration.marche.support + "\n" +
                "Résistance : " + configuration.marche.resistance + "\n" +
                "RSI : " + configuration.marche.rsi + "\n" +
                "Volume : " + configuration.marche.volume + "\n" +
                "Tendance : " + configuration.marche.tendance
            );

            if (analyserApresActualisation) {
                analyserDecision();
            }

        } catch (erreur) {
            remplirChampsConfigurationPrincipale(configuration);
            remplirChampsMarcheDepuisConfiguration(configuration);
            afficherConfiguration(configuration);

            afficherDecision("Erreur marché", "erreur");

            afficherResultatAnalyse(
                "Impossible de rafraîchir les données concrètes du marché.\n\n" +
                "La décision peut encore être calculée avec les anciennes données présentes dans le JSON, " +
                "ou avec les valeurs saisies manuellement.\n\n" +
                "Adresse appelée :\n" +
                apiMarche + "\n\n" +
                "Détail technique :\n" +
                erreur.message
            );
        }
    }

    function remplirChampsMarcheDepuisConfiguration(config) {
        if (!config) {
            return;
        }

        const marche = config.marche || {};
        const risque = config.risque || {};

        const support = Number(marche.support || 0);
        const resistance = Number(marche.resistance || 0);
        const marge = Math.abs(resistance - support);

        /*
            Compatibilité avec index.html :
            - index.html enregistre le capital dans risque.capitalInitial.
            - decisions.html utilisait surtout risque.capitalCompte.
            On accepte maintenant les deux noms.
        */
        const capitalCompte = premiereValeurValide(
            risque.capitalCompte,
            risque.capitalInitial,
            risque.capital,
            1000
        );

        const risquePourcent = premiereValeurValide(
            risque.risqueParPositionPourcent,
            risque.risquePositionPourcent,
            1
        );

        const montantRisque = premiereValeurValide(
            risque.montantRisque,
            ((Number(capitalCompte) * Number(risquePourcent)) / 100)
        );

        let stopLossDefaut = premiereValeurValide(risque.stopLossManuel, null);
        let takeProfit1Defaut = premiereValeurValide(risque.takeProfit1Manuel, null);
        let takeProfit2Defaut = premiereValeurValide(risque.takeProfit2Manuel, null);

        if ((stopLossDefaut === null || takeProfit1Defaut === null || takeProfit2Defaut === null) && support > 0 && resistance > 0) {
            stopLossDefaut = stopLossDefaut ?? support;
            takeProfit1Defaut = takeProfit1Defaut ?? resistance + marge;
            takeProfit2Defaut = takeProfit2Defaut ?? resistance + marge * 1.5;
        }

        const levier = premiereValeurValide(risque.levier, 1);
        const typePosition = premiereValeurValide(risque.typePosition, convertirSensEnTypePosition(risque.sens), "spot");
        const profilRisque = premiereValeurValide(risque.profilRisque, "normal");

        const volumeNormalise = normaliserVolumeMarche(
            premiereValeurValide(marche.volumeEtat, marche.volume),
            marche.volumeMoyen20
        );
        const tendanceNormalisee = normaliserTendanceMarche(marche.tendance);

        definirValeurChamp("prix-actuel", marche.prixActuel);
        definirValeurChamp("support", marche.support);
        definirValeurChamp("resistance", marche.resistance);
        definirValeurChamp("rsi", marche.rsi);
        definirValeurChamp("volume", volumeNormalise);
        definirValeurChamp("tendance", tendanceNormalisee);

        definirValeurChamp("capital-compte", capitalCompte);
        definirValeurChamp("risque-position", risquePourcent);
        definirValeurChamp("montant-risque", Number(montantRisque).toFixed(2));
        definirValeurChamp("stop-loss", stopLossDefaut);
        definirValeurChamp("take-profit-1", takeProfit1Defaut);
        definirValeurChamp("take-profit-2", takeProfit2Defaut);
        definirValeurChamp("levier", levier);
        definirValeurChamp("type-position", typePosition);
        definirValeurChamp("profil-risque", profilRisque);
    }

    function ajouterMarcheDansConfiguration() {
        if (!configuration) {
            return;
        }

        const marcheExistante = configuration.marche || {};
        const risqueExistant = configuration.risque || {};

        const volumeFormulaire = normaliserVolumeMarche(valeurChamp("volume", "neutre"), marcheExistante.volumeMoyen20);
        const tendanceFormulaire = normaliserTendanceMarche(valeurChamp("tendance", "neutre"));

        configuration.marche = {
            ...marcheExistante,
            prixActuel: nombreChamp("prix-actuel"),
            support: nombreChamp("support"),
            resistance: nombreChamp("resistance"),
            rsi: nombreChamp("rsi"),
            volume: volumeFormulaire,
            volumeEtat: volumeFormulaire,
            tendance: tendanceFormulaire,
            source: marcheExistante.source || "saisie_page_decision",
            api: marcheExistante.api || obtenirApiMarcheDepuisConfiguration(),
            dateMiseAJour: marcheExistante.dateMiseAJour || new Date().toISOString(),
            dateVerificationDecision: new Date().toISOString()
        };

        const support = nombreChamp("support");
        const resistance = nombreChamp("resistance");
        const marge = support !== null && resistance !== null ? Math.abs(resistance - support) : 0;

        const capitalCompte = nombreChamp("capital-compte") || Number(premiereValeurValide(risqueExistant.capitalCompte, risqueExistant.capitalInitial, 1000));
        const risquePourcent = nombreChamp("risque-position") || Number(premiereValeurValide(risqueExistant.risqueParPositionPourcent, 1));
        const montantRisque = nombreChamp("montant-risque") || ((capitalCompte * risquePourcent) / 100);

        const stopLossDefaut = support !== null ? support : null;
        const takeProfit1Defaut = resistance !== null && marge > 0 ? resistance + marge : null;
        const takeProfit2Defaut = resistance !== null && marge > 0 ? resistance + marge * 1.5 : null;

        const stopLossManuel = nombreChamp("stop-loss") || stopLossDefaut;
        const takeProfit1Manuel = nombreChamp("take-profit-1") || takeProfit1Defaut;
        const takeProfit2Manuel = nombreChamp("take-profit-2") || takeProfit2Defaut;
        const levier = nombreChamp("levier") || Number(premiereValeurValide(risqueExistant.levier, 1));
        const typePosition = valeurChamp("type-position", premiereValeurValide(risqueExistant.typePosition, convertirSensEnTypePosition(risqueExistant.sens), "spot"));
        const profilRisque = valeurChamp("profil-risque", premiereValeurValide(risqueExistant.profilRisque, "normal"));

        configuration.risque = {
            ...risqueExistant,

            /*
                Les deux noms sont conservés :
                - capitalInitial : nom venant de index.html.
                - capitalCompte : nom utilisé dans decisions.html.
            */
            capitalInitial: capitalCompte,
            capitalCompte: capitalCompte,

            risqueParPositionPourcent: risquePourcent,
            montantRisque: montantRisque,
            stopLossManuel: stopLossManuel,
            takeProfit1Manuel: takeProfit1Manuel,
            takeProfit2Manuel: takeProfit2Manuel,
            levier: levier,
            typePosition: typePosition,
            profilRisque: profilRisque,
            dateMiseAJour: new Date().toISOString()
        };

        remplirChampsMarcheDepuisConfiguration(configuration);

        localStorage.setItem("configurationTradingViewIA", JSON.stringify(configuration));
        afficherConfiguration(configuration);
    }

async function analyserDecisionDepuisBouton() {
    if (!configuration) {
        await chargerConfigurationLocale(false);
    }

    if (!configuration) {
        afficherDecision("Aucune configuration", "erreur");
        afficherResultatAnalyse("Aucune configuration valide n’est disponible pour l’analyse.");
        alert("Analyse effectuée sans succès. Aucune configuration valide.");
        return;
    }

    afficherDecision("Analyse en cours...", "attente");
    afficherResultatAnalyse(
        "Nouvelle analyse en cours.\n" +
        "Les champs modifiés sont relus avant le calcul."
    );

    try {
        ajouterConfigurationPrincipaleDansJSON();
        ajouterMarcheDansConfiguration();

        if (!donneesMarcheSuffisantes(configuration)) {
            await rafraichirDonneesMarcheDecision(false);
        }

        const analyseReussie = analyserDecision();

        if (analyseReussie === true) {
            alert("Analyse effectuée avec succès.");
        } else {
            alert(
                "Analyse effectuée sans succès.\n\n" +
                "Vérifie les champs obligatoires : prix actuel, support principal et résistance principale."
            );
        }

    } catch (erreur) {
        console.error("Erreur pendant l'analyse :", erreur);

        afficherDecision("Erreur d'analyse", "erreur");

        afficherResultatAnalyse(
            "L'analyse n'a pas pu être effectuée.\n\n" +
            "Détail technique : " + erreur.message
        );

        alert("Analyse effectuée sans succès.\n\nDétail : " + erreur.message);
    }
}

    function analyserDecision() {
        if (!configuration) {
            afficherResultatAnalyse(
                "Aucune configuration n’est chargée.\n\n" +
                "Clique d’abord sur « Charger configuration JSON » et choisis un fichier dans /snapshots,\n" +
                "ou clique sur « Charger sauvegarde locale »."
            );

            afficherDecision("Aucune configuration", "erreur");
            return false;
        }

        ajouterConfigurationPrincipaleDansJSON();
        ajouterMarcheDansConfiguration();

        const graphique = configuration.graphique || {};
        const risque = configuration.risque || {};
        const analyseIA = configuration.analyseIA || {};
        const snapshot = configuration.snapshot || {};
        const marche = configuration.marche || {};

        const prixActuel = Number(marche.prixActuel);
        const support = Number(marche.support);
        const resistance = Number(marche.resistance);
        const rsi = Number(marche.rsi);
        const volume = marche.volume || "neutre";
        const tendance = marche.tendance || "neutre";

        const indicateur = graphique.indicateur || "";
        const categorie = analyseIA.categorie || "";

        const risquePosition = Number(risque.risqueParPositionPourcent || 1);
        const capitalCompte = Number(premiereValeurValide(risque.capitalCompte, risque.capitalInitial, 0));
        const montantRisque = Number(premiereValeurValide(risque.montantRisque, 0));
        const stopLossManuel = Number(risque.stopLossManuel || 0);
        const takeProfit1Manuel = Number(risque.takeProfit1Manuel || 0);
        const takeProfit2Manuel = Number(risque.takeProfit2Manuel || 0);
        const levier = Number(risque.levier || 1);
        const typePosition = premiereValeurValide(risque.typePosition, convertirSensEnTypePosition(risque.sens), "spot");
        const profilRisque = risque.profilRisque || "normal";
        const dateAnalyse = new Date().toLocaleString("fr-CA");

        if (!prixActuel || !support || !resistance) {
            afficherDecision("Données insuffisantes", "erreur");

            afficherResultatAnalyse(
                "Données insuffisantes.\n\n" +
                "Pour obtenir une décision concrète, tu dois renseigner au minimum :\n" +
                "- Prix actuel\n" +
                "- Support principal\n" +
                "- Résistance principale\n\n" +
                "Sans ces prix, la page ne peut pas calculer une entrée, un stop loss et des objectifs fiables."
            );

            return false;
        }

        let scoreAchat = 0;
        let scoreVente = 0;
        let scoreAttente = 0;

        const commentaires = [];

        if (tendance === "haussiere") {
            scoreAchat += 2;
            commentaires.push("Tendance haussière : avantage aux scénarios d’achat.");
        }

        if (tendance === "baissiere") {
            scoreVente += 2;
            commentaires.push("Tendance baissière : avantage aux scénarios de vente.");
        }

        if (tendance === "range") {
            scoreAttente += 2;
            commentaires.push("Marché en range : attendre une cassure claire.");
        }

        if (prixActuel > resistance) {
            scoreAchat += 3;
            commentaires.push("Le prix actuel est au-dessus de la résistance : cassure haussière possible.");
        }

        if (prixActuel < support) {
            scoreVente += 3;
            commentaires.push("Le prix actuel est sous le support : cassure baissière possible.");
        }

        if (prixActuel >= support && prixActuel <= resistance) {
            scoreAttente += 2;
            commentaires.push("Le prix est entre support et résistance : zone d’attente.");
        }

        if (!isNaN(rsi)) {
            if (rsi < 30) {
                scoreAchat += 1;
                commentaires.push("RSI inférieur à 30 : zone de survente possible.");
            } else if (rsi > 70) {
                scoreVente += 1;
                commentaires.push("RSI supérieur à 70 : zone de surachat possible.");
            } else {
                scoreAttente += 1;
                commentaires.push("RSI neutre : signal insuffisant seul.");
            }
        }

        if (volume === "fort" || volume === "hausse") {
            if (prixActuel > resistance) {
                scoreAchat += 2;
                commentaires.push("Volume fort sur cassure haussière : confirmation positive.");
            } else if (prixActuel < support) {
                scoreVente += 2;
                commentaires.push("Volume fort sur cassure baissière : confirmation négative.");
            } else {
                scoreAttente += 1;
                commentaires.push("Volume en hausse, mais sans cassure claire.");
            }
        }

        if (volume === "faible" || volume === "baisse") {
            scoreAttente += 2;
            commentaires.push("Volume faible : signal peu fiable.");
        }

        if (indicateur === "EMA") {
            scoreAchat += 1;
            commentaires.push("EMA : utile pour confirmer une tendance.");
        }

        if (indicateur === "RSI") {
            scoreAttente += 1;
            commentaires.push("RSI : nécessite une confirmation par support, résistance et volume.");
        }

        if (indicateur === "MACD") {
            scoreAttente += 1;
            commentaires.push("MACD : attendre confirmation du momentum.");
        }

        if (categorie === "macroeconomie" || categorie === "reglementation_risques") {
            scoreAttente += 2;
            commentaires.push("Catégorie prudente : contexte externe à vérifier avant décision.");
        }

        if (risquePosition > 2) {
            scoreAttente += 2;
            commentaires.push("Risque supérieur à 2 % : prudence recommandée.");
        }

        if (profilRisque === "prudent") {
            scoreAttente += 1;
            commentaires.push("Profil prudent : priorité à la protection du capital.");
        }

        if (profilRisque === "agressif") {
            scoreAttente += 1;
            commentaires.push("Profil agressif : attention au risque excessif.");
        }

        if (levier > 3) {
            scoreAttente += 2;
            commentaires.push("Effet de levier supérieur à 3 : risque élevé.");
        }

        if (capitalCompte > 0 && montantRisque > 0) {
            const risqueReelPourcent = (montantRisque / capitalCompte) * 100;

            if (risqueReelPourcent > 2) {
                scoreAttente += 2;
                commentaires.push("Le montant risqué dépasse 2 % du capital : prudence recommandée.");
            }
        }

        let decision = "ATTENDRE";
        let classe = "attente";
        let symbole = "🟡";

        if (scoreAchat >= scoreVente + 2 && scoreAchat > scoreAttente) {
            decision = "ACHETER";
            classe = "achat";
            symbole = "🟢";
        }

        if (scoreVente >= scoreAchat + 2 && scoreVente > scoreAttente) {
            decision = "VENDRE";
            classe = "vente";
            symbole = "🔴";
        }

        const plan = calculerPlanTrading(
            decision,
            prixActuel,
            support,
            resistance,
            stopLossManuel,
            takeProfit1Manuel,
            takeProfit2Manuel
        );

        const confiance = calculerConfiance(scoreAchat, scoreVente, scoreAttente);

        afficherDecision(symbole + " " + decision, classe);

        afficherResultatAnalyse(
            "DÉCISION IA CONCRÈTE\n" +
            "====================\n\n" +

            "Signal proposé : " + symbole + " " + decision + "\n" +
            "Confiance estimée : " + confiance + " %\n" +
            "Analyse relancée le : " + dateAnalyse + "\n\n" +

            "PARAMÈTRES\n" +
            "----------\n" +
            "Actif : " + (graphique.actifLibelle || graphique.actif || "Non défini") + "\n" +
            "Code actif : " + (graphique.actif || "Non défini") + "\n" +
            "Indicateur : " + (graphique.indicateur || "Non défini") + "\n" +
            "Intervalle : " + (graphique.intervalleLibelle || graphique.intervalle || "Non défini") + "\n" +
            "Catégorie : " + (analyseIA.categorieLibelle || analyseIA.categorie || "Non définie") + "\n" +
            "Snapshot : " + (snapshot.url || "Aucun snapshot lié") + "\n\n" +

            "PRIX UTILISÉS\n" +
            "-------------\n" +
            "Prix actuel : " + prixActuel + "\n" +
            "Support : " + support + "\n" +
            "Résistance : " + resistance + "\n" +
            "RSI : " + (isNaN(rsi) ? "Non renseigné" : rsi) + "\n" +
            "Volume : " + volume + "\n" +
            "Tendance : " + tendance + "\n" +
            "Date mise à jour marché : " + (marche.dateMiseAJour || "Non disponible") + "\n" +
            "Source marché : " + (marche.source || "Non disponible") + "\n\n" +

            "GESTION DU RISQUE\n" +
            "-----------------\n" +
            "Capital du compte : " + (capitalCompte || "Non renseigné") + "\n" +
            "Risque par position : " + risquePosition + " %\n" +
            "Montant risqué : " + (montantRisque || "Non renseigné") + "\n" +
            "Stop loss manuel : " + (stopLossManuel || "Non renseigné") + "\n" +
            "Take profit 1 manuel : " + (takeProfit1Manuel || "Non renseigné") + "\n" +
            "Take profit 2 manuel : " + (takeProfit2Manuel || "Non renseigné") + "\n" +
            "Effet de levier : " + levier + "\n" +
            "Type de position : " + typePosition + "\n" +
            "Profil de risque : " + profilRisque + "\n\n" +

            "PLAN PROPOSÉ\n" +
            "------------\n" +
            plan + "\n\n" +

            "SCORES INTERNES\n" +
            "---------------\n" +
            "Achat : " + scoreAchat + "\n" +
            "Vente : " + scoreVente + "\n" +
            "Attente : " + scoreAttente + "\n\n" +

            "LECTURE\n" +
            "-------\n" +
            commentaires.map(function(commentaire) {
                return "- " + commentaire;
            }).join("\n") +

            "\n\nNOTE\n" +
            "----\n" +
            "Cette décision est calculée à partir des données concrètes du marché, " +
            "du formulaire et des paramètres de gestion du risque. " +
            "Elle doit être vérifiée avec le graphique réel avant toute opération."
        );

        return true;
    }

    function calculerPlanTrading(
        decision,
        prixActuel,
        support,
        resistance,
        stopLossManuel,
        takeProfit1Manuel,
        takeProfit2Manuel
    ) {
        const marge = Math.abs(resistance - support);

        if (decision === "ACHETER") {
            const entree = resistance;
            const stopLoss = stopLossManuel > 0 ? stopLossManuel : support;
            const takeProfit1 = takeProfit1Manuel > 0 ? takeProfit1Manuel : resistance + marge;
            const takeProfit2 = takeProfit2Manuel > 0 ? takeProfit2Manuel : resistance + marge * 1.5;

            const risque = Math.abs(entree - stopLoss);
            const gain = Math.abs(takeProfit1 - entree);
            const ratio = risque > 0 ? (gain / risque).toFixed(2) : "N/A";

            return (
                "Action : ACHAT POSSIBLE\n" +
                "Entrée proposée : clôture au-dessus de " + entree + "\n" +
                "Stop loss : " + stopLoss + "\n" +
                "Take profit 1 : " + Number(takeProfit1).toFixed(2) + "\n" +
                "Take profit 2 : " + Number(takeProfit2).toFixed(2) + "\n" +
                "Ratio gain/perte estimé : " + ratio + "\n" +
                "Invalidation : retour durable sous " + resistance + "\n" +
                "Conseil : ne pas acheter si la cassure se fait par une simple mèche."
            );
        }

        if (decision === "VENDRE") {
            const entree = support;
            const stopLoss = stopLossManuel > 0 ? stopLossManuel : resistance;
            const takeProfit1 = takeProfit1Manuel > 0 ? takeProfit1Manuel : support - marge;
            const takeProfit2 = takeProfit2Manuel > 0 ? takeProfit2Manuel : support - marge * 1.5;

            const risque = Math.abs(stopLoss - entree);
            const gain = Math.abs(entree - takeProfit1);
            const ratio = risque > 0 ? (gain / risque).toFixed(2) : "N/A";

            return (
                "Action : VENTE POSSIBLE\n" +
                "Entrée proposée : clôture sous " + entree + "\n" +
                "Stop loss : " + stopLoss + "\n" +
                "Take profit 1 : " + Number(takeProfit1).toFixed(2) + "\n" +
                "Take profit 2 : " + Number(takeProfit2).toFixed(2) + "\n" +
                "Ratio gain/perte estimé : " + ratio + "\n" +
                "Invalidation : retour durable au-dessus de " + support + "\n" +
                "Conseil : ne pas vendre si la cassure se fait par une simple mèche."
            );
        }

        return (
            "Action : ATTENDRE\n" +
            "Achat possible seulement au-dessus de : " + resistance + "\n" +
            "Vente possible seulement sous : " + support + "\n" +
            "Zone neutre : entre " + support + " et " + resistance + "\n" +
            "Conseil : attendre une clôture claire hors de cette zone avec confirmation du volume."
        );
    }

    function calculerConfiance(scoreAchat, scoreVente, scoreAttente) {
        const total = scoreAchat + scoreVente + scoreAttente;

        if (total <= 0) {
            return 0;
        }

        const scoreMax = Math.max(scoreAchat, scoreVente, scoreAttente);
        return Math.round((scoreMax / total) * 100);
    }

    function retour() {
        window.location.href = "index.html";
    }

    window.chargerConfiguration = chargerConfiguration;
    window.chargerConfigurationLocale = chargerConfigurationLocale;
    window.chargerConfigurationDepuisFichier = chargerConfigurationDepuisFichier;
    window.analyserDecision = analyserDecision;
    window.analyserDecisionDepuisBouton = analyserDecisionDepuisBouton;
    window.rafraichirDonneesMarcheDecision = rafraichirDonneesMarcheDecision;
    window.retour = retour;

    document.addEventListener("DOMContentLoaded", function () {
        console.log("decisions.html chargé.");

        /*
            Chargement automatique de la dernière configuration locale.
            Le bouton manuel « Charger sauvegarde locale » est maintenant commenté dans le HTML.
        */
        chargerConfigurationLocale(false);
    });
</script>

</body>
</html>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Trading Station IA</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://s3.tradingview.com/tv.js"></script>

    <style>
        * { box-sizing: border-box; }

		body {
			margin: 0;
			font-family: Arial, sans-serif;
			background: #ffffff;
			color: #111827;
		}

        header {
            background: #0f172a;
            border-bottom: 2px solid #00d9ff;
            padding: 14px 20px;
        }

        .top-bar {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px;
        }

        .logo {
            font-size: 22px;
            font-weight: bold;
            color: #00d9ff;
            margin-right: 18px;
            line-height: 1.1;
        }

        .logo span { color: #facc15; }

        .auteur-logo {
            display: block;
            font-size: 12px;
            font-weight: normal;
            color: #cbd5e1;
            margin-top: 3px;
        }

        .control-group {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .parametres-graphiques-caches {
            display: none !important;
        }

        .capture-selector-top {
            display: flex;
            align-items: center;
            gap: 8px;
            flex: 0 1 560px;
            min-width: 360px;
            max-width: 620px;
        }

        .capture-selector-top label {
            white-space: nowrap;
        }

        #liste-captures-postgres {
            width: 100%;
            min-width: 260px;
            max-width: 430px;
        }

        .analysis-category-top {
            display: flex;
            align-items: center;
            gap: 6px;
            flex: 0 0 340px;
            min-width: 300px;
            max-width: 360px;
            margin-left: 8px;
        }

        .analysis-category-top label {
            white-space: nowrap;
        }

        .analysis-category-top select {
            width: 190px;
            min-width: 180px;
        }

        .category-description-top {
            display: none;
        }
            max-width: 190px;
        }

        .category-description-top {
            flex: 1 1 100%;
            margin-top: 0;
            display: none;
        }

        label {
            font-weight: bold;
            color: #00d9ff;
            font-size: 13px;
        }

        select, input, textarea {
            background: #020617;
            color: white;
            border: 1px solid #334155;
            border-radius: 6px;
            padding: 7px;
            font-size: 13px;
            max-width: 100%;
        }

        button {
            border: none;
            border-radius: 7px;
            padding: 8px 10px;
            font-weight: bold;
            cursor: pointer;
            font-size: 12px;
            white-space: nowrap;
        }

        button:hover { opacity: 0.85; }

        .btn-tv { background: #2962ff; color: white; }
        .btn-capture { background: #00d9ff; color: #00111a; }
        .btn-save { background: #22c55e; color: #03130a; }
        .btn-copy { background: #facc15; color: #1a1300; }
        .btn-export { background: #a855f7; color: white; }
        .btn-import { background: #14b8a6; color: #001a16; }
        .btn-api { background: #fb923c; color: #1a0b00; }
        .btn-db { background: #10b981; color: #00130d; }
        .btn-load { background: #6366f1; color: white; }
        .btn-ai { background: #38bdf8; color: #00111a; }
        .btn-market { background: #84cc16; color: #102000; }
        .btn-decision { background: #eab308; color: #1a1300; }
        .btn-clear { background: #ef4444; color: white; }
        .btn-dark { background: #334155; color: white; }

        .header-images {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-left: 8px;
        }

        .header-images img {
            width: 48px;
            height: 48px;
            object-fit: cover;
            border-radius: 6px;
            border: 1px solid #334155;
            background: #020617;
            padding: 1px;
        }

        main {
            display: grid;
            grid-template-columns: minmax(0, 2.3fr) minmax(320px, 0.7fr);
            gap: 14px;
            padding: 14px;
        }

        .chart-panel, .side-panel {
            background: #111827;
            border: 1px solid #263244;
            border-radius: 12px;
            padding: 14px;
        }

        .chart-panel { min-width: 0; }
        .side-panel { min-width: 320px; overflow: hidden; }

        .chart-title-row {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 14px;
            margin-bottom: 10px;
            width: 100%;
            flex-wrap: nowrap;
            overflow-x: auto;
        }

        .chart-title-row h2 {
            margin: 0;
            padding-bottom: 0;
            border-bottom: none;
            line-height: 1.1;
            flex: 0 0 auto;
        }

        .chart-title-icons {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 8px;
            flex-shrink: 0;
            margin-left: auto;
        }

        .chart-title-icons img {
            width: 36px;
            height: 36px;
            object-fit: cover;
            border-radius: 6px;
            border: 1px solid #334155;
            background: #020617;
            padding: 1px;
        }

        .chart-inline-controls {
            display: flex;
            align-items: center;
            gap: 12px;
            margin: 0;
            flex-wrap: nowrap;
            flex: 0 0 auto;
        }

        .chart-inline-controls .form-block {
            display: flex;
            align-items: center;
            gap: 6px;
            flex: 0 0 auto;
            margin-bottom: 0;
        }

        .chart-inline-controls .form-block label {
            margin-bottom: 0;
            white-space: nowrap;
            color: #ffffff;
        }

        .chart-inline-controls .form-block select {
            width: 175px;
        }

        .chart-inline-controls .form-block input {
            width: 105px;
        }

        #tradingview_chart {
            height: 700px;
            width: 100%;
            border-radius: 10px;
            overflow: hidden;
            background: #020617;
        }

        h2 {
            color: #00d9ff;
            font-size: 18px;
            margin-top: 0;
            border-bottom: 1px solid #263244;
            padding-bottom: 8px;
        }

        h3 {
            color: #facc15;
            font-size: 15px;
            margin-bottom: 8px;
        }

        .form-block {
            margin-bottom: 12px;
            min-width: 0;
        }

        .form-block label {
            display: block;
            margin-bottom: 5px;
        }

        .form-block input, .form-block select, .form-block textarea { width: 100%; }

        pre {
            background: #020617;
            color: #a7f3d0;
            padding: 12px;
            border-radius: 10px;
            border: 1px solid #263244;
            min-height: 260px;
            max-height: 420px;
            overflow: auto;
            font-size: 12px;
            white-space: pre-wrap;
            word-break: break-word;
        }

        .button-zone {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 12px 0;
        }

        .button-zone button { flex: 1 1 120px; }

        .status {
            background: #020617;
            border: 1px solid #263244;
            border-radius: 8px;
            padding: 10px;
            color: #facc15;
            font-size: 13px;
            margin-top: 10px;
        }

        .server-status {
            padding: 12px;
            border-radius: 8px;
            font-weight: bold;
            margin-bottom: 12px;
            text-align: center;
            font-size: 13px;
        }

        .server-status.neutral { background: #334155; color: #ffffff; }
        .server-status.ok { background: #064e3b; color: #86efac; }
        .server-status.error { background: #7f1d1d; color: #fecaca; }
        .server-status.warning { background: #713f12; color: #fde68a; }

        .server-info {
            background: #020617;
            border: 1px solid #334155;
            border-radius: 8px;
            padding: 10px;
            font-family: Consolas, monospace;
            font-size: 12px;
            color: #d1d5db;
            white-space: pre-wrap;
            word-break: break-word;
            min-height: 90px;
            max-height: 220px;
            overflow: auto;
        }

        .analysis-category-box, .ai-section, .risk-box {
            margin-top: 14px;
            background: #0b1220;
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 14px;
        }

        .side-panel > section:first-child { margin-top: 0; }

        .risk-box h3 {
            margin-top: 0;
            margin-bottom: 12px;
        }

        .analysis-category-box select { width: 100%; }

        .category-description, .note {
            margin-top: 10px;
            padding: 10px;
            background: #020617;
            border: 1px solid #334155;
            border-radius: 8px;
            color: #d1d5db;
            font-size: 12px;
            line-height: 1.5;
        }

        .ai-result-box {
            background: #020617;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 14px;
            min-height: 220px;
            max-height: 520px;
            overflow: auto;
            white-space: pre-wrap;
            word-break: break-word;
            font-family: Consolas, monospace;
            font-size: 13px;
            color: #d1d5db;
        }

        .screenshot-preview {
            margin-top: 12px;
            background: #020617;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 10px;
        }

        .screenshot-preview img {
            width: 100%;
            max-height: 360px;
            object-fit: contain;
            border-radius: 8px;
            background: #000;
            display: none;
        }

        footer {
            text-align: center;
            color: #94a3b8;
            font-size: 12px;
            padding: 16px;
            border-top: 1px solid #263244;
        }


        .modal-password-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.72);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 16px;
        }

        .modal-password-box {
            width: 100%;
            max-width: 420px;
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 18px;
            color: #ffffff;
            box-shadow: 0 18px 45px rgba(0, 0, 0, 0.45);
        }

        .modal-password-box h3 {
            margin-top: 0;
            color: #facc15;
        }

        .modal-password-box p {
            font-size: 13px;
            line-height: 1.5;
            color: #cbd5e1;
        }

        .modal-password-box input {
            width: 100%;
            margin-top: 8px;
            margin-bottom: 14px;
        }

        .modal-password-actions {
            display: flex;
            gap: 8px;
            justify-content: flex-end;
            flex-wrap: wrap;
        }

        .modal-password-actions button {
            min-width: 110px;
        }

        @media (max-width: 1200px) {
            main { grid-template-columns: minmax(0, 2fr) minmax(320px, 0.8fr); }
            #tradingview_chart { height: 650px; }
        }

        @media (max-width: 1000px) {
            main { grid-template-columns: 1fr; }
            .side-panel { min-width: 0; }
            #tradingview_chart { height: 520px; }
        }

        @media (max-width: 700px) {
            header { padding: 12px; }
            .top-bar { flex-direction: column; align-items: stretch; }
            .control-group { flex-direction: column; align-items: stretch; }

            .capture-selector-top {
                flex-direction: column;
                align-items: stretch;
                min-width: 0;
                max-width: none;
                width: 100%;
            }

            .analysis-category-top {
                flex-direction: column;
                align-items: stretch;
                min-width: 0;
                max-width: none;
                width: 100%;
                margin-left: 0;
            }

            .analysis-category-top select {
                min-width: 0;
                width: 100%;
            }

            #liste-captures-postgres {
                min-width: 0;
                max-width: none;
                width: 100%;
            }

            button { width: 100%; }
            .button-zone button { flex: 1 1 100%; }
            .logo { text-align: center; margin-right: 0; }
            .header-images { justify-content: center; margin-left: 0; }
            .header-images img { width: 43px; height: 43px; }
            .chart-title-row { justify-content: flex-start; flex-wrap: nowrap; }
            .chart-inline-controls { flex: 0 0 auto; flex-wrap: nowrap; }
            .chart-inline-controls .form-block { flex: 0 0 auto; }
            .chart-title-icons img { width: 30px; height: 30px; }
            #tradingview_chart { height: 460px; }
        }
    </style>
</head>

<body>
<header>
    <div class="top-bar">
        <div class="logo">
            TRADING STATION <span>IA</span>
            <small class="auteur-logo">Auteur : Hocine Korichi, Ing.</small>
        </div>

        <div class="control-group parametres-graphiques-caches">
            <label for="asset-selector">ACTIF :</label>
            <select id="asset-selector" onchange="actualiserGraphique()">
                <option value="BINANCE:BTCUSDT">Bitcoin / USDT</option>
                <option value="COINBASE:BTCUSD">Bitcoin / USD</option>
                <option value="BINANCE:ETHUSDT">Ethereum / USDT</option>
                <option value="OANDA:XAUUSD">Or / Dollar - XAUUSD</option>
                <option value="NASDAQ:AAPL">Apple - AAPL</option>
                <option value="NASDAQ:TSLA">Tesla - TSLA</option>
                <option value="NASDAQ:NVDA">Nvidia - NVDA</option>
                <option value="NASDAQ:MSFT">Microsoft - MSFT</option>
                <option value="NASDAQ:AMZN">Amazon - AMZN</option>
                <option value="NASDAQ:GOOGL">Google - GOOGL</option>
                <option value="SP:SPX">S&amp;P 500</option>
                <option value="TVC:DXY">Dollar Index - DXY</option>
            </select>
        </div>

        <div class="control-group parametres-graphiques-caches">
            <label for="interval-selector">INTERVALLE :</label>
            <select id="interval-selector" onchange="actualiserGraphique()">
                <option value="1">1 minute</option>
                <option value="5">5 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 heure</option>
                <option value="240">4 heures</option>
                <option value="D" selected>1 jour</option>
                <option value="W">1 semaine</option>
                <option value="M">1 mois</option>
            </select>
        </div>

        <div class="control-group parametres-graphiques-caches">
            <label for="indicator-selector">INDICATEUR :</label>
            <select id="indicator-selector" onchange="actualiserGraphique()">
                <option value="RSI">RSI</option>
                <option value="MACD">MACD</option>
                <option value="EMA">EMA</option>
                <option value="SUPERTREND">Supertrend</option>
                <option value="BOLLINGER">Bandes de Bollinger</option>
                <option value="ATR">ATR</option>
                <option value="VOLUME">Volume</option>
                <option value="LIQUIDITY_ZONE">Zones de liquidité</option>
            </select>
        </div>

        <button class="btn-clear" onclick="viderTableTradingCapture()">Vider la table</button>
        <button class="btn-capture" onclick="capturerEtEnregistrerConfiguration()">Capturer et enregistrer</button>
        <!--<button class="btn-market" onclick="enrichirConfigurationAvecDonneesMarche()">Ajouter marché</button>-->
        <button class="btn-db" style="display:none;" onclick="enregistrerCapturePostgres()">Enregistrer la configuration</button>
        <!-- <button class="btn-save" onclick="rechargerConfigurationTradingView()">Recharger</button> -->
        <button class="btn-decision" onclick="ouvrirPageDecision()">Analyser le snapshot</button>

        <div class="capture-selector-top">
            <label for="liste-captures-postgres">Choisir une confihuration :</label>
            <select id="liste-captures-postgres" onchange="chargerCapturePostgresSelectionnee()">
                <option value="">Aucune configuration chargée</option>
            </select>
        </div>

        <div class="analysis-category-top">
            <label for="categorie-analyse-btc">Type d'analyse :</label>
            <select id="categorie-analyse-btc">
                <option value="macroeconomie">Macroéconomie</option>
                <option value="monnaie_bitcoin">Monnaie Bitcoin</option>
                <option value="donnees_on_chain">Données on-chain</option>
                <option value="minage">Minage</option>
                <option value="analyse_technique" selected>Analyse technique</option>
                <option value="derives">Dérivés</option>
                <option value="liquidite_marche">Liquidité de marché</option>
                <option value="institutionnel">Institutionnel</option>
                <option value="sentiment">Sentiment</option>
                <option value="reglementation_risques">Réglementation et risques</option>
            </select>
            <div id="description-categorie-analyse" class="category-description category-description-top">
                Analyse technique : graphiques, tendances, supports, résistances, RSI et moyennes mobiles.
            </div>
        </div>

<!--
        <div class="header-images">
            <img src="img/bitcoin.jfif" alt="Bitcoin">
            <img src="img/lingot-or.jfif" alt="Lingot d'or">
        </div>
-->
    </div>
</header>

<main>
    <section class="chart-panel">
        <div class="chart-title-row">
            <h2>Graphique TradingView intégré</h2>
            <div class="chart-inline-controls">
                <div class="form-block">
                    <label for="type-bougie">Type de graphique</label>
                    <select id="type-bougie" onchange="actualiserGraphique()">
                        <option value="bougies_japonaises" selected>Bougies japonaises</option>
                        <option value="barres">Barres</option>
                        <option value="ligne">Ligne</option>
                        <option value="heikin_ashi">Heikin Ashi</option>
                    </select>
                </div>
                <div class="form-block">
                    <label for="capital-input">Capital initial</label>
                    <input id="capital-input" type="number" value="1000" min="0" step="100">
                </div>
            </div>
            <div class="chart-title-icons">
                <img src="img/bitcoin.jfif" alt="Symbole du Bitcoin">
                <img src="img/lingot-or.jfif" alt="Lingot d'or">
            </div>
        </div>

        <div id="tradingview_chart"></div>
        <input type="file" id="fichier-import-json" accept="application/json,.json" style="display:none;" onchange="importerJSONDepuisFichier(event)">

    </section>

    <aside class="side-panel">
        <section class="risk-box">
            <h3>Paramètres de risque</h3>
            <div class="form-block">
                <label for="risk-input">Risque par position en pourcentage</label>
                <input id="risk-input" type="number" value="1" min="0" step="0.1">
            </div>
            <div class="form-block">
                <label for="stoploss-input">Stop loss en pourcentage</label>
                <input id="stoploss-input" type="number" value="2" min="0" step="0.1">
            </div>
            <div class="form-block">
                <label for="takeprofit-input">Take profit en pourcentage</label>
                <input id="takeprofit-input" type="number" value="4" min="0" step="0.1">
            </div>
            <div class="form-block">
                <label for="levier-input">Levier</label>
                <input id="levier-input" type="number" value="1" min="1" step="1">
            </div>
            <div class="form-block">
                <label for="sens-selector">Sens</label>
                <select id="sens-selector">
                    <option value="achat_vente" selected>Achat ou vente</option>
                    <option value="achat">Achat seulement</option>
                    <option value="vente">Vente seulement</option>
                </select>
            </div>
            <div class="form-block">
                <label for="strategie-selector">Stratégie</label>
                <select id="strategie-selector">
                    <option value="suivi_tendance" selected>Suivi de tendance</option>
                    <option value="retournement">Retournement</option>
                    <option value="cassure">Cassure</option>
                    <option value="range">Range</option>
                </select>
            </div>
            <div class="form-block">
                <label for="snapshot-url">URL éventuelle du snapshot</label>
                <input id="snapshot-url" type="text" placeholder="Lien optionnel vers une image ou un snapshot">
            </div>

        </section>

        <h3>Configuration capturée</h3>
        <pre id="resultat-configuration">Aucune configuration capturée.</pre>

        <div id="status" class="status">En attente de capture.</div>
    </aside>
</main>


<div id="modal-password-overlay" class="modal-password-overlay">
    <div class="modal-password-box">
        <h3>Mot de passe administrateur</h3>
        <p>Entrer le mot de passe pour vider la table <strong>trading_capture</strong>.</p>
        <input id="admin-delete-password-input" type="password" autocomplete="current-password" placeholder="Mot de passe">
        <div class="modal-password-actions">
            <button class="btn-dark" type="button" onclick="fermerFenetreMotDePasse(false)">Annuler</button>
            <button class="btn-clear" type="button" onclick="fermerFenetreMotDePasse(true)">Confirmer</button>
        </div>
    </div>
</div>

<footer>
    Trading Station IA — page HTML sur GitHub Pages, API Node.js sur Render.
</footer>

<script>
    let widgetTradingView = null;
    let configurationActuelle = null;

    const API_BASE_URL_PAR_DEFAUT = "https://trading-g8ie.onrender.com";

    let resolveMotDePasseAdmin = null;

    function demanderMotDePasseAdmin() {
        return new Promise(function(resolve) {
            const overlay = document.getElementById("modal-password-overlay");
            const champ = document.getElementById("admin-delete-password-input");

            resolveMotDePasseAdmin = resolve;

            if (!overlay || !champ) {
                resolve("");
                return;
            }

            champ.value = "";
            overlay.style.display = "flex";

            setTimeout(function() {
                champ.focus();
            }, 50);
        });
    }

    function fermerFenetreMotDePasse(valider) {
        const overlay = document.getElementById("modal-password-overlay");
        const champ = document.getElementById("admin-delete-password-input");

        const valeur = valider && champ ? champ.value : "";

        if (overlay) {
            overlay.style.display = "none";
        }

        if (typeof resolveMotDePasseAdmin === "function") {
            resolveMotDePasseAdmin(valeur);
            resolveMotDePasseAdmin = null;
        }
    }

    document.addEventListener("keydown", function(event) {
        const overlay = document.getElementById("modal-password-overlay");
        const champ = document.getElementById("admin-delete-password-input");

        if (!overlay || overlay.style.display !== "flex") {
            return;
        }

        if (event.key === "Escape") {
            fermerFenetreMotDePasse(false);
        }

        if (event.key === "Enter" && document.activeElement === champ) {
            fermerFenetreMotDePasse(true);
        }
    });


    function valeurElement(id, valeurDefaut = "") {
        const element = document.getElementById(id);
        return element ? element.value : valeurDefaut;
    }

    function libelleElement(id, valeurDefaut = "") {
        const element = document.getElementById(id);
        if (!element || element.selectedIndex < 0) return valeurDefaut;
        return element.options[element.selectedIndex].text;
    }

    function nombreElement(id, valeurDefaut = 0) {
        const element = document.getElementById(id);
        if (!element) return valeurDefaut;
        const valeur = Number(element.value);
        return Number.isFinite(valeur) ? valeur : valeurDefaut;
    }

    function nettoyerUrl(url) {
        return String(url || "").trim().replace(/\/+$/, "");
    }

    function getApiBaseUrl() {
        const champApi = document.getElementById("api-url");
        let valeurChamp = champApi ? nettoyerUrl(champApi.value) : "";

        if (!valeurChamp) return API_BASE_URL_PAR_DEFAUT;

        valeurChamp = valeurChamp
            .replace("https://https://", "https://")
            .replace("http://http://", "http://")
            .replace(/\/analyse\/?$/, "/api/analyse");

        valeurChamp = valeurChamp
            .replace(/\/api\/analyse\/?$/, "")
            .replace(/\/api\/test\/?$/, "")
            .replace(/\/api\/marche\/?$/, "")
            .replace(/\/api\/captures\/?$/, "")
            .replace(/\/api\/vider-captures\/?$/, "")
            .replace(/\/api\/creer-table\/?$/, "")
            .replace(/\/api\/verifier-table\/?$/, "");

        if (!valeurChamp.startsWith("http://") && !valeurChamp.startsWith("https://")) {
            return API_BASE_URL_PAR_DEFAUT;
        }

        return nettoyerUrl(valeurChamp);
    }

    function getApiAnalyseUrl() { return getApiBaseUrl() + "/api/analyse"; }
    function getApiTestUrl() { return getApiBaseUrl() + "/api/test"; }
    function getApiMarcheUrl() { return getApiBaseUrl() + "/api/marche"; }

    /*
        IMPORTANT :
        Cette route reste volontairement fixe.
        Ne pas remplacer par getApiBaseUrl(), car l'enregistrement fonctionnait ainsi.
    */
    function getApiCapturesUrl() { return API_BASE_URL_PAR_DEFAUT + "/api/captures"; }

    function getApiViderCapturesUrl() { return API_BASE_URL_PAR_DEFAUT + "/api/vider-captures"; }

    function getApiCreerTableUrl() { return getApiBaseUrl() + "/api/creer-table"; }
    function getApiVerifierTableUrl() { return getApiBaseUrl() + "/api/verifier-table"; }

    function afficherEtatServeur(type, message) {
        const etat = document.getElementById("etatServeur");
        if (!etat) return;
        etat.className = "server-status " + type;
        etat.textContent = message;
    }

    function afficherInfosServeur(texte) {
        const zone = document.getElementById("infosServeur");
        if (!zone) return;
        zone.textContent = texte;
    }

    function afficherStatus(message) {
        document.getElementById("status").textContent = message;
    }

    function afficherAnalyseIA(texte) {
        document.getElementById("resultat-analyse-ia").textContent = texte;
    }

    function afficherConfiguration(configuration) {
        document.getElementById("resultat-configuration").textContent = JSON.stringify(configuration, null, 4);
    }

    function getCategorieAnalyseBTC() {
        return valeurElement("categorie-analyse-btc", "analyse_technique");
    }

    function getLibelleCategorieAnalyseBTC() {
        return libelleElement("categorie-analyse-btc", "Analyse technique");
    }

    function getDescriptionCategorieAnalyseBTC() {
        const descriptions = {
            macroeconomie: "Macroéconomie : taux, inflation, liquidité mondiale, dollar, obligations et bilan de la Fed.",
            monnaie_bitcoin: "Monnaie Bitcoin : offre maximale, émission, halving et inflation de BTC.",
            donnees_on_chain: "Données on-chain : adresses, transactions, MVRV, realized price et flux des plateformes.",
            minage: "Minage : taux de hachage, difficulté, revenus et ventes des mineurs.",
            analyse_technique: "Analyse technique : graphiques, tendances, supports, résistances, RSI et moyennes mobiles.",
            derives: "Dérivés : contrats à terme, options, funding rates, open interest et liquidations.",
            liquidite_marche: "Liquidité de marché : volumes, carnets d'ordres, spreads et profondeur de marché.",
            institutionnel: "Institutionnel : FNB Bitcoin, achats d'entreprises, fonds, banques et adoption officielle.",
            sentiment: "Sentiment : réseaux sociaux, Google Trends, médias, peur et avidité.",
            reglementation_risques: "Réglementation et risques : lois, fiscalité, plateformes, garde et géopolitique."
        };
        return descriptions[getCategorieAnalyseBTC()] || descriptions.analyse_technique;
    }

    function actualiserDescriptionCategorie() {
        const zone = document.getElementById("description-categorie-analyse");
        if (zone) zone.textContent = getDescriptionCategorieAnalyseBTC();
    }

    function obtenirStyleTradingView() {
        const typeBougie = valeurElement("type-bougie", "bougies_japonaises");
        switch (typeBougie) {
            case "barres": return "0";
            case "bougies_japonaises": return "1";
            case "ligne": return "3";
            case "heikin_ashi": return "8";
            default: return "1";
        }
    }

    function choisirEtudeTradingView() {
        const indicateur = valeurElement("indicator-selector", "RSI");
        if (indicateur === "RSI") return ["RSI@tv-basicstudies"];
        if (indicateur === "MACD") return ["MACD@tv-basicstudies"];
        if (indicateur === "EMA") return ["MASimple@tv-basicstudies"];
        if (indicateur === "BOLLINGER") return ["BB@tv-basicstudies"];
        if (indicateur === "VOLUME") return ["Volume@tv-basicstudies"];
        return [];
    }

    function creerWidgetTradingView(tentative = 0) {
        const conteneur = document.getElementById("tradingview_chart");
        if (!conteneur) return;

        if (typeof TradingView === "undefined" || !TradingView.widget) {
            conteneur.innerHTML = "<div style='padding:16px;color:#facc15;'>Chargement de TradingView...</div>";
            if (tentative < 20) {
                setTimeout(function () { creerWidgetTradingView(tentative + 1); }, 500);
            } else {
                conteneur.innerHTML = "<div style='padding:16px;color:#fecaca;'>Impossible de charger TradingView.</div>";
            }
            return;
        }

        const symbole = valeurElement("asset-selector", "BINANCE:BTCUSDT");
        const intervalle = valeurElement("interval-selector", "D");
        conteneur.innerHTML = "";

        try {
            widgetTradingView = new TradingView.widget({
                autosize: true,
                symbol: symbole,
                interval: intervalle,
                timezone: "America/Toronto",
                theme: "dark",
                style: obtenirStyleTradingView(),
                locale: "fr",
                toolbar_bg: "#0f172a",
                enable_publishing: false,
                allow_symbol_change: true,
                container_id: "tradingview_chart",
                hide_side_toolbar: false,
                details: true,
                hotlist: true,
                calendar: false,
                studies: choisirEtudeTradingView()
            });
        } catch (erreur) {
            conteneur.innerHTML = "<div style='padding:16px;color:#fecaca;'>Erreur lors du chargement du graphique TradingView.</div>";
            afficherStatus("Erreur TradingView : " + erreur.message);
        }
    }

    function actualiserGraphique() {
        creerWidgetTradingView();
        afficherStatus("Graphique actualisé.");
    }

    function ouvrirTradingView() {
        const symbole = valeurElement("asset-selector", "BINANCE:BTCUSDT");
        const intervalle = valeurElement("interval-selector", "D");
        const url = "https://www.tradingview.com/chart/?symbol=" + encodeURIComponent(symbole) + "&interval=" + encodeURIComponent(intervalle);
        window.open(url, "_blank");
    }


    async function viderTableTradingCapture() {
        const confirmation = confirm("Êtes-vous sûr de vouloir vider toute la table trading_capture ?\n\nCette action supprimera toutes les configurations enregistrées.");

        if (!confirmation) {
            afficherStatus("Suppression annulée.");
            return;
        }

        const motDePasse = await demanderMotDePasseAdmin();

        if (!motDePasse || motDePasse.trim() === "") {
            afficherStatus("Suppression annulée : mot de passe absent.");
            alert("Suppression annulée : mot de passe absent.");
            return;
        }

        const url = getApiViderCapturesUrl();

        afficherStatus("Vidage de la table trading_capture en cours...");
        afficherEtatServeur("warning", "Suppression des captures...");
        afficherInfosServeur(
            "VIDAGE DE LA TABLE\n" +
            "------------------\n" +
            "Table : trading_capture\n" +
            "Route appelée : " + url
        );

        try {
            const resultat = await appelerJson(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-store",
                body: JSON.stringify({
                    motDePasse: motDePasse.trim()
                })
            });

            afficherStatus("Table trading_capture vidée.");
            afficherEtatServeur("ok", "Table vidée");
            afficherInfosServeur(
                "VIDAGE RÉUSSI\n" +
                "-------------\n" +
                JSON.stringify(resultat, null, 4)
            );

            const select = document.getElementById("liste-captures-postgres");
            if (select) {
                select.innerHTML = '<option value="">Aucune configuration enregistrée</option>';
            }

            configurationActuelle = null;
            afficherConfiguration({ message: "La table trading_capture a été vidée." });
            alert("La table trading_capture a été vidée.");

        } catch (erreur) {
            console.error("Erreur pendant le vidage de la table trading_capture :", erreur);

            afficherStatus("Impossible de vider la table trading_capture.");
            afficherEtatServeur("error", "Erreur vidage table");
            afficherInfosServeur(
                "ERREUR VIDAGE TABLE\n" +
                "-------------------\n" +
                "Route appelée : " + url + "\n\n" +
                "Détail : " + erreur.message
            );

            alert("Impossible de vider la table trading_capture.\n\nDétail : " + erreur.message);
        }
    }

    function ouvrirServeurRender() {
        window.open(getApiBaseUrl(), "_blank");
    }

    async function appelerJson(url, options = {}) {
        try {
            const urlFinale = String(url || "").replace("https://https://", "https://");

            console.log("APPEL JSON - URL :", urlFinale);
            console.log("APPEL JSON - OPTIONS :", options);

            const reponse = await fetch(urlFinale, {
                ...options,
                mode: "cors",
                credentials: "omit",
                cache: "no-store",
                headers: {
                    "Accept": "application/json",
                    ...(options.headers || {})
                }
            });

            const texte = await reponse.text();

            console.log("STATUT HTTP :", reponse.status);
            console.log("RÉPONSE BRUTE :", texte);

            let json;

            try {
                json = JSON.parse(texte);
            } catch (erreurJson) {
                throw new Error("Le serveur n'a pas retourné du JSON. Réponse reçue : " + texte);
            }

            if (!reponse.ok) {
                throw new Error(json.detail || json.message || "Réponse HTTP " + reponse.status);
            }

            return json;

        } catch (erreur) {
            console.error("ERREUR DANS appelerJson :", erreur);
            throw erreur;
        }
    }

    async function testerServeur() {
        const urlTest = getApiTestUrl();
        const debut = performance.now();
        afficherEtatServeur("warning", "Test du serveur en cours...");
        afficherInfosServeur("Test de la route :\n" + urlTest);

        try {
            const resultat = await appelerJson(urlTest, { method: "GET", cache: "no-store" });
            const duree = Math.round(performance.now() - debut);
            afficherEtatServeur("ok", "Serveur connecté");
            afficherInfosServeur("TEST RÉUSSI\n-----------\nRoute : " + urlTest + "\nTemps : " + duree + " ms\n\n" + JSON.stringify(resultat, null, 4));
        } catch (erreur) {
            afficherEtatServeur("error", "Serveur inaccessible");
            afficherInfosServeur("TEST ÉCHOUÉ\n-----------\nRoute : " + urlTest + "\n\n" + erreur.message);
        }
    }

    async function creerTablePostgres() {
        const url = getApiCreerTableUrl();
        afficherEtatServeur("warning", "Création de la table...");
        afficherInfosServeur("Appel :\n" + url);

        try {
            const resultat = await appelerJson(url, { method: "GET", cache: "no-store" });
            afficherEtatServeur("ok", "Table PostgreSQL prête");
            afficherInfosServeur(JSON.stringify(resultat, null, 4));
            alert("Table PostgreSQL créée ou déjà existante.");
        } catch (erreur) {
            afficherEtatServeur("error", "Erreur table PostgreSQL");
            afficherInfosServeur("Impossible de créer la table.\n\n" + erreur.message);
            alert("Impossible de créer la table PostgreSQL.");
        }
    }

    async function verifierTablePostgres() {
        const url = getApiVerifierTableUrl();
        afficherEtatServeur("warning", "Vérification de la table...");
        afficherInfosServeur("Appel :\n" + url);

        try {
            const resultat = await appelerJson(url, { method: "GET", cache: "no-store" });
            afficherEtatServeur(resultat.tableExiste ? "ok" : "warning", resultat.tableExiste ? "Table existante" : "Table absente");
            afficherInfosServeur(JSON.stringify(resultat, null, 4));
        } catch (erreur) {
            afficherEtatServeur("error", "Erreur vérification table");
            afficherInfosServeur("Impossible de vérifier la table.\n\n" + erreur.message);
        }
    }


    function lireParametresGraphiquesMasques() {
        return {
            actif: valeurElement("asset-selector", "BINANCE:BTCUSDT"),
            actifLibelle: libelleElement("asset-selector", "Bitcoin / USDT"),
            intervalle: valeurElement("interval-selector", "D"),
            intervalleLibelle: libelleElement("interval-selector", "1 jour"),
            indicateur: valeurElement("indicator-selector", "RSI"),
            indicateurLibelle: libelleElement("indicator-selector", "RSI")
        };
    }

    function capturerConfigurationTradingView(afficherAlerte = true) {
        const parametresGraphiques = lireParametresGraphiquesMasques();

        configurationActuelle = {
            nom: "Configuration TradingView IA",
            dateCapture: new Date().toISOString(),
            serveur: {
                apiAnalyse: getApiAnalyseUrl(),
                apiTest: getApiTestUrl(),
                apiMarche: getApiMarcheUrl(),
                apiCaptures: getApiCapturesUrl(),
                apiViderCaptures: getApiViderCapturesUrl(),
                hebergeur: "Render",
                type: "Node.js"
            },
            graphique: {
                actif: parametresGraphiques.actif,
                actifLibelle: parametresGraphiques.actifLibelle,
                intervalle: parametresGraphiques.intervalle,
                intervalleLibelle: parametresGraphiques.intervalleLibelle,
                indicateur: parametresGraphiques.indicateur,
                indicateurLibelle: parametresGraphiques.indicateurLibelle,
                typeBougie: valeurElement("type-bougie", "bougies_japonaises"),
                typeBougieLibelle: libelleElement("type-bougie", "Bougies japonaises"),
                source: "champs_html_masques",
                sourceAffichage: "widget_tradingview_integre",
                champsMasques: true
            },
            analyseIA: {
                categorie: getCategorieAnalyseBTC(),
                categorieLibelle: getLibelleCategorieAnalyseBTC(),
                descriptionCategorie: getDescriptionCategorieAnalyseBTC(),
                strategie: valeurElement("strategie-selector", "suivi_tendance"),
                statut: "pret_pour_analyse"
            },
            risque: {
                capitalInitial: nombreElement("capital-input", 1000),
                risqueParPositionPourcent: nombreElement("risk-input", 1),
                stopLossPourcent: nombreElement("stoploss-input", 2),
                takeProfitPourcent: nombreElement("takeprofit-input", 4),
                levier: nombreElement("levier-input", 1),
                sens: valeurElement("sens-selector", "achat_vente")
            },
            snapshot: {
                url: valeurElement("snapshot-url", ""),
                categorieAnalyse: getCategorieAnalyseBTC(),
                categorieAnalyseLibelle: getLibelleCategorieAnalyseBTC(),
                descriptionCategorieAnalyse: getDescriptionCategorieAnalyseBTC(),
                screenshotBase64: null
            },
            marche: null,
            notes: valeurElement("notes-analyse", "").trim(),
            limites: {
                captureCompleteTradingView: false,
                dessinsInternesTradingView: false,
                remarque: "La page capture les paramètres contrôlés par l'interface HTML."
            }
        };

        afficherConfiguration(configurationActuelle);
        afficherStatus("Configuration capturée avec succès.");

        if (afficherAlerte) alert("Configuration capturée.");

        return configurationActuelle;
    }

    async function capturerEtEnregistrerConfiguration() {
        try {
            capturerConfigurationTradingView(false);

            afficherStatus("Capture en cours, ajout des données de marché...");

            await enrichirConfigurationAvecDonneesMarche(false);

            await enregistrerCapturePostgres(true, false);

        } catch (erreur) {
            console.error("Erreur capture et enregistrement :", erreur);
            afficherStatus("Erreur pendant la capture et l'enregistrement.");
            alert("Erreur pendant la capture et l'enregistrement : " + erreur.message);
        }
    }

    async function enrichirConfigurationAvecDonneesMarche(afficherAlerte = true) {
        if (!configurationActuelle) capturerConfigurationTradingView(false);

        const urlMarche = getApiMarcheUrl();
        afficherStatus("Récupération des données de marché...");
        afficherEtatServeur("warning", "Appel /api/marche...");

        try {
            const donneesMarche = await appelerJson(urlMarche, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                cache: "no-store",
                body: JSON.stringify({
                    actif: configurationActuelle.graphique.actif,
                    intervalle: configurationActuelle.graphique.intervalle,
                    indicateur: configurationActuelle.graphique.indicateur,
                    categorieAnalyse: configurationActuelle.analyseIA.categorie
                })
            });

            configurationActuelle.marche = {
                prixActuel: donneesMarche.prixActuel ?? null,
                support: donneesMarche.support ?? null,
                resistance: donneesMarche.resistance ?? null,
                rsi: donneesMarche.rsi ?? null,
                ema20: donneesMarche.ema20 ?? null,
                ema50: donneesMarche.ema50 ?? null,
                macd: donneesMarche.macd ?? null,
                volume: donneesMarche.volume ?? "neutre",
                tendance: donneesMarche.tendance ?? "neutre",
                source: donneesMarche.source ?? "serveur_nodejs",
                api: urlMarche,
                dateMiseAJour: new Date().toISOString()
            };

            localStorage.setItem("configurationTradingViewIA", JSON.stringify(configurationActuelle));
            afficherConfiguration(configurationActuelle);
            afficherEtatServeur("ok", "Données de marché reçues");
            afficherStatus("Configuration enrichie avec les données de marché.");
            afficherInfosServeur(JSON.stringify(donneesMarche, null, 4));
            if (afficherAlerte) alert("Données de marché ajoutées.");
        } catch (erreur) {
            afficherEtatServeur("error", "Erreur /api/marche");
            afficherStatus("Impossible de récupérer les données de marché.");
            afficherInfosServeur("ERREUR /api/marche\n-----------------\nAdresse : " + urlMarche + "\n\n" + erreur.message);
            if (afficherAlerte) alert("Impossible d'ajouter les données de marché.");
        }
    }

    function nettoyerNomFichier(valeur) {
        return String(valeur || "non-defini")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9-_]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");
    }

    function genererTimestampFichier() {
        const maintenant = new Date();
        const annee = maintenant.getFullYear();
        const mois = String(maintenant.getMonth() + 1).padStart(2, "0");
        const jour = String(maintenant.getDate()).padStart(2, "0");
        const heure = String(maintenant.getHours()).padStart(2, "0");
        const minute = String(maintenant.getMinutes()).padStart(2, "0");
        const seconde = String(maintenant.getSeconds()).padStart(2, "0");
        return annee + mois + jour + "-" + heure + minute + seconde;
    }

    function genererNomCapturePostgres(configuration) {
        const actif = nettoyerNomFichier(configuration.graphique.actif);
        const indicateur = nettoyerNomFichier(configuration.graphique.indicateur);

        const categorieAnalyse =
            configuration?.analyseIA?.categorieLibelle ||
            configuration?.analyseIA?.categorie ||
            configuration?.snapshot?.categorieAnalyseLibelle ||
            configuration?.snapshot?.categorieAnalyse ||
            "Liquidité de marché";

        const categorie = nettoyerNomFichier(categorieAnalyse);
        const timestamp = genererTimestampFichier();

        /*
            Format demandé :
            ACTIF-INDICATEUR-CATEGORIE_ANALYSE-TIMESTAMP

            Exemple :
            BINANCE-BTCUSDT-RSI-ANALYSE-TECHNIQUE-20260510-154233
        */
        return actif + "-" + indicateur + "-" + categorie + "-" + timestamp;
    }

    function obtenirScreenshotBase64DepuisConfiguration() {
        if (!configurationActuelle || !configurationActuelle.snapshot) return null;
        return configurationActuelle.snapshot.screenshotBase64 || null;
    }

    async function enregistrerCapturePostgres(afficherAlerte = true, capturerAvant = true) {
        try {
            if (capturerAvant) {
                capturerConfigurationTradingView(false);
            }

            if (!configurationActuelle) {
                throw new Error("configurationActuelle est vide ou non définie.");
            }

            if (!configurationActuelle.graphique) {
                throw new Error("configurationActuelle.graphique est vide ou non défini.");
            }

            const parametresGraphiques = lireParametresGraphiquesMasques();

            configurationActuelle.graphique.actif = parametresGraphiques.actif;
            configurationActuelle.graphique.actifLibelle = parametresGraphiques.actifLibelle;
            configurationActuelle.graphique.intervalle = parametresGraphiques.intervalle;
            configurationActuelle.graphique.intervalleLibelle = parametresGraphiques.intervalleLibelle;
            configurationActuelle.graphique.indicateur = parametresGraphiques.indicateur;
            configurationActuelle.graphique.indicateurLibelle = parametresGraphiques.indicateurLibelle;
            configurationActuelle.graphique.source = "champs_html_masques";
            configurationActuelle.graphique.champsMasques = true;

            const urlCaptures = getApiCapturesUrl();
            const nomCapture = genererNomCapturePostgres(configurationActuelle);
            const screenshotBase64 = obtenirScreenshotBase64DepuisConfiguration();

            configurationActuelle.nomCapture = nomCapture;

            const categorieAnalyse =
                configurationActuelle?.analyseIA?.categorieLibelle ||
                configurationActuelle?.analyseIA?.categorie ||
                configurationActuelle?.snapshot?.categorieAnalyseLibelle ||
                configurationActuelle?.snapshot?.categorieAnalyse ||
                "Liquidité de marché";

            const donneesAEnregistrer = {
                actif: configurationActuelle.graphique.actif || "NON_RENSEIGNE",
                indicateur: configurationActuelle.graphique.indicateur || null,
                intervalle: configurationActuelle.graphique.intervalle || null,
                actif_libelle: configurationActuelle.graphique.actifLibelle || null,
                indicateur_libelle: configurationActuelle.graphique.indicateurLibelle || null,
                intervalle_libelle: configurationActuelle.graphique.intervalleLibelle || null,

                /*
                    On garde nom_fichier pour compatibilité avec ton ancien code.
                    On ajoute nom_capture pour la nouvelle colonne.
                    On ajoute aussi categorie_analyse pour server.js.
                */
                nom_fichier: nomCapture || ("capture-" + new Date().toISOString()),
                nom_capture: nomCapture || ("capture-" + new Date().toISOString()),
                categorie_analyse: categorieAnalyse,
                categorieAnalyse: categorieAnalyse,

                configuration_json: configurationActuelle,

                /*
                    Je garde ton choix actuel :
                    screenshot désactivé pour éviter les erreurs de taille ou de capture.
                */
                screenshot_base64: null
            };

            console.log("URL PostgreSQL :", urlCaptures);
            console.log("Données envoyées :", donneesAEnregistrer);

            afficherStatus("Enregistrement dans PostgreSQL...");
            afficherEtatServeur("warning", "Envoi vers PostgreSQL...");
            afficherInfosServeur(
                "ENVOI EN COURS\n" +
                "--------------\n" +
                "Route : " + urlCaptures + "\n" +
                "Table : trading_capture\n" +
                "Nom capture : " + donneesAEnregistrer.nom_capture
            );

            const reponse = await fetch(urlCaptures, {
                method: "POST",
                mode: "cors",
                credentials: "omit",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                cache: "no-store",
                body: JSON.stringify(donneesAEnregistrer)
            });

            const texte = await reponse.text();

            console.log("Statut HTTP :", reponse.status);
            console.log("Réponse brute serveur :", texte);

            let resultat;

            try {
                resultat = JSON.parse(texte);
            } catch (erreurJson) {
                throw new Error("Réponse non JSON du serveur : " + texte);
            }

            if (!reponse.ok || resultat.ok !== true) {
                throw new Error(resultat.detail || resultat.message || "Erreur serveur inconnue.");
            }

            console.log("Réponse PostgreSQL :", resultat);

            if (!resultat || resultat.ok !== true || resultat.statut !== "ok") {
                throw new Error("Réponse serveur incorrecte : " + JSON.stringify(resultat));
            }

            localStorage.setItem(
                "configurationTradingViewIA",
                JSON.stringify(configurationActuelle)
            );

            afficherStatus("Configuration enregistrée dans PostgreSQL.");
            afficherEtatServeur("ok", "Enregistrement réussi");
            afficherInfosServeur(
                "ENREGISTREMENT RÉUSSI\n" +
                "----------------------\n" +
                JSON.stringify(resultat, null, 4)
            );

            await chargerListeCapturesPostgres(false);

            if (afficherAlerte) {
                alert(
                    "Configuration enregistrée dans la base de données.\n\n" +
                    "Nom de la capture : " + donneesAEnregistrer.nom_capture
                );
            }

        } catch (erreur) {
            console.error("Erreur complète d'enregistrement PostgreSQL :", erreur);

            afficherStatus("Erreur lors de l'enregistrement.");
            afficherEtatServeur("error", "Erreur base de données");
            afficherInfosServeur(
                "ERREUR D'ENREGISTREMENT\n" +
                "-----------------------\n" +
                erreur.message
            );

            alert("Impossible d'enregistrer dans la base de données : " + erreur.message);
        }
    }

    async function chargerListeCapturesPostgres(afficherAlerte = true) {
        /*
            On garde l'ancienne URL fixe qui fonctionnait hier.
        */
        const urlCaptures = "https://trading-g8ie.onrender.com/api/captures";

        const select = document.getElementById("liste-captures-postgres");
        if (!select) return;

        afficherStatus("Chargement de la liste PostgreSQL...");
        afficherEtatServeur("warning", "Lecture /api/captures...");

        try {
            console.log("URL utilisée pour charger la liste :", urlCaptures);

            const resultat = await appelerJson(urlCaptures, { method: "GET", cache: "no-store" });

            select.innerHTML = '<option value="">Choisir une configuration</option>';

            if (!resultat.captures || resultat.captures.length === 0) {
                select.innerHTML = '<option value="">Aucune configuration enregistrée</option>';
            } else {
                resultat.captures.forEach(function(capture) {
                    const option = document.createElement("option");

                    /*
                        Important :
                        La valeur reste l'id, car la route de chargement est /api/captures/:id.
                    */
                    option.value = capture.id;

                    const dateCapture = capture.date_capture
                        ? new Date(capture.date_capture).toLocaleString("fr-CA")
                        : "date inconnue";

                    const nomCapture =
                        capture.nom_capture ||
                        capture.nom_fichier ||
                        (
                            (capture.actif || "actif") +
                            "-" +
                            (capture.indicateur || "indicateur") +
                            "-" +
                            dateCapture
                        );

                    /*
                        Affichage demandé :
                        on affiche le nom_capture dans la liste déroulante.
                    */
                    option.textContent =
                        capture.id +
                        " - " +
                        nomCapture +
                        " - " +
                        dateCapture;

                    select.appendChild(option);
                });
            }

            afficherStatus("Liste PostgreSQL chargée.");
            afficherEtatServeur("ok", "Captures chargées");
            afficherInfosServeur(
                "LISTE DES CAPTURES\n" +
                "------------------\n" +
                "Nombre : " + (resultat.captures ? resultat.captures.length : 0)
            );

            if (afficherAlerte) alert("Liste des captures chargée.");
        } catch (erreur) {
            afficherStatus("Impossible de charger la liste PostgreSQL.");
            afficherEtatServeur("error", "Erreur lecture /api/captures");
            afficherInfosServeur(
                "ERREUR LECTURE /api/captures\n" +
                "---------------------------\n" +
                erreur.message
            );

            if (afficherAlerte) alert("Impossible de charger la liste PostgreSQL.");
        }
    }

    async function chargerCapturePostgresSelectionnee() {
        const select = document.getElementById("liste-captures-postgres");
        if (!select || !select.value) {
            alert("Choisir une capture dans la liste.");
            return;
        }

        const urlCapture = getApiCapturesUrl() + "/" + encodeURIComponent(select.value);

        afficherStatus("Chargement de la capture PostgreSQL...");
        afficherEtatServeur("warning", "Lecture capture PostgreSQL...");

        try {
            const resultat = await appelerJson(urlCapture, { method: "GET", cache: "no-store" });
            const capture = resultat.capture;

            configurationActuelle = capture.configuration_json || null;

            if (!configurationActuelle) {
                throw new Error("La capture ne contient pas configuration_json.");
            }

            appliquerConfiguration(configurationActuelle);
            afficherConfiguration(configurationActuelle);
            afficherScreenshotPostgres(capture.screenshot_base64);
            localStorage.setItem("configurationTradingViewIA", JSON.stringify(configurationActuelle));

            afficherStatus("Capture PostgreSQL chargée.");
            afficherEtatServeur("ok", "Capture chargée");
            afficherInfosServeur(
                "CAPTURE CHARGÉE\n" +
                "---------------\n" +
                "ID : " + capture.id + "\n" +
                "Nom capture : " + (capture.nom_capture || capture.nom_fichier || "non renseigné") + "\n" +
                "Actif : " + capture.actif
            );

            alert("Capture PostgreSQL chargée.");
        } catch (erreur) {
            afficherStatus("Impossible de charger la capture PostgreSQL.");
            afficherEtatServeur("error", "Erreur capture PostgreSQL");
            afficherInfosServeur(
                "ERREUR CHARGEMENT CAPTURE\n" +
                "--------------------------\n" +
                erreur.message
            );

            alert("Impossible de charger la capture sélectionnée.");
        }
    }

    function afficherScreenshotPostgres(screenshotBase64) {
        const image = document.getElementById("image-capture-postgres");
        if (!image) return;

        if (screenshotBase64 && String(screenshotBase64).trim() !== "") {
            image.src = screenshotBase64;
            image.style.display = "block";
        } else {
            image.removeAttribute("src");
            image.style.display = "none";
        }
    }

    function appliquerConfiguration(configuration) {
        if (!configuration || !configuration.graphique) return;

        definirValeur("asset-selector", configuration.graphique.actif);
        definirValeur("interval-selector", configuration.graphique.intervalle);
        definirValeur("indicator-selector", configuration.graphique.indicateur);
        definirValeur("type-bougie", configuration.graphique.typeBougie);

        if (configuration.analyseIA) {
            definirValeur("categorie-analyse-btc", configuration.analyseIA.categorie);
            definirValeur("strategie-selector", configuration.analyseIA.strategie);
            actualiserDescriptionCategorie();
        }

        if (configuration.risque) {
            definirValeur("capital-input", configuration.risque.capitalInitial);
            definirValeur("risk-input", configuration.risque.risqueParPositionPourcent);
            definirValeur("stoploss-input", configuration.risque.stopLossPourcent);
            definirValeur("takeprofit-input", configuration.risque.takeProfitPourcent);
            definirValeur("levier-input", configuration.risque.levier);
            definirValeur("sens-selector", configuration.risque.sens);
        }

        if (configuration.snapshot) definirValeur("snapshot-url", configuration.snapshot.url);
        if (configuration.serveur && configuration.serveur.apiAnalyse) definirValeur("api-url", configuration.serveur.apiAnalyse);
        if (configuration.notes !== undefined) definirValeur("notes-analyse", configuration.notes);

        creerWidgetTradingView();
    }

    function definirValeur(id, valeur) {
        const element = document.getElementById(id);
        if (element && valeur !== undefined && valeur !== null) element.value = valeur;
    }

    function rechargerConfigurationTradingView() {
        const data = localStorage.getItem("configurationTradingViewIA");
        if (!data) {
            alert("Aucune configuration sauvegardée.");
            return;
        }

        try {
            configurationActuelle = JSON.parse(data);
            appliquerConfiguration(configurationActuelle);
            afficherConfiguration(configurationActuelle);
            afficherStatus("Configuration rechargée.");
            alert("Configuration rechargée.");
        } catch (erreur) {
            alert("Erreur : configuration sauvegardée invalide.");
        }
    }

    async function ouvrirPageDecision() {
        try {
            capturerConfigurationTradingView(false);

            afficherStatus("Préparation du snapshot avec les données de marché...");

            await enrichirConfigurationAvecDonneesMarche(false);

            localStorage.setItem(
                "configurationTradingViewIA",
                JSON.stringify(configurationActuelle)
            );

            window.open("decisions.html", "_blank");

        } catch (erreur) {
            console.error("Erreur ouverture decisions.html :", erreur);

            if (!configurationActuelle) {
                capturerConfigurationTradingView(false);
            }

            localStorage.setItem(
                "configurationTradingViewIA",
                JSON.stringify(configurationActuelle)
            );

            alert(
                "Les données de marché n'ont pas pu être ajoutées. " +
                "La page de décision va s'ouvrir avec les données disponibles."
            );

            window.open("decisions.html", "_blank");
        }
    }

    function importerJSONDepuisFichier(event) {
        const fichier = event.target.files[0];
        if (!fichier) return;

        const lecteur = new FileReader();
        lecteur.onload = function(e) {
            try {
                const configuration = JSON.parse(e.target.result);
                if (!configuration.graphique) throw new Error("Le fichier JSON ne contient pas de bloc graphique.");
                configurationActuelle = configuration;
                appliquerConfiguration(configurationActuelle);
                afficherConfiguration(configurationActuelle);
                localStorage.setItem("configurationTradingViewIA", JSON.stringify(configurationActuelle));
                afficherStatus("Configuration JSON importée.");
                alert("Configuration JSON importée avec succès.");
            } catch (erreur) {
                alert("Import impossible. Fichier JSON invalide.\n\n" + erreur.message);
            }

            event.target.value = "";
        };

        lecteur.readAsText(fichier);
    }

async function viderTableCaptures() {
    const confirmation = confirm(
        "Attention : cette action va supprimer toutes les captures enregistrées.\n\n" +
        "Voulez-vous vraiment vider la table trading_capture ?"
    );

    if (!confirmation) {
        return;
    }

    const motDePasse = await demanderMotDePasseAdmin();

    if (!motDePasse || motDePasse.trim() === "") {
        alert("Suppression annulée : mot de passe absent.");
        return;
    }

    try {
        const reponse = await fetch("https://trading-g8ie.onrender.com/api/vider-captures", {
            method: "POST",
            mode: "cors",
            credentials: "omit",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            cache: "no-store",
            body: JSON.stringify({
                motDePasse: motDePasse.trim()
            })
        });

        const texte = await reponse.text();
        const resultat = JSON.parse(texte);

        if (!reponse.ok || resultat.ok !== true) {
            throw new Error(resultat.message || "Erreur inconnue.");
        }

        alert("La table trading_capture a été vidée avec succès.");

        if (typeof chargerListeCapturesPostgres === "function") {
            chargerListeCapturesPostgres(false);
        }

    } catch (erreur) {
        alert("Impossible de vider la table trading_capture : " + erreur.message);
        console.error("Erreur vidage table :", erreur);
    }
}
    document.addEventListener("DOMContentLoaded", function () {
        const champApi = document.getElementById("api-url");
        if (champApi && !champApi.value.trim()) {
            champApi.value = API_BASE_URL_PAR_DEFAUT + "/api/analyse";
        }

        const selectCategorie = document.getElementById("categorie-analyse-btc");
        if (selectCategorie) {
            selectCategorie.addEventListener("change", function () {
                actualiserDescriptionCategorie();

                if (configurationActuelle) {
                    configurationActuelle.analyseIA.categorie = getCategorieAnalyseBTC();
                    configurationActuelle.analyseIA.categorieLibelle = getLibelleCategorieAnalyseBTC();
                    configurationActuelle.analyseIA.descriptionCategorie = getDescriptionCategorieAnalyseBTC();
                    afficherConfiguration(configurationActuelle);
                }
            });
        }

        actualiserDescriptionCategorie();
        creerWidgetTradingView();
        chargerListeCapturesPostgres(false);
    });
</script>
</body>
</html><!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Trading Station IA</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://s3.tradingview.com/tv.js"></script>

    <style>
        * { box-sizing: border-box; }

		body {
			margin: 0;
			font-family: Arial, sans-serif;
			background: #ffffff;
			color: #111827;
		}

        header {
            background: #0f172a;
            border-bottom: 2px solid #00d9ff;
            padding: 14px 20px;
        }

        .top-bar {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px;
        }

        .logo {
            font-size: 22px;
            font-weight: bold;
            color: #00d9ff;
            margin-right: 18px;
            line-height: 1.1;
        }

        .logo span { color: #facc15; }

        .auteur-logo {
            display: block;
            font-size: 12px;
            font-weight: normal;
            color: #cbd5e1;
            margin-top: 3px;
        }

        .control-group {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .capture-selector-top {
            display: flex;
            align-items: center;
            gap: 8px;
            flex: 0 1 560px;
            min-width: 360px;
            max-width: 620px;
        }

        .capture-selector-top label {
            white-space: nowrap;
        }

        #liste-captures-postgres {
            width: 100%;
            min-width: 260px;
            max-width: 430px;
        }

        .analysis-category-top {
            display: flex;
            align-items: center;
            gap: 6px;
            flex: 0 0 340px;
            min-width: 300px;
            max-width: 360px;
            margin-left: 8px;
        }

        .analysis-category-top label {
            white-space: nowrap;
        }

        .analysis-category-top select {
            width: 190px;
            min-width: 180px;
        }

        .category-description-top {
            display: none;
        }
            max-width: 190px;
        }

        .category-description-top {
            flex: 1 1 100%;
            margin-top: 0;
            display: none;
        }

        label {
            font-weight: bold;
            color: #00d9ff;
            font-size: 13px;
        }

        select, input, textarea {
            background: #020617;
            color: white;
            border: 1px solid #334155;
            border-radius: 6px;
            padding: 7px;
            font-size: 13px;
            max-width: 100%;
        }

        button {
            border: none;
            border-radius: 7px;
            padding: 8px 10px;
            font-weight: bold;
            cursor: pointer;
            font-size: 12px;
            white-space: nowrap;
        }

        button:hover { opacity: 0.85; }

        .btn-tv { background: #2962ff; color: white; }
        .btn-capture { background: #00d9ff; color: #00111a; }
        .btn-save { background: #22c55e; color: #03130a; }
        .btn-copy { background: #facc15; color: #1a1300; }
        .btn-export { background: #a855f7; color: white; }
        .btn-import { background: #14b8a6; color: #001a16; }
        .btn-api { background: #fb923c; color: #1a0b00; }
        .btn-db { background: #10b981; color: #00130d; }
        .btn-load { background: #6366f1; color: white; }
        .btn-ai { background: #38bdf8; color: #00111a; }
        .btn-market { background: #84cc16; color: #102000; }
        .btn-decision { background: #eab308; color: #1a1300; }
        .btn-clear { background: #ef4444; color: white; }
        .btn-dark { background: #334155; color: white; }

        .header-images {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-left: 8px;
        }

        .header-images img {
            width: 48px;
            height: 48px;
            object-fit: cover;
            border-radius: 6px;
            border: 1px solid #334155;
            background: #020617;
            padding: 1px;
        }

        main {
            display: grid;
            grid-template-columns: minmax(0, 2.3fr) minmax(320px, 0.7fr);
            gap: 14px;
            padding: 14px;
        }

        .chart-panel, .side-panel {
            background: #111827;
            border: 1px solid #263244;
            border-radius: 12px;
            padding: 14px;
        }

        .chart-panel { min-width: 0; }
        .side-panel { min-width: 320px; overflow: hidden; }

        .chart-title-row {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 14px;
            margin-bottom: 10px;
            width: 100%;
            flex-wrap: nowrap;
            overflow-x: auto;
        }

        .chart-title-row h2 {
            margin: 0;
            padding-bottom: 0;
            border-bottom: none;
            line-height: 1.1;
            flex: 0 0 auto;
        }

        .chart-title-icons {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 8px;
            flex-shrink: 0;
            margin-left: auto;
        }

        .chart-title-icons img {
            width: 36px;
            height: 36px;
            object-fit: cover;
            border-radius: 6px;
            border: 1px solid #334155;
            background: #020617;
            padding: 1px;
        }

        .chart-inline-controls {
            display: flex;
            align-items: center;
            gap: 12px;
            margin: 0;
            flex-wrap: nowrap;
            flex: 0 0 auto;
        }

        .chart-inline-controls .form-block {
            display: flex;
            align-items: center;
            gap: 6px;
            flex: 0 0 auto;
            margin-bottom: 0;
        }

        .chart-inline-controls .form-block label {
            margin-bottom: 0;
            white-space: nowrap;
            color: #ffffff;
        }

        .chart-inline-controls .form-block select {
            width: 175px;
        }

        .chart-inline-controls .form-block input {
            width: 105px;
        }

        #tradingview_chart {
            height: 700px;
            width: 100%;
            border-radius: 10px;
            overflow: hidden;
            background: #020617;
        }

        h2 {
            color: #00d9ff;
            font-size: 18px;
            margin-top: 0;
            border-bottom: 1px solid #263244;
            padding-bottom: 8px;
        }

        h3 {
            color: #facc15;
            font-size: 15px;
            margin-bottom: 8px;
        }

        .form-block {
            margin-bottom: 12px;
            min-width: 0;
        }

        .form-block label {
            display: block;
            margin-bottom: 5px;
        }

        .form-block input, .form-block select, .form-block textarea { width: 100%; }

        pre {
            background: #020617;
            color: #a7f3d0;
            padding: 12px;
            border-radius: 10px;
            border: 1px solid #263244;
            min-height: 260px;
            max-height: 420px;
            overflow: auto;
            font-size: 12px;
            white-space: pre-wrap;
            word-break: break-word;
        }

        .button-zone {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 12px 0;
        }

        .button-zone button { flex: 1 1 120px; }

        .status {
            background: #020617;
            border: 1px solid #263244;
            border-radius: 8px;
            padding: 10px;
            color: #facc15;
            font-size: 13px;
            margin-top: 10px;
        }

        .server-status {
            padding: 12px;
            border-radius: 8px;
            font-weight: bold;
            margin-bottom: 12px;
            text-align: center;
            font-size: 13px;
        }

        .server-status.neutral { background: #334155; color: #ffffff; }
        .server-status.ok { background: #064e3b; color: #86efac; }
        .server-status.error { background: #7f1d1d; color: #fecaca; }
        .server-status.warning { background: #713f12; color: #fde68a; }

        .server-info {
            background: #020617;
            border: 1px solid #334155;
            border-radius: 8px;
            padding: 10px;
            font-family: Consolas, monospace;
            font-size: 12px;
            color: #d1d5db;
            white-space: pre-wrap;
            word-break: break-word;
            min-height: 90px;
            max-height: 220px;
            overflow: auto;
        }

        .analysis-category-box, .ai-section, .risk-box {
            margin-top: 14px;
            background: #0b1220;
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 14px;
        }

        .side-panel > section:first-child { margin-top: 0; }

        .risk-box h3 {
            margin-top: 0;
            margin-bottom: 12px;
        }

        .analysis-category-box select { width: 100%; }

        .category-description, .note {
            margin-top: 10px;
            padding: 10px;
            background: #020617;
            border: 1px solid #334155;
            border-radius: 8px;
            color: #d1d5db;
            font-size: 12px;
            line-height: 1.5;
        }

        .ai-result-box {
            background: #020617;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 14px;
            min-height: 220px;
            max-height: 520px;
            overflow: auto;
            white-space: pre-wrap;
            word-break: break-word;
            font-family: Consolas, monospace;
            font-size: 13px;
            color: #d1d5db;
        }

        .screenshot-preview {
            margin-top: 12px;
            background: #020617;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 10px;
        }

        .screenshot-preview img {
            width: 100%;
            max-height: 360px;
            object-fit: contain;
            border-radius: 8px;
            background: #000;
            display: none;
        }

        footer {
            text-align: center;
            color: #94a3b8;
            font-size: 12px;
            padding: 16px;
            border-top: 1px solid #263244;
        }


        .modal-password-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.72);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 16px;
        }

        .modal-password-box {
            width: 100%;
            max-width: 420px;
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 18px;
            color: #ffffff;
            box-shadow: 0 18px 45px rgba(0, 0, 0, 0.45);
        }

        .modal-password-box h3 {
            margin-top: 0;
            color: #facc15;
        }

        .modal-password-box p {
            font-size: 13px;
            line-height: 1.5;
            color: #cbd5e1;
        }

        .modal-password-box input {
            width: 100%;
            margin-top: 8px;
            margin-bottom: 14px;
        }

        .modal-password-actions {
            display: flex;
            gap: 8px;
            justify-content: flex-end;
            flex-wrap: wrap;
        }

        .modal-password-actions button {
            min-width: 110px;
        }

        @media (max-width: 1200px) {
            main { grid-template-columns: minmax(0, 2fr) minmax(320px, 0.8fr); }
            #tradingview_chart { height: 650px; }
        }

        @media (max-width: 1000px) {
            main { grid-template-columns: 1fr; }
            .side-panel { min-width: 0; }
            #tradingview_chart { height: 520px; }
        }

        @media (max-width: 700px) {
            header { padding: 12px; }
            .top-bar { flex-direction: column; align-items: stretch; }
            .control-group { flex-direction: column; align-items: stretch; }

            .capture-selector-top {
                flex-direction: column;
                align-items: stretch;
                min-width: 0;
                max-width: none;
                width: 100%;
            }

            .analysis-category-top {
                flex-direction: column;
                align-items: stretch;
                min-width: 0;
                max-width: none;
                width: 100%;
                margin-left: 0;
            }

            .analysis-category-top select {
                min-width: 0;
                width: 100%;
            }

            #liste-captures-postgres {
                min-width: 0;
                max-width: none;
                width: 100%;
            }

            button { width: 100%; }
            .button-zone button { flex: 1 1 100%; }
            .logo { text-align: center; margin-right: 0; }
            .header-images { justify-content: center; margin-left: 0; }
            .header-images img { width: 43px; height: 43px; }
            .chart-title-row { justify-content: flex-start; flex-wrap: nowrap; }
            .chart-inline-controls { flex: 0 0 auto; flex-wrap: nowrap; }
            .chart-inline-controls .form-block { flex: 0 0 auto; }
            .chart-title-icons img { width: 30px; height: 30px; }
            #tradingview_chart { height: 460px; }
        }
    </style>
</head>

<body>
<header>
    <div class="top-bar">
        <div class="logo">
            TRADING STATION <span>IA</span>
            <small class="auteur-logo">Auteur : Hocine Korichi, Ing.</small>
        </div>

        <div class="control-group">
            <label for="asset-selector">ACTIF :</label>
            <select id="asset-selector" onchange="actualiserGraphique()">
                <option value="BINANCE:BTCUSDT">Bitcoin / USDT</option>
                <option value="COINBASE:BTCUSD">Bitcoin / USD</option>
                <option value="BINANCE:ETHUSDT">Ethereum / USDT</option>
                <option value="OANDA:XAUUSD">Or / Dollar - XAUUSD</option>
                <option value="NASDAQ:AAPL">Apple - AAPL</option>
                <option value="NASDAQ:TSLA">Tesla - TSLA</option>
                <option value="NASDAQ:NVDA">Nvidia - NVDA</option>
                <option value="NASDAQ:MSFT">Microsoft - MSFT</option>
                <option value="NASDAQ:AMZN">Amazon - AMZN</option>
                <option value="NASDAQ:GOOGL">Google - GOOGL</option>
                <option value="SP:SPX">S&amp;P 500</option>
                <option value="TVC:DXY">Dollar Index - DXY</option>
            </select>
        </div>

        <div class="control-group">
            <label for="interval-selector">INTERVALLE :</label>
            <select id="interval-selector" onchange="actualiserGraphique()">
                <option value="1">1 minute</option>
                <option value="5">5 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 heure</option>
                <option value="240">4 heures</option>
                <option value="D" selected>1 jour</option>
                <option value="W">1 semaine</option>
                <option value="M">1 mois</option>
            </select>
        </div>

        <div class="control-group">
            <label for="indicator-selector">INDICATEUR :</label>
            <select id="indicator-selector" onchange="actualiserGraphique()">
                <option value="RSI">RSI</option>
                <option value="MACD">MACD</option>
                <option value="EMA">EMA</option>
                <option value="SUPERTREND">Supertrend</option>
                <option value="BOLLINGER">Bandes de Bollinger</option>
                <option value="ATR">ATR</option>
                <option value="VOLUME">Volume</option>
                <option value="LIQUIDITY_ZONE">Zones de liquidité</option>
            </select>
        </div>

        <button class="btn-clear" onclick="viderTableTradingCapture()">Vider la table</button>
        <button class="btn-capture" onclick="capturerEtEnregistrerConfiguration()">Capturer et enregistrer</button>
        <!--<button class="btn-market" onclick="enrichirConfigurationAvecDonneesMarche()">Ajouter marché</button>-->
        <button class="btn-db" style="display:none;" onclick="enregistrerCapturePostgres()">Enregistrer la configuration</button>
        <!-- <button class="btn-save" onclick="rechargerConfigurationTradingView()">Recharger</button> -->
        <button class="btn-decision" onclick="ouvrirPageDecision()">Analyser le snapshot</button>

        <div class="capture-selector-top">
            <label for="liste-captures-postgres">Choisir une confihuration :</label>
            <select id="liste-captures-postgres" onchange="chargerCapturePostgresSelectionnee()">
                <option value="">Aucune configuration chargée</option>
            </select>
        </div>

        <div class="analysis-category-top">
            <label for="categorie-analyse-btc">Type d'analyse :</label>
            <select id="categorie-analyse-btc">
                <option value="macroeconomie">Macroéconomie</option>
                <option value="monnaie_bitcoin">Monnaie Bitcoin</option>
                <option value="donnees_on_chain">Données on-chain</option>
                <option value="minage">Minage</option>
                <option value="analyse_technique" selected>Analyse technique</option>
                <option value="derives">Dérivés</option>
                <option value="liquidite_marche">Liquidité de marché</option>
                <option value="institutionnel">Institutionnel</option>
                <option value="sentiment">Sentiment</option>
                <option value="reglementation_risques">Réglementation et risques</option>
            </select>
            <div id="description-categorie-analyse" class="category-description category-description-top">
                Analyse technique : graphiques, tendances, supports, résistances, RSI et moyennes mobiles.
            </div>
        </div>

<!--
        <div class="header-images">
            <img src="img/bitcoin.jfif" alt="Bitcoin">
            <img src="img/lingot-or.jfif" alt="Lingot d'or">
        </div>
-->
    </div>
</header>

<main>
    <section class="chart-panel">
        <div class="chart-title-row">
            <h2>Graphique TradingView intégré</h2>
            <div class="chart-inline-controls">
                <div class="form-block">
                    <label for="type-bougie">Type de graphique</label>
                    <select id="type-bougie" onchange="actualiserGraphique()">
                        <option value="bougies_japonaises" selected>Bougies japonaises</option>
                        <option value="barres">Barres</option>
                        <option value="ligne">Ligne</option>
                        <option value="heikin_ashi">Heikin Ashi</option>
                    </select>
                </div>
                <div class="form-block">
                    <label for="capital-input">Capital initial</label>
                    <input id="capital-input" type="number" value="1000" min="0" step="100">
                </div>
            </div>
            <div class="chart-title-icons">
                <img src="img/bitcoin.jfif" alt="Symbole du Bitcoin">
                <img src="img/lingot-or.jfif" alt="Lingot d'or">
            </div>
        </div>

        <div id="tradingview_chart"></div>
        <input type="file" id="fichier-import-json" accept="application/json,.json" style="display:none;" onchange="importerJSONDepuisFichier(event)">

    </section>

    <aside class="side-panel">
        <section class="risk-box">
            <h3>Paramètres de risque</h3>
            <div class="form-block">
                <label for="risk-input">Risque par position en pourcentage</label>
                <input id="risk-input" type="number" value="1" min="0" step="0.1">
            </div>
            <div class="form-block">
                <label for="stoploss-input">Stop loss en pourcentage</label>
                <input id="stoploss-input" type="number" value="2" min="0" step="0.1">
            </div>
            <div class="form-block">
                <label for="takeprofit-input">Take profit en pourcentage</label>
                <input id="takeprofit-input" type="number" value="4" min="0" step="0.1">
            </div>
            <div class="form-block">
                <label for="levier-input">Levier</label>
                <input id="levier-input" type="number" value="1" min="1" step="1">
            </div>
            <div class="form-block">
                <label for="sens-selector">Sens</label>
                <select id="sens-selector">
                    <option value="achat_vente" selected>Achat ou vente</option>
                    <option value="achat">Achat seulement</option>
                    <option value="vente">Vente seulement</option>
                </select>
            </div>
            <div class="form-block">
                <label for="strategie-selector">Stratégie</label>
                <select id="strategie-selector">
                    <option value="suivi_tendance" selected>Suivi de tendance</option>
                    <option value="retournement">Retournement</option>
                    <option value="cassure">Cassure</option>
                    <option value="range">Range</option>
                </select>
            </div>
            <div class="form-block">
                <label for="snapshot-url">URL éventuelle du snapshot</label>
                <input id="snapshot-url" type="text" placeholder="Lien optionnel vers une image ou un snapshot">
            </div>

        </section>

        <h3>Configuration capturée</h3>
        <pre id="resultat-configuration">Aucune configuration capturée.</pre>

        <div id="status" class="status">En attente de capture.</div>
    </aside>
</main>


<div id="modal-password-overlay" class="modal-password-overlay">
    <div class="modal-password-box">
        <h3>Mot de passe administrateur</h3>
        <p>Entrer le mot de passe pour vider la table <strong>trading_capture</strong>.</p>
        <input id="admin-delete-password-input" type="password" autocomplete="current-password" placeholder="Mot de passe">
        <div class="modal-password-actions">
            <button class="btn-dark" type="button" onclick="fermerFenetreMotDePasse(false)">Annuler</button>
            <button class="btn-clear" type="button" onclick="fermerFenetreMotDePasse(true)">Confirmer</button>
        </div>
    </div>
</div>

<footer>
    Trading Station IA — page HTML sur GitHub Pages, API Node.js sur Render.
</footer>

<script>
    let widgetTradingView = null;
    let configurationActuelle = null;

    const API_BASE_URL_PAR_DEFAUT = "https://trading-g8ie.onrender.com";

    let resolveMotDePasseAdmin = null;

    function demanderMotDePasseAdmin() {
        return new Promise(function(resolve) {
            const overlay = document.getElementById("modal-password-overlay");
            const champ = document.getElementById("admin-delete-password-input");

            resolveMotDePasseAdmin = resolve;

            if (!overlay || !champ) {
                resolve("");
                return;
            }

            champ.value = "";
            overlay.style.display = "flex";

            setTimeout(function() {
                champ.focus();
            }, 50);
        });
    }

    function fermerFenetreMotDePasse(valider) {
        const overlay = document.getElementById("modal-password-overlay");
        const champ = document.getElementById("admin-delete-password-input");

        const valeur = valider && champ ? champ.value : "";

        if (overlay) {
            overlay.style.display = "none";
        }

        if (typeof resolveMotDePasseAdmin === "function") {
            resolveMotDePasseAdmin(valeur);
            resolveMotDePasseAdmin = null;
        }
    }

    document.addEventListener("keydown", function(event) {
        const overlay = document.getElementById("modal-password-overlay");
        const champ = document.getElementById("admin-delete-password-input");

        if (!overlay || overlay.style.display !== "flex") {
            return;
        }

        if (event.key === "Escape") {
            fermerFenetreMotDePasse(false);
        }

        if (event.key === "Enter" && document.activeElement === champ) {
            fermerFenetreMotDePasse(true);
        }
    });


    function valeurElement(id, valeurDefaut = "") {
        const element = document.getElementById(id);
        return element ? element.value : valeurDefaut;
    }

    function libelleElement(id, valeurDefaut = "") {
        const element = document.getElementById(id);
        if (!element || element.selectedIndex < 0) return valeurDefaut;
        return element.options[element.selectedIndex].text;
    }

    function nombreElement(id, valeurDefaut = 0) {
        const element = document.getElementById(id);
        if (!element) return valeurDefaut;
        const valeur = Number(element.value);
        return Number.isFinite(valeur) ? valeur : valeurDefaut;
    }

    function nettoyerUrl(url) {
        return String(url || "").trim().replace(/\/+$/, "");
    }

    function getApiBaseUrl() {
        const champApi = document.getElementById("api-url");
        let valeurChamp = champApi ? nettoyerUrl(champApi.value) : "";

        if (!valeurChamp) return API_BASE_URL_PAR_DEFAUT;

        valeurChamp = valeurChamp
            .replace("https://https://", "https://")
            .replace("http://http://", "http://")
            .replace(/\/analyse\/?$/, "/api/analyse");

        valeurChamp = valeurChamp
            .replace(/\/api\/analyse\/?$/, "")
            .replace(/\/api\/test\/?$/, "")
            .replace(/\/api\/marche\/?$/, "")
            .replace(/\/api\/captures\/?$/, "")
            .replace(/\/api\/vider-captures\/?$/, "")
            .replace(/\/api\/creer-table\/?$/, "")
            .replace(/\/api\/verifier-table\/?$/, "");

        if (!valeurChamp.startsWith("http://") && !valeurChamp.startsWith("https://")) {
            return API_BASE_URL_PAR_DEFAUT;
        }

        return nettoyerUrl(valeurChamp);
    }

    function getApiAnalyseUrl() { return getApiBaseUrl() + "/api/analyse"; }
    function getApiTestUrl() { return getApiBaseUrl() + "/api/test"; }
    function getApiMarcheUrl() { return getApiBaseUrl() + "/api/marche"; }

    /*
        IMPORTANT :
        Cette route reste volontairement fixe.
        Ne pas remplacer par getApiBaseUrl(), car l'enregistrement fonctionnait ainsi.
    */
    function getApiCapturesUrl() { return API_BASE_URL_PAR_DEFAUT + "/api/captures"; }

    function getApiViderCapturesUrl() { return API_BASE_URL_PAR_DEFAUT + "/api/vider-captures"; }

    function getApiCreerTableUrl() { return getApiBaseUrl() + "/api/creer-table"; }
    function getApiVerifierTableUrl() { return getApiBaseUrl() + "/api/verifier-table"; }

    function afficherEtatServeur(type, message) {
        const etat = document.getElementById("etatServeur");
        if (!etat) return;
        etat.className = "server-status " + type;
        etat.textContent = message;
    }

    function afficherInfosServeur(texte) {
        const zone = document.getElementById("infosServeur");
        if (!zone) return;
        zone.textContent = texte;
    }

    function afficherStatus(message) {
        document.getElementById("status").textContent = message;
    }

    function afficherAnalyseIA(texte) {
        document.getElementById("resultat-analyse-ia").textContent = texte;
    }

    function afficherConfiguration(configuration) {
        document.getElementById("resultat-configuration").textContent = JSON.stringify(configuration, null, 4);
    }

    function getCategorieAnalyseBTC() {
        return valeurElement("categorie-analyse-btc", "analyse_technique");
    }

    function getLibelleCategorieAnalyseBTC() {
        return libelleElement("categorie-analyse-btc", "Analyse technique");
    }

    function getDescriptionCategorieAnalyseBTC() {
        const descriptions = {
            macroeconomie: "Macroéconomie : taux, inflation, liquidité mondiale, dollar, obligations et bilan de la Fed.",
            monnaie_bitcoin: "Monnaie Bitcoin : offre maximale, émission, halving et inflation de BTC.",
            donnees_on_chain: "Données on-chain : adresses, transactions, MVRV, realized price et flux des plateformes.",
            minage: "Minage : taux de hachage, difficulté, revenus et ventes des mineurs.",
            analyse_technique: "Analyse technique : graphiques, tendances, supports, résistances, RSI et moyennes mobiles.",
            derives: "Dérivés : contrats à terme, options, funding rates, open interest et liquidations.",
            liquidite_marche: "Liquidité de marché : volumes, carnets d'ordres, spreads et profondeur de marché.",
            institutionnel: "Institutionnel : FNB Bitcoin, achats d'entreprises, fonds, banques et adoption officielle.",
            sentiment: "Sentiment : réseaux sociaux, Google Trends, médias, peur et avidité.",
            reglementation_risques: "Réglementation et risques : lois, fiscalité, plateformes, garde et géopolitique."
        };
        return descriptions[getCategorieAnalyseBTC()] || descriptions.analyse_technique;
    }

    function actualiserDescriptionCategorie() {
        const zone = document.getElementById("description-categorie-analyse");
        if (zone) zone.textContent = getDescriptionCategorieAnalyseBTC();
    }

    function obtenirStyleTradingView() {
        const typeBougie = valeurElement("type-bougie", "bougies_japonaises");
        switch (typeBougie) {
            case "barres": return "0";
            case "bougies_japonaises": return "1";
            case "ligne": return "3";
            case "heikin_ashi": return "8";
            default: return "1";
        }
    }

    function choisirEtudeTradingView() {
        const indicateur = valeurElement("indicator-selector", "RSI");
        if (indicateur === "RSI") return ["RSI@tv-basicstudies"];
        if (indicateur === "MACD") return ["MACD@tv-basicstudies"];
        if (indicateur === "EMA") return ["MASimple@tv-basicstudies"];
        if (indicateur === "BOLLINGER") return ["BB@tv-basicstudies"];
        if (indicateur === "VOLUME") return ["Volume@tv-basicstudies"];
        return [];
    }

    function creerWidgetTradingView(tentative = 0) {
        const conteneur = document.getElementById("tradingview_chart");
        if (!conteneur) return;

        if (typeof TradingView === "undefined" || !TradingView.widget) {
            conteneur.innerHTML = "<div style='padding:16px;color:#facc15;'>Chargement de TradingView...</div>";
            if (tentative < 20) {
                setTimeout(function () { creerWidgetTradingView(tentative + 1); }, 500);
            } else {
                conteneur.innerHTML = "<div style='padding:16px;color:#fecaca;'>Impossible de charger TradingView.</div>";
            }
            return;
        }

        const symbole = valeurElement("asset-selector", "BINANCE:BTCUSDT");
        const intervalle = valeurElement("interval-selector", "D");
        conteneur.innerHTML = "";

        try {
            widgetTradingView = new TradingView.widget({
                autosize: true,
                symbol: symbole,
                interval: intervalle,
                timezone: "America/Toronto",
                theme: "dark",
                style: obtenirStyleTradingView(),
                locale: "fr",
                toolbar_bg: "#0f172a",
                enable_publishing: false,
                allow_symbol_change: true,
                container_id: "tradingview_chart",
                hide_side_toolbar: false,
                details: true,
                hotlist: true,
                calendar: false,
                studies: choisirEtudeTradingView()
            });
        } catch (erreur) {
            conteneur.innerHTML = "<div style='padding:16px;color:#fecaca;'>Erreur lors du chargement du graphique TradingView.</div>";
            afficherStatus("Erreur TradingView : " + erreur.message);
        }
    }

    function actualiserGraphique() {
        creerWidgetTradingView();
        afficherStatus("Graphique actualisé.");
    }

    function ouvrirTradingView() {
        const symbole = valeurElement("asset-selector", "BINANCE:BTCUSDT");
        const intervalle = valeurElement("interval-selector", "D");
        const url = "https://www.tradingview.com/chart/?symbol=" + encodeURIComponent(symbole) + "&interval=" + encodeURIComponent(intervalle);
        window.open(url, "_blank");
    }


    async function viderTableTradingCapture() {
        const confirmation = confirm("Êtes-vous sûr de vouloir vider toute la table trading_capture ?\n\nCette action supprimera toutes les configurations enregistrées.");

        if (!confirmation) {
            afficherStatus("Suppression annulée.");
            return;
        }

        const motDePasse = await demanderMotDePasseAdmin();

        if (!motDePasse || motDePasse.trim() === "") {
            afficherStatus("Suppression annulée : mot de passe absent.");
            alert("Suppression annulée : mot de passe absent.");
            return;
        }

        const url = getApiViderCapturesUrl();

        afficherStatus("Vidage de la table trading_capture en cours...");
        afficherEtatServeur("warning", "Suppression des captures...");
        afficherInfosServeur(
            "VIDAGE DE LA TABLE\n" +
            "------------------\n" +
            "Table : trading_capture\n" +
            "Route appelée : " + url
        );

        try {
            const resultat = await appelerJson(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-store",
                body: JSON.stringify({
                    motDePasse: motDePasse.trim()
                })
            });

            afficherStatus("Table trading_capture vidée.");
            afficherEtatServeur("ok", "Table vidée");
            afficherInfosServeur(
                "VIDAGE RÉUSSI\n" +
                "-------------\n" +
                JSON.stringify(resultat, null, 4)
            );

            const select = document.getElementById("liste-captures-postgres");
            if (select) {
                select.innerHTML = '<option value="">Aucune configuration enregistrée</option>';
            }

            configurationActuelle = null;
            afficherConfiguration({ message: "La table trading_capture a été vidée." });
            alert("La table trading_capture a été vidée.");

        } catch (erreur) {
            console.error("Erreur pendant le vidage de la table trading_capture :", erreur);

            afficherStatus("Impossible de vider la table trading_capture.");
            afficherEtatServeur("error", "Erreur vidage table");
            afficherInfosServeur(
                "ERREUR VIDAGE TABLE\n" +
                "-------------------\n" +
                "Route appelée : " + url + "\n\n" +
                "Détail : " + erreur.message
            );

            alert("Impossible de vider la table trading_capture.\n\nDétail : " + erreur.message);
        }
    }

    function ouvrirServeurRender() {
        window.open(getApiBaseUrl(), "_blank");
    }

    async function appelerJson(url, options = {}) {
        try {
            const urlFinale = String(url || "").replace("https://https://", "https://");

            console.log("APPEL JSON - URL :", urlFinale);
            console.log("APPEL JSON - OPTIONS :", options);

            const reponse = await fetch(urlFinale, {
                ...options,
                mode: "cors",
                credentials: "omit",
                cache: "no-store",
                headers: {
                    "Accept": "application/json",
                    ...(options.headers || {})
                }
            });

            const texte = await reponse.text();

            console.log("STATUT HTTP :", reponse.status);
            console.log("RÉPONSE BRUTE :", texte);

            let json;

            try {
                json = JSON.parse(texte);
            } catch (erreurJson) {
                throw new Error("Le serveur n'a pas retourné du JSON. Réponse reçue : " + texte);
            }

            if (!reponse.ok) {
                throw new Error(json.detail || json.message || "Réponse HTTP " + reponse.status);
            }

            return json;

        } catch (erreur) {
            console.error("ERREUR DANS appelerJson :", erreur);
            throw erreur;
        }
    }

    async function testerServeur() {
        const urlTest = getApiTestUrl();
        const debut = performance.now();
        afficherEtatServeur("warning", "Test du serveur en cours...");
        afficherInfosServeur("Test de la route :\n" + urlTest);

        try {
            const resultat = await appelerJson(urlTest, { method: "GET", cache: "no-store" });
            const duree = Math.round(performance.now() - debut);
            afficherEtatServeur("ok", "Serveur connecté");
            afficherInfosServeur("TEST RÉUSSI\n-----------\nRoute : " + urlTest + "\nTemps : " + duree + " ms\n\n" + JSON.stringify(resultat, null, 4));
        } catch (erreur) {
            afficherEtatServeur("error", "Serveur inaccessible");
            afficherInfosServeur("TEST ÉCHOUÉ\n-----------\nRoute : " + urlTest + "\n\n" + erreur.message);
        }
    }

    async function creerTablePostgres() {
        const url = getApiCreerTableUrl();
        afficherEtatServeur("warning", "Création de la table...");
        afficherInfosServeur("Appel :\n" + url);

        try {
            const resultat = await appelerJson(url, { method: "GET", cache: "no-store" });
            afficherEtatServeur("ok", "Table PostgreSQL prête");
            afficherInfosServeur(JSON.stringify(resultat, null, 4));
            alert("Table PostgreSQL créée ou déjà existante.");
        } catch (erreur) {
            afficherEtatServeur("error", "Erreur table PostgreSQL");
            afficherInfosServeur("Impossible de créer la table.\n\n" + erreur.message);
            alert("Impossible de créer la table PostgreSQL.");
        }
    }

    async function verifierTablePostgres() {
        const url = getApiVerifierTableUrl();
        afficherEtatServeur("warning", "Vérification de la table...");
        afficherInfosServeur("Appel :\n" + url);

        try {
            const resultat = await appelerJson(url, { method: "GET", cache: "no-store" });
            afficherEtatServeur(resultat.tableExiste ? "ok" : "warning", resultat.tableExiste ? "Table existante" : "Table absente");
            afficherInfosServeur(JSON.stringify(resultat, null, 4));
        } catch (erreur) {
            afficherEtatServeur("error", "Erreur vérification table");
            afficherInfosServeur("Impossible de vérifier la table.\n\n" + erreur.message);
        }
    }

    function capturerConfigurationTradingView(afficherAlerte = true) {
        configurationActuelle = {
            nom: "Configuration TradingView IA",
            dateCapture: new Date().toISOString(),
            serveur: {
                apiAnalyse: getApiAnalyseUrl(),
                apiTest: getApiTestUrl(),
                apiMarche: getApiMarcheUrl(),
                apiCaptures: getApiCapturesUrl(),
                apiViderCaptures: getApiViderCapturesUrl(),
                hebergeur: "Render",
                type: "Node.js"
            },
            graphique: {
                actif: valeurElement("asset-selector", "BINANCE:BTCUSDT"),
                actifLibelle: libelleElement("asset-selector", "Bitcoin / USDT"),
                intervalle: valeurElement("interval-selector", "D"),
                intervalleLibelle: libelleElement("interval-selector", "1 jour"),
                indicateur: valeurElement("indicator-selector", "RSI"),
                indicateurLibelle: libelleElement("indicator-selector", "RSI"),
                typeBougie: valeurElement("type-bougie", "bougies_japonaises"),
                typeBougieLibelle: libelleElement("type-bougie", "Bougies japonaises"),
                source: "widget_tradingview_integre"
            },
            analyseIA: {
                categorie: getCategorieAnalyseBTC(),
                categorieLibelle: getLibelleCategorieAnalyseBTC(),
                descriptionCategorie: getDescriptionCategorieAnalyseBTC(),
                strategie: valeurElement("strategie-selector", "suivi_tendance"),
                statut: "pret_pour_analyse"
            },
            risque: {
                capitalInitial: nombreElement("capital-input", 1000),
                risqueParPositionPourcent: nombreElement("risk-input", 1),
                stopLossPourcent: nombreElement("stoploss-input", 2),
                takeProfitPourcent: nombreElement("takeprofit-input", 4),
                levier: nombreElement("levier-input", 1),
                sens: valeurElement("sens-selector", "achat_vente")
            },
            snapshot: {
                url: valeurElement("snapshot-url", ""),
                categorieAnalyse: getCategorieAnalyseBTC(),
                categorieAnalyseLibelle: getLibelleCategorieAnalyseBTC(),
                descriptionCategorieAnalyse: getDescriptionCategorieAnalyseBTC(),
                screenshotBase64: null
            },
            marche: null,
            notes: valeurElement("notes-analyse", "").trim(),
            limites: {
                captureCompleteTradingView: false,
                dessinsInternesTradingView: false,
                remarque: "La page capture les paramètres contrôlés par l'interface HTML."
            }
        };

        afficherConfiguration(configurationActuelle);
        afficherStatus("Configuration capturée avec succès.");

        if (afficherAlerte) alert("Configuration capturée.");

        return configurationActuelle;
    }

    async function capturerEtEnregistrerConfiguration() {
        try {
            capturerConfigurationTradingView(false);

            afficherStatus("Capture en cours, ajout des données de marché...");

            await enrichirConfigurationAvecDonneesMarche(false);

            await enregistrerCapturePostgres(true, false);

        } catch (erreur) {
            console.error("Erreur capture et enregistrement :", erreur);
            afficherStatus("Erreur pendant la capture et l'enregistrement.");
            alert("Erreur pendant la capture et l'enregistrement : " + erreur.message);
        }
    }

    async function enrichirConfigurationAvecDonneesMarche(afficherAlerte = true) {
        if (!configurationActuelle) capturerConfigurationTradingView(false);

        const urlMarche = getApiMarcheUrl();
        afficherStatus("Récupération des données de marché...");
        afficherEtatServeur("warning", "Appel /api/marche...");

        try {
            const donneesMarche = await appelerJson(urlMarche, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                cache: "no-store",
                body: JSON.stringify({
                    actif: configurationActuelle.graphique.actif,
                    intervalle: configurationActuelle.graphique.intervalle,
                    indicateur: configurationActuelle.graphique.indicateur,
                    categorieAnalyse: configurationActuelle.analyseIA.categorie
                })
            });

            configurationActuelle.marche = {
                prixActuel: donneesMarche.prixActuel ?? null,
                support: donneesMarche.support ?? null,
                resistance: donneesMarche.resistance ?? null,
                rsi: donneesMarche.rsi ?? null,
                ema20: donneesMarche.ema20 ?? null,
                ema50: donneesMarche.ema50 ?? null,
                macd: donneesMarche.macd ?? null,
                volume: donneesMarche.volume ?? "neutre",
                tendance: donneesMarche.tendance ?? "neutre",
                source: donneesMarche.source ?? "serveur_nodejs",
                api: urlMarche,
                dateMiseAJour: new Date().toISOString()
            };

            localStorage.setItem("configurationTradingViewIA", JSON.stringify(configurationActuelle));
            afficherConfiguration(configurationActuelle);
            afficherEtatServeur("ok", "Données de marché reçues");
            afficherStatus("Configuration enrichie avec les données de marché.");
            afficherInfosServeur(JSON.stringify(donneesMarche, null, 4));
            if (afficherAlerte) alert("Données de marché ajoutées.");
        } catch (erreur) {
            afficherEtatServeur("error", "Erreur /api/marche");
            afficherStatus("Impossible de récupérer les données de marché.");
            afficherInfosServeur("ERREUR /api/marche\n-----------------\nAdresse : " + urlMarche + "\n\n" + erreur.message);
            if (afficherAlerte) alert("Impossible d'ajouter les données de marché.");
        }
    }

    function nettoyerNomFichier(valeur) {
        return String(valeur || "non-defini")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9-_]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");
    }

    function genererTimestampFichier() {
        const maintenant = new Date();
        const annee = maintenant.getFullYear();
        const mois = String(maintenant.getMonth() + 1).padStart(2, "0");
        const jour = String(maintenant.getDate()).padStart(2, "0");
        const heure = String(maintenant.getHours()).padStart(2, "0");
        const minute = String(maintenant.getMinutes()).padStart(2, "0");
        const seconde = String(maintenant.getSeconds()).padStart(2, "0");
        return annee + mois + jour + "-" + heure + minute + seconde;
    }

    function genererNomCapturePostgres(configuration) {
        const actif = nettoyerNomFichier(configuration.graphique.actif);
        const indicateur = nettoyerNomFichier(configuration.graphique.indicateur);

        const categorieAnalyse =
            configuration?.analyseIA?.categorieLibelle ||
            configuration?.analyseIA?.categorie ||
            configuration?.snapshot?.categorieAnalyseLibelle ||
            configuration?.snapshot?.categorieAnalyse ||
            "Liquidité de marché";

        const categorie = nettoyerNomFichier(categorieAnalyse);
        const timestamp = genererTimestampFichier();

        /*
            Format demandé :
            ACTIF-INDICATEUR-CATEGORIE_ANALYSE-TIMESTAMP

            Exemple :
            BINANCE-BTCUSDT-RSI-ANALYSE-TECHNIQUE-20260510-154233
        */
        return actif + "-" + indicateur + "-" + categorie + "-" + timestamp;
    }

    function obtenirScreenshotBase64DepuisConfiguration() {
        if (!configurationActuelle || !configurationActuelle.snapshot) return null;
        return configurationActuelle.snapshot.screenshotBase64 || null;
    }

    async function enregistrerCapturePostgres(afficherAlerte = true, capturerAvant = true) {
        try {
            if (capturerAvant) {
                capturerConfigurationTradingView(false);
            }

            if (!configurationActuelle) {
                throw new Error("configurationActuelle est vide ou non définie.");
            }

            if (!configurationActuelle.graphique) {
                throw new Error("configurationActuelle.graphique est vide ou non défini.");
            }

            const urlCaptures = getApiCapturesUrl();
            const nomCapture = genererNomCapturePostgres(configurationActuelle);
            const screenshotBase64 = obtenirScreenshotBase64DepuisConfiguration();

            configurationActuelle.nomCapture = nomCapture;

            const categorieAnalyse =
                configurationActuelle?.analyseIA?.categorieLibelle ||
                configurationActuelle?.analyseIA?.categorie ||
                configurationActuelle?.snapshot?.categorieAnalyseLibelle ||
                configurationActuelle?.snapshot?.categorieAnalyse ||
                "Liquidité de marché";

            const donneesAEnregistrer = {
                actif: configurationActuelle.graphique.actif || "NON_RENSEIGNE",
                indicateur: configurationActuelle.graphique.indicateur || null,
                intervalle: configurationActuelle.graphique.intervalle || null,

                /*
                    On garde nom_fichier pour compatibilité avec ton ancien code.
                    On ajoute nom_capture pour la nouvelle colonne.
                    On ajoute aussi categorie_analyse pour server.js.
                */
                nom_fichier: nomCapture || ("capture-" + new Date().toISOString()),
                nom_capture: nomCapture || ("capture-" + new Date().toISOString()),
                categorie_analyse: categorieAnalyse,
                categorieAnalyse: categorieAnalyse,

                configuration_json: configurationActuelle,

                /*
                    Je garde ton choix actuel :
                    screenshot désactivé pour éviter les erreurs de taille ou de capture.
                */
                screenshot_base64: null
            };

            console.log("URL PostgreSQL :", urlCaptures);
            console.log("Données envoyées :", donneesAEnregistrer);

            afficherStatus("Enregistrement dans PostgreSQL...");
            afficherEtatServeur("warning", "Envoi vers PostgreSQL...");
            afficherInfosServeur(
                "ENVOI EN COURS\n" +
                "--------------\n" +
                "Route : " + urlCaptures + "\n" +
                "Table : trading_capture\n" +
                "Nom capture : " + donneesAEnregistrer.nom_capture
            );

            const reponse = await fetch(urlCaptures, {
                method: "POST",
                mode: "cors",
                credentials: "omit",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                cache: "no-store",
                body: JSON.stringify(donneesAEnregistrer)
            });

            const texte = await reponse.text();

            console.log("Statut HTTP :", reponse.status);
            console.log("Réponse brute serveur :", texte);

            let resultat;

            try {
                resultat = JSON.parse(texte);
            } catch (erreurJson) {
                throw new Error("Réponse non JSON du serveur : " + texte);
            }

            if (!reponse.ok || resultat.ok !== true) {
                throw new Error(resultat.detail || resultat.message || "Erreur serveur inconnue.");
            }

            console.log("Réponse PostgreSQL :", resultat);

            if (!resultat || resultat.ok !== true || resultat.statut !== "ok") {
                throw new Error("Réponse serveur incorrecte : " + JSON.stringify(resultat));
            }

            localStorage.setItem(
                "configurationTradingViewIA",
                JSON.stringify(configurationActuelle)
            );

            afficherStatus("Configuration enregistrée dans PostgreSQL.");
            afficherEtatServeur("ok", "Enregistrement réussi");
            afficherInfosServeur(
                "ENREGISTREMENT RÉUSSI\n" +
                "----------------------\n" +
                JSON.stringify(resultat, null, 4)
            );

            await chargerListeCapturesPostgres(false);

            if (afficherAlerte) {
                alert(
                    "Configuration enregistrée dans la base de données.\n\n" +
                    "Nom de la capture : " + donneesAEnregistrer.nom_capture
                );
            }

        } catch (erreur) {
            console.error("Erreur complète d'enregistrement PostgreSQL :", erreur);

            afficherStatus("Erreur lors de l'enregistrement.");
            afficherEtatServeur("error", "Erreur base de données");
            afficherInfosServeur(
                "ERREUR D'ENREGISTREMENT\n" +
                "-----------------------\n" +
                erreur.message
            );

            alert("Impossible d'enregistrer dans la base de données : " + erreur.message);
        }
    }

    async function chargerListeCapturesPostgres(afficherAlerte = true) {
        /*
            On garde l'ancienne URL fixe qui fonctionnait hier.
        */
        const urlCaptures = "https://trading-g8ie.onrender.com/api/captures";

        const select = document.getElementById("liste-captures-postgres");
        if (!select) return;

        afficherStatus("Chargement de la liste PostgreSQL...");
        afficherEtatServeur("warning", "Lecture /api/captures...");

        try {
            console.log("URL utilisée pour charger la liste :", urlCaptures);

            const resultat = await appelerJson(urlCaptures, { method: "GET", cache: "no-store" });

            select.innerHTML = '<option value="">Choisir une configuration</option>';

            if (!resultat.captures || resultat.captures.length === 0) {
                select.innerHTML = '<option value="">Aucune configuration enregistrée</option>';
            } else {
                resultat.captures.forEach(function(capture) {
                    const option = document.createElement("option");

                    /*
                        Important :
                        La valeur reste l'id, car la route de chargement est /api/captures/:id.
                    */
                    option.value = capture.id;

                    const dateCapture = capture.date_capture
                        ? new Date(capture.date_capture).toLocaleString("fr-CA")
                        : "date inconnue";

                    const nomCapture =
                        capture.nom_capture ||
                        capture.nom_fichier ||
                        (
                            (capture.actif || "actif") +
                            "-" +
                            (capture.indicateur || "indicateur") +
                            "-" +
                            dateCapture
                        );

                    /*
                        Affichage demandé :
                        on affiche le nom_capture dans la liste déroulante.
                    */
                    option.textContent =
                        capture.id +
                        " - " +
                        nomCapture +
                        " - " +
                        dateCapture;

                    select.appendChild(option);
                });
            }

            afficherStatus("Liste PostgreSQL chargée.");
            afficherEtatServeur("ok", "Captures chargées");
            afficherInfosServeur(
                "LISTE DES CAPTURES\n" +
                "------------------\n" +
                "Nombre : " + (resultat.captures ? resultat.captures.length : 0)
            );

            if (afficherAlerte) alert("Liste des captures chargée.");
        } catch (erreur) {
            afficherStatus("Impossible de charger la liste PostgreSQL.");
            afficherEtatServeur("error", "Erreur lecture /api/captures");
            afficherInfosServeur(
                "ERREUR LECTURE /api/captures\n" +
                "---------------------------\n" +
                erreur.message
            );

            if (afficherAlerte) alert("Impossible de charger la liste PostgreSQL.");
        }
    }

    async function chargerCapturePostgresSelectionnee() {
        const select = document.getElementById("liste-captures-postgres");
        if (!select || !select.value) {
            alert("Choisir une capture dans la liste.");
            return;
        }

        const urlCapture = getApiCapturesUrl() + "/" + encodeURIComponent(select.value);

        afficherStatus("Chargement de la capture PostgreSQL...");
        afficherEtatServeur("warning", "Lecture capture PostgreSQL...");

        try {
            const resultat = await appelerJson(urlCapture, { method: "GET", cache: "no-store" });
            const capture = resultat.capture;

            configurationActuelle = capture.configuration_json || null;

            if (!configurationActuelle) {
                throw new Error("La capture ne contient pas configuration_json.");
            }

            appliquerConfiguration(configurationActuelle);
            afficherConfiguration(configurationActuelle);
            afficherScreenshotPostgres(capture.screenshot_base64);
            localStorage.setItem("configurationTradingViewIA", JSON.stringify(configurationActuelle));

            afficherStatus("Capture PostgreSQL chargée.");
            afficherEtatServeur("ok", "Capture chargée");
            afficherInfosServeur(
                "CAPTURE CHARGÉE\n" +
                "---------------\n" +
                "ID : " + capture.id + "\n" +
                "Nom capture : " + (capture.nom_capture || capture.nom_fichier || "non renseigné") + "\n" +
                "Actif : " + capture.actif
            );

            alert("Capture PostgreSQL chargée.");
        } catch (erreur) {
            afficherStatus("Impossible de charger la capture PostgreSQL.");
            afficherEtatServeur("error", "Erreur capture PostgreSQL");
            afficherInfosServeur(
                "ERREUR CHARGEMENT CAPTURE\n" +
                "--------------------------\n" +
                erreur.message
            );

            alert("Impossible de charger la capture sélectionnée.");
        }
    }

    function afficherScreenshotPostgres(screenshotBase64) {
        const image = document.getElementById("image-capture-postgres");
        if (!image) return;

        if (screenshotBase64 && String(screenshotBase64).trim() !== "") {
            image.src = screenshotBase64;
            image.style.display = "block";
        } else {
            image.removeAttribute("src");
            image.style.display = "none";
        }
    }

    function appliquerConfiguration(configuration) {
        if (!configuration || !configuration.graphique) return;

        definirValeur("asset-selector", configuration.graphique.actif);
        definirValeur("interval-selector", configuration.graphique.intervalle);
        definirValeur("indicator-selector", configuration.graphique.indicateur);
        definirValeur("type-bougie", configuration.graphique.typeBougie);

        if (configuration.analyseIA) {
            definirValeur("categorie-analyse-btc", configuration.analyseIA.categorie);
            definirValeur("strategie-selector", configuration.analyseIA.strategie);
            actualiserDescriptionCategorie();
        }

        if (configuration.risque) {
            definirValeur("capital-input", configuration.risque.capitalInitial);
            definirValeur("risk-input", configuration.risque.risqueParPositionPourcent);
            definirValeur("stoploss-input", configuration.risque.stopLossPourcent);
            definirValeur("takeprofit-input", configuration.risque.takeProfitPourcent);
            definirValeur("levier-input", configuration.risque.levier);
            definirValeur("sens-selector", configuration.risque.sens);
        }

        if (configuration.snapshot) definirValeur("snapshot-url", configuration.snapshot.url);
        if (configuration.serveur && configuration.serveur.apiAnalyse) definirValeur("api-url", configuration.serveur.apiAnalyse);
        if (configuration.notes !== undefined) definirValeur("notes-analyse", configuration.notes);

        creerWidgetTradingView();
    }

    function definirValeur(id, valeur) {
        const element = document.getElementById(id);
        if (element && valeur !== undefined && valeur !== null) element.value = valeur;
    }

    function rechargerConfigurationTradingView() {
        const data = localStorage.getItem("configurationTradingViewIA");
        if (!data) {
            alert("Aucune configuration sauvegardée.");
            return;
        }

        try {
            configurationActuelle = JSON.parse(data);
            appliquerConfiguration(configurationActuelle);
            afficherConfiguration(configurationActuelle);
            afficherStatus("Configuration rechargée.");
            alert("Configuration rechargée.");
        } catch (erreur) {
            alert("Erreur : configuration sauvegardée invalide.");
        }
    }

    async function ouvrirPageDecision() {
        try {
            capturerConfigurationTradingView(false);

            afficherStatus("Préparation du snapshot avec les données de marché...");

            await enrichirConfigurationAvecDonneesMarche(false);

            localStorage.setItem(
                "configurationTradingViewIA",
                JSON.stringify(configurationActuelle)
            );

            window.open("decisions.html", "_blank");

        } catch (erreur) {
            console.error("Erreur ouverture decisions.html :", erreur);

            if (!configurationActuelle) {
                capturerConfigurationTradingView(false);
            }

            localStorage.setItem(
                "configurationTradingViewIA",
                JSON.stringify(configurationActuelle)
            );

            alert(
                "Les données de marché n'ont pas pu être ajoutées. " +
                "La page de décision va s'ouvrir avec les données disponibles."
            );

            window.open("decisions.html", "_blank");
        }
    }

    function importerJSONDepuisFichier(event) {
        const fichier = event.target.files[0];
        if (!fichier) return;

        const lecteur = new FileReader();
        lecteur.onload = function(e) {
            try {
                const configuration = JSON.parse(e.target.result);
                if (!configuration.graphique) throw new Error("Le fichier JSON ne contient pas de bloc graphique.");
                configurationActuelle = configuration;
                appliquerConfiguration(configurationActuelle);
                afficherConfiguration(configurationActuelle);
                localStorage.setItem("configurationTradingViewIA", JSON.stringify(configurationActuelle));
                afficherStatus("Configuration JSON importée.");
                alert("Configuration JSON importée avec succès.");
            } catch (erreur) {
                alert("Import impossible. Fichier JSON invalide.\n\n" + erreur.message);
            }

            event.target.value = "";
        };

        lecteur.readAsText(fichier);
    }

async function viderTableCaptures() {
    const confirmation = confirm(
        "Attention : cette action va supprimer toutes les captures enregistrées.\n\n" +
        "Voulez-vous vraiment vider la table trading_capture ?"
    );

    if (!confirmation) {
        return;
    }

    const motDePasse = await demanderMotDePasseAdmin();

    if (!motDePasse || motDePasse.trim() === "") {
        alert("Suppression annulée : mot de passe absent.");
        return;
    }

    try {
        const reponse = await fetch("https://trading-g8ie.onrender.com/api/vider-captures", {
            method: "POST",
            mode: "cors",
            credentials: "omit",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            cache: "no-store",
            body: JSON.stringify({
                motDePasse: motDePasse.trim()
            })
        });

        const texte = await reponse.text();
        const resultat = JSON.parse(texte);

        if (!reponse.ok || resultat.ok !== true) {
            throw new Error(resultat.message || "Erreur inconnue.");
        }

        alert("La table trading_capture a été vidée avec succès.");

        if (typeof chargerListeCapturesPostgres === "function") {
            chargerListeCapturesPostgres(false);
        }

    } catch (erreur) {
        alert("Impossible de vider la table trading_capture : " + erreur.message);
        console.error("Erreur vidage table :", erreur);
    }
}
    document.addEventListener("DOMContentLoaded", function () {
        const champApi = document.getElementById("api-url");
        if (champApi && !champApi.value.trim()) {
            champApi.value = API_BASE_URL_PAR_DEFAUT + "/api/analyse";
        }

        const selectCategorie = document.getElementById("categorie-analyse-btc");
        if (selectCategorie) {
            selectCategorie.addEventListener("change", function () {
                actualiserDescriptionCategorie();

                if (configurationActuelle) {
                    configurationActuelle.analyseIA.categorie = getCategorieAnalyseBTC();
                    configurationActuelle.analyseIA.categorieLibelle = getLibelleCategorieAnalyseBTC();
                    configurationActuelle.analyseIA.descriptionCategorie = getDescriptionCategorieAnalyseBTC();
                    afficherConfiguration(configurationActuelle);
                }
            });
        }

        actualiserDescriptionCategorie();
        creerWidgetTradingView();
        chargerListeCapturesPostgres(false);
    });
</script>
</body>
</html><!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Trading Station IA - Advanced</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--
        Version avancée :
        - Si la Charting Library / Advanced Charts de TradingView est disponible,
          le script lit directement le symbole et l'intervalle du graphique.
        - Avec le simple widget public tv.js, TradingView ne donne pas un accès fiable
          aux valeurs internes choisies dans le graphique. Dans ce cas, le code garde
          un repli vers les champs HTML masqués afin de ne pas casser l'enregistrement.
    -->
    <script src="https://s3.tradingview.com/tv.js"></script>

    <style>
        * { box-sizing: border-box; }

		body {
			margin: 0;
			font-family: Arial, sans-serif;
			background: #ffffff;
			color: #111827;
		}

        header {
            background: #0f172a;
            border-bottom: 2px solid #00d9ff;
            padding: 14px 20px;
        }

        .top-bar {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px;
        }

        .logo {
            font-size: 22px;
            font-weight: bold;
            color: #00d9ff;
            margin-right: 18px;
            line-height: 1.1;
        }

        .logo span { color: #facc15; }

        .auteur-logo {
            display: block;
            font-size: 12px;
            font-weight: normal;
            color: #cbd5e1;
            margin-top: 3px;
        }

        .control-group {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .parametres-graphiques-caches {
            display: none !important;
        }

        .source-parametres-graphique {
            display: inline-block;
            margin-left: 8px;
            padding: 6px 9px;
            border-radius: 7px;
            background: #713f12;
            color: #fde68a;
            font-size: 12px;
            font-weight: bold;
        }

        .source-parametres-graphique.ok {
            background: #064e3b;
            color: #86efac;
        }

        .source-parametres-graphique.erreur {
            background: #7f1d1d;
            color: #fecaca;
        }

        .capture-selector-top {
            display: flex;
            align-items: center;
            gap: 8px;
            flex: 0 1 560px;
            min-width: 360px;
            max-width: 620px;
        }

        .capture-selector-top label {
            white-space: nowrap;
        }

        #liste-captures-postgres {
            width: 100%;
            min-width: 260px;
            max-width: 430px;
        }

        .analysis-category-top {
            display: flex;
            align-items: center;
            gap: 6px;
            flex: 0 0 340px;
            min-width: 300px;
            max-width: 360px;
            margin-left: 8px;
        }

        .analysis-category-top label {
            white-space: nowrap;
        }

        .analysis-category-top select {
            width: 190px;
            min-width: 180px;
        }

        .category-description-top {
            display: none;
        }
            max-width: 190px;
        }

        .category-description-top {
            flex: 1 1 100%;
            margin-top: 0;
            display: none;
        }

        label {
            font-weight: bold;
            color: #00d9ff;
            font-size: 13px;
        }

        select, input, textarea {
            background: #020617;
            color: white;
            border: 1px solid #334155;
            border-radius: 6px;
            padding: 7px;
            font-size: 13px;
            max-width: 100%;
        }

        button {
            border: none;
            border-radius: 7px;
            padding: 8px 10px;
            font-weight: bold;
            cursor: pointer;
            font-size: 12px;
            white-space: nowrap;
        }

        button:hover { opacity: 0.85; }

        .btn-tv { background: #2962ff; color: white; }
        .btn-capture { background: #00d9ff; color: #00111a; }
        .btn-save { background: #22c55e; color: #03130a; }
        .btn-copy { background: #facc15; color: #1a1300; }
        .btn-export { background: #a855f7; color: white; }
        .btn-import { background: #14b8a6; color: #001a16; }
        .btn-api { background: #fb923c; color: #1a0b00; }
        .btn-db { background: #10b981; color: #00130d; }
        .btn-load { background: #6366f1; color: white; }
        .btn-ai { background: #38bdf8; color: #00111a; }
        .btn-market { background: #84cc16; color: #102000; }
        .btn-decision { background: #eab308; color: #1a1300; }
        .btn-clear { background: #ef4444; color: white; }
        .btn-dark { background: #334155; color: white; }

        .header-images {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-left: 8px;
        }

        .header-images img {
            width: 48px;
            height: 48px;
            object-fit: cover;
            border-radius: 6px;
            border: 1px solid #334155;
            background: #020617;
            padding: 1px;
        }

        main {
            display: grid;
            grid-template-columns: minmax(0, 2.3fr) minmax(320px, 0.7fr);
            gap: 14px;
            padding: 14px;
        }

        .chart-panel, .side-panel {
            background: #111827;
            border: 1px solid #263244;
            border-radius: 12px;
            padding: 14px;
        }

        .chart-panel { min-width: 0; }
        .side-panel { min-width: 320px; overflow: hidden; }

        .chart-title-row {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 14px;
            margin-bottom: 10px;
            width: 100%;
            flex-wrap: nowrap;
            overflow-x: auto;
        }

        .chart-title-row h2 {
            margin: 0;
            padding-bottom: 0;
            border-bottom: none;
            line-height: 1.1;
            flex: 0 0 auto;
        }

        .chart-title-icons {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 8px;
            flex-shrink: 0;
            margin-left: auto;
        }

        .chart-title-icons img {
            width: 36px;
            height: 36px;
            object-fit: cover;
            border-radius: 6px;
            border: 1px solid #334155;
            background: #020617;
            padding: 1px;
        }

        .chart-inline-controls {
            display: flex;
            align-items: center;
            gap: 12px;
            margin: 0;
            flex-wrap: nowrap;
            flex: 0 0 auto;
        }

        .chart-inline-controls .form-block {
            display: flex;
            align-items: center;
            gap: 6px;
            flex: 0 0 auto;
            margin-bottom: 0;
        }

        .chart-inline-controls .form-block label {
            margin-bottom: 0;
            white-space: nowrap;
            color: #ffffff;
        }

        .chart-inline-controls .form-block select {
            width: 175px;
        }

        .chart-inline-controls .form-block input {
            width: 105px;
        }

        #tradingview_chart {
            height: 700px;
            width: 100%;
            border-radius: 10px;
            overflow: hidden;
            background: #020617;
        }

        h2 {
            color: #00d9ff;
            font-size: 18px;
            margin-top: 0;
            border-bottom: 1px solid #263244;
            padding-bottom: 8px;
        }

        h3 {
            color: #facc15;
            font-size: 15px;
            margin-bottom: 8px;
        }

        .form-block {
            margin-bottom: 12px;
            min-width: 0;
        }

        .form-block label {
            display: block;
            margin-bottom: 5px;
        }

        .form-block input, .form-block select, .form-block textarea { width: 100%; }

        pre {
            background: #020617;
            color: #a7f3d0;
            padding: 12px;
            border-radius: 10px;
            border: 1px solid #263244;
            min-height: 260px;
            max-height: 420px;
            overflow: auto;
            font-size: 12px;
            white-space: pre-wrap;
            word-break: break-word;
        }

        .button-zone {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 12px 0;
        }

        .button-zone button { flex: 1 1 120px; }

        .status {
            background: #020617;
            border: 1px solid #263244;
            border-radius: 8px;
            padding: 10px;
            color: #facc15;
            font-size: 13px;
            margin-top: 10px;
        }

        .server-status {
            padding: 12px;
            border-radius: 8px;
            font-weight: bold;
            margin-bottom: 12px;
            text-align: center;
            font-size: 13px;
        }

        .server-status.neutral { background: #334155; color: #ffffff; }
        .server-status.ok { background: #064e3b; color: #86efac; }
        .server-status.error { background: #7f1d1d; color: #fecaca; }
        .server-status.warning { background: #713f12; color: #fde68a; }

        .server-info {
            background: #020617;
            border: 1px solid #334155;
            border-radius: 8px;
            padding: 10px;
            font-family: Consolas, monospace;
            font-size: 12px;
            color: #d1d5db;
            white-space: pre-wrap;
            word-break: break-word;
            min-height: 90px;
            max-height: 220px;
            overflow: auto;
        }

        .analysis-category-box, .ai-section, .risk-box {
            margin-top: 14px;
            background: #0b1220;
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 14px;
        }

        .side-panel > section:first-child { margin-top: 0; }

        .risk-box h3 {
            margin-top: 0;
            margin-bottom: 12px;
        }

        .analysis-category-box select { width: 100%; }

        .category-description, .note {
            margin-top: 10px;
            padding: 10px;
            background: #020617;
            border: 1px solid #334155;
            border-radius: 8px;
            color: #d1d5db;
            font-size: 12px;
            line-height: 1.5;
        }

        .ai-result-box {
            background: #020617;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 14px;
            min-height: 220px;
            max-height: 520px;
            overflow: auto;
            white-space: pre-wrap;
            word-break: break-word;
            font-family: Consolas, monospace;
            font-size: 13px;
            color: #d1d5db;
        }

        .screenshot-preview {
            margin-top: 12px;
            background: #020617;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 10px;
        }

        .screenshot-preview img {
            width: 100%;
            max-height: 360px;
            object-fit: contain;
            border-radius: 8px;
            background: #000;
            display: none;
        }

        footer {
            text-align: center;
            color: #94a3b8;
            font-size: 12px;
            padding: 16px;
            border-top: 1px solid #263244;
        }


        .modal-password-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.72);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 16px;
        }

        .modal-password-box {
            width: 100%;
            max-width: 420px;
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 18px;
            color: #ffffff;
            box-shadow: 0 18px 45px rgba(0, 0, 0, 0.45);
        }

        .modal-password-box h3 {
            margin-top: 0;
            color: #facc15;
        }

        .modal-password-box p {
            font-size: 13px;
            line-height: 1.5;
            color: #cbd5e1;
        }

        .modal-password-box input {
            width: 100%;
            margin-top: 8px;
            margin-bottom: 14px;
        }

        .modal-password-actions {
            display: flex;
            gap: 8px;
            justify-content: flex-end;
            flex-wrap: wrap;
        }

        .modal-password-actions button {
            min-width: 110px;
        }

        @media (max-width: 1200px) {
            main { grid-template-columns: minmax(0, 2fr) minmax(320px, 0.8fr); }
            #tradingview_chart { height: 650px; }
        }

        @media (max-width: 1000px) {
            main { grid-template-columns: 1fr; }
            .side-panel { min-width: 0; }
            #tradingview_chart { height: 520px; }
        }

        @media (max-width: 700px) {
            header { padding: 12px; }
            .top-bar { flex-direction: column; align-items: stretch; }
            .control-group { flex-direction: column; align-items: stretch; }

            .capture-selector-top {
                flex-direction: column;
                align-items: stretch;
                min-width: 0;
                max-width: none;
                width: 100%;
            }

            .analysis-category-top {
                flex-direction: column;
                align-items: stretch;
                min-width: 0;
                max-width: none;
                width: 100%;
                margin-left: 0;
            }

            .analysis-category-top select {
                min-width: 0;
                width: 100%;
            }

            #liste-captures-postgres {
                min-width: 0;
                max-width: none;
                width: 100%;
            }

            button { width: 100%; }
            .button-zone button { flex: 1 1 100%; }
            .logo { text-align: center; margin-right: 0; }
            .header-images { justify-content: center; margin-left: 0; }
            .header-images img { width: 43px; height: 43px; }
            .chart-title-row { justify-content: flex-start; flex-wrap: nowrap; }
            .chart-inline-controls { flex: 0 0 auto; flex-wrap: nowrap; }
            .chart-inline-controls .form-block { flex: 0 0 auto; }
            .chart-title-icons img { width: 30px; height: 30px; }
            #tradingview_chart { height: 460px; }
        }
    </style>
</head>

<body>
<header>
    <div class="top-bar">
        <div class="logo">
            TRADING STATION <span>IA</span>
            <small class="auteur-logo">Auteur : Hocine Korichi, Ing.</small>
        </div>

        <div class="control-group parametres-graphiques-caches">
            <label for="asset-selector">ACTIF :</label>
            <select id="asset-selector" onchange="actualiserGraphique()">
                <option value="BINANCE:BTCUSDT">Bitcoin / USDT</option>
                <option value="COINBASE:BTCUSD">Bitcoin / USD</option>
                <option value="BINANCE:ETHUSDT">Ethereum / USDT</option>
                <option value="OANDA:XAUUSD">Or / Dollar - XAUUSD</option>
                <option value="NASDAQ:AAPL">Apple - AAPL</option>
                <option value="NASDAQ:TSLA">Tesla - TSLA</option>
                <option value="NASDAQ:NVDA">Nvidia - NVDA</option>
                <option value="NASDAQ:MSFT">Microsoft - MSFT</option>
                <option value="NASDAQ:AMZN">Amazon - AMZN</option>
                <option value="NASDAQ:GOOGL">Google - GOOGL</option>
                <option value="SP:SPX">S&amp;P 500</option>
                <option value="TVC:DXY">Dollar Index - DXY</option>
            </select>
        </div>

        <div class="control-group parametres-graphiques-caches">
            <label for="interval-selector">INTERVALLE :</label>
            <select id="interval-selector" onchange="actualiserGraphique()">
                <option value="1">1 minute</option>
                <option value="5">5 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 heure</option>
                <option value="240">4 heures</option>
                <option value="D" selected>1 jour</option>
                <option value="W">1 semaine</option>
                <option value="M">1 mois</option>
            </select>
        </div>

        <div class="control-group parametres-graphiques-caches">
            <label for="indicator-selector">INDICATEUR :</label>
            <select id="indicator-selector" onchange="actualiserGraphique()">
                <option value="RSI">RSI</option>
                <option value="MACD">MACD</option>
                <option value="EMA">EMA</option>
                <option value="SUPERTREND">Supertrend</option>
                <option value="BOLLINGER">Bandes de Bollinger</option>
                <option value="ATR">ATR</option>
                <option value="VOLUME">Volume</option>
                <option value="LIQUIDITY_ZONE">Zones de liquidité</option>
            </select>
        </div>

        <button class="btn-clear" onclick="viderTableTradingCapture()">Vider la table</button>
        <button class="btn-capture" onclick="capturerEtEnregistrerConfiguration()">Capturer et enregistrer</button>
        <!--<button class="btn-market" onclick="enrichirConfigurationAvecDonneesMarche()">Ajouter marché</button>-->
        <button class="btn-db" style="display:none;" onclick="enregistrerCapturePostgres()">Enregistrer la configuration</button>
        <!-- <button class="btn-save" onclick="rechargerConfigurationTradingView()">Recharger</button> -->
        <button class="btn-decision" onclick="ouvrirPageDecision()">Analyser le snapshot</button>

        <div class="capture-selector-top">
            <label for="liste-captures-postgres">Choisir une confihuration :</label>
            <select id="liste-captures-postgres" onchange="chargerCapturePostgresSelectionnee()">
                <option value="">Aucune configuration chargée</option>
            </select>
        </div>

        <div class="analysis-category-top">
            <label for="categorie-analyse-btc">Type d'analyse :</label>
            <select id="categorie-analyse-btc">
                <option value="macroeconomie">Macroéconomie</option>
                <option value="monnaie_bitcoin">Monnaie Bitcoin</option>
                <option value="donnees_on_chain">Données on-chain</option>
                <option value="minage">Minage</option>
                <option value="analyse_technique" selected>Analyse technique</option>
                <option value="derives">Dérivés</option>
                <option value="liquidite_marche">Liquidité de marché</option>
                <option value="institutionnel">Institutionnel</option>
                <option value="sentiment">Sentiment</option>
                <option value="reglementation_risques">Réglementation et risques</option>
            </select>
            <div id="description-categorie-analyse" class="category-description category-description-top">
                Analyse technique : graphiques, tendances, supports, résistances, RSI et moyennes mobiles.
            </div>
        </div>

<!--
        <div class="header-images">
            <img src="img/bitcoin.jfif" alt="Bitcoin">
            <img src="img/lingot-or.jfif" alt="Lingot d'or">
        </div>
-->
    </div>
</header>

<main>
    <section class="chart-panel">
        <div class="chart-title-row">
            <h2>Graphique TradingView intégré</h2>
            <span id="source-parametres-graphique" class="source-parametres-graphique">Lecture directe non confirmée</span>
            <div class="chart-inline-controls">
                <div class="form-block">
                    <label for="type-bougie">Type de graphique</label>
                    <select id="type-bougie" onchange="actualiserGraphique()">
                        <option value="bougies_japonaises" selected>Bougies japonaises</option>
                        <option value="barres">Barres</option>
                        <option value="ligne">Ligne</option>
                        <option value="heikin_ashi">Heikin Ashi</option>
                    </select>
                </div>
                <div class="form-block">
                    <label for="capital-input">Capital initial</label>
                    <input id="capital-input" type="number" value="1000" min="0" step="100">
                </div>
            </div>
            <div class="chart-title-icons">
                <img src="img/bitcoin.jfif" alt="Symbole du Bitcoin">
                <img src="img/lingot-or.jfif" alt="Lingot d'or">
            </div>
        </div>

        <div id="tradingview_chart"></div>
        <input type="file" id="fichier-import-json" accept="application/json,.json" style="display:none;" onchange="importerJSONDepuisFichier(event)">

    </section>

    <aside class="side-panel">
        <section class="risk-box">
            <h3>Paramètres de risque</h3>
            <div class="form-block">
                <label for="risk-input">Risque par position en pourcentage</label>
                <input id="risk-input" type="number" value="1" min="0" step="0.1">
            </div>
            <div class="form-block">
                <label for="stoploss-input">Stop loss en pourcentage</label>
                <input id="stoploss-input" type="number" value="2" min="0" step="0.1">
            </div>
            <div class="form-block">
                <label for="takeprofit-input">Take profit en pourcentage</label>
                <input id="takeprofit-input" type="number" value="4" min="0" step="0.1">
            </div>
            <div class="form-block">
                <label for="levier-input">Levier</label>
                <input id="levier-input" type="number" value="1" min="1" step="1">
            </div>
            <div class="form-block">
                <label for="sens-selector">Sens</label>
                <select id="sens-selector">
                    <option value="achat_vente" selected>Achat ou vente</option>
                    <option value="achat">Achat seulement</option>
                    <option value="vente">Vente seulement</option>
                </select>
            </div>
            <div class="form-block">
                <label for="strategie-selector">Stratégie</label>
                <select id="strategie-selector">
                    <option value="suivi_tendance" selected>Suivi de tendance</option>
                    <option value="retournement">Retournement</option>
                    <option value="cassure">Cassure</option>
                    <option value="range">Range</option>
                </select>
            </div>
            <div class="form-block">
                <label for="snapshot-url">URL éventuelle du snapshot</label>
                <input id="snapshot-url" type="text" placeholder="Lien optionnel vers une image ou un snapshot">
            </div>

        </section>

        <h3>Configuration capturée</h3>
        <pre id="resultat-configuration">Aucune configuration capturée.</pre>

        <div id="status" class="status">En attente de capture.</div>
    </aside>
</main>


<div id="modal-password-overlay" class="modal-password-overlay">
    <div class="modal-password-box">
        <h3>Mot de passe administrateur</h3>
        <p>Entrer le mot de passe pour vider la table <strong>trading_capture</strong>.</p>
        <input id="admin-delete-password-input" type="password" autocomplete="current-password" placeholder="Mot de passe">
        <div class="modal-password-actions">
            <button class="btn-dark" type="button" onclick="fermerFenetreMotDePasse(false)">Annuler</button>
            <button class="btn-clear" type="button" onclick="fermerFenetreMotDePasse(true)">Confirmer</button>
        </div>
    </div>
</div>

<footer>
    Trading Station IA — page HTML sur GitHub Pages, API Node.js sur Render.
</footer>

<script>
    let widgetTradingView = null;
    let configurationActuelle = null;
    let lectureDirecteGraphiqueDisponible = false;
    let derniersParametresGraphiqueDirect = null;
    let ecouteursGraphiqueInstalles = false;

    const API_BASE_URL_PAR_DEFAUT = "https://trading-g8ie.onrender.com";

    let resolveMotDePasseAdmin = null;

    function demanderMotDePasseAdmin() {
        return new Promise(function(resolve) {
            const overlay = document.getElementById("modal-password-overlay");
            const champ = document.getElementById("admin-delete-password-input");

            resolveMotDePasseAdmin = resolve;

            if (!overlay || !champ) {
                resolve("");
                return;
            }

            champ.value = "";
            overlay.style.display = "flex";

            setTimeout(function() {
                champ.focus();
            }, 50);
        });
    }

    function fermerFenetreMotDePasse(valider) {
        const overlay = document.getElementById("modal-password-overlay");
        const champ = document.getElementById("admin-delete-password-input");

        const valeur = valider && champ ? champ.value : "";

        if (overlay) {
            overlay.style.display = "none";
        }

        if (typeof resolveMotDePasseAdmin === "function") {
            resolveMotDePasseAdmin(valeur);
            resolveMotDePasseAdmin = null;
        }
    }

    document.addEventListener("keydown", function(event) {
        const overlay = document.getElementById("modal-password-overlay");
        const champ = document.getElementById("admin-delete-password-input");

        if (!overlay || overlay.style.display !== "flex") {
            return;
        }

        if (event.key === "Escape") {
            fermerFenetreMotDePasse(false);
        }

        if (event.key === "Enter" && document.activeElement === champ) {
            fermerFenetreMotDePasse(true);
        }
    });


    function valeurElement(id, valeurDefaut = "") {
        const element = document.getElementById(id);
        return element ? element.value : valeurDefaut;
    }

    function libelleElement(id, valeurDefaut = "") {
        const element = document.getElementById(id);
        if (!element || element.selectedIndex < 0) return valeurDefaut;
        return element.options[element.selectedIndex].text;
    }

    function nombreElement(id, valeurDefaut = 0) {
        const element = document.getElementById(id);
        if (!element) return valeurDefaut;
        const valeur = Number(element.value);
        return Number.isFinite(valeur) ? valeur : valeurDefaut;
    }

    function nettoyerUrl(url) {
        return String(url || "").trim().replace(/\/+$/, "");
    }

    function getApiBaseUrl() {
        const champApi = document.getElementById("api-url");
        let valeurChamp = champApi ? nettoyerUrl(champApi.value) : "";

        if (!valeurChamp) return API_BASE_URL_PAR_DEFAUT;

        valeurChamp = valeurChamp
            .replace("https://https://", "https://")
            .replace("http://http://", "http://")
            .replace(/\/analyse\/?$/, "/api/analyse");

        valeurChamp = valeurChamp
            .replace(/\/api\/analyse\/?$/, "")
            .replace(/\/api\/test\/?$/, "")
            .replace(/\/api\/marche\/?$/, "")
            .replace(/\/api\/captures\/?$/, "")
            .replace(/\/api\/vider-captures\/?$/, "")
            .replace(/\/api\/creer-table\/?$/, "")
            .replace(/\/api\/verifier-table\/?$/, "");

        if (!valeurChamp.startsWith("http://") && !valeurChamp.startsWith("https://")) {
            return API_BASE_URL_PAR_DEFAUT;
        }

        return nettoyerUrl(valeurChamp);
    }

    function getApiAnalyseUrl() { return getApiBaseUrl() + "/api/analyse"; }
    function getApiTestUrl() { return getApiBaseUrl() + "/api/test"; }
    function getApiMarcheUrl() { return getApiBaseUrl() + "/api/marche"; }

    /*
        IMPORTANT :
        Cette route reste volontairement fixe.
        Ne pas remplacer par getApiBaseUrl(), car l'enregistrement fonctionnait ainsi.
    */
    function getApiCapturesUrl() { return API_BASE_URL_PAR_DEFAUT + "/api/captures"; }

    function getApiViderCapturesUrl() { return API_BASE_URL_PAR_DEFAUT + "/api/vider-captures"; }

    function getApiCreerTableUrl() { return getApiBaseUrl() + "/api/creer-table"; }
    function getApiVerifierTableUrl() { return getApiBaseUrl() + "/api/verifier-table"; }

    function afficherEtatServeur(type, message) {
        const etat = document.getElementById("etatServeur");
        if (!etat) return;
        etat.className = "server-status " + type;
        etat.textContent = message;
    }

    function afficherInfosServeur(texte) {
        const zone = document.getElementById("infosServeur");
        if (!zone) return;
        zone.textContent = texte;
    }

    function afficherStatus(message) {
        document.getElementById("status").textContent = message;
    }

    function afficherAnalyseIA(texte) {
        document.getElementById("resultat-analyse-ia").textContent = texte;
    }

    function afficherConfiguration(configuration) {
        document.getElementById("resultat-configuration").textContent = JSON.stringify(configuration, null, 4);
    }

    function getCategorieAnalyseBTC() {
        return valeurElement("categorie-analyse-btc", "analyse_technique");
    }

    function getLibelleCategorieAnalyseBTC() {
        return libelleElement("categorie-analyse-btc", "Analyse technique");
    }

    function getDescriptionCategorieAnalyseBTC() {
        const descriptions = {
            macroeconomie: "Macroéconomie : taux, inflation, liquidité mondiale, dollar, obligations et bilan de la Fed.",
            monnaie_bitcoin: "Monnaie Bitcoin : offre maximale, émission, halving et inflation de BTC.",
            donnees_on_chain: "Données on-chain : adresses, transactions, MVRV, realized price et flux des plateformes.",
            minage: "Minage : taux de hachage, difficulté, revenus et ventes des mineurs.",
            analyse_technique: "Analyse technique : graphiques, tendances, supports, résistances, RSI et moyennes mobiles.",
            derives: "Dérivés : contrats à terme, options, funding rates, open interest et liquidations.",
            liquidite_marche: "Liquidité de marché : volumes, carnets d'ordres, spreads et profondeur de marché.",
            institutionnel: "Institutionnel : FNB Bitcoin, achats d'entreprises, fonds, banques et adoption officielle.",
            sentiment: "Sentiment : réseaux sociaux, Google Trends, médias, peur et avidité.",
            reglementation_risques: "Réglementation et risques : lois, fiscalité, plateformes, garde et géopolitique."
        };
        return descriptions[getCategorieAnalyseBTC()] || descriptions.analyse_technique;
    }

    function actualiserDescriptionCategorie() {
        const zone = document.getElementById("description-categorie-analyse");
        if (zone) zone.textContent = getDescriptionCategorieAnalyseBTC();
    }

    function obtenirStyleTradingView() {
        const typeBougie = valeurElement("type-bougie", "bougies_japonaises");
        switch (typeBougie) {
            case "barres": return "0";
            case "bougies_japonaises": return "1";
            case "ligne": return "3";
            case "heikin_ashi": return "8";
            default: return "1";
        }
    }

    function choisirEtudeTradingView() {
        const indicateur = valeurElement("indicator-selector", "RSI");
        if (indicateur === "RSI") return ["RSI@tv-basicstudies"];
        if (indicateur === "MACD") return ["MACD@tv-basicstudies"];
        if (indicateur === "EMA") return ["MASimple@tv-basicstudies"];
        if (indicateur === "BOLLINGER") return ["BB@tv-basicstudies"];
        if (indicateur === "VOLUME") return ["Volume@tv-basicstudies"];
        return [];
    }

    function mettreAJourBadgeLectureGraphique(type, message) {
        const badge = document.getElementById("source-parametres-graphique");
        if (!badge) return;
        badge.className = "source-parametres-graphique" + (type ? " " + type : "");
        badge.textContent = message;
    }

    function normaliserResultatSymbolInterval(resultat) {
        if (!resultat) return null;

        const symbole =
            resultat.symbol ||
            resultat.ticker ||
            resultat.pro_name ||
            resultat.full_name ||
            null;

        const intervalle =
            resultat.interval ||
            resultat.resolution ||
            resultat.timeframe ||
            null;

        if (!symbole && !intervalle) return null;

        return {
            actif: symbole || valeurElement("asset-selector", "BINANCE:BTCUSDT"),
            actifLibelle: symbole || libelleElement("asset-selector", "Bitcoin / USDT"),
            intervalle: intervalle || valeurElement("interval-selector", "D"),
            intervalleLibelle: intervalle || libelleElement("interval-selector", "1 jour"),
            indicateur: valeurElement("indicator-selector", "RSI"),
            indicateurLibelle: libelleElement("indicator-selector", "RSI"),
            source: "graphique_tradingview_api",
            lectureDirecte: true
        };
    }

    function lireParametresDepuisGraphiqueTradingView() {
        try {
            if (!widgetTradingView) return null;

            /*
                Advanced Charts / Charting Library :
                La méthode symbolInterval() permet de lire le symbole et l'intervalle
                du graphique actif lorsque cette API est réellement disponible.
            */
            if (typeof widgetTradingView.symbolInterval === "function") {
                const resultatWidget = normaliserResultatSymbolInterval(widgetTradingView.symbolInterval());
                if (resultatWidget) return resultatWidget;
            }

            if (typeof widgetTradingView.activeChart === "function") {
                const chart = widgetTradingView.activeChart();

                if (chart && typeof chart.symbolInterval === "function") {
                    const resultatChart = normaliserResultatSymbolInterval(chart.symbolInterval());
                    if (resultatChart) return resultatChart;
                }

                const symbole = chart && typeof chart.symbol === "function" ? chart.symbol() : null;
                const intervalle = chart && typeof chart.resolution === "function" ? chart.resolution() : null;

                if (symbole || intervalle) {
                    return {
                        actif: symbole || valeurElement("asset-selector", "BINANCE:BTCUSDT"),
                        actifLibelle: symbole || libelleElement("asset-selector", "Bitcoin / USDT"),
                        intervalle: intervalle || valeurElement("interval-selector", "D"),
                        intervalleLibelle: intervalle || libelleElement("interval-selector", "1 jour"),
                        indicateur: valeurElement("indicator-selector", "RSI"),
                        indicateurLibelle: libelleElement("indicator-selector", "RSI"),
                        source: "graphique_tradingview_api",
                        lectureDirecte: true
                    };
                }
            }
        } catch (erreur) {
            console.warn("Lecture directe du graphique impossible :", erreur);
        }

        return derniersParametresGraphiqueDirect;
    }

    function synchroniserChampsMasquesAvecGraphique(parametres) {
        if (!parametres) return;

        if (parametres.actif) definirValeur("asset-selector", parametres.actif);
        if (parametres.intervalle) definirValeur("interval-selector", parametres.intervalle);

        /*
            Les indicateurs ajoutés manuellement dans le graphique ne sont pas tous lisibles
            avec le widget public. On conserve donc l'indicateur HTML masqué comme repli.
        */
        if (parametres.indicateur) definirValeur("indicator-selector", parametres.indicateur);
    }

    function installerLectureDirecteGraphique() {
        if (!widgetTradingView) return;

        const initialiser = function () {
            const parametres = lireParametresDepuisGraphiqueTradingView();

            if (parametres && parametres.lectureDirecte === true) {
                lectureDirecteGraphiqueDisponible = true;
                derniersParametresGraphiqueDirect = parametres;
                synchroniserChampsMasquesAvecGraphique(parametres);
                mettreAJourBadgeLectureGraphique("ok", "Lecture directe du graphique active");
            } else {
                lectureDirecteGraphiqueDisponible = false;
                mettreAJourBadgeLectureGraphique("erreur", "Widget simple : repli sur champs masqués");
            }

            if (ecouteursGraphiqueInstalles) return;

            try {
                if (typeof widgetTradingView.activeChart === "function") {
                    const chart = widgetTradingView.activeChart();

                    if (chart && chart.onIntervalChanged && typeof chart.onIntervalChanged === "function") {
                        chart.onIntervalChanged().subscribe(null, function () {
                            const nouveauxParametres = lireParametresDepuisGraphiqueTradingView();
                            if (nouveauxParametres) {
                                derniersParametresGraphiqueDirect = nouveauxParametres;
                                synchroniserChampsMasquesAvecGraphique(nouveauxParametres);
                            }
                        });
                    }

                    if (chart && chart.onSymbolChanged && typeof chart.onSymbolChanged === "function") {
                        chart.onSymbolChanged().subscribe(null, function () {
                            const nouveauxParametres = lireParametresDepuisGraphiqueTradingView();
                            if (nouveauxParametres) {
                                derniersParametresGraphiqueDirect = nouveauxParametres;
                                synchroniserChampsMasquesAvecGraphique(nouveauxParametres);
                            }
                        });
                    }
                }

                ecouteursGraphiqueInstalles = true;
            } catch (erreur) {
                console.warn("Écoute directe du graphique non disponible :", erreur);
            }
        };

        if (typeof widgetTradingView.onChartReady === "function") {
            widgetTradingView.onChartReady(initialiser);
        } else {
            setTimeout(initialiser, 800);
        }
    }

    function creerWidgetTradingView(tentative = 0) {
        const conteneur = document.getElementById("tradingview_chart");
        if (!conteneur) return;

        if (typeof TradingView === "undefined" || !TradingView.widget) {
            conteneur.innerHTML = "<div style='padding:16px;color:#facc15;'>Chargement de TradingView...</div>";
            if (tentative < 20) {
                setTimeout(function () { creerWidgetTradingView(tentative + 1); }, 500);
            } else {
                conteneur.innerHTML = "<div style='padding:16px;color:#fecaca;'>Impossible de charger TradingView.</div>";
            }
            return;
        }

        const symbole = valeurElement("asset-selector", "BINANCE:BTCUSDT");
        const intervalle = valeurElement("interval-selector", "D");
        conteneur.innerHTML = "";

        try {
            widgetTradingView = new TradingView.widget({
                autosize: true,
                symbol: symbole,
                interval: intervalle,
                timezone: "America/Toronto",
                theme: "dark",
                style: obtenirStyleTradingView(),
                locale: "fr",
                toolbar_bg: "#0f172a",
                enable_publishing: false,
                allow_symbol_change: true,
                container_id: "tradingview_chart",
                hide_side_toolbar: false,
                details: true,
                hotlist: true,
                calendar: false,
                studies: choisirEtudeTradingView()
            });

            ecouteursGraphiqueInstalles = false;
            installerLectureDirecteGraphique();
        } catch (erreur) {
            conteneur.innerHTML = "<div style='padding:16px;color:#fecaca;'>Erreur lors du chargement du graphique TradingView.</div>";
            afficherStatus("Erreur TradingView : " + erreur.message);
        }
    }

    function actualiserGraphique() {
        creerWidgetTradingView();
        afficherStatus("Graphique actualisé.");
    }

    function ouvrirTradingView() {
        const symbole = valeurElement("asset-selector", "BINANCE:BTCUSDT");
        const intervalle = valeurElement("interval-selector", "D");
        const url = "https://www.tradingview.com/chart/?symbol=" + encodeURIComponent(symbole) + "&interval=" + encodeURIComponent(intervalle);
        window.open(url, "_blank");
    }


    async function viderTableTradingCapture() {
        const confirmation = confirm("Êtes-vous sûr de vouloir vider toute la table trading_capture ?\n\nCette action supprimera toutes les configurations enregistrées.");

        if (!confirmation) {
            afficherStatus("Suppression annulée.");
            return;
        }

        const motDePasse = await demanderMotDePasseAdmin();

        if (!motDePasse || motDePasse.trim() === "") {
            afficherStatus("Suppression annulée : mot de passe absent.");
            alert("Suppression annulée : mot de passe absent.");
            return;
        }

        const url = getApiViderCapturesUrl();

        afficherStatus("Vidage de la table trading_capture en cours...");
        afficherEtatServeur("warning", "Suppression des captures...");
        afficherInfosServeur(
            "VIDAGE DE LA TABLE\n" +
            "------------------\n" +
            "Table : trading_capture\n" +
            "Route appelée : " + url
        );

        try {
            const resultat = await appelerJson(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-store",
                body: JSON.stringify({
                    motDePasse: motDePasse.trim()
                })
            });

            afficherStatus("Table trading_capture vidée.");
            afficherEtatServeur("ok", "Table vidée");
            afficherInfosServeur(
                "VIDAGE RÉUSSI\n" +
                "-------------\n" +
                JSON.stringify(resultat, null, 4)
            );

            const select = document.getElementById("liste-captures-postgres");
            if (select) {
                select.innerHTML = '<option value="">Aucune configuration enregistrée</option>';
            }

            configurationActuelle = null;
            afficherConfiguration({ message: "La table trading_capture a été vidée." });
            alert("La table trading_capture a été vidée.");

        } catch (erreur) {
            console.error("Erreur pendant le vidage de la table trading_capture :", erreur);

            afficherStatus("Impossible de vider la table trading_capture.");
            afficherEtatServeur("error", "Erreur vidage table");
            afficherInfosServeur(
                "ERREUR VIDAGE TABLE\n" +
                "-------------------\n" +
                "Route appelée : " + url + "\n\n" +
                "Détail : " + erreur.message
            );

            alert("Impossible de vider la table trading_capture.\n\nDétail : " + erreur.message);
        }
    }

    function ouvrirServeurRender() {
        window.open(getApiBaseUrl(), "_blank");
    }

    async function appelerJson(url, options = {}) {
        try {
            const urlFinale = String(url || "").replace("https://https://", "https://");

            console.log("APPEL JSON - URL :", urlFinale);
            console.log("APPEL JSON - OPTIONS :", options);

            const reponse = await fetch(urlFinale, {
                ...options,
                mode: "cors",
                credentials: "omit",
                cache: "no-store",
                headers: {
                    "Accept": "application/json",
                    ...(options.headers || {})
                }
            });

            const texte = await reponse.text();

            console.log("STATUT HTTP :", reponse.status);
            console.log("RÉPONSE BRUTE :", texte);

            let json;

            try {
                json = JSON.parse(texte);
            } catch (erreurJson) {
                throw new Error("Le serveur n'a pas retourné du JSON. Réponse reçue : " + texte);
            }

            if (!reponse.ok) {
                throw new Error(json.detail || json.message || "Réponse HTTP " + reponse.status);
            }

            return json;

        } catch (erreur) {
            console.error("ERREUR DANS appelerJson :", erreur);
            throw erreur;
        }
    }

    async function testerServeur() {
        const urlTest = getApiTestUrl();
        const debut = performance.now();
        afficherEtatServeur("warning", "Test du serveur en cours...");
        afficherInfosServeur("Test de la route :\n" + urlTest);

        try {
            const resultat = await appelerJson(urlTest, { method: "GET", cache: "no-store" });
            const duree = Math.round(performance.now() - debut);
            afficherEtatServeur("ok", "Serveur connecté");
            afficherInfosServeur("TEST RÉUSSI\n-----------\nRoute : " + urlTest + "\nTemps : " + duree + " ms\n\n" + JSON.stringify(resultat, null, 4));
        } catch (erreur) {
            afficherEtatServeur("error", "Serveur inaccessible");
            afficherInfosServeur("TEST ÉCHOUÉ\n-----------\nRoute : " + urlTest + "\n\n" + erreur.message);
        }
    }

    async function creerTablePostgres() {
        const url = getApiCreerTableUrl();
        afficherEtatServeur("warning", "Création de la table...");
        afficherInfosServeur("Appel :\n" + url);

        try {
            const resultat = await appelerJson(url, { method: "GET", cache: "no-store" });
            afficherEtatServeur("ok", "Table PostgreSQL prête");
            afficherInfosServeur(JSON.stringify(resultat, null, 4));
            alert("Table PostgreSQL créée ou déjà existante.");
        } catch (erreur) {
            afficherEtatServeur("error", "Erreur table PostgreSQL");
            afficherInfosServeur("Impossible de créer la table.\n\n" + erreur.message);
            alert("Impossible de créer la table PostgreSQL.");
        }
    }

    async function verifierTablePostgres() {
        const url = getApiVerifierTableUrl();
        afficherEtatServeur("warning", "Vérification de la table...");
        afficherInfosServeur("Appel :\n" + url);

        try {
            const resultat = await appelerJson(url, { method: "GET", cache: "no-store" });
            afficherEtatServeur(resultat.tableExiste ? "ok" : "warning", resultat.tableExiste ? "Table existante" : "Table absente");
            afficherInfosServeur(JSON.stringify(resultat, null, 4));
        } catch (erreur) {
            afficherEtatServeur("error", "Erreur vérification table");
            afficherInfosServeur("Impossible de vérifier la table.\n\n" + erreur.message);
        }
    }


    function lireParametresGraphiquesMasques() {
        const parametresDepuisGraphique = lireParametresDepuisGraphiqueTradingView();

        if (parametresDepuisGraphique && parametresDepuisGraphique.lectureDirecte === true) {
            derniersParametresGraphiqueDirect = parametresDepuisGraphique;
            synchroniserChampsMasquesAvecGraphique(parametresDepuisGraphique);
            mettreAJourBadgeLectureGraphique("ok", "Lecture directe du graphique active");
            return parametresDepuisGraphique;
        }

        mettreAJourBadgeLectureGraphique("erreur", "Widget simple : repli sur champs masqués");

        return {
            actif: valeurElement("asset-selector", "BINANCE:BTCUSDT"),
            actifLibelle: libelleElement("asset-selector", "Bitcoin / USDT"),
            intervalle: valeurElement("interval-selector", "D"),
            intervalleLibelle: libelleElement("interval-selector", "1 jour"),
            indicateur: valeurElement("indicator-selector", "RSI"),
            indicateurLibelle: libelleElement("indicator-selector", "RSI"),
            source: "repli_champs_html_masques",
            lectureDirecte: false
        };
    }


    function appelSecurise(description, fonction) {
        try {
            if (typeof fonction !== "function") return null;
            const resultat = fonction();
            return resultat === undefined ? null : resultat;
        } catch (erreur) {
            console.warn("Paramètre TradingView non accessible : " + description, erreur);
            return null;
        }
    }

    function valeurNonVide(valeur) {
        if (valeur === undefined || valeur === null) return null;
        if (typeof valeur === "string" && valeur.trim() === "") return null;
        return valeur;
    }

    function detecterDimensionsElement(id) {
        const element = document.getElementById(id);
        if (!element) {
            return {
                existe: false,
                largeur: null,
                hauteur: null
            };
        }

        const rectangle = element.getBoundingClientRect();

        return {
            existe: true,
            largeur: Math.round(rectangle.width),
            hauteur: Math.round(rectangle.height),
            largeurScroll: element.scrollWidth || null,
            hauteurScroll: element.scrollHeight || null
        };
    }

    function obtenirEtudesConfigureesDepuisPage() {
        const indicateur = valeurElement("indicator-selector", "RSI");
        const etudes = choisirEtudeTradingView();

        return {
            indicateurSelectionne: indicateur,
            indicateurLibelle: libelleElement("indicator-selector", "RSI"),
            etudesConfigurees: etudes,
            source: "selecteur_html_et_parametre_studies"
        };
    }

    function lireValeursAvanceesDepuisChartingLibrary() {
        const donnees = {
            apiDisponible: false,
            symbole: null,
            intervalle: null,
            visibleRange: null,
            typeGraphiqueBrut: null,
            nomGraphique: null,
            timezone: null,
            etudes: null,
            dessins: null,
            erreurs: []
        };

        if (!widgetTradingView || typeof widgetTradingView.activeChart !== "function") {
            donnees.erreurs.push("API activeChart indisponible avec le widget actuel.");
            return donnees;
        }

        const chart = appelSecurise("activeChart", function () {
            return widgetTradingView.activeChart();
        });

        if (!chart) {
            donnees.erreurs.push("Graphique actif non disponible.");
            return donnees;
        }

        donnees.apiDisponible = true;

        const symbolInterval = appelSecurise("symbolInterval", function () {
            return typeof chart.symbolInterval === "function" ? chart.symbolInterval() : null;
        });

        if (symbolInterval) {
            donnees.symbole = valeurNonVide(symbolInterval.symbol || symbolInterval.ticker || symbolInterval.pro_name || symbolInterval.full_name);
            donnees.intervalle = valeurNonVide(symbolInterval.interval || symbolInterval.resolution || symbolInterval.timeframe);
        }

        donnees.symbole = donnees.symbole || valeurNonVide(appelSecurise("symbol", function () {
            return typeof chart.symbol === "function" ? chart.symbol() : null;
        }));

        donnees.intervalle = donnees.intervalle || valeurNonVide(appelSecurise("resolution", function () {
            return typeof chart.resolution === "function" ? chart.resolution() : null;
        }));

        donnees.visibleRange = appelSecurise("getVisibleRange", function () {
            return typeof chart.getVisibleRange === "function" ? chart.getVisibleRange() : null;
        });

        donnees.typeGraphiqueBrut = appelSecurise("chartType", function () {
            if (typeof chart.chartType === "function") return chart.chartType();
            if (typeof chart.getChartType === "function") return chart.getChartType();
            return null;
        });

        donnees.nomGraphique = appelSecurise("name", function () {
            return typeof chart.name === "function" ? chart.name() : null;
        });

        donnees.timezone = appelSecurise("timezone", function () {
            if (typeof chart.getTimezone === "function") return chart.getTimezone();
            if (typeof widgetTradingView.getTimezoneApi === "function") return widgetTradingView.getTimezoneApi();
            return null;
        });

        donnees.etudes = appelSecurise("getAllStudies", function () {
            if (typeof chart.getAllStudies === "function") return chart.getAllStudies();
            if (typeof chart.getAllPanes === "function") return { panesDisponibles: true, panes: chart.getAllPanes() };
            return null;
        });

        donnees.dessins = appelSecurise("getAllShapes", function () {
            return typeof chart.getAllShapes === "function" ? chart.getAllShapes() : null;
        });

        return donnees;
    }

    function capturerParametresAvancesTradingView(parametresGraphiques) {
        const lectureAvancee = lireValeursAvanceesDepuisChartingLibrary();
        const dimensionsGraphique = detecterDimensionsElement("tradingview_chart");
        const etudesConfigurees = obtenirEtudesConfigureesDepuisPage();
        const dateCapture = new Date();

        const actifFinal =
            lectureAvancee.symbole ||
            parametresGraphiques.actif ||
            valeurElement("asset-selector", "BINANCE:BTCUSDT");

        const intervalleFinal =
            lectureAvancee.intervalle ||
            parametresGraphiques.intervalle ||
            valeurElement("interval-selector", "D");

        return {
            versionCapture: "advanced_capture_v1",
            dateCaptureIso: dateCapture.toISOString(),
            sourcePrincipale: lectureAvancee.apiDisponible ? "charting_library_ou_api_avancee" : "widget_public_avec_repli_html",
            lectureDirectePossible: lectureAvancee.apiDisponible === true,
            valeursPrincipales: {
                actif: actifFinal,
                actifLibelle: parametresGraphiques.actifLibelle || actifFinal,
                intervalle: intervalleFinal,
                intervalleLibelle: parametresGraphiques.intervalleLibelle || intervalleFinal,
                indicateur: parametresGraphiques.indicateur || valeurElement("indicator-selector", "RSI"),
                indicateurLibelle: parametresGraphiques.indicateurLibelle || libelleElement("indicator-selector", "RSI"),
                typeBougie: valeurElement("type-bougie", "bougies_japonaises"),
                typeBougieLibelle: libelleElement("type-bougie", "Bougies japonaises"),
                styleTradingView: obtenirStyleTradingView()
            },
            graphiqueTradingView: {
                widgetPresent: !!widgetTradingView,
                apiActiveChartDisponible: typeof widgetTradingView?.activeChart === "function",
                apiSymbolIntervalDisponible: typeof widgetTradingView?.symbolInterval === "function",
                allowSymbolChange: true,
                autosize: true,
                theme: "dark",
                locale: "fr",
                timezoneConfiguree: "America/Toronto",
                toolbarBg: "#0f172a",
                hideSideToolbar: false,
                details: true,
                hotlist: true,
                calendar: false,
                enablePublishing: false,
                dimensions: dimensionsGraphique
            },
            donneesLuesDepuisApiAvancee: lectureAvancee,
            indicateursEtEtudes: etudesConfigurees,
            analyse: {
                categorie: getCategorieAnalyseBTC(),
                categorieLibelle: getLibelleCategorieAnalyseBTC(),
                descriptionCategorie: getDescriptionCategorieAnalyseBTC(),
                strategie: valeurElement("strategie-selector", "suivi_tendance"),
                sens: valeurElement("sens-selector", "achat_vente")
            },
            risque: {
                capitalInitial: nombreElement("capital-input", 1000),
                risqueParPositionPourcent: nombreElement("risk-input", 1),
                stopLossPourcent: nombreElement("stoploss-input", 2),
                takeProfitPourcent: nombreElement("takeprofit-input", 4),
                levier: nombreElement("levier-input", 1)
            },
            environnementPage: {
                urlPage: window.location.href,
                origine: window.location.origin,
                chemin: window.location.pathname,
                largeurFenetre: window.innerWidth,
                hauteurFenetre: window.innerHeight,
                devicePixelRatio: window.devicePixelRatio || 1,
                langueNavigateur: navigator.language || null,
                plateforme: navigator.platform || null,
                userAgent: navigator.userAgent || null,
                heureLocale: dateCapture.toLocaleString("fr-CA")
            },
            limites: {
                indicateursAjoutesManuellementDansTradingView: lectureAvancee.etudes ? "lecture_tentee" : "non_accessible_avec_widget_public",
                dessinsEtAnnotationsTradingView: lectureAvancee.dessins ? "lecture_tentee" : "non_accessible_avec_widget_public",
                donneesOHLCVCompletes: "non_fournies_par_le_widget_public",
                remarque: "Les valeurs réellement accessibles dépendent de l'API TradingView disponible dans la page. Avec le widget public tv.js, la capture directe reste limitée."
            }
        };
    }

    function capturerConfigurationTradingView(afficherAlerte = true) {
        const parametresGraphiques = lireParametresGraphiquesMasques();
        const parametresAvancesTradingView = capturerParametresAvancesTradingView(parametresGraphiques);

        configurationActuelle = {
            nom: "Configuration TradingView IA",
            dateCapture: new Date().toISOString(),
            serveur: {
                apiAnalyse: getApiAnalyseUrl(),
                apiTest: getApiTestUrl(),
                apiMarche: getApiMarcheUrl(),
                apiCaptures: getApiCapturesUrl(),
                apiViderCaptures: getApiViderCapturesUrl(),
                hebergeur: "Render",
                type: "Node.js"
            },
            graphique: {
                actif: parametresGraphiques.actif,
                actifLibelle: parametresGraphiques.actifLibelle,
                intervalle: parametresGraphiques.intervalle,
                intervalleLibelle: parametresGraphiques.intervalleLibelle,
                indicateur: parametresGraphiques.indicateur,
                indicateurLibelle: parametresGraphiques.indicateurLibelle,
                typeBougie: valeurElement("type-bougie", "bougies_japonaises"),
                typeBougieLibelle: libelleElement("type-bougie", "Bougies japonaises"),
                source: parametresGraphiques.source || "graphique_tradingview_api",
                sourceAffichage: "widget_tradingview_integre",
                lectureDirecteGraphique: parametresGraphiques.lectureDirecte === true,
                champsMasques: true,
                parametresAvances: parametresAvancesTradingView
            },
            tradingView: parametresAvancesTradingView,
            analyseIA: {
                categorie: getCategorieAnalyseBTC(),
                categorieLibelle: getLibelleCategorieAnalyseBTC(),
                descriptionCategorie: getDescriptionCategorieAnalyseBTC(),
                strategie: valeurElement("strategie-selector", "suivi_tendance"),
                statut: "pret_pour_analyse"
            },
            risque: {
                capitalInitial: nombreElement("capital-input", 1000),
                risqueParPositionPourcent: nombreElement("risk-input", 1),
                stopLossPourcent: nombreElement("stoploss-input", 2),
                takeProfitPourcent: nombreElement("takeprofit-input", 4),
                levier: nombreElement("levier-input", 1),
                sens: valeurElement("sens-selector", "achat_vente")
            },
            snapshot: {
                url: valeurElement("snapshot-url", ""),
                categorieAnalyse: getCategorieAnalyseBTC(),
                categorieAnalyseLibelle: getLibelleCategorieAnalyseBTC(),
                descriptionCategorieAnalyse: getDescriptionCategorieAnalyseBTC(),
                screenshotBase64: null
            },
            marche: null,
            notes: valeurElement("notes-analyse", "").trim(),
            limites: {
                captureCompleteTradingView: false,
                dessinsInternesTradingView: false,
                remarque: "La page capture le maximum de paramètres accessibles. Avec le widget public TradingView, certaines données internes restent inaccessibles."
            }
        };

        afficherConfiguration(configurationActuelle);
        afficherStatus("Configuration capturée avec succès.");

        if (afficherAlerte) alert("Configuration capturée.");

        return configurationActuelle;
    }

    async function capturerEtEnregistrerConfiguration() {
        try {
            capturerConfigurationTradingView(false);

            afficherStatus("Capture en cours, ajout des données de marché...");

            await enrichirConfigurationAvecDonneesMarche(false);

            await enregistrerCapturePostgres(true, false);

        } catch (erreur) {
            console.error("Erreur capture et enregistrement :", erreur);
            afficherStatus("Erreur pendant la capture et l'enregistrement.");
            alert("Erreur pendant la capture et l'enregistrement : " + erreur.message);
        }
    }

    async function enrichirConfigurationAvecDonneesMarche(afficherAlerte = true) {
        if (!configurationActuelle) capturerConfigurationTradingView(false);

        const urlMarche = getApiMarcheUrl();
        afficherStatus("Récupération des données de marché...");
        afficherEtatServeur("warning", "Appel /api/marche...");

        try {
            const donneesMarche = await appelerJson(urlMarche, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                cache: "no-store",
                body: JSON.stringify({
                    actif: configurationActuelle.graphique.actif,
                    intervalle: configurationActuelle.graphique.intervalle,
                    indicateur: configurationActuelle.graphique.indicateur,
                    categorieAnalyse: configurationActuelle.analyseIA.categorie,
                    typeBougie: configurationActuelle.graphique.typeBougie,
                    actifLibelle: configurationActuelle.graphique.actifLibelle,
                    intervalleLibelle: configurationActuelle.graphique.intervalleLibelle,
                    indicateurLibelle: configurationActuelle.graphique.indicateurLibelle
                })
            });

            configurationActuelle.marche = {
                prixActuel: donneesMarche.prixActuel ?? null,
                support: donneesMarche.support ?? null,
                resistance: donneesMarche.resistance ?? null,
                plusHautRecent: donneesMarche.plusHautRecent ?? null,
                plusBasRecent: donneesMarche.plusBasRecent ?? null,
                variationPourcent: donneesMarche.variationPourcent ?? null,
                rsi: donneesMarche.rsi ?? null,
                ema20: donneesMarche.ema20 ?? null,
                ema50: donneesMarche.ema50 ?? null,
                ema200: donneesMarche.ema200 ?? null,
                macd: donneesMarche.macd ?? null,
                signalMacd: donneesMarche.signalMacd ?? null,
                histogrammeMacd: donneesMarche.histogrammeMacd ?? null,
                atr14: donneesMarche.atr14 ?? null,
                volume: donneesMarche.volume ?? "neutre",
                volumeMoyen20: donneesMarche.volumeMoyen20 ?? null,
                tendance: donneesMarche.tendance ?? "neutre",
                decisionTechniquePreliminaire: donneesMarche.decisionTechniquePreliminaire ?? "attente",
                methodeSupportResistance: donneesMarche.methodeSupportResistance ?? null,
                source: donneesMarche.source ?? "serveur_nodejs",
                api: urlMarche,
                ok: donneesMarche.ok === true,
                statut: donneesMarche.statut || null,
                message: donneesMarche.message || null,
                donneesCompletes: donneesMarche,
                dateMiseAJour: new Date().toISOString()
            };

            localStorage.setItem("configurationTradingViewIA", JSON.stringify(configurationActuelle));
            afficherConfiguration(configurationActuelle);
            afficherEtatServeur("ok", "Données de marché reçues");
            afficherStatus("Configuration enrichie avec les données de marché.");
            afficherInfosServeur(JSON.stringify(donneesMarche, null, 4));
            if (afficherAlerte) alert("Données de marché ajoutées.");
        } catch (erreur) {
            afficherEtatServeur("error", "Erreur /api/marche");
            afficherStatus("Impossible de récupérer les données de marché.");
            afficherInfosServeur("ERREUR /api/marche\n-----------------\nAdresse : " + urlMarche + "\n\n" + erreur.message);
            if (afficherAlerte) alert("Impossible d'ajouter les données de marché.");
        }
    }

    function nettoyerNomFichier(valeur) {
        return String(valeur || "non-defini")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9-_]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");
    }

    function genererTimestampFichier() {
        const maintenant = new Date();
        const annee = maintenant.getFullYear();
        const mois = String(maintenant.getMonth() + 1).padStart(2, "0");
        const jour = String(maintenant.getDate()).padStart(2, "0");
        const heure = String(maintenant.getHours()).padStart(2, "0");
        const minute = String(maintenant.getMinutes()).padStart(2, "0");
        const seconde = String(maintenant.getSeconds()).padStart(2, "0");
        return annee + mois + jour + "-" + heure + minute + seconde;
    }

    function genererNomCapturePostgres(configuration) {
        const actif = nettoyerNomFichier(configuration.graphique.actif);
        const indicateur = nettoyerNomFichier(configuration.graphique.indicateur);

        const categorieAnalyse =
            configuration?.analyseIA?.categorieLibelle ||
            configuration?.analyseIA?.categorie ||
            configuration?.snapshot?.categorieAnalyseLibelle ||
            configuration?.snapshot?.categorieAnalyse ||
            "Liquidité de marché";

        const categorie = nettoyerNomFichier(categorieAnalyse);
        const timestamp = genererTimestampFichier();

        /*
            Format demandé :
            ACTIF-INDICATEUR-CATEGORIE_ANALYSE-TIMESTAMP

            Exemple :
            BINANCE-BTCUSDT-RSI-ANALYSE-TECHNIQUE-20260510-154233
        */
        return actif + "-" + indicateur + "-" + categorie + "-" + timestamp;
    }

    function obtenirScreenshotBase64DepuisConfiguration() {
        if (!configurationActuelle || !configurationActuelle.snapshot) return null;
        return configurationActuelle.snapshot.screenshotBase64 || null;
    }

    async function enregistrerCapturePostgres(afficherAlerte = true, capturerAvant = true) {
        try {
            if (capturerAvant) {
                capturerConfigurationTradingView(false);
            }

            if (!configurationActuelle) {
                throw new Error("configurationActuelle est vide ou non définie.");
            }

            if (!configurationActuelle.graphique) {
                throw new Error("configurationActuelle.graphique est vide ou non défini.");
            }

            const parametresGraphiques = lireParametresGraphiquesMasques();

            configurationActuelle.graphique.actif = parametresGraphiques.actif;
            configurationActuelle.graphique.actifLibelle = parametresGraphiques.actifLibelle;
            configurationActuelle.graphique.intervalle = parametresGraphiques.intervalle;
            configurationActuelle.graphique.intervalleLibelle = parametresGraphiques.intervalleLibelle;
            configurationActuelle.graphique.indicateur = parametresGraphiques.indicateur;
            configurationActuelle.graphique.indicateurLibelle = parametresGraphiques.indicateurLibelle;
            configurationActuelle.graphique.source = parametresGraphiques.source || "graphique_tradingview_api";
            configurationActuelle.graphique.lectureDirecteGraphique = parametresGraphiques.lectureDirecte === true;
            configurationActuelle.graphique.champsMasques = true;

            const parametresAvancesTradingView = capturerParametresAvancesTradingView(parametresGraphiques);
            configurationActuelle.tradingView = parametresAvancesTradingView;
            configurationActuelle.graphique.parametresAvances = parametresAvancesTradingView;

            const urlCaptures = getApiCapturesUrl();
            const nomCapture = genererNomCapturePostgres(configurationActuelle);
            const screenshotBase64 = obtenirScreenshotBase64DepuisConfiguration();

            configurationActuelle.nomCapture = nomCapture;

            const categorieAnalyse =
                configurationActuelle?.analyseIA?.categorieLibelle ||
                configurationActuelle?.analyseIA?.categorie ||
                configurationActuelle?.snapshot?.categorieAnalyseLibelle ||
                configurationActuelle?.snapshot?.categorieAnalyse ||
                "Liquidité de marché";

            const donneesAEnregistrer = {
                actif: configurationActuelle.graphique.actif || "NON_RENSEIGNE",
                indicateur: configurationActuelle.graphique.indicateur || null,
                intervalle: configurationActuelle.graphique.intervalle || null,
                actif_libelle: configurationActuelle.graphique.actifLibelle || null,
                indicateur_libelle: configurationActuelle.graphique.indicateurLibelle || null,
                intervalle_libelle: configurationActuelle.graphique.intervalleLibelle || null,
                source_parametres: configurationActuelle.graphique.source || null,
                lecture_directe_graphique: configurationActuelle.graphique.lectureDirecteGraphique === true,
                type_bougie: configurationActuelle.graphique.typeBougie || null,
                type_bougie_libelle: configurationActuelle.graphique.typeBougieLibelle || null,

                /*
                    On garde nom_fichier pour compatibilité avec ton ancien code.
                    On ajoute nom_capture pour la nouvelle colonne.
                    On ajoute aussi categorie_analyse pour server.js.
                */
                nom_fichier: nomCapture || ("capture-" + new Date().toISOString()),
                nom_capture: nomCapture || ("capture-" + new Date().toISOString()),
                categorie_analyse: categorieAnalyse,
                categorieAnalyse: categorieAnalyse,

                configuration_json: configurationActuelle,

                /*
                    Je garde ton choix actuel :
                    screenshot désactivé pour éviter les erreurs de taille ou de capture.
                */
                screenshot_base64: null
            };

            console.log("URL PostgreSQL :", urlCaptures);
            console.log("Données envoyées :", donneesAEnregistrer);

            afficherStatus("Enregistrement dans PostgreSQL...");
            afficherEtatServeur("warning", "Envoi vers PostgreSQL...");
            afficherInfosServeur(
                "ENVOI EN COURS\n" +
                "--------------\n" +
                "Route : " + urlCaptures + "\n" +
                "Table : trading_capture\n" +
                "Nom capture : " + donneesAEnregistrer.nom_capture
            );

            const reponse = await fetch(urlCaptures, {
                method: "POST",
                mode: "cors",
                credentials: "omit",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                cache: "no-store",
                body: JSON.stringify(donneesAEnregistrer)
            });

            const texte = await reponse.text();

            console.log("Statut HTTP :", reponse.status);
            console.log("Réponse brute serveur :", texte);

            let resultat;

            try {
                resultat = JSON.parse(texte);
            } catch (erreurJson) {
                throw new Error("Réponse non JSON du serveur : " + texte);
            }

            if (!reponse.ok || resultat.ok !== true) {
                throw new Error(resultat.detail || resultat.message || "Erreur serveur inconnue.");
            }

            console.log("Réponse PostgreSQL :", resultat);

            if (!resultat || resultat.ok !== true || resultat.statut !== "ok") {
                throw new Error("Réponse serveur incorrecte : " + JSON.stringify(resultat));
            }

            localStorage.setItem(
                "configurationTradingViewIA",
                JSON.stringify(configurationActuelle)
            );

            afficherStatus("Configuration enregistrée dans PostgreSQL.");
            afficherEtatServeur("ok", "Enregistrement réussi");
            afficherInfosServeur(
                "ENREGISTREMENT RÉUSSI\n" +
                "----------------------\n" +
                JSON.stringify(resultat, null, 4)
            );

            await chargerListeCapturesPostgres(false);

            if (afficherAlerte) {
                alert(
                    "Configuration enregistrée dans la base de données.\n\n" +
                    "Nom de la capture : " + donneesAEnregistrer.nom_capture
                );
            }

        } catch (erreur) {
            console.error("Erreur complète d'enregistrement PostgreSQL :", erreur);

            afficherStatus("Erreur lors de l'enregistrement.");
            afficherEtatServeur("error", "Erreur base de données");
            afficherInfosServeur(
                "ERREUR D'ENREGISTREMENT\n" +
                "-----------------------\n" +
                erreur.message
            );

            alert("Impossible d'enregistrer dans la base de données : " + erreur.message);
        }
    }

    async function chargerListeCapturesPostgres(afficherAlerte = true) {
        /*
            On garde l'ancienne URL fixe qui fonctionnait hier.
        */
        const urlCaptures = "https://trading-g8ie.onrender.com/api/captures";

        const select = document.getElementById("liste-captures-postgres");
        if (!select) return;

        afficherStatus("Chargement de la liste PostgreSQL...");
        afficherEtatServeur("warning", "Lecture /api/captures...");

        try {
            console.log("URL utilisée pour charger la liste :", urlCaptures);

            const resultat = await appelerJson(urlCaptures, { method: "GET", cache: "no-store" });

            select.innerHTML = '<option value="">Choisir une configuration</option>';

            if (!resultat.captures || resultat.captures.length === 0) {
                select.innerHTML = '<option value="">Aucune configuration enregistrée</option>';
            } else {
                resultat.captures.forEach(function(capture) {
                    const option = document.createElement("option");

                    /*
                        Important :
                        La valeur reste l'id, car la route de chargement est /api/captures/:id.
                    */
                    option.value = capture.id;

                    const dateCapture = capture.date_capture
                        ? new Date(capture.date_capture).toLocaleString("fr-CA")
                        : "date inconnue";

                    const nomCapture =
                        capture.nom_capture ||
                        capture.nom_fichier ||
                        (
                            (capture.actif || "actif") +
                            "-" +
                            (capture.indicateur || "indicateur") +
                            "-" +
                            dateCapture
                        );

                    /*
                        Affichage demandé :
                        on affiche le nom_capture dans la liste déroulante.
                    */
                    option.textContent =
                        capture.id +
                        " - " +
                        nomCapture +
                        " - " +
                        dateCapture;

                    select.appendChild(option);
                });
            }

            afficherStatus("Liste PostgreSQL chargée.");
            afficherEtatServeur("ok", "Captures chargées");
            afficherInfosServeur(
                "LISTE DES CAPTURES\n" +
                "------------------\n" +
                "Nombre : " + (resultat.captures ? resultat.captures.length : 0)
            );

            if (afficherAlerte) alert("Liste des captures chargée.");
        } catch (erreur) {
            afficherStatus("Impossible de charger la liste PostgreSQL.");
            afficherEtatServeur("error", "Erreur lecture /api/captures");
            afficherInfosServeur(
                "ERREUR LECTURE /api/captures\n" +
                "---------------------------\n" +
                erreur.message
            );

            if (afficherAlerte) alert("Impossible de charger la liste PostgreSQL.");
        }
    }

    async function chargerCapturePostgresSelectionnee() {
        const select = document.getElementById("liste-captures-postgres");
        if (!select || !select.value) {
            alert("Choisir une capture dans la liste.");
            return;
        }

        const urlCapture = getApiCapturesUrl() + "/" + encodeURIComponent(select.value);

        afficherStatus("Chargement de la capture PostgreSQL...");
        afficherEtatServeur("warning", "Lecture capture PostgreSQL...");

        try {
            const resultat = await appelerJson(urlCapture, { method: "GET", cache: "no-store" });
            const capture = resultat.capture;

            configurationActuelle = capture.configuration_json || null;

            if (!configurationActuelle) {
                throw new Error("La capture ne contient pas configuration_json.");
            }

            appliquerConfiguration(configurationActuelle);
            afficherConfiguration(configurationActuelle);
            afficherScreenshotPostgres(capture.screenshot_base64);
            localStorage.setItem("configurationTradingViewIA", JSON.stringify(configurationActuelle));

            afficherStatus("Capture PostgreSQL chargée.");
            afficherEtatServeur("ok", "Capture chargée");
            afficherInfosServeur(
                "CAPTURE CHARGÉE\n" +
                "---------------\n" +
                "ID : " + capture.id + "\n" +
                "Nom capture : " + (capture.nom_capture || capture.nom_fichier || "non renseigné") + "\n" +
                "Actif : " + capture.actif
            );

            alert("Capture PostgreSQL chargée.");
        } catch (erreur) {
            afficherStatus("Impossible de charger la capture PostgreSQL.");
            afficherEtatServeur("error", "Erreur capture PostgreSQL");
            afficherInfosServeur(
                "ERREUR CHARGEMENT CAPTURE\n" +
                "--------------------------\n" +
                erreur.message
            );

            alert("Impossible de charger la capture sélectionnée.");
        }
    }

    function afficherScreenshotPostgres(screenshotBase64) {
        const image = document.getElementById("image-capture-postgres");
        if (!image) return;

        if (screenshotBase64 && String(screenshotBase64).trim() !== "") {
            image.src = screenshotBase64;
            image.style.display = "block";
        } else {
            image.removeAttribute("src");
            image.style.display = "none";
        }
    }

    function appliquerConfiguration(configuration) {
        if (!configuration || !configuration.graphique) return;

        definirValeur("asset-selector", configuration.graphique.actif);
        definirValeur("interval-selector", configuration.graphique.intervalle);
        definirValeur("indicator-selector", configuration.graphique.indicateur);
        definirValeur("type-bougie", configuration.graphique.typeBougie);

        if (configuration.analyseIA) {
            definirValeur("categorie-analyse-btc", configuration.analyseIA.categorie);
            definirValeur("strategie-selector", configuration.analyseIA.strategie);
            actualiserDescriptionCategorie();
        }

        if (configuration.risque) {
            definirValeur("capital-input", configuration.risque.capitalInitial);
            definirValeur("risk-input", configuration.risque.risqueParPositionPourcent);
            definirValeur("stoploss-input", configuration.risque.stopLossPourcent);
            definirValeur("takeprofit-input", configuration.risque.takeProfitPourcent);
            definirValeur("levier-input", configuration.risque.levier);
            definirValeur("sens-selector", configuration.risque.sens);
        }

        if (configuration.snapshot) definirValeur("snapshot-url", configuration.snapshot.url);
        if (configuration.serveur && configuration.serveur.apiAnalyse) definirValeur("api-url", configuration.serveur.apiAnalyse);
        if (configuration.notes !== undefined) definirValeur("notes-analyse", configuration.notes);

        creerWidgetTradingView();
    }

    function definirValeur(id, valeur) {
        const element = document.getElementById(id);
        if (element && valeur !== undefined && valeur !== null) element.value = valeur;
    }

    function rechargerConfigurationTradingView() {
        const data = localStorage.getItem("configurationTradingViewIA");
        if (!data) {
            alert("Aucune configuration sauvegardée.");
            return;
        }

        try {
            configurationActuelle = JSON.parse(data);
            appliquerConfiguration(configurationActuelle);
            afficherConfiguration(configurationActuelle);
            afficherStatus("Configuration rechargée.");
            alert("Configuration rechargée.");
        } catch (erreur) {
            alert("Erreur : configuration sauvegardée invalide.");
        }
    }

    async function ouvrirPageDecision() {
        try {
            capturerConfigurationTradingView(false);

            afficherStatus("Préparation du snapshot avec les données de marché...");

            await enrichirConfigurationAvecDonneesMarche(false);

            localStorage.setItem(
                "configurationTradingViewIA",
                JSON.stringify(configurationActuelle)
            );

            window.open("decisions.html", "_blank");

        } catch (erreur) {
            console.error("Erreur ouverture decisions.html :", erreur);

            if (!configurationActuelle) {
                capturerConfigurationTradingView(false);
            }

            localStorage.setItem(
                "configurationTradingViewIA",
                JSON.stringify(configurationActuelle)
            );

            alert(
                "Les données de marché n'ont pas pu être ajoutées. " +
                "La page de décision va s'ouvrir avec les données disponibles."
            );

            window.open("decisions.html", "_blank");
        }
    }

    function importerJSONDepuisFichier(event) {
        const fichier = event.target.files[0];
        if (!fichier) return;

        const lecteur = new FileReader();
        lecteur.onload = function(e) {
            try {
                const configuration = JSON.parse(e.target.result);
                if (!configuration.graphique) throw new Error("Le fichier JSON ne contient pas de bloc graphique.");
                configurationActuelle = configuration;
                appliquerConfiguration(configurationActuelle);
                afficherConfiguration(configurationActuelle);
                localStorage.setItem("configurationTradingViewIA", JSON.stringify(configurationActuelle));
                afficherStatus("Configuration JSON importée.");
                alert("Configuration JSON importée avec succès.");
            } catch (erreur) {
                alert("Import impossible. Fichier JSON invalide.\n\n" + erreur.message);
            }

            event.target.value = "";
        };

        lecteur.readAsText(fichier);
    }

async function viderTableCaptures() {
    const confirmation = confirm(
        "Attention : cette action va supprimer toutes les captures enregistrées.\n\n" +
        "Voulez-vous vraiment vider la table trading_capture ?"
    );

    if (!confirmation) {
        return;
    }

    const motDePasse = await demanderMotDePasseAdmin();

    if (!motDePasse || motDePasse.trim() === "") {
        alert("Suppression annulée : mot de passe absent.");
        return;
    }

    try {
        const reponse = await fetch("https://trading-g8ie.onrender.com/api/vider-captures", {
            method: "POST",
            mode: "cors",
            credentials: "omit",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            cache: "no-store",
            body: JSON.stringify({
                motDePasse: motDePasse.trim()
            })
        });

        const texte = await reponse.text();
        const resultat = JSON.parse(texte);

        if (!reponse.ok || resultat.ok !== true) {
            throw new Error(resultat.message || "Erreur inconnue.");
        }

        alert("La table trading_capture a été vidée avec succès.");

        if (typeof chargerListeCapturesPostgres === "function") {
            chargerListeCapturesPostgres(false);
        }

    } catch (erreur) {
        alert("Impossible de vider la table trading_capture : " + erreur.message);
        console.error("Erreur vidage table :", erreur);
    }
}
    document.addEventListener("DOMContentLoaded", function () {
        const champApi = document.getElementById("api-url");
        if (champApi && !champApi.value.trim()) {
            champApi.value = API_BASE_URL_PAR_DEFAUT + "/api/analyse";
        }

        const selectCategorie = document.getElementById("categorie-analyse-btc");
        if (selectCategorie) {
            selectCategorie.addEventListener("change", function () {
                actualiserDescriptionCategorie();

                if (configurationActuelle) {
                    configurationActuelle.analyseIA.categorie = getCategorieAnalyseBTC();
                    configurationActuelle.analyseIA.categorieLibelle = getLibelleCategorieAnalyseBTC();
                    configurationActuelle.analyseIA.descriptionCategorie = getDescriptionCategorieAnalyseBTC();
                    afficherConfiguration(configurationActuelle);
                }
            });
        }

        actualiserDescriptionCategorie();
        creerWidgetTradingView();
        chargerListeCapturesPostgres(false);
    });
</script>
</body>
</html><!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Trading Station IA - Advanced</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--
        Version avancée :
        - Si la Charting Library / Advanced Charts de TradingView est disponible,
          le script lit directement le symbole et l'intervalle du graphique.
        - Avec le simple widget public tv.js, TradingView ne donne pas un accès fiable
          aux valeurs internes choisies dans le graphique. Dans ce cas, le code garde
          un repli vers les champs HTML masqués afin de ne pas casser l'enregistrement.
    -->
    <script src="https://s3.tradingview.com/tv.js"></script>

    <style>
        * { box-sizing: border-box; }

		body {
			margin: 0;
			font-family: Arial, sans-serif;
			background: #ffffff;
			color: #111827;
		}

        header {
            background: #0f172a;
            border-bottom: 2px solid #00d9ff;
            padding: 14px 20px;
        }

        .top-bar {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px;
        }

        .logo {
            font-size: 22px;
            font-weight: bold;
            color: #00d9ff;
            margin-right: 18px;
            line-height: 1.1;
        }

        .logo span { color: #facc15; }

        .auteur-logo {
            display: block;
            font-size: 12px;
            font-weight: normal;
            color: #cbd5e1;
            margin-top: 3px;
        }

        .control-group {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .parametres-graphiques-caches {
            display: none !important;
        }

        .source-parametres-graphique {
            display: inline-block;
            margin-left: 8px;
            padding: 6px 9px;
            border-radius: 7px;
            background: #713f12;
            color: #fde68a;
            font-size: 12px;
            font-weight: bold;
        }

        .source-parametres-graphique.ok {
            background: #064e3b;
            color: #86efac;
        }

        .source-parametres-graphique.erreur {
            background: #7f1d1d;
            color: #fecaca;
        }

        .capture-selector-top {
            display: flex;
            align-items: center;
            gap: 8px;
            flex: 0 1 560px;
            min-width: 360px;
            max-width: 620px;
        }

        .capture-selector-top label {
            white-space: nowrap;
        }

        #liste-captures-postgres {
            width: 100%;
            min-width: 260px;
            max-width: 430px;
        }

        .analysis-category-top {
            display: flex;
            align-items: center;
            gap: 6px;
            flex: 0 0 340px;
            min-width: 300px;
            max-width: 360px;
            margin-left: 8px;
        }

        .analysis-category-top label {
            white-space: nowrap;
        }

        .analysis-category-top select {
            width: 190px;
            min-width: 180px;
        }

        .category-description-top {
            display: none;
        }
            max-width: 190px;
        }

        .category-description-top {
            flex: 1 1 100%;
            margin-top: 0;
            display: none;
        }

        label {
            font-weight: bold;
            color: #00d9ff;
            font-size: 13px;
        }

        select, input, textarea {
            background: #020617;
            color: white;
            border: 1px solid #334155;
            border-radius: 6px;
            padding: 7px;
            font-size: 13px;
            max-width: 100%;
        }

        button {
            border: none;
            border-radius: 7px;
            padding: 8px 10px;
            font-weight: bold;
            cursor: pointer;
            font-size: 12px;
            white-space: nowrap;
        }

        button:hover { opacity: 0.85; }

        .btn-tv { background: #2962ff; color: white; }
        .btn-capture { background: #00d9ff; color: #00111a; }
        .btn-save { background: #22c55e; color: #03130a; }
        .btn-copy { background: #facc15; color: #1a1300; }
        .btn-export { background: #a855f7; color: white; }
        .btn-import { background: #14b8a6; color: #001a16; }
        .btn-api { background: #fb923c; color: #1a0b00; }
        .btn-db { background: #10b981; color: #00130d; }
        .btn-load { background: #6366f1; color: white; }
        .btn-ai { background: #38bdf8; color: #00111a; }
        .btn-market { background: #84cc16; color: #102000; }
        .btn-decision { background: #eab308; color: #1a1300; }
        .btn-clear { background: #ef4444; color: white; }
        .btn-dark { background: #334155; color: white; }

        .header-images {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-left: 8px;
        }

        .header-images img {
            width: 48px;
            height: 48px;
            object-fit: cover;
            border-radius: 6px;
            border: 1px solid #334155;
            background: #020617;
            padding: 1px;
        }

        main {
            display: grid;
            grid-template-columns: minmax(0, 2.3fr) minmax(320px, 0.7fr);
            gap: 14px;
            padding: 14px;
        }

        .chart-panel, .side-panel {
            background: #111827;
            border: 1px solid #263244;
            border-radius: 12px;
            padding: 14px;
        }

        .chart-panel { min-width: 0; }
        .side-panel { min-width: 320px; overflow: hidden; }

        .chart-title-row {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 14px;
            margin-bottom: 10px;
            width: 100%;
            flex-wrap: nowrap;
            overflow-x: auto;
        }

        .chart-title-row h2 {
            margin: 0;
            padding-bottom: 0;
            border-bottom: none;
            line-height: 1.1;
            flex: 0 0 auto;
        }

        .chart-title-icons {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 8px;
            flex-shrink: 0;
            margin-left: auto;
        }

        .chart-title-icons img {
            width: 36px;
            height: 36px;
            object-fit: cover;
            border-radius: 6px;
            border: 1px solid #334155;
            background: #020617;
            padding: 1px;
        }

        .chart-inline-controls {
            display: flex;
            align-items: center;
            gap: 12px;
            margin: 0;
            flex-wrap: nowrap;
            flex: 0 0 auto;
        }

        .chart-inline-controls .form-block {
            display: flex;
            align-items: center;
            gap: 6px;
            flex: 0 0 auto;
            margin-bottom: 0;
        }

        .chart-inline-controls .form-block label {
            margin-bottom: 0;
            white-space: nowrap;
            color: #ffffff;
        }

        .chart-inline-controls .form-block select {
            width: 175px;
        }

        .chart-inline-controls .form-block input {
            width: 105px;
        }

        #tradingview_chart {
            height: 700px;
            width: 100%;
            border-radius: 10px;
            overflow: hidden;
            background: #020617;
        }

        h2 {
            color: #00d9ff;
            font-size: 18px;
            margin-top: 0;
            border-bottom: 1px solid #263244;
            padding-bottom: 8px;
        }

        h3 {
            color: #facc15;
            font-size: 15px;
            margin-bottom: 8px;
        }

        .form-block {
            margin-bottom: 12px;
            min-width: 0;
        }

        .form-block label {
            display: block;
            margin-bottom: 5px;
        }

        .form-block input, .form-block select, .form-block textarea { width: 100%; }

        pre {
            background: #020617;
            color: #a7f3d0;
            padding: 12px;
            border-radius: 10px;
            border: 1px solid #263244;
            min-height: 260px;
            max-height: 420px;
            overflow: auto;
            font-size: 12px;
            white-space: pre-wrap;
            word-break: break-word;
        }

        .button-zone {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 12px 0;
        }

        .button-zone button { flex: 1 1 120px; }

        .status {
            background: #020617;
            border: 1px solid #263244;
            border-radius: 8px;
            padding: 10px;
            color: #facc15;
            font-size: 13px;
            margin-top: 10px;
        }

        .server-status {
            padding: 12px;
            border-radius: 8px;
            font-weight: bold;
            margin-bottom: 12px;
            text-align: center;
            font-size: 13px;
        }

        .server-status.neutral { background: #334155; color: #ffffff; }
        .server-status.ok { background: #064e3b; color: #86efac; }
        .server-status.error { background: #7f1d1d; color: #fecaca; }
        .server-status.warning { background: #713f12; color: #fde68a; }

        .server-info {
            background: #020617;
            border: 1px solid #334155;
            border-radius: 8px;
            padding: 10px;
            font-family: Consolas, monospace;
            font-size: 12px;
            color: #d1d5db;
            white-space: pre-wrap;
            word-break: break-word;
            min-height: 90px;
            max-height: 220px;
            overflow: auto;
        }

        .analysis-category-box, .ai-section, .risk-box {
            margin-top: 14px;
            background: #0b1220;
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 14px;
        }

        .side-panel > section:first-child { margin-top: 0; }

        .risk-box h3 {
            margin-top: 0;
            margin-bottom: 12px;
        }

        .analysis-category-box select { width: 100%; }

        .category-description, .note {
            margin-top: 10px;
            padding: 10px;
            background: #020617;
            border: 1px solid #334155;
            border-radius: 8px;
            color: #d1d5db;
            font-size: 12px;
            line-height: 1.5;
        }

        .ai-result-box {
            background: #020617;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 14px;
            min-height: 220px;
            max-height: 520px;
            overflow: auto;
            white-space: pre-wrap;
            word-break: break-word;
            font-family: Consolas, monospace;
            font-size: 13px;
            color: #d1d5db;
        }

        .screenshot-preview {
            margin-top: 12px;
            background: #020617;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 10px;
        }

        .screenshot-preview img {
            width: 100%;
            max-height: 360px;
            object-fit: contain;
            border-radius: 8px;
            background: #000;
            display: none;
        }

        footer {
            text-align: center;
            color: #94a3b8;
            font-size: 12px;
            padding: 16px;
            border-top: 1px solid #263244;
        }


        .modal-password-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.72);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 16px;
        }

        .modal-password-box {
            width: 100%;
            max-width: 420px;
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 18px;
            color: #ffffff;
            box-shadow: 0 18px 45px rgba(0, 0, 0, 0.45);
        }

        .modal-password-box h3 {
            margin-top: 0;
            color: #facc15;
        }

        .modal-password-box p {
            font-size: 13px;
            line-height: 1.5;
            color: #cbd5e1;
        }

        .modal-password-box input {
            width: 100%;
            margin-top: 8px;
            margin-bottom: 14px;
        }

        .modal-password-actions {
            display: flex;
            gap: 8px;
            justify-content: flex-end;
            flex-wrap: wrap;
        }

        .modal-password-actions button {
            min-width: 110px;
        }

        @media (max-width: 1200px) {
            main { grid-template-columns: minmax(0, 2fr) minmax(320px, 0.8fr); }
            #tradingview_chart { height: 650px; }
        }

        @media (max-width: 1000px) {
            main { grid-template-columns: 1fr; }
            .side-panel { min-width: 0; }
            #tradingview_chart { height: 520px; }
        }

        @media (max-width: 700px) {
            header { padding: 12px; }
            .top-bar { flex-direction: column; align-items: stretch; }
            .control-group { flex-direction: column; align-items: stretch; }

            .capture-selector-top {
                flex-direction: column;
                align-items: stretch;
                min-width: 0;
                max-width: none;
                width: 100%;
            }

            .analysis-category-top {
                flex-direction: column;
                align-items: stretch;
                min-width: 0;
                max-width: none;
                width: 100%;
                margin-left: 0;
            }

            .analysis-category-top select {
                min-width: 0;
                width: 100%;
            }

            #liste-captures-postgres {
                min-width: 0;
                max-width: none;
                width: 100%;
            }

            button { width: 100%; }
            .button-zone button { flex: 1 1 100%; }
            .logo { text-align: center; margin-right: 0; }
            .header-images { justify-content: center; margin-left: 0; }
            .header-images img { width: 43px; height: 43px; }
            .chart-title-row { justify-content: flex-start; flex-wrap: nowrap; }
            .chart-inline-controls { flex: 0 0 auto; flex-wrap: nowrap; }
            .chart-inline-controls .form-block { flex: 0 0 auto; }
            .chart-title-icons img { width: 30px; height: 30px; }
            #tradingview_chart { height: 460px; }
        }
    </style>
</head>

<body>
<header>
    <div class="top-bar">
        <div class="logo">
            TRADING STATION <span>IA</span>
            <small class="auteur-logo">Auteur : Hocine Korichi, Ing.</small>
        </div>

        <div class="control-group parametres-graphiques-caches">
            <label for="asset-selector">ACTIF :</label>
            <select id="asset-selector" onchange="actualiserGraphique()">
                <option value="BINANCE:BTCUSDT">Bitcoin / USDT</option>
                <option value="COINBASE:BTCUSD">Bitcoin / USD</option>
                <option value="BINANCE:ETHUSDT">Ethereum / USDT</option>
                <option value="OANDA:XAUUSD">Or / Dollar - XAUUSD</option>
                <option value="NASDAQ:AAPL">Apple - AAPL</option>
                <option value="NASDAQ:TSLA">Tesla - TSLA</option>
                <option value="NASDAQ:NVDA">Nvidia - NVDA</option>
                <option value="NASDAQ:MSFT">Microsoft - MSFT</option>
                <option value="NASDAQ:AMZN">Amazon - AMZN</option>
                <option value="NASDAQ:GOOGL">Google - GOOGL</option>
                <option value="SP:SPX">S&amp;P 500</option>
                <option value="TVC:DXY">Dollar Index - DXY</option>
            </select>
        </div>

        <div class="control-group parametres-graphiques-caches">
            <label for="interval-selector">INTERVALLE :</label>
            <select id="interval-selector" onchange="actualiserGraphique()">
                <option value="1">1 minute</option>
                <option value="5">5 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 heure</option>
                <option value="240">4 heures</option>
                <option value="D" selected>1 jour</option>
                <option value="W">1 semaine</option>
                <option value="M">1 mois</option>
            </select>
        </div>

        <div class="control-group parametres-graphiques-caches">
            <label for="indicator-selector">INDICATEUR :</label>
            <select id="indicator-selector" onchange="actualiserGraphique()">
                <option value="RSI">RSI</option>
                <option value="MACD">MACD</option>
                <option value="EMA">EMA</option>
                <option value="SUPERTREND">Supertrend</option>
                <option value="BOLLINGER">Bandes de Bollinger</option>
                <option value="ATR">ATR</option>
                <option value="VOLUME">Volume</option>
                <option value="LIQUIDITY_ZONE">Zones de liquidité</option>
            </select>
        </div>

        <button class="btn-clear" onclick="viderTableTradingCapture()">Vider la table</button>
        <button class="btn-capture" onclick="capturerEtEnregistrerConfiguration()">Capturer et enregistrer</button>
        <!--<button class="btn-market" onclick="enrichirConfigurationAvecDonneesMarche()">Ajouter marché</button>-->
        <button class="btn-db" style="display:none;" onclick="enregistrerCapturePostgres()">Enregistrer la configuration</button>
        <!-- <button class="btn-save" onclick="rechargerConfigurationTradingView()">Recharger</button> -->
        <button class="btn-decision" onclick="ouvrirPageDecision()">Analyser le snapshot</button>

        <div class="capture-selector-top">
            <label for="liste-captures-postgres">Choisir une confihuration :</label>
            <select id="liste-captures-postgres" onchange="chargerCapturePostgresSelectionnee()">
                <option value="">Aucune configuration chargée</option>
            </select>
        </div>

        <div class="analysis-category-top">
            <label for="categorie-analyse-btc">Type d'analyse :</label>
            <select id="categorie-analyse-btc">
                <option value="macroeconomie">Macroéconomie</option>
                <option value="monnaie_bitcoin">Monnaie Bitcoin</option>
                <option value="donnees_on_chain">Données on-chain</option>
                <option value="minage">Minage</option>
                <option value="analyse_technique" selected>Analyse technique</option>
                <option value="derives">Dérivés</option>
                <option value="liquidite_marche">Liquidité de marché</option>
                <option value="institutionnel">Institutionnel</option>
                <option value="sentiment">Sentiment</option>
                <option value="reglementation_risques">Réglementation et risques</option>
            </select>
            <div id="description-categorie-analyse" class="category-description category-description-top">
                Analyse technique : graphiques, tendances, supports, résistances, RSI et moyennes mobiles.
            </div>
        </div>

<!--
        <div class="header-images">
            <img src="img/bitcoin.jfif" alt="Bitcoin">
            <img src="img/lingot-or.jfif" alt="Lingot d'or">
        </div>
-->
    </div>
</header>

<main>
    <section class="chart-panel">
        <div class="chart-title-row">
            <h2>Graphique TradingView intégré</h2>
            <span id="source-parametres-graphique" class="source-parametres-graphique">Lecture directe non confirmée</span>
            <div class="chart-inline-controls">
                <div class="form-block">
                    <label for="type-bougie">Type de graphique</label>
                    <select id="type-bougie" onchange="actualiserGraphique()">
                        <option value="bougies_japonaises" selected>Bougies japonaises</option>
                        <option value="barres">Barres</option>
                        <option value="ligne">Ligne</option>
                        <option value="heikin_ashi">Heikin Ashi</option>
                    </select>
                </div>
                <div class="form-block">
                    <label for="capital-input">Capital initial</label>
                    <input id="capital-input" type="number" value="1000" min="0" step="100">
                </div>
            </div>
            <div class="chart-title-icons">
                <img src="img/bitcoin.jfif" alt="Symbole du Bitcoin">
                <img src="img/lingot-or.jfif" alt="Lingot d'or">
            </div>
        </div>

        <div id="tradingview_chart"></div>
        <input type="file" id="fichier-import-json" accept="application/json,.json" style="display:none;" onchange="importerJSONDepuisFichier(event)">

    </section>

    <aside class="side-panel">
        <section class="risk-box">
            <h3>Paramètres de risque</h3>
            <div class="form-block">
                <label for="risk-input">Risque par position en pourcentage</label>
                <input id="risk-input" type="number" value="1" min="0" step="0.1">
            </div>
            <div class="form-block">
                <label for="stoploss-input">Stop loss en pourcentage</label>
                <input id="stoploss-input" type="number" value="2" min="0" step="0.1">
            </div>
            <div class="form-block">
                <label for="takeprofit-input">Take profit en pourcentage</label>
                <input id="takeprofit-input" type="number" value="4" min="0" step="0.1">
            </div>
            <div class="form-block">
                <label for="levier-input">Levier</label>
                <input id="levier-input" type="number" value="1" min="1" step="1">
            </div>
            <div class="form-block">
                <label for="sens-selector">Sens</label>
                <select id="sens-selector">
                    <option value="achat_vente" selected>Achat ou vente</option>
                    <option value="achat">Achat seulement</option>
                    <option value="vente">Vente seulement</option>
                </select>
            </div>
            <div class="form-block">
                <label for="strategie-selector">Stratégie</label>
                <select id="strategie-selector">
                    <option value="suivi_tendance" selected>Suivi de tendance</option>
                    <option value="retournement">Retournement</option>
                    <option value="cassure">Cassure</option>
                    <option value="range">Range</option>
                </select>
            </div>
            <div class="form-block">
                <label for="snapshot-url">URL éventuelle du snapshot</label>
                <input id="snapshot-url" type="text" placeholder="Lien optionnel vers une image ou un snapshot">
            </div>

        </section>

        <h3>Configuration capturée</h3>
        <pre id="resultat-configuration">Aucune configuration capturée.</pre>

        <div id="status" class="status">En attente de capture.</div>
    </aside>
</main>


<div id="modal-password-overlay" class="modal-password-overlay">
    <div class="modal-password-box">
        <h3>Mot de passe administrateur</h3>
        <p>Entrer le mot de passe pour vider la table <strong>trading_capture</strong>.</p>
        <input id="admin-delete-password-input" type="password" autocomplete="current-password" placeholder="Mot de passe">
        <div class="modal-password-actions">
            <button class="btn-dark" type="button" onclick="fermerFenetreMotDePasse(false)">Annuler</button>
            <button class="btn-clear" type="button" onclick="fermerFenetreMotDePasse(true)">Confirmer</button>
        </div>
    </div>
</div>

<footer>
    Trading Station IA — page HTML sur GitHub Pages, API Node.js sur Render.
</footer>

<script>
    let widgetTradingView = null;
    let configurationActuelle = null;
    let lectureDirecteGraphiqueDisponible = false;
    let derniersParametresGraphiqueDirect = null;
    let ecouteursGraphiqueInstalles = false;

    const API_BASE_URL_PAR_DEFAUT = "https://trading-g8ie.onrender.com";

    let resolveMotDePasseAdmin = null;

    function demanderMotDePasseAdmin() {
        return new Promise(function(resolve) {
            const overlay = document.getElementById("modal-password-overlay");
            const champ = document.getElementById("admin-delete-password-input");

            resolveMotDePasseAdmin = resolve;

            if (!overlay || !champ) {
                resolve("");
                return;
            }

            champ.value = "";
            overlay.style.display = "flex";

            setTimeout(function() {
                champ.focus();
            }, 50);
        });
    }

    function fermerFenetreMotDePasse(valider) {
        const overlay = document.getElementById("modal-password-overlay");
        const champ = document.getElementById("admin-delete-password-input");

        const valeur = valider && champ ? champ.value : "";

        if (overlay) {
            overlay.style.display = "none";
        }

        if (typeof resolveMotDePasseAdmin === "function") {
            resolveMotDePasseAdmin(valeur);
            resolveMotDePasseAdmin = null;
        }
    }

    document.addEventListener("keydown", function(event) {
        const overlay = document.getElementById("modal-password-overlay");
        const champ = document.getElementById("admin-delete-password-input");

        if (!overlay || overlay.style.display !== "flex") {
            return;
        }

        if (event.key === "Escape") {
            fermerFenetreMotDePasse(false);
        }

        if (event.key === "Enter" && document.activeElement === champ) {
            fermerFenetreMotDePasse(true);
        }
    });


    function valeurElement(id, valeurDefaut = "") {
        const element = document.getElementById(id);
        return element ? element.value : valeurDefaut;
    }

    function libelleElement(id, valeurDefaut = "") {
        const element = document.getElementById(id);
        if (!element || element.selectedIndex < 0) return valeurDefaut;
        return element.options[element.selectedIndex].text;
    }

    function nombreElement(id, valeurDefaut = 0) {
        const element = document.getElementById(id);
        if (!element) return valeurDefaut;
        const valeur = Number(element.value);
        return Number.isFinite(valeur) ? valeur : valeurDefaut;
    }

    function nettoyerUrl(url) {
        return String(url || "").trim().replace(/\/+$/, "");
    }

    function getApiBaseUrl() {
        const champApi = document.getElementById("api-url");
        let valeurChamp = champApi ? nettoyerUrl(champApi.value) : "";

        if (!valeurChamp) return API_BASE_URL_PAR_DEFAUT;

        valeurChamp = valeurChamp
            .replace("https://https://", "https://")
            .replace("http://http://", "http://")
            .replace(/\/analyse\/?$/, "/api/analyse");

        valeurChamp = valeurChamp
            .replace(/\/api\/analyse\/?$/, "")
            .replace(/\/api\/test\/?$/, "")
            .replace(/\/api\/marche\/?$/, "")
            .replace(/\/api\/captures\/?$/, "")
            .replace(/\/api\/vider-captures\/?$/, "")
            .replace(/\/api\/creer-table\/?$/, "")
            .replace(/\/api\/verifier-table\/?$/, "");

        if (!valeurChamp.startsWith("http://") && !valeurChamp.startsWith("https://")) {
            return API_BASE_URL_PAR_DEFAUT;
        }

        return nettoyerUrl(valeurChamp);
    }

    function getApiAnalyseUrl() { return getApiBaseUrl() + "/api/analyse"; }
    function getApiTestUrl() { return getApiBaseUrl() + "/api/test"; }
    function getApiMarcheUrl() { return getApiBaseUrl() + "/api/marche"; }

    /*
        IMPORTANT :
        Cette route reste volontairement fixe.
        Ne pas remplacer par getApiBaseUrl(), car l'enregistrement fonctionnait ainsi.
    */
    function getApiCapturesUrl() { return API_BASE_URL_PAR_DEFAUT + "/api/captures"; }

    function getApiViderCapturesUrl() { return API_BASE_URL_PAR_DEFAUT + "/api/vider-captures"; }

    function getApiCreerTableUrl() { return getApiBaseUrl() + "/api/creer-table"; }
    function getApiVerifierTableUrl() { return getApiBaseUrl() + "/api/verifier-table"; }

    function afficherEtatServeur(type, message) {
        const etat = document.getElementById("etatServeur");
        if (!etat) return;
        etat.className = "server-status " + type;
        etat.textContent = message;
    }

    function afficherInfosServeur(texte) {
        const zone = document.getElementById("infosServeur");
        if (!zone) return;
        zone.textContent = texte;
    }

    function afficherStatus(message) {
        document.getElementById("status").textContent = message;
    }

    function afficherAnalyseIA(texte) {
        document.getElementById("resultat-analyse-ia").textContent = texte;
    }

    function afficherConfiguration(configuration) {
        document.getElementById("resultat-configuration").textContent = JSON.stringify(configuration, null, 4);
    }

    function getCategorieAnalyseBTC() {
        return valeurElement("categorie-analyse-btc", "analyse_technique");
    }

    function getLibelleCategorieAnalyseBTC() {
        return libelleElement("categorie-analyse-btc", "Analyse technique");
    }

    function getDescriptionCategorieAnalyseBTC() {
        const descriptions = {
            macroeconomie: "Macroéconomie : taux, inflation, liquidité mondiale, dollar, obligations et bilan de la Fed.",
            monnaie_bitcoin: "Monnaie Bitcoin : offre maximale, émission, halving et inflation de BTC.",
            donnees_on_chain: "Données on-chain : adresses, transactions, MVRV, realized price et flux des plateformes.",
            minage: "Minage : taux de hachage, difficulté, revenus et ventes des mineurs.",
            analyse_technique: "Analyse technique : graphiques, tendances, supports, résistances, RSI et moyennes mobiles.",
            derives: "Dérivés : contrats à terme, options, funding rates, open interest et liquidations.",
            liquidite_marche: "Liquidité de marché : volumes, carnets d'ordres, spreads et profondeur de marché.",
            institutionnel: "Institutionnel : FNB Bitcoin, achats d'entreprises, fonds, banques et adoption officielle.",
            sentiment: "Sentiment : réseaux sociaux, Google Trends, médias, peur et avidité.",
            reglementation_risques: "Réglementation et risques : lois, fiscalité, plateformes, garde et géopolitique."
        };
        return descriptions[getCategorieAnalyseBTC()] || descriptions.analyse_technique;
    }

    function actualiserDescriptionCategorie() {
        const zone = document.getElementById("description-categorie-analyse");
        if (zone) zone.textContent = getDescriptionCategorieAnalyseBTC();
    }

    function obtenirStyleTradingView() {
        const typeBougie = valeurElement("type-bougie", "bougies_japonaises");
        switch (typeBougie) {
            case "barres": return "0";
            case "bougies_japonaises": return "1";
            case "ligne": return "3";
            case "heikin_ashi": return "8";
            default: return "1";
        }
    }

    function choisirEtudeTradingView() {
        const indicateur = valeurElement("indicator-selector", "RSI");
        if (indicateur === "RSI") return ["RSI@tv-basicstudies"];
        if (indicateur === "MACD") return ["MACD@tv-basicstudies"];
        if (indicateur === "EMA") return ["MASimple@tv-basicstudies"];
        if (indicateur === "BOLLINGER") return ["BB@tv-basicstudies"];
        if (indicateur === "VOLUME") return ["Volume@tv-basicstudies"];
        return [];
    }

    function mettreAJourBadgeLectureGraphique(type, message) {
        const badge = document.getElementById("source-parametres-graphique");
        if (!badge) return;
        badge.className = "source-parametres-graphique" + (type ? " " + type : "");
        badge.textContent = message;
    }

    function normaliserResultatSymbolInterval(resultat) {
        if (!resultat) return null;

        const symbole =
            resultat.symbol ||
            resultat.ticker ||
            resultat.pro_name ||
            resultat.full_name ||
            null;

        const intervalle =
            resultat.interval ||
            resultat.resolution ||
            resultat.timeframe ||
            null;

        if (!symbole && !intervalle) return null;

        return {
            actif: symbole || valeurElement("asset-selector", "BINANCE:BTCUSDT"),
            actifLibelle: symbole || libelleElement("asset-selector", "Bitcoin / USDT"),
            intervalle: intervalle || valeurElement("interval-selector", "D"),
            intervalleLibelle: intervalle || libelleElement("interval-selector", "1 jour"),
            indicateur: valeurElement("indicator-selector", "RSI"),
            indicateurLibelle: libelleElement("indicator-selector", "RSI"),
            source: "graphique_tradingview_api",
            lectureDirecte: true
        };
    }

    function lireParametresDepuisGraphiqueTradingView() {
        try {
            if (!widgetTradingView) return null;

            /*
                Advanced Charts / Charting Library :
                La méthode symbolInterval() permet de lire le symbole et l'intervalle
                du graphique actif lorsque cette API est réellement disponible.
            */
            if (typeof widgetTradingView.symbolInterval === "function") {
                const resultatWidget = normaliserResultatSymbolInterval(widgetTradingView.symbolInterval());
                if (resultatWidget) return resultatWidget;
            }

            if (typeof widgetTradingView.activeChart === "function") {
                const chart = widgetTradingView.activeChart();

                if (chart && typeof chart.symbolInterval === "function") {
                    const resultatChart = normaliserResultatSymbolInterval(chart.symbolInterval());
                    if (resultatChart) return resultatChart;
                }

                const symbole = chart && typeof chart.symbol === "function" ? chart.symbol() : null;
                const intervalle = chart && typeof chart.resolution === "function" ? chart.resolution() : null;

                if (symbole || intervalle) {
                    return {
                        actif: symbole || valeurElement("asset-selector", "BINANCE:BTCUSDT"),
                        actifLibelle: symbole || libelleElement("asset-selector", "Bitcoin / USDT"),
                        intervalle: intervalle || valeurElement("interval-selector", "D"),
                        intervalleLibelle: intervalle || libelleElement("interval-selector", "1 jour"),
                        indicateur: valeurElement("indicator-selector", "RSI"),
                        indicateurLibelle: libelleElement("indicator-selector", "RSI"),
                        source: "graphique_tradingview_api",
                        lectureDirecte: true
                    };
                }
            }
        } catch (erreur) {
            console.warn("Lecture directe du graphique impossible :", erreur);
        }

        return derniersParametresGraphiqueDirect;
    }

    function synchroniserChampsMasquesAvecGraphique(parametres) {
        if (!parametres) return;

        if (parametres.actif) definirValeur("asset-selector", parametres.actif);
        if (parametres.intervalle) definirValeur("interval-selector", parametres.intervalle);

        /*
            Les indicateurs ajoutés manuellement dans le graphique ne sont pas tous lisibles
            avec le widget public. On conserve donc l'indicateur HTML masqué comme repli.
        */
        if (parametres.indicateur) definirValeur("indicator-selector", parametres.indicateur);
    }

    function installerLectureDirecteGraphique() {
        if (!widgetTradingView) return;

        const initialiser = function () {
            const parametres = lireParametresDepuisGraphiqueTradingView();

            if (parametres && parametres.lectureDirecte === true) {
                lectureDirecteGraphiqueDisponible = true;
                derniersParametresGraphiqueDirect = parametres;
                synchroniserChampsMasquesAvecGraphique(parametres);
                mettreAJourBadgeLectureGraphique("ok", "Lecture directe du graphique active");
            } else {
                lectureDirecteGraphiqueDisponible = false;
                mettreAJourBadgeLectureGraphique("erreur", "Widget simple : repli sur champs masqués");
            }

            if (ecouteursGraphiqueInstalles) return;

            try {
                if (typeof widgetTradingView.activeChart === "function") {
                    const chart = widgetTradingView.activeChart();

                    if (chart && chart.onIntervalChanged && typeof chart.onIntervalChanged === "function") {
                        chart.onIntervalChanged().subscribe(null, function () {
                            const nouveauxParametres = lireParametresDepuisGraphiqueTradingView();
                            if (nouveauxParametres) {
                                derniersParametresGraphiqueDirect = nouveauxParametres;
                                synchroniserChampsMasquesAvecGraphique(nouveauxParametres);
                            }
                        });
                    }

                    if (chart && chart.onSymbolChanged && typeof chart.onSymbolChanged === "function") {
                        chart.onSymbolChanged().subscribe(null, function () {
                            const nouveauxParametres = lireParametresDepuisGraphiqueTradingView();
                            if (nouveauxParametres) {
                                derniersParametresGraphiqueDirect = nouveauxParametres;
                                synchroniserChampsMasquesAvecGraphique(nouveauxParametres);
                            }
                        });
                    }
                }

                ecouteursGraphiqueInstalles = true;
            } catch (erreur) {
                console.warn("Écoute directe du graphique non disponible :", erreur);
            }
        };

        if (typeof widgetTradingView.onChartReady === "function") {
            widgetTradingView.onChartReady(initialiser);
        } else {
            setTimeout(initialiser, 800);
        }
    }

    function creerWidgetTradingView(tentative = 0) {
        const conteneur = document.getElementById("tradingview_chart");
        if (!conteneur) return;

        if (typeof TradingView === "undefined" || !TradingView.widget) {
            conteneur.innerHTML = "<div style='padding:16px;color:#facc15;'>Chargement de TradingView...</div>";
            if (tentative < 20) {
                setTimeout(function () { creerWidgetTradingView(tentative + 1); }, 500);
            } else {
                conteneur.innerHTML = "<div style='padding:16px;color:#fecaca;'>Impossible de charger TradingView.</div>";
            }
            return;
        }

        const symbole = valeurElement("asset-selector", "BINANCE:BTCUSDT");
        const intervalle = valeurElement("interval-selector", "D");
        conteneur.innerHTML = "";

        try {
            widgetTradingView = new TradingView.widget({
                autosize: true,
                symbol: symbole,
                interval: intervalle,
                timezone: "America/Toronto",
                theme: "dark",
                style: obtenirStyleTradingView(),
                locale: "fr",
                toolbar_bg: "#0f172a",
                enable_publishing: false,
                allow_symbol_change: true,
                container_id: "tradingview_chart",
                hide_side_toolbar: false,
                details: true,
                hotlist: true,
                calendar: false,
                studies: choisirEtudeTradingView()
            });

            ecouteursGraphiqueInstalles = false;
            installerLectureDirecteGraphique();
        } catch (erreur) {
            conteneur.innerHTML = "<div style='padding:16px;color:#fecaca;'>Erreur lors du chargement du graphique TradingView.</div>";
            afficherStatus("Erreur TradingView : " + erreur.message);
        }
    }

    function actualiserGraphique() {
        creerWidgetTradingView();
        afficherStatus("Graphique actualisé.");
    }

    function ouvrirTradingView() {
        const symbole = valeurElement("asset-selector", "BINANCE:BTCUSDT");
        const intervalle = valeurElement("interval-selector", "D");
        const url = "https://www.tradingview.com/chart/?symbol=" + encodeURIComponent(symbole) + "&interval=" + encodeURIComponent(intervalle);
        window.open(url, "_blank");
    }


    async function viderTableTradingCapture() {
        const confirmation = confirm("Êtes-vous sûr de vouloir vider toute la table trading_capture ?\n\nCette action supprimera toutes les configurations enregistrées.");

        if (!confirmation) {
            afficherStatus("Suppression annulée.");
            return;
        }

        const motDePasse = await demanderMotDePasseAdmin();

        if (!motDePasse || motDePasse.trim() === "") {
            afficherStatus("Suppression annulée : mot de passe absent.");
            alert("Suppression annulée : mot de passe absent.");
            return;
        }

        const url = getApiViderCapturesUrl();

        afficherStatus("Vidage de la table trading_capture en cours...");
        afficherEtatServeur("warning", "Suppression des captures...");
        afficherInfosServeur(
            "VIDAGE DE LA TABLE\n" +
            "------------------\n" +
            "Table : trading_capture\n" +
            "Route appelée : " + url
        );

        try {
            const resultat = await appelerJson(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-store",
                body: JSON.stringify({
                    motDePasse: motDePasse.trim()
                })
            });

            afficherStatus("Table trading_capture vidée.");
            afficherEtatServeur("ok", "Table vidée");
            afficherInfosServeur(
                "VIDAGE RÉUSSI\n" +
                "-------------\n" +
                JSON.stringify(resultat, null, 4)
            );

            const select = document.getElementById("liste-captures-postgres");
            if (select) {
                select.innerHTML = '<option value="">Aucune configuration enregistrée</option>';
            }

            configurationActuelle = null;
            afficherConfiguration({ message: "La table trading_capture a été vidée." });
            alert("La table trading_capture a été vidée.");

        } catch (erreur) {
            console.error("Erreur pendant le vidage de la table trading_capture :", erreur);

            afficherStatus("Impossible de vider la table trading_capture.");
            afficherEtatServeur("error", "Erreur vidage table");
            afficherInfosServeur(
                "ERREUR VIDAGE TABLE\n" +
                "-------------------\n" +
                "Route appelée : " + url + "\n\n" +
                "Détail : " + erreur.message
            );

            alert("Impossible de vider la table trading_capture.\n\nDétail : " + erreur.message);
        }
    }

    function ouvrirServeurRender() {
        window.open(getApiBaseUrl(), "_blank");
    }

    async function appelerJson(url, options = {}) {
        try {
            const urlFinale = String(url || "").replace("https://https://", "https://");

            console.log("APPEL JSON - URL :", urlFinale);
            console.log("APPEL JSON - OPTIONS :", options);

            const reponse = await fetch(urlFinale, {
                ...options,
                mode: "cors",
                credentials: "omit",
                cache: "no-store",
                headers: {
                    "Accept": "application/json",
                    ...(options.headers || {})
                }
            });

            const texte = await reponse.text();

            console.log("STATUT HTTP :", reponse.status);
            console.log("RÉPONSE BRUTE :", texte);

            let json;

            try {
                json = JSON.parse(texte);
            } catch (erreurJson) {
                throw new Error("Le serveur n'a pas retourné du JSON. Réponse reçue : " + texte);
            }

            if (!reponse.ok) {
                throw new Error(json.detail || json.message || "Réponse HTTP " + reponse.status);
            }

            return json;

        } catch (erreur) {
            console.error("ERREUR DANS appelerJson :", erreur);
            throw erreur;
        }
    }

    async function testerServeur() {
        const urlTest = getApiTestUrl();
        const debut = performance.now();
        afficherEtatServeur("warning", "Test du serveur en cours...");
        afficherInfosServeur("Test de la route :\n" + urlTest);

        try {
            const resultat = await appelerJson(urlTest, { method: "GET", cache: "no-store" });
            const duree = Math.round(performance.now() - debut);
            afficherEtatServeur("ok", "Serveur connecté");
            afficherInfosServeur("TEST RÉUSSI\n-----------\nRoute : " + urlTest + "\nTemps : " + duree + " ms\n\n" + JSON.stringify(resultat, null, 4));
        } catch (erreur) {
            afficherEtatServeur("error", "Serveur inaccessible");
            afficherInfosServeur("TEST ÉCHOUÉ\n-----------\nRoute : " + urlTest + "\n\n" + erreur.message);
        }
    }

    async function creerTablePostgres() {
        const url = getApiCreerTableUrl();
        afficherEtatServeur("warning", "Création de la table...");
        afficherInfosServeur("Appel :\n" + url);

        try {
            const resultat = await appelerJson(url, { method: "GET", cache: "no-store" });
            afficherEtatServeur("ok", "Table PostgreSQL prête");
            afficherInfosServeur(JSON.stringify(resultat, null, 4));
            alert("Table PostgreSQL créée ou déjà existante.");
        } catch (erreur) {
            afficherEtatServeur("error", "Erreur table PostgreSQL");
            afficherInfosServeur("Impossible de créer la table.\n\n" + erreur.message);
            alert("Impossible de créer la table PostgreSQL.");
        }
    }

    async function verifierTablePostgres() {
        const url = getApiVerifierTableUrl();
        afficherEtatServeur("warning", "Vérification de la table...");
        afficherInfosServeur("Appel :\n" + url);

        try {
            const resultat = await appelerJson(url, { method: "GET", cache: "no-store" });
            afficherEtatServeur(resultat.tableExiste ? "ok" : "warning", resultat.tableExiste ? "Table existante" : "Table absente");
            afficherInfosServeur(JSON.stringify(resultat, null, 4));
        } catch (erreur) {
            afficherEtatServeur("error", "Erreur vérification table");
            afficherInfosServeur("Impossible de vérifier la table.\n\n" + erreur.message);
        }
    }


    function lireParametresGraphiquesMasques() {
        const parametresDepuisGraphique = lireParametresDepuisGraphiqueTradingView();

        if (parametresDepuisGraphique && parametresDepuisGraphique.lectureDirecte === true) {
            derniersParametresGraphiqueDirect = parametresDepuisGraphique;
            synchroniserChampsMasquesAvecGraphique(parametresDepuisGraphique);
            mettreAJourBadgeLectureGraphique("ok", "Lecture directe du graphique active");
            return parametresDepuisGraphique;
        }

        mettreAJourBadgeLectureGraphique("erreur", "Widget simple : repli sur champs masqués");

        return {
            actif: valeurElement("asset-selector", "BINANCE:BTCUSDT"),
            actifLibelle: libelleElement("asset-selector", "Bitcoin / USDT"),
            intervalle: valeurElement("interval-selector", "D"),
            intervalleLibelle: libelleElement("interval-selector", "1 jour"),
            indicateur: valeurElement("indicator-selector", "RSI"),
            indicateurLibelle: libelleElement("indicator-selector", "RSI"),
            source: "repli_champs_html_masques",
            lectureDirecte: false
        };
    }


    function appelSecurise(description, fonction) {
        try {
            if (typeof fonction !== "function") return null;
            const resultat = fonction();
            return resultat === undefined ? null : resultat;
        } catch (erreur) {
            console.warn("Paramètre TradingView non accessible : " + description, erreur);
            return null;
        }
    }

    function valeurNonVide(valeur) {
        if (valeur === undefined || valeur === null) return null;
        if (typeof valeur === "string" && valeur.trim() === "") return null;
        return valeur;
    }

    function detecterDimensionsElement(id) {
        const element = document.getElementById(id);
        if (!element) {
            return {
                existe: false,
                largeur: null,
                hauteur: null
            };
        }

        const rectangle = element.getBoundingClientRect();

        return {
            existe: true,
            largeur: Math.round(rectangle.width),
            hauteur: Math.round(rectangle.height),
            largeurScroll: element.scrollWidth || null,
            hauteurScroll: element.scrollHeight || null
        };
    }

    function obtenirEtudesConfigureesDepuisPage() {
        const indicateur = valeurElement("indicator-selector", "RSI");
        const etudes = choisirEtudeTradingView();

        return {
            indicateurSelectionne: indicateur,
            indicateurLibelle: libelleElement("indicator-selector", "RSI"),
            etudesConfigurees: etudes,
            source: "selecteur_html_et_parametre_studies"
        };
    }

    function lireValeursAvanceesDepuisChartingLibrary() {
        const donnees = {
            apiDisponible: false,
            symbole: null,
            intervalle: null,
            visibleRange: null,
            typeGraphiqueBrut: null,
            nomGraphique: null,
            timezone: null,
            etudes: null,
            dessins: null,
            erreurs: []
        };

        if (!widgetTradingView || typeof widgetTradingView.activeChart !== "function") {
            donnees.erreurs.push("API activeChart indisponible avec le widget actuel.");
            return donnees;
        }

        const chart = appelSecurise("activeChart", function () {
            return widgetTradingView.activeChart();
        });

        if (!chart) {
            donnees.erreurs.push("Graphique actif non disponible.");
            return donnees;
        }

        donnees.apiDisponible = true;

        const symbolInterval = appelSecurise("symbolInterval", function () {
            return typeof chart.symbolInterval === "function" ? chart.symbolInterval() : null;
        });

        if (symbolInterval) {
            donnees.symbole = valeurNonVide(symbolInterval.symbol || symbolInterval.ticker || symbolInterval.pro_name || symbolInterval.full_name);
            donnees.intervalle = valeurNonVide(symbolInterval.interval || symbolInterval.resolution || symbolInterval.timeframe);
        }

        donnees.symbole = donnees.symbole || valeurNonVide(appelSecurise("symbol", function () {
            return typeof chart.symbol === "function" ? chart.symbol() : null;
        }));

        donnees.intervalle = donnees.intervalle || valeurNonVide(appelSecurise("resolution", function () {
            return typeof chart.resolution === "function" ? chart.resolution() : null;
        }));

        donnees.visibleRange = appelSecurise("getVisibleRange", function () {
            return typeof chart.getVisibleRange === "function" ? chart.getVisibleRange() : null;
        });

        donnees.typeGraphiqueBrut = appelSecurise("chartType", function () {
            if (typeof chart.chartType === "function") return chart.chartType();
            if (typeof chart.getChartType === "function") return chart.getChartType();
            return null;
        });

        donnees.nomGraphique = appelSecurise("name", function () {
            return typeof chart.name === "function" ? chart.name() : null;
        });

        donnees.timezone = appelSecurise("timezone", function () {
            if (typeof chart.getTimezone === "function") return chart.getTimezone();
            if (typeof widgetTradingView.getTimezoneApi === "function") return widgetTradingView.getTimezoneApi();
            return null;
        });

        donnees.etudes = appelSecurise("getAllStudies", function () {
            if (typeof chart.getAllStudies === "function") return chart.getAllStudies();
            if (typeof chart.getAllPanes === "function") return { panesDisponibles: true, panes: chart.getAllPanes() };
            return null;
        });

        donnees.dessins = appelSecurise("getAllShapes", function () {
            return typeof chart.getAllShapes === "function" ? chart.getAllShapes() : null;
        });

        return donnees;
    }

    function capturerParametresAvancesTradingView(parametresGraphiques) {
        const lectureAvancee = lireValeursAvanceesDepuisChartingLibrary();
        const dimensionsGraphique = detecterDimensionsElement("tradingview_chart");
        const etudesConfigurees = obtenirEtudesConfigureesDepuisPage();
        const dateCapture = new Date();

        const actifFinal =
            lectureAvancee.symbole ||
            parametresGraphiques.actif ||
            valeurElement("asset-selector", "BINANCE:BTCUSDT");

        const intervalleFinal =
            lectureAvancee.intervalle ||
            parametresGraphiques.intervalle ||
            valeurElement("interval-selector", "D");

        return {
            versionCapture: "advanced_capture_v1",
            dateCaptureIso: dateCapture.toISOString(),
            sourcePrincipale: lectureAvancee.apiDisponible ? "charting_library_ou_api_avancee" : "widget_public_avec_repli_html",
            lectureDirectePossible: lectureAvancee.apiDisponible === true,
            valeursPrincipales: {
                actif: actifFinal,
                actifLibelle: parametresGraphiques.actifLibelle || actifFinal,
                intervalle: intervalleFinal,
                intervalleLibelle: parametresGraphiques.intervalleLibelle || intervalleFinal,
                indicateur: parametresGraphiques.indicateur || valeurElement("indicator-selector", "RSI"),
                indicateurLibelle: parametresGraphiques.indicateurLibelle || libelleElement("indicator-selector", "RSI"),
                typeBougie: valeurElement("type-bougie", "bougies_japonaises"),
                typeBougieLibelle: libelleElement("type-bougie", "Bougies japonaises"),
                styleTradingView: obtenirStyleTradingView()
            },
            graphiqueTradingView: {
                widgetPresent: !!widgetTradingView,
                apiActiveChartDisponible: typeof widgetTradingView?.activeChart === "function",
                apiSymbolIntervalDisponible: typeof widgetTradingView?.symbolInterval === "function",
                allowSymbolChange: true,
                autosize: true,
                theme: "dark",
                locale: "fr",
                timezoneConfiguree: "America/Toronto",
                toolbarBg: "#0f172a",
                hideSideToolbar: false,
                details: true,
                hotlist: true,
                calendar: false,
                enablePublishing: false,
                dimensions: dimensionsGraphique
            },
            donneesLuesDepuisApiAvancee: lectureAvancee,
            indicateursEtEtudes: etudesConfigurees,
            analyse: {
                categorie: getCategorieAnalyseBTC(),
                categorieLibelle: getLibelleCategorieAnalyseBTC(),
                descriptionCategorie: getDescriptionCategorieAnalyseBTC(),
                strategie: valeurElement("strategie-selector", "suivi_tendance"),
                sens: valeurElement("sens-selector", "achat_vente")
            },
            risque: {
                capitalInitial: nombreElement("capital-input", 1000),
                risqueParPositionPourcent: nombreElement("risk-input", 1),
                stopLossPourcent: nombreElement("stoploss-input", 2),
                takeProfitPourcent: nombreElement("takeprofit-input", 4),
                levier: nombreElement("levier-input", 1)
            },
            environnementPage: {
                urlPage: window.location.href,
                origine: window.location.origin,
                chemin: window.location.pathname,
                largeurFenetre: window.innerWidth,
                hauteurFenetre: window.innerHeight,
                devicePixelRatio: window.devicePixelRatio || 1,
                langueNavigateur: navigator.language || null,
                plateforme: navigator.platform || null,
                userAgent: navigator.userAgent || null,
                heureLocale: dateCapture.toLocaleString("fr-CA")
            },
            limites: {
                indicateursAjoutesManuellementDansTradingView: lectureAvancee.etudes ? "lecture_tentee" : "non_accessible_avec_widget_public",
                dessinsEtAnnotationsTradingView: lectureAvancee.dessins ? "lecture_tentee" : "non_accessible_avec_widget_public",
                donneesOHLCVCompletes: "non_fournies_par_le_widget_public",
                remarque: "Les valeurs réellement accessibles dépendent de l'API TradingView disponible dans la page. Avec le widget public tv.js, la capture directe reste limitée."
            }
        };
    }

    function capturerConfigurationTradingView(afficherAlerte = true) {
        const parametresGraphiques = lireParametresGraphiquesMasques();
        const parametresAvancesTradingView = capturerParametresAvancesTradingView(parametresGraphiques);

        configurationActuelle = {
            nom: "Configuration TradingView IA",
            dateCapture: new Date().toISOString(),
            serveur: {
                apiAnalyse: getApiAnalyseUrl(),
                apiTest: getApiTestUrl(),
                apiMarche: getApiMarcheUrl(),
                apiCaptures: getApiCapturesUrl(),
                apiViderCaptures: getApiViderCapturesUrl(),
                hebergeur: "Render",
                type: "Node.js"
            },
            graphique: {
                actif: parametresGraphiques.actif,
                actifLibelle: parametresGraphiques.actifLibelle,
                intervalle: parametresGraphiques.intervalle,
                intervalleLibelle: parametresGraphiques.intervalleLibelle,
                indicateur: parametresGraphiques.indicateur,
                indicateurLibelle: parametresGraphiques.indicateurLibelle,
                typeBougie: valeurElement("type-bougie", "bougies_japonaises"),
                typeBougieLibelle: libelleElement("type-bougie", "Bougies japonaises"),
                source: parametresGraphiques.source || "graphique_tradingview_api",
                sourceAffichage: "widget_tradingview_integre",
                lectureDirecteGraphique: parametresGraphiques.lectureDirecte === true,
                champsMasques: true,
                parametresAvances: parametresAvancesTradingView
            },
            tradingView: parametresAvancesTradingView,
            analyseIA: {
                categorie: getCategorieAnalyseBTC(),
                categorieLibelle: getLibelleCategorieAnalyseBTC(),
                descriptionCategorie: getDescriptionCategorieAnalyseBTC(),
                strategie: valeurElement("strategie-selector", "suivi_tendance"),
                statut: "pret_pour_analyse"
            },
            risque: {
                capitalInitial: nombreElement("capital-input", 1000),
                risqueParPositionPourcent: nombreElement("risk-input", 1),
                stopLossPourcent: nombreElement("stoploss-input", 2),
                takeProfitPourcent: nombreElement("takeprofit-input", 4),
                levier: nombreElement("levier-input", 1),
                sens: valeurElement("sens-selector", "achat_vente")
            },
            snapshot: {
                url: valeurElement("snapshot-url", ""),
                categorieAnalyse: getCategorieAnalyseBTC(),
                categorieAnalyseLibelle: getLibelleCategorieAnalyseBTC(),
                descriptionCategorieAnalyse: getDescriptionCategorieAnalyseBTC(),
                screenshotBase64: null
            },
            marche: null,
            notes: valeurElement("notes-analyse", "").trim(),
            limites: {
                captureCompleteTradingView: false,
                dessinsInternesTradingView: false,
                remarque: "La page capture le maximum de paramètres accessibles. Avec le widget public TradingView, certaines données internes restent inaccessibles."
            }
        };

        afficherConfiguration(configurationActuelle);
        afficherStatus("Configuration capturée avec succès.");

        if (afficherAlerte) alert("Configuration capturée.");

        return configurationActuelle;
    }

    async function capturerEtEnregistrerConfiguration() {
        try {
            capturerConfigurationTradingView(false);

            afficherStatus("Capture en cours, ajout des données de marché...");

            await enrichirConfigurationAvecDonneesMarche(false);

            await enregistrerCapturePostgres(true, false);

        } catch (erreur) {
            console.error("Erreur capture et enregistrement :", erreur);
            afficherStatus("Erreur pendant la capture et l'enregistrement.");
            alert("Erreur pendant la capture et l'enregistrement : " + erreur.message);
        }
    }

    async function enrichirConfigurationAvecDonneesMarche(afficherAlerte = true) {
        if (!configurationActuelle) capturerConfigurationTradingView(false);

        const urlMarche = getApiMarcheUrl();
        afficherStatus("Récupération des données de marché...");
        afficherEtatServeur("warning", "Appel /api/marche...");

        try {
            const donneesMarche = await appelerJson(urlMarche, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                cache: "no-store",
                body: JSON.stringify({
                    actif: configurationActuelle.graphique.actif,
                    intervalle: configurationActuelle.graphique.intervalle,
                    indicateur: configurationActuelle.graphique.indicateur,
                    categorieAnalyse: configurationActuelle.analyseIA.categorie
                })
            });

            configurationActuelle.marche = {
                prixActuel: donneesMarche.prixActuel ?? null,
                support: donneesMarche.support ?? null,
                resistance: donneesMarche.resistance ?? null,
                rsi: donneesMarche.rsi ?? null,
                ema20: donneesMarche.ema20 ?? null,
                ema50: donneesMarche.ema50 ?? null,
                macd: donneesMarche.macd ?? null,
                volume: donneesMarche.volume ?? "neutre",
                tendance: donneesMarche.tendance ?? "neutre",
                source: donneesMarche.source ?? "serveur_nodejs",
                api: urlMarche,
                dateMiseAJour: new Date().toISOString()
            };

            localStorage.setItem("configurationTradingViewIA", JSON.stringify(configurationActuelle));
            afficherConfiguration(configurationActuelle);
            afficherEtatServeur("ok", "Données de marché reçues");
            afficherStatus("Configuration enrichie avec les données de marché.");
            afficherInfosServeur(JSON.stringify(donneesMarche, null, 4));
            if (afficherAlerte) alert("Données de marché ajoutées.");
        } catch (erreur) {
            afficherEtatServeur("error", "Erreur /api/marche");
            afficherStatus("Impossible de récupérer les données de marché.");
            afficherInfosServeur("ERREUR /api/marche\n-----------------\nAdresse : " + urlMarche + "\n\n" + erreur.message);
            if (afficherAlerte) alert("Impossible d'ajouter les données de marché.");
        }
    }

    function nettoyerNomFichier(valeur) {
        return String(valeur || "non-defini")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9-_]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");
    }

    function genererTimestampFichier() {
        const maintenant = new Date();
        const annee = maintenant.getFullYear();
        const mois = String(maintenant.getMonth() + 1).padStart(2, "0");
        const jour = String(maintenant.getDate()).padStart(2, "0");
        const heure = String(maintenant.getHours()).padStart(2, "0");
        const minute = String(maintenant.getMinutes()).padStart(2, "0");
        const seconde = String(maintenant.getSeconds()).padStart(2, "0");
        return annee + mois + jour + "-" + heure + minute + seconde;
    }

    function genererNomCapturePostgres(configuration) {
        const actif = nettoyerNomFichier(configuration.graphique.actif);
        const indicateur = nettoyerNomFichier(configuration.graphique.indicateur);

        const categorieAnalyse =
            configuration?.analyseIA?.categorieLibelle ||
            configuration?.analyseIA?.categorie ||
            configuration?.snapshot?.categorieAnalyseLibelle ||
            configuration?.snapshot?.categorieAnalyse ||
            "Liquidité de marché";

        const categorie = nettoyerNomFichier(categorieAnalyse);
        const timestamp = genererTimestampFichier();

        /*
            Format demandé :
            ACTIF-INDICATEUR-CATEGORIE_ANALYSE-TIMESTAMP

            Exemple :
            BINANCE-BTCUSDT-RSI-ANALYSE-TECHNIQUE-20260510-154233
        */
        return actif + "-" + indicateur + "-" + categorie + "-" + timestamp;
    }

    function obtenirScreenshotBase64DepuisConfiguration() {
        if (!configurationActuelle || !configurationActuelle.snapshot) return null;
        return configurationActuelle.snapshot.screenshotBase64 || null;
    }

    async function enregistrerCapturePostgres(afficherAlerte = true, capturerAvant = true) {
        try {
            if (capturerAvant) {
                capturerConfigurationTradingView(false);
            }

            if (!configurationActuelle) {
                throw new Error("configurationActuelle est vide ou non définie.");
            }

            if (!configurationActuelle.graphique) {
                throw new Error("configurationActuelle.graphique est vide ou non défini.");
            }

            const parametresGraphiques = lireParametresGraphiquesMasques();

            configurationActuelle.graphique.actif = parametresGraphiques.actif;
            configurationActuelle.graphique.actifLibelle = parametresGraphiques.actifLibelle;
            configurationActuelle.graphique.intervalle = parametresGraphiques.intervalle;
            configurationActuelle.graphique.intervalleLibelle = parametresGraphiques.intervalleLibelle;
            configurationActuelle.graphique.indicateur = parametresGraphiques.indicateur;
            configurationActuelle.graphique.indicateurLibelle = parametresGraphiques.indicateurLibelle;
            configurationActuelle.graphique.source = parametresGraphiques.source || "graphique_tradingview_api";
            configurationActuelle.graphique.lectureDirecteGraphique = parametresGraphiques.lectureDirecte === true;
            configurationActuelle.graphique.champsMasques = true;

            const parametresAvancesTradingView = capturerParametresAvancesTradingView(parametresGraphiques);
            configurationActuelle.tradingView = parametresAvancesTradingView;
            configurationActuelle.graphique.parametresAvances = parametresAvancesTradingView;

            const urlCaptures = getApiCapturesUrl();
            const nomCapture = genererNomCapturePostgres(configurationActuelle);
            const screenshotBase64 = obtenirScreenshotBase64DepuisConfiguration();

            configurationActuelle.nomCapture = nomCapture;

            const categorieAnalyse =
                configurationActuelle?.analyseIA?.categorieLibelle ||
                configurationActuelle?.analyseIA?.categorie ||
                configurationActuelle?.snapshot?.categorieAnalyseLibelle ||
                configurationActuelle?.snapshot?.categorieAnalyse ||
                "Liquidité de marché";

            const donneesAEnregistrer = {
                actif: configurationActuelle.graphique.actif || "NON_RENSEIGNE",
                indicateur: configurationActuelle.graphique.indicateur || null,
                intervalle: configurationActuelle.graphique.intervalle || null,
                actif_libelle: configurationActuelle.graphique.actifLibelle || null,
                indicateur_libelle: configurationActuelle.graphique.indicateurLibelle || null,
                intervalle_libelle: configurationActuelle.graphique.intervalleLibelle || null,
                source_parametres: configurationActuelle.graphique.source || null,
                lecture_directe_graphique: configurationActuelle.graphique.lectureDirecteGraphique === true,
                type_bougie: configurationActuelle.graphique.typeBougie || null,
                type_bougie_libelle: configurationActuelle.graphique.typeBougieLibelle || null,

                /*
                    On garde nom_fichier pour compatibilité avec ton ancien code.
                    On ajoute nom_capture pour la nouvelle colonne.
                    On ajoute aussi categorie_analyse pour server.js.
                */
                nom_fichier: nomCapture || ("capture-" + new Date().toISOString()),
                nom_capture: nomCapture || ("capture-" + new Date().toISOString()),
                categorie_analyse: categorieAnalyse,
                categorieAnalyse: categorieAnalyse,

                configuration_json: configurationActuelle,

                /*
                    Je garde ton choix actuel :
                    screenshot désactivé pour éviter les erreurs de taille ou de capture.
                */
                screenshot_base64: null
            };

            console.log("URL PostgreSQL :", urlCaptures);
            console.log("Données envoyées :", donneesAEnregistrer);

            afficherStatus("Enregistrement dans PostgreSQL...");
            afficherEtatServeur("warning", "Envoi vers PostgreSQL...");
            afficherInfosServeur(
                "ENVOI EN COURS\n" +
                "--------------\n" +
                "Route : " + urlCaptures + "\n" +
                "Table : trading_capture\n" +
                "Nom capture : " + donneesAEnregistrer.nom_capture
            );

            const reponse = await fetch(urlCaptures, {
                method: "POST",
                mode: "cors",
                credentials: "omit",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                cache: "no-store",
                body: JSON.stringify(donneesAEnregistrer)
            });

            const texte = await reponse.text();

            console.log("Statut HTTP :", reponse.status);
            console.log("Réponse brute serveur :", texte);

            let resultat;

            try {
                resultat = JSON.parse(texte);
            } catch (erreurJson) {
                throw new Error("Réponse non JSON du serveur : " + texte);
            }

            if (!reponse.ok || resultat.ok !== true) {
                throw new Error(resultat.detail || resultat.message || "Erreur serveur inconnue.");
            }

            console.log("Réponse PostgreSQL :", resultat);

            if (!resultat || resultat.ok !== true || resultat.statut !== "ok") {
                throw new Error("Réponse serveur incorrecte : " + JSON.stringify(resultat));
            }

            localStorage.setItem(
                "configurationTradingViewIA",
                JSON.stringify(configurationActuelle)
            );

            afficherStatus("Configuration enregistrée dans PostgreSQL.");
            afficherEtatServeur("ok", "Enregistrement réussi");
            afficherInfosServeur(
                "ENREGISTREMENT RÉUSSI\n" +
                "----------------------\n" +
                JSON.stringify(resultat, null, 4)
            );

            await chargerListeCapturesPostgres(false);

            if (afficherAlerte) {
                alert(
                    "Configuration enregistrée dans la base de données.\n\n" +
                    "Nom de la capture : " + donneesAEnregistrer.nom_capture
                );
            }

        } catch (erreur) {
            console.error("Erreur complète d'enregistrement PostgreSQL :", erreur);

            afficherStatus("Erreur lors de l'enregistrement.");
            afficherEtatServeur("error", "Erreur base de données");
            afficherInfosServeur(
                "ERREUR D'ENREGISTREMENT\n" +
                "-----------------------\n" +
                erreur.message
            );

            alert("Impossible d'enregistrer dans la base de données : " + erreur.message);
        }
    }

    async function chargerListeCapturesPostgres(afficherAlerte = true) {
        /*
            On garde l'ancienne URL fixe qui fonctionnait hier.
        */
        const urlCaptures = "https://trading-g8ie.onrender.com/api/captures";

        const select = document.getElementById("liste-captures-postgres");
        if (!select) return;

        afficherStatus("Chargement de la liste PostgreSQL...");
        afficherEtatServeur("warning", "Lecture /api/captures...");

        try {
            console.log("URL utilisée pour charger la liste :", urlCaptures);

            const resultat = await appelerJson(urlCaptures, { method: "GET", cache: "no-store" });

            select.innerHTML = '<option value="">Choisir une configuration</option>';

            if (!resultat.captures || resultat.captures.length === 0) {
                select.innerHTML = '<option value="">Aucune configuration enregistrée</option>';
            } else {
                resultat.captures.forEach(function(capture) {
                    const option = document.createElement("option");

                    /*
                        Important :
                        La valeur reste l'id, car la route de chargement est /api/captures/:id.
                    */
                    option.value = capture.id;

                    const dateCapture = capture.date_capture
                        ? new Date(capture.date_capture).toLocaleString("fr-CA")
                        : "date inconnue";

                    const nomCapture =
                        capture.nom_capture ||
                        capture.nom_fichier ||
                        (
                            (capture.actif || "actif") +
                            "-" +
                            (capture.indicateur || "indicateur") +
                            "-" +
                            dateCapture
                        );

                    /*
                        Affichage demandé :
                        on affiche le nom_capture dans la liste déroulante.
                    */
                    option.textContent =
                        capture.id +
                        " - " +
                        nomCapture +
                        " - " +
                        dateCapture;

                    select.appendChild(option);
                });
            }

            afficherStatus("Liste PostgreSQL chargée.");
            afficherEtatServeur("ok", "Captures chargées");
            afficherInfosServeur(
                "LISTE DES CAPTURES\n" +
                "------------------\n" +
                "Nombre : " + (resultat.captures ? resultat.captures.length : 0)
            );

            if (afficherAlerte) alert("Liste des captures chargée.");
        } catch (erreur) {
            afficherStatus("Impossible de charger la liste PostgreSQL.");
            afficherEtatServeur("error", "Erreur lecture /api/captures");
            afficherInfosServeur(
                "ERREUR LECTURE /api/captures\n" +
                "---------------------------\n" +
                erreur.message
            );

            if (afficherAlerte) alert("Impossible de charger la liste PostgreSQL.");
        }
    }

    async function chargerCapturePostgresSelectionnee() {
        const select = document.getElementById("liste-captures-postgres");
        if (!select || !select.value) {
            alert("Choisir une capture dans la liste.");
            return;
        }

        const urlCapture = getApiCapturesUrl() + "/" + encodeURIComponent(select.value);

        afficherStatus("Chargement de la capture PostgreSQL...");
        afficherEtatServeur("warning", "Lecture capture PostgreSQL...");

        try {
            const resultat = await appelerJson(urlCapture, { method: "GET", cache: "no-store" });
            const capture = resultat.capture;

            configurationActuelle = capture.configuration_json || null;

            if (!configurationActuelle) {
                throw new Error("La capture ne contient pas configuration_json.");
            }

            appliquerConfiguration(configurationActuelle);
            afficherConfiguration(configurationActuelle);
            afficherScreenshotPostgres(capture.screenshot_base64);
            localStorage.setItem("configurationTradingViewIA", JSON.stringify(configurationActuelle));

            afficherStatus("Capture PostgreSQL chargée.");
            afficherEtatServeur("ok", "Capture chargée");
            afficherInfosServeur(
                "CAPTURE CHARGÉE\n" +
                "---------------\n" +
                "ID : " + capture.id + "\n" +
                "Nom capture : " + (capture.nom_capture || capture.nom_fichier || "non renseigné") + "\n" +
                "Actif : " + capture.actif
            );

            alert("Capture PostgreSQL chargée.");
        } catch (erreur) {
            afficherStatus("Impossible de charger la capture PostgreSQL.");
            afficherEtatServeur("error", "Erreur capture PostgreSQL");
            afficherInfosServeur(
                "ERREUR CHARGEMENT CAPTURE\n" +
                "--------------------------\n" +
                erreur.message
            );

            alert("Impossible de charger la capture sélectionnée.");
        }
    }

    function afficherScreenshotPostgres(screenshotBase64) {
        const image = document.getElementById("image-capture-postgres");
        if (!image) return;

        if (screenshotBase64 && String(screenshotBase64).trim() !== "") {
            image.src = screenshotBase64;
            image.style.display = "block";
        } else {
            image.removeAttribute("src");
            image.style.display = "none";
        }
    }

    function appliquerConfiguration(configuration) {
        if (!configuration || !configuration.graphique) return;

        definirValeur("asset-selector", configuration.graphique.actif);
        definirValeur("interval-selector", configuration.graphique.intervalle);
        definirValeur("indicator-selector", configuration.graphique.indicateur);
        definirValeur("type-bougie", configuration.graphique.typeBougie);

        if (configuration.analyseIA) {
            definirValeur("categorie-analyse-btc", configuration.analyseIA.categorie);
            definirValeur("strategie-selector", configuration.analyseIA.strategie);
            actualiserDescriptionCategorie();
        }

        if (configuration.risque) {
            definirValeur("capital-input", configuration.risque.capitalInitial);
            definirValeur("risk-input", configuration.risque.risqueParPositionPourcent);
            definirValeur("stoploss-input", configuration.risque.stopLossPourcent);
            definirValeur("takeprofit-input", configuration.risque.takeProfitPourcent);
            definirValeur("levier-input", configuration.risque.levier);
            definirValeur("sens-selector", configuration.risque.sens);
        }

        if (configuration.snapshot) definirValeur("snapshot-url", configuration.snapshot.url);
        if (configuration.serveur && configuration.serveur.apiAnalyse) definirValeur("api-url", configuration.serveur.apiAnalyse);
        if (configuration.notes !== undefined) definirValeur("notes-analyse", configuration.notes);

        creerWidgetTradingView();
    }

    function definirValeur(id, valeur) {
        const element = document.getElementById(id);
        if (element && valeur !== undefined && valeur !== null) element.value = valeur;
    }

    function rechargerConfigurationTradingView() {
        const data = localStorage.getItem("configurationTradingViewIA");
        if (!data) {
            alert("Aucune configuration sauvegardée.");
            return;
        }

        try {
            configurationActuelle = JSON.parse(data);
            appliquerConfiguration(configurationActuelle);
            afficherConfiguration(configurationActuelle);
            afficherStatus("Configuration rechargée.");
            alert("Configuration rechargée.");
        } catch (erreur) {
            alert("Erreur : configuration sauvegardée invalide.");
        }
    }

    async function ouvrirPageDecision() {
        try {
            capturerConfigurationTradingView(false);

            afficherStatus("Préparation du snapshot avec les données de marché...");

            await enrichirConfigurationAvecDonneesMarche(false);

            localStorage.setItem(
                "configurationTradingViewIA",
                JSON.stringify(configurationActuelle)
            );

            window.open("decisions.html", "_blank");

        } catch (erreur) {
            console.error("Erreur ouverture decisions.html :", erreur);

            if (!configurationActuelle) {
                capturerConfigurationTradingView(false);
            }

            localStorage.setItem(
                "configurationTradingViewIA",
                JSON.stringify(configurationActuelle)
            );

            alert(
                "Les données de marché n'ont pas pu être ajoutées. " +
                "La page de décision va s'ouvrir avec les données disponibles."
            );

            window.open("decisions.html", "_blank");
        }
    }

    function importerJSONDepuisFichier(event) {
        const fichier = event.target.files[0];
        if (!fichier) return;

        const lecteur = new FileReader();
        lecteur.onload = function(e) {
            try {
                const configuration = JSON.parse(e.target.result);
                if (!configuration.graphique) throw new Error("Le fichier JSON ne contient pas de bloc graphique.");
                configurationActuelle = configuration;
                appliquerConfiguration(configurationActuelle);
                afficherConfiguration(configurationActuelle);
                localStorage.setItem("configurationTradingViewIA", JSON.stringify(configurationActuelle));
                afficherStatus("Configuration JSON importée.");
                alert("Configuration JSON importée avec succès.");
            } catch (erreur) {
                alert("Import impossible. Fichier JSON invalide.\n\n" + erreur.message);
            }

            event.target.value = "";
        };

        lecteur.readAsText(fichier);
    }

async function viderTableCaptures() {
    const confirmation = confirm(
        "Attention : cette action va supprimer toutes les captures enregistrées.\n\n" +
        "Voulez-vous vraiment vider la table trading_capture ?"
    );

    if (!confirmation) {
        return;
    }

    const motDePasse = await demanderMotDePasseAdmin();

    if (!motDePasse || motDePasse.trim() === "") {
        alert("Suppression annulée : mot de passe absent.");
        return;
    }

    try {
        const reponse = await fetch("https://trading-g8ie.onrender.com/api/vider-captures", {
            method: "POST",
            mode: "cors",
            credentials: "omit",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            cache: "no-store",
            body: JSON.stringify({
                motDePasse: motDePasse.trim()
            })
        });

        const texte = await reponse.text();
        const resultat = JSON.parse(texte);

        if (!reponse.ok || resultat.ok !== true) {
            throw new Error(resultat.message || "Erreur inconnue.");
        }

        alert("La table trading_capture a été vidée avec succès.");

        if (typeof chargerListeCapturesPostgres === "function") {
            chargerListeCapturesPostgres(false);
        }

    } catch (erreur) {
        alert("Impossible de vider la table trading_capture : " + erreur.message);
        console.error("Erreur vidage table :", erreur);
    }
}
    document.addEventListener("DOMContentLoaded", function () {
        const champApi = document.getElementById("api-url");
        if (champApi && !champApi.value.trim()) {
            champApi.value = API_BASE_URL_PAR_DEFAUT + "/api/analyse";
        }

        const selectCategorie = document.getElementById("categorie-analyse-btc");
        if (selectCategorie) {
            selectCategorie.addEventListener("change", function () {
                actualiserDescriptionCategorie();

                if (configurationActuelle) {
                    configurationActuelle.analyseIA.categorie = getCategorieAnalyseBTC();
                    configurationActuelle.analyseIA.categorieLibelle = getLibelleCategorieAnalyseBTC();
                    configurationActuelle.analyseIA.descriptionCategorie = getDescriptionCategorieAnalyseBTC();
                    afficherConfiguration(configurationActuelle);
                }
            });
        }

        actualiserDescriptionCategorie();
        creerWidgetTradingView();
        chargerListeCapturesPostgres(false);
    });
</script>
</body>
</html><!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Trading Station IA</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://s3.tradingview.com/tv.js"></script>

    <style>
        * { box-sizing: border-box; }

		body {
			margin: 0;
			font-family: Arial, sans-serif;
			background: #ffffff;
			color: #111827;
		}

        header {
            background: #0f172a;
            border-bottom: 2px solid #00d9ff;
            padding: 14px 20px;
        }

        .top-bar {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px;
        }

        .logo {
            font-size: 22px;
            font-weight: bold;
            color: #00d9ff;
            margin-right: 18px;
            line-height: 1.1;
        }

        .logo span { color: #facc15; }

        .auteur-logo {
            display: block;
            font-size: 12px;
            font-weight: normal;
            color: #cbd5e1;
            margin-top: 3px;
        }

        .control-group {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .parametres-graphiques-caches {
            display: none !important;
        }

        .capture-selector-top {
            display: flex;
            align-items: center;
            gap: 8px;
            flex: 0 1 560px;
            min-width: 360px;
            max-width: 620px;
        }

        .capture-selector-top label {
            white-space: nowrap;
        }

        #liste-captures-postgres {
            width: 100%;
            min-width: 260px;
            max-width: 430px;
        }

        .analysis-category-top {
            display: flex;
            align-items: center;
            gap: 6px;
            flex: 0 0 340px;
            min-width: 300px;
            max-width: 360px;
            margin-left: 8px;
        }

        .analysis-category-top label {
            white-space: nowrap;
        }

        .analysis-category-top select {
            width: 190px;
            min-width: 180px;
        }

        .category-description-top {
            display: none;
        }
            max-width: 190px;
        }

        .category-description-top {
            flex: 1 1 100%;
            margin-top: 0;
            display: none;
        }

        label {
            font-weight: bold;
            color: #00d9ff;
            font-size: 13px;
        }

        select, input, textarea {
            background: #020617;
            color: white;
            border: 1px solid #334155;
            border-radius: 6px;
            padding: 7px;
            font-size: 13px;
            max-width: 100%;
        }

        button {
            border: none;
            border-radius: 7px;
            padding: 8px 10px;
            font-weight: bold;
            cursor: pointer;
            font-size: 12px;
            white-space: nowrap;
        }

        button:hover { opacity: 0.85; }

        .btn-tv { background: #2962ff; color: white; }
        .btn-capture { background: #00d9ff; color: #00111a; }
        .btn-save { background: #22c55e; color: #03130a; }
        .btn-copy { background: #facc15; color: #1a1300; }
        .btn-export { background: #a855f7; color: white; }
        .btn-import { background: #14b8a6; color: #001a16; }
        .btn-api { background: #fb923c; color: #1a0b00; }
        .btn-db { background: #10b981; color: #00130d; }
        .btn-load { background: #6366f1; color: white; }
        .btn-ai { background: #38bdf8; color: #00111a; }
        .btn-market { background: #84cc16; color: #102000; }
        .btn-decision { background: #eab308; color: #1a1300; }
        .btn-clear { background: #ef4444; color: white; }
        .btn-dark { background: #334155; color: white; }

        .header-images {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-left: 8px;
        }

        .header-images img {
            width: 48px;
            height: 48px;
            object-fit: cover;
            border-radius: 6px;
            border: 1px solid #334155;
            background: #020617;
            padding: 1px;
        }

        main {
            display: grid;
            grid-template-columns: minmax(0, 2.3fr) minmax(320px, 0.7fr);
            gap: 14px;
            padding: 14px;
        }

        .chart-panel, .side-panel {
            background: #111827;
            border: 1px solid #263244;
            border-radius: 12px;
            padding: 14px;
        }

        .chart-panel { min-width: 0; }
        .side-panel { min-width: 320px; overflow: hidden; }

        .chart-title-row {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 14px;
            margin-bottom: 10px;
            width: 100%;
            flex-wrap: nowrap;
            overflow-x: auto;
        }

        .chart-title-row h2 {
            margin: 0;
            padding-bottom: 0;
            border-bottom: none;
            line-height: 1.1;
            flex: 0 0 auto;
        }

        .chart-title-icons {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 8px;
            flex-shrink: 0;
            margin-left: auto;
        }

        .chart-title-icons img {
            width: 36px;
            height: 36px;
            object-fit: cover;
            border-radius: 6px;
            border: 1px solid #334155;
            background: #020617;
            padding: 1px;
        }

        .chart-inline-controls {
            display: flex;
            align-items: center;
            gap: 12px;
            margin: 0;
            flex-wrap: nowrap;
            flex: 0 0 auto;
        }

        .chart-inline-controls .form-block {
            display: flex;
            align-items: center;
            gap: 6px;
            flex: 0 0 auto;
            margin-bottom: 0;
        }

        .chart-inline-controls .form-block label {
            margin-bottom: 0;
            white-space: nowrap;
            color: #ffffff;
        }

        .chart-inline-controls .form-block select {
            width: 175px;
        }

        .chart-inline-controls .form-block input {
            width: 105px;
        }

        #tradingview_chart {
            height: 700px;
            width: 100%;
            border-radius: 10px;
            overflow: hidden;
            background: #020617;
        }

        h2 {
            color: #00d9ff;
            font-size: 18px;
            margin-top: 0;
            border-bottom: 1px solid #263244;
            padding-bottom: 8px;
        }

        h3 {
            color: #facc15;
            font-size: 15px;
            margin-bottom: 8px;
        }

        .form-block {
            margin-bottom: 12px;
            min-width: 0;
        }

        .form-block label {
            display: block;
            margin-bottom: 5px;
        }

        .form-block input, .form-block select, .form-block textarea { width: 100%; }

        pre {
            background: #020617;
            color: #a7f3d0;
            padding: 12px;
            border-radius: 10px;
            border: 1px solid #263244;
            min-height: 260px;
            max-height: 420px;
            overflow: auto;
            font-size: 12px;
            white-space: pre-wrap;
            word-break: break-word;
        }

        .button-zone {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 12px 0;
        }

        .button-zone button { flex: 1 1 120px; }

        .status {
            background: #020617;
            border: 1px solid #263244;
            border-radius: 8px;
            padding: 10px;
            color: #facc15;
            font-size: 13px;
            margin-top: 10px;
        }

        .server-status {
            padding: 12px;
            border-radius: 8px;
            font-weight: bold;
            margin-bottom: 12px;
            text-align: center;
            font-size: 13px;
        }

        .server-status.neutral { background: #334155; color: #ffffff; }
        .server-status.ok { background: #064e3b; color: #86efac; }
        .server-status.error { background: #7f1d1d; color: #fecaca; }
        .server-status.warning { background: #713f12; color: #fde68a; }

        .server-info {
            background: #020617;
            border: 1px solid #334155;
            border-radius: 8px;
            padding: 10px;
            font-family: Consolas, monospace;
            font-size: 12px;
            color: #d1d5db;
            white-space: pre-wrap;
            word-break: break-word;
            min-height: 90px;
            max-height: 220px;
            overflow: auto;
        }

        .analysis-category-box, .ai-section, .risk-box {
            margin-top: 14px;
            background: #0b1220;
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 14px;
        }

        .side-panel > section:first-child { margin-top: 0; }

        .risk-box h3 {
            margin-top: 0;
            margin-bottom: 12px;
        }

        .analysis-category-box select { width: 100%; }

        .category-description, .note {
            margin-top: 10px;
            padding: 10px;
            background: #020617;
            border: 1px solid #334155;
            border-radius: 8px;
            color: #d1d5db;
            font-size: 12px;
            line-height: 1.5;
        }

        .ai-result-box {
            background: #020617;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 14px;
            min-height: 220px;
            max-height: 520px;
            overflow: auto;
            white-space: pre-wrap;
            word-break: break-word;
            font-family: Consolas, monospace;
            font-size: 13px;
            color: #d1d5db;
        }

        .screenshot-preview {
            margin-top: 12px;
            background: #020617;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 10px;
        }

        .screenshot-preview img {
            width: 100%;
            max-height: 360px;
            object-fit: contain;
            border-radius: 8px;
            background: #000;
            display: none;
        }

        footer {
            text-align: center;
            color: #94a3b8;
            font-size: 12px;
            padding: 16px;
            border-top: 1px solid #263244;
        }


        .modal-password-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.72);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 16px;
        }

        .modal-password-box {
            width: 100%;
            max-width: 420px;
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 18px;
            color: #ffffff;
            box-shadow: 0 18px 45px rgba(0, 0, 0, 0.45);
        }

        .modal-password-box h3 {
            margin-top: 0;
            color: #facc15;
        }

        .modal-password-box p {
            font-size: 13px;
            line-height: 1.5;
            color: #cbd5e1;
        }

        .modal-password-box input {
            width: 100%;
            margin-top: 8px;
            margin-bottom: 14px;
        }

        .modal-password-actions {
            display: flex;
            gap: 8px;
            justify-content: flex-end;
            flex-wrap: wrap;
        }

        .modal-password-actions button {
            min-width: 110px;
        }

        @media (max-width: 1200px) {
            main { grid-template-columns: minmax(0, 2fr) minmax(320px, 0.8fr); }
            #tradingview_chart { height: 650px; }
        }

        @media (max-width: 1000px) {
            main { grid-template-columns: 1fr; }
            .side-panel { min-width: 0; }
            #tradingview_chart { height: 520px; }
        }

        @media (max-width: 700px) {
            header { padding: 12px; }
            .top-bar { flex-direction: column; align-items: stretch; }
            .control-group { flex-direction: column; align-items: stretch; }

            .capture-selector-top {
                flex-direction: column;
                align-items: stretch;
                min-width: 0;
                max-width: none;
                width: 100%;
            }

            .analysis-category-top {
                flex-direction: column;
                align-items: stretch;
                min-width: 0;
                max-width: none;
                width: 100%;
                margin-left: 0;
            }

            .analysis-category-top select {
                min-width: 0;
                width: 100%;
            }

            #liste-captures-postgres {
                min-width: 0;
                max-width: none;
                width: 100%;
            }

            button { width: 100%; }
            .button-zone button { flex: 1 1 100%; }
            .logo { text-align: center; margin-right: 0; }
            .header-images { justify-content: center; margin-left: 0; }
            .header-images img { width: 43px; height: 43px; }
            .chart-title-row { justify-content: flex-start; flex-wrap: nowrap; }
            .chart-inline-controls { flex: 0 0 auto; flex-wrap: nowrap; }
            .chart-inline-controls .form-block { flex: 0 0 auto; }
            .chart-title-icons img { width: 30px; height: 30px; }
            #tradingview_chart { height: 460px; }
        }
    </style>
</head>

<body>
<header>
    <div class="top-bar">
        <div class="logo">
            TRADING STATION <span>IA</span>
            <small class="auteur-logo">Auteur : Hocine Korichi, Ing.</small>
        </div>

        <div class="control-group parametres-graphiques-caches">
            <label for="asset-selector">ACTIF :</label>
            <select id="asset-selector" onchange="actualiserGraphique()">
                <option value="BINANCE:BTCUSDT">Bitcoin / USDT</option>
                <option value="COINBASE:BTCUSD">Bitcoin / USD</option>
                <option value="BINANCE:ETHUSDT">Ethereum / USDT</option>
                <option value="OANDA:XAUUSD">Or / Dollar - XAUUSD</option>
                <option value="NASDAQ:AAPL">Apple - AAPL</option>
                <option value="NASDAQ:TSLA">Tesla - TSLA</option>
                <option value="NASDAQ:NVDA">Nvidia - NVDA</option>
                <option value="NASDAQ:MSFT">Microsoft - MSFT</option>
                <option value="NASDAQ:AMZN">Amazon - AMZN</option>
                <option value="NASDAQ:GOOGL">Google - GOOGL</option>
                <option value="SP:SPX">S&amp;P 500</option>
                <option value="TVC:DXY">Dollar Index - DXY</option>
            </select>
        </div>

        <div class="control-group parametres-graphiques-caches">
            <label for="interval-selector">INTERVALLE :</label>
            <select id="interval-selector" onchange="actualiserGraphique()">
                <option value="1">1 minute</option>
                <option value="5">5 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 heure</option>
                <option value="240">4 heures</option>
                <option value="D" selected>1 jour</option>
                <option value="W">1 semaine</option>
                <option value="M">1 mois</option>
            </select>
        </div>

        <div class="control-group parametres-graphiques-caches">
            <label for="indicator-selector">INDICATEUR :</label>
            <select id="indicator-selector" onchange="actualiserGraphique()">
                <option value="RSI">RSI</option>
                <option value="MACD">MACD</option>
                <option value="EMA">EMA</option>
                <option value="SUPERTREND">Supertrend</option>
                <option value="BOLLINGER">Bandes de Bollinger</option>
                <option value="ATR">ATR</option>
                <option value="VOLUME">Volume</option>
                <option value="LIQUIDITY_ZONE">Zones de liquidité</option>
            </select>
        </div>

        <button class="btn-clear" onclick="viderTableTradingCapture()">Vider la table</button>
        <button class="btn-capture" onclick="capturerEtEnregistrerConfiguration()">Capturer et enregistrer</button>
        <!--<button class="btn-market" onclick="enrichirConfigurationAvecDonneesMarche()">Ajouter marché</button>-->
        <button class="btn-db" style="display:none;" onclick="enregistrerCapturePostgres()">Enregistrer la configuration</button>
        <!-- <button class="btn-save" onclick="rechargerConfigurationTradingView()">Recharger</button> -->
        <button class="btn-decision" onclick="ouvrirPageDecision()">Analyser le snapshot</button>

        <div class="capture-selector-top">
            <label for="liste-captures-postgres">Choisir une confihuration :</label>
            <select id="liste-captures-postgres" onchange="chargerCapturePostgresSelectionnee()">
                <option value="">Aucune configuration chargée</option>
            </select>
        </div>

        <div class="analysis-category-top">
            <label for="categorie-analyse-btc">Type d'analyse :</label>
            <select id="categorie-analyse-btc">
                <option value="macroeconomie">Macroéconomie</option>
                <option value="monnaie_bitcoin">Monnaie Bitcoin</option>
                <option value="donnees_on_chain">Données on-chain</option>
                <option value="minage">Minage</option>
                <option value="analyse_technique" selected>Analyse technique</option>
                <option value="derives">Dérivés</option>
                <option value="liquidite_marche">Liquidité de marché</option>
                <option value="institutionnel">Institutionnel</option>
                <option value="sentiment">Sentiment</option>
                <option value="reglementation_risques">Réglementation et risques</option>
            </select>
            <div id="description-categorie-analyse" class="category-description category-description-top">
                Analyse technique : graphiques, tendances, supports, résistances, RSI et moyennes mobiles.
            </div>
        </div>

<!--
        <div class="header-images">
            <img src="img/bitcoin.jfif" alt="Bitcoin">
            <img src="img/lingot-or.jfif" alt="Lingot d'or">
        </div>
-->
    </div>
</header>

<main>
    <section class="chart-panel">
        <div class="chart-title-row">
            <h2>Graphique TradingView intégré</h2>
            <div class="chart-inline-controls">
                <div class="form-block">
                    <label for="type-bougie">Type de graphique</label>
                    <select id="type-bougie" onchange="actualiserGraphique()">
                        <option value="bougies_japonaises" selected>Bougies japonaises</option>
                        <option value="barres">Barres</option>
                        <option value="ligne">Ligne</option>
                        <option value="heikin_ashi">Heikin Ashi</option>
                    </select>
                </div>
                <div class="form-block">
                    <label for="capital-input">Capital initial</label>
                    <input id="capital-input" type="number" value="1000" min="0" step="100">
                </div>
            </div>
            <div class="chart-title-icons">
                <img src="img/bitcoin.jfif" alt="Symbole du Bitcoin">
                <img src="img/lingot-or.jfif" alt="Lingot d'or">
            </div>
        </div>

        <div id="tradingview_chart"></div>
        <input type="file" id="fichier-import-json" accept="application/json,.json" style="display:none;" onchange="importerJSONDepuisFichier(event)">

    </section>

    <aside class="side-panel">
        <section class="risk-box">
            <h3>Paramètres de risque</h3>
            <div class="form-block">
                <label for="risk-input">Risque par position en pourcentage</label>
                <input id="risk-input" type="number" value="1" min="0" step="0.1">
            </div>
            <div class="form-block">
                <label for="stoploss-input">Stop loss en pourcentage</label>
                <input id="stoploss-input" type="number" value="2" min="0" step="0.1">
            </div>
            <div class="form-block">
                <label for="takeprofit-input">Take profit en pourcentage</label>
                <input id="takeprofit-input" type="number" value="4" min="0" step="0.1">
            </div>
            <div class="form-block">
                <label for="levier-input">Levier</label>
                <input id="levier-input" type="number" value="1" min="1" step="1">
            </div>
            <div class="form-block">
                <label for="sens-selector">Sens</label>
                <select id="sens-selector">
                    <option value="achat_vente" selected>Achat ou vente</option>
                    <option value="achat">Achat seulement</option>
                    <option value="vente">Vente seulement</option>
                </select>
            </div>
            <div class="form-block">
                <label for="strategie-selector">Stratégie</label>
                <select id="strategie-selector">
                    <option value="suivi_tendance" selected>Suivi de tendance</option>
                    <option value="retournement">Retournement</option>
                    <option value="cassure">Cassure</option>
                    <option value="range">Range</option>
                </select>
            </div>
            <div class="form-block">
                <label for="snapshot-url">URL éventuelle du snapshot</label>
                <input id="snapshot-url" type="text" placeholder="Lien optionnel vers une image ou un snapshot">
            </div>

        </section>

        <h3>Configuration capturée</h3>
        <pre id="resultat-configuration">Aucune configuration capturée.</pre>

        <div id="status" class="status">En attente de capture.</div>
    </aside>
</main>


<div id="modal-password-overlay" class="modal-password-overlay">
    <div class="modal-password-box">
        <h3>Mot de passe administrateur</h3>
        <p>Entrer le mot de passe pour vider la table <strong>trading_capture</strong>.</p>
        <input id="admin-delete-password-input" type="password" autocomplete="current-password" placeholder="Mot de passe">
        <div class="modal-password-actions">
            <button class="btn-dark" type="button" onclick="fermerFenetreMotDePasse(false)">Annuler</button>
            <button class="btn-clear" type="button" onclick="fermerFenetreMotDePasse(true)">Confirmer</button>
        </div>
    </div>
</div>

<footer>
    Trading Station IA — page HTML sur GitHub Pages, API Node.js sur Render.
</footer>

<script>
    let widgetTradingView = null;
    let configurationActuelle = null;

    const API_BASE_URL_PAR_DEFAUT = "https://trading-g8ie.onrender.com";

    let resolveMotDePasseAdmin = null;

    function demanderMotDePasseAdmin() {
        return new Promise(function(resolve) {
            const overlay = document.getElementById("modal-password-overlay");
            const champ = document.getElementById("admin-delete-password-input");

            resolveMotDePasseAdmin = resolve;

            if (!overlay || !champ) {
                resolve("");
                return;
            }

            champ.value = "";
            overlay.style.display = "flex";

            setTimeout(function() {
                champ.focus();
            }, 50);
        });
    }

    function fermerFenetreMotDePasse(valider) {
        const overlay = document.getElementById("modal-password-overlay");
        const champ = document.getElementById("admin-delete-password-input");

        const valeur = valider && champ ? champ.value : "";

        if (overlay) {
            overlay.style.display = "none";
        }

        if (typeof resolveMotDePasseAdmin === "function") {
            resolveMotDePasseAdmin(valeur);
            resolveMotDePasseAdmin = null;
        }
    }

    document.addEventListener("keydown", function(event) {
        const overlay = document.getElementById("modal-password-overlay");
        const champ = document.getElementById("admin-delete-password-input");

        if (!overlay || overlay.style.display !== "flex") {
            return;
        }

        if (event.key === "Escape") {
            fermerFenetreMotDePasse(false);
        }

        if (event.key === "Enter" && document.activeElement === champ) {
            fermerFenetreMotDePasse(true);
        }
    });


    function valeurElement(id, valeurDefaut = "") {
        const element = document.getElementById(id);
        return element ? element.value : valeurDefaut;
    }

    function libelleElement(id, valeurDefaut = "") {
        const element = document.getElementById(id);
        if (!element || element.selectedIndex < 0) return valeurDefaut;
        return element.options[element.selectedIndex].text;
    }

    function nombreElement(id, valeurDefaut = 0) {
        const element = document.getElementById(id);
        if (!element) return valeurDefaut;
        const valeur = Number(element.value);
        return Number.isFinite(valeur) ? valeur : valeurDefaut;
    }

    function nettoyerUrl(url) {
        return String(url || "").trim().replace(/\/+$/, "");
    }

    function getApiBaseUrl() {
        const champApi = document.getElementById("api-url");
        let valeurChamp = champApi ? nettoyerUrl(champApi.value) : "";

        if (!valeurChamp) return API_BASE_URL_PAR_DEFAUT;

        valeurChamp = valeurChamp
            .replace("https://https://", "https://")
            .replace("http://http://", "http://")
            .replace(/\/analyse\/?$/, "/api/analyse");

        valeurChamp = valeurChamp
            .replace(/\/api\/analyse\/?$/, "")
            .replace(/\/api\/test\/?$/, "")
            .replace(/\/api\/marche\/?$/, "")
            .replace(/\/api\/captures\/?$/, "")
            .replace(/\/api\/vider-captures\/?$/, "")
            .replace(/\/api\/creer-table\/?$/, "")
            .replace(/\/api\/verifier-table\/?$/, "");

        if (!valeurChamp.startsWith("http://") && !valeurChamp.startsWith("https://")) {
            return API_BASE_URL_PAR_DEFAUT;
        }

        return nettoyerUrl(valeurChamp);
    }

    function getApiAnalyseUrl() { return getApiBaseUrl() + "/api/analyse"; }
    function getApiTestUrl() { return getApiBaseUrl() + "/api/test"; }
    function getApiMarcheUrl() { return getApiBaseUrl() + "/api/marche"; }

    /*
        IMPORTANT :
        Cette route reste volontairement fixe.
        Ne pas remplacer par getApiBaseUrl(), car l'enregistrement fonctionnait ainsi.
    */
    function getApiCapturesUrl() { return API_BASE_URL_PAR_DEFAUT + "/api/captures"; }

    function getApiViderCapturesUrl() { return API_BASE_URL_PAR_DEFAUT + "/api/vider-captures"; }

    function getApiCreerTableUrl() { return getApiBaseUrl() + "/api/creer-table"; }
    function getApiVerifierTableUrl() { return getApiBaseUrl() + "/api/verifier-table"; }

    function afficherEtatServeur(type, message) {
        const etat = document.getElementById("etatServeur");
        if (!etat) return;
        etat.className = "server-status " + type;
        etat.textContent = message;
    }

    function afficherInfosServeur(texte) {
        const zone = document.getElementById("infosServeur");
        if (!zone) return;
        zone.textContent = texte;
    }

    function afficherStatus(message) {
        document.getElementById("status").textContent = message;
    }

    function afficherAnalyseIA(texte) {
        document.getElementById("resultat-analyse-ia").textContent = texte;
    }

    function afficherConfiguration(configuration) {
        document.getElementById("resultat-configuration").textContent = JSON.stringify(configuration, null, 4);
    }

    function getCategorieAnalyseBTC() {
        return valeurElement("categorie-analyse-btc", "analyse_technique");
    }

    function getLibelleCategorieAnalyseBTC() {
        return libelleElement("categorie-analyse-btc", "Analyse technique");
    }

    function getDescriptionCategorieAnalyseBTC() {
        const descriptions = {
            macroeconomie: "Macroéconomie : taux, inflation, liquidité mondiale, dollar, obligations et bilan de la Fed.",
            monnaie_bitcoin: "Monnaie Bitcoin : offre maximale, émission, halving et inflation de BTC.",
            donnees_on_chain: "Données on-chain : adresses, transactions, MVRV, realized price et flux des plateformes.",
            minage: "Minage : taux de hachage, difficulté, revenus et ventes des mineurs.",
            analyse_technique: "Analyse technique : graphiques, tendances, supports, résistances, RSI et moyennes mobiles.",
            derives: "Dérivés : contrats à terme, options, funding rates, open interest et liquidations.",
            liquidite_marche: "Liquidité de marché : volumes, carnets d'ordres, spreads et profondeur de marché.",
            institutionnel: "Institutionnel : FNB Bitcoin, achats d'entreprises, fonds, banques et adoption officielle.",
            sentiment: "Sentiment : réseaux sociaux, Google Trends, médias, peur et avidité.",
            reglementation_risques: "Réglementation et risques : lois, fiscalité, plateformes, garde et géopolitique."
        };
        return descriptions[getCategorieAnalyseBTC()] || descriptions.analyse_technique;
    }

    function actualiserDescriptionCategorie() {
        const zone = document.getElementById("description-categorie-analyse");
        if (zone) zone.textContent = getDescriptionCategorieAnalyseBTC();
    }

    function obtenirStyleTradingView() {
        const typeBougie = valeurElement("type-bougie", "bougies_japonaises");
        switch (typeBougie) {
            case "barres": return "0";
            case "bougies_japonaises": return "1";
            case "ligne": return "3";
            case "heikin_ashi": return "8";
            default: return "1";
        }
    }

    function choisirEtudeTradingView() {
        const indicateur = valeurElement("indicator-selector", "RSI");
        if (indicateur === "RSI") return ["RSI@tv-basicstudies"];
        if (indicateur === "MACD") return ["MACD@tv-basicstudies"];
        if (indicateur === "EMA") return ["MASimple@tv-basicstudies"];
        if (indicateur === "BOLLINGER") return ["BB@tv-basicstudies"];
        if (indicateur === "VOLUME") return ["Volume@tv-basicstudies"];
        return [];
    }

    function creerWidgetTradingView(tentative = 0) {
        const conteneur = document.getElementById("tradingview_chart");
        if (!conteneur) return;

        if (typeof TradingView === "undefined" || !TradingView.widget) {
            conteneur.innerHTML = "<div style='padding:16px;color:#facc15;'>Chargement de TradingView...</div>";
            if (tentative < 20) {
                setTimeout(function () { creerWidgetTradingView(tentative + 1); }, 500);
            } else {
                conteneur.innerHTML = "<div style='padding:16px;color:#fecaca;'>Impossible de charger TradingView.</div>";
            }
            return;
        }

        const symbole = valeurElement("asset-selector", "BINANCE:BTCUSDT");
        const intervalle = valeurElement("interval-selector", "D");
        conteneur.innerHTML = "";

        try {
            widgetTradingView = new TradingView.widget({
                autosize: true,
                symbol: symbole,
                interval: intervalle,
                timezone: "America/Toronto",
                theme: "dark",
                style: obtenirStyleTradingView(),
                locale: "fr",
                toolbar_bg: "#0f172a",
                enable_publishing: false,
                allow_symbol_change: true,
                container_id: "tradingview_chart",
                hide_side_toolbar: false,
                details: true,
                hotlist: true,
                calendar: false,
                studies: choisirEtudeTradingView()
            });
        } catch (erreur) {
            conteneur.innerHTML = "<div style='padding:16px;color:#fecaca;'>Erreur lors du chargement du graphique TradingView.</div>";
            afficherStatus("Erreur TradingView : " + erreur.message);
        }
    }

    function actualiserGraphique() {
        creerWidgetTradingView();
        afficherStatus("Graphique actualisé.");
    }

    function ouvrirTradingView() {
        const symbole = valeurElement("asset-selector", "BINANCE:BTCUSDT");
        const intervalle = valeurElement("interval-selector", "D");
        const url = "https://www.tradingview.com/chart/?symbol=" + encodeURIComponent(symbole) + "&interval=" + encodeURIComponent(intervalle);
        window.open(url, "_blank");
    }


    async function viderTableTradingCapture() {
        const confirmation = confirm("Êtes-vous sûr de vouloir vider toute la table trading_capture ?\n\nCette action supprimera toutes les configurations enregistrées.");

        if (!confirmation) {
            afficherStatus("Suppression annulée.");
            return;
        }

        const motDePasse = await demanderMotDePasseAdmin();

        if (!motDePasse || motDePasse.trim() === "") {
            afficherStatus("Suppression annulée : mot de passe absent.");
            alert("Suppression annulée : mot de passe absent.");
            return;
        }

        const url = getApiViderCapturesUrl();

        afficherStatus("Vidage de la table trading_capture en cours...");
        afficherEtatServeur("warning", "Suppression des captures...");
        afficherInfosServeur(
            "VIDAGE DE LA TABLE\n" +
            "------------------\n" +
            "Table : trading_capture\n" +
            "Route appelée : " + url
        );

        try {
            const resultat = await appelerJson(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-store",
                body: JSON.stringify({
                    motDePasse: motDePasse.trim()
                })
            });

            afficherStatus("Table trading_capture vidée.");
            afficherEtatServeur("ok", "Table vidée");
            afficherInfosServeur(
                "VIDAGE RÉUSSI\n" +
                "-------------\n" +
                JSON.stringify(resultat, null, 4)
            );

            const select = document.getElementById("liste-captures-postgres");
            if (select) {
                select.innerHTML = '<option value="">Aucune configuration enregistrée</option>';
            }

            configurationActuelle = null;
            afficherConfiguration({ message: "La table trading_capture a été vidée." });
            alert("La table trading_capture a été vidée.");

        } catch (erreur) {
            console.error("Erreur pendant le vidage de la table trading_capture :", erreur);

            afficherStatus("Impossible de vider la table trading_capture.");
            afficherEtatServeur("error", "Erreur vidage table");
            afficherInfosServeur(
                "ERREUR VIDAGE TABLE\n" +
                "-------------------\n" +
                "Route appelée : " + url + "\n\n" +
                "Détail : " + erreur.message
            );

            alert("Impossible de vider la table trading_capture.\n\nDétail : " + erreur.message);
        }
    }

    function ouvrirServeurRender() {
        window.open(getApiBaseUrl(), "_blank");
    }

    async function appelerJson(url, options = {}) {
        try {
            const urlFinale = String(url || "").replace("https://https://", "https://");

            console.log("APPEL JSON - URL :", urlFinale);
            console.log("APPEL JSON - OPTIONS :", options);

            const reponse = await fetch(urlFinale, {
                ...options,
                mode: "cors",
                credentials: "omit",
                cache: "no-store",
                headers: {
                    "Accept": "application/json",
                    ...(options.headers || {})
                }
            });

            const texte = await reponse.text();

            console.log("STATUT HTTP :", reponse.status);
            console.log("RÉPONSE BRUTE :", texte);

            let json;

            try {
                json = JSON.parse(texte);
            } catch (erreurJson) {
                throw new Error("Le serveur n'a pas retourné du JSON. Réponse reçue : " + texte);
            }

            if (!reponse.ok) {
                throw new Error(json.detail || json.message || "Réponse HTTP " + reponse.status);
            }

            return json;

        } catch (erreur) {
            console.error("ERREUR DANS appelerJson :", erreur);
            throw erreur;
        }
    }

    async function testerServeur() {
        const urlTest = getApiTestUrl();
        const debut = performance.now();
        afficherEtatServeur("warning", "Test du serveur en cours...");
        afficherInfosServeur("Test de la route :\n" + urlTest);

        try {
            const resultat = await appelerJson(urlTest, { method: "GET", cache: "no-store" });
            const duree = Math.round(performance.now() - debut);
            afficherEtatServeur("ok", "Serveur connecté");
            afficherInfosServeur("TEST RÉUSSI\n-----------\nRoute : " + urlTest + "\nTemps : " + duree + " ms\n\n" + JSON.stringify(resultat, null, 4));
        } catch (erreur) {
            afficherEtatServeur("error", "Serveur inaccessible");
            afficherInfosServeur("TEST ÉCHOUÉ\n-----------\nRoute : " + urlTest + "\n\n" + erreur.message);
        }
    }

    async function creerTablePostgres() {
        const url = getApiCreerTableUrl();
        afficherEtatServeur("warning", "Création de la table...");
        afficherInfosServeur("Appel :\n" + url);

        try {
            const resultat = await appelerJson(url, { method: "GET", cache: "no-store" });
            afficherEtatServeur("ok", "Table PostgreSQL prête");
            afficherInfosServeur(JSON.stringify(resultat, null, 4));
            alert("Table PostgreSQL créée ou déjà existante.");
        } catch (erreur) {
            afficherEtatServeur("error", "Erreur table PostgreSQL");
            afficherInfosServeur("Impossible de créer la table.\n\n" + erreur.message);
            alert("Impossible de créer la table PostgreSQL.");
        }
    }

    async function verifierTablePostgres() {
        const url = getApiVerifierTableUrl();
        afficherEtatServeur("warning", "Vérification de la table...");
        afficherInfosServeur("Appel :\n" + url);

        try {
            const resultat = await appelerJson(url, { method: "GET", cache: "no-store" });
            afficherEtatServeur(resultat.tableExiste ? "ok" : "warning", resultat.tableExiste ? "Table existante" : "Table absente");
            afficherInfosServeur(JSON.stringify(resultat, null, 4));
        } catch (erreur) {
            afficherEtatServeur("error", "Erreur vérification table");
            afficherInfosServeur("Impossible de vérifier la table.\n\n" + erreur.message);
        }
    }

    function capturerConfigurationTradingView(afficherAlerte = true) {
        configurationActuelle = {
            nom: "Configuration TradingView IA",
            dateCapture: new Date().toISOString(),
            serveur: {
                apiAnalyse: getApiAnalyseUrl(),
                apiTest: getApiTestUrl(),
                apiMarche: getApiMarcheUrl(),
                apiCaptures: getApiCapturesUrl(),
                apiViderCaptures: getApiViderCapturesUrl(),
                hebergeur: "Render",
                type: "Node.js"
            },
            graphique: {
                actif: valeurElement("asset-selector", "BINANCE:BTCUSDT"),
                actifLibelle: libelleElement("asset-selector", "Bitcoin / USDT"),
                intervalle: valeurElement("interval-selector", "D"),
                intervalleLibelle: libelleElement("interval-selector", "1 jour"),
                indicateur: valeurElement("indicator-selector", "RSI"),
                indicateurLibelle: libelleElement("indicator-selector", "RSI"),
                typeBougie: valeurElement("type-bougie", "bougies_japonaises"),
                typeBougieLibelle: libelleElement("type-bougie", "Bougies japonaises"),
                source: "widget_tradingview_integre"
            },
            analyseIA: {
                categorie: getCategorieAnalyseBTC(),
                categorieLibelle: getLibelleCategorieAnalyseBTC(),
                descriptionCategorie: getDescriptionCategorieAnalyseBTC(),
                strategie: valeurElement("strategie-selector", "suivi_tendance"),
                statut: "pret_pour_analyse"
            },
            risque: {
                capitalInitial: nombreElement("capital-input", 1000),
                risqueParPositionPourcent: nombreElement("risk-input", 1),
                stopLossPourcent: nombreElement("stoploss-input", 2),
                takeProfitPourcent: nombreElement("takeprofit-input", 4),
                levier: nombreElement("levier-input", 1),
                sens: valeurElement("sens-selector", "achat_vente")
            },
            snapshot: {
                url: valeurElement("snapshot-url", ""),
                categorieAnalyse: getCategorieAnalyseBTC(),
                categorieAnalyseLibelle: getLibelleCategorieAnalyseBTC(),
                descriptionCategorieAnalyse: getDescriptionCategorieAnalyseBTC(),
                screenshotBase64: null
            },
            marche: null,
            notes: valeurElement("notes-analyse", "").trim(),
            limites: {
                captureCompleteTradingView: false,
                dessinsInternesTradingView: false,
                remarque: "La page capture les paramètres contrôlés par l'interface HTML."
            }
        };

        afficherConfiguration(configurationActuelle);
        afficherStatus("Configuration capturée avec succès.");

        if (afficherAlerte) alert("Configuration capturée.");

        return configurationActuelle;
    }

    async function capturerEtEnregistrerConfiguration() {
        try {
            capturerConfigurationTradingView(false);

            afficherStatus("Capture en cours, ajout des données de marché...");

            await enrichirConfigurationAvecDonneesMarche(false);

            await enregistrerCapturePostgres(true, false);

        } catch (erreur) {
            console.error("Erreur capture et enregistrement :", erreur);
            afficherStatus("Erreur pendant la capture et l'enregistrement.");
            alert("Erreur pendant la capture et l'enregistrement : " + erreur.message);
        }
    }

    async function enrichirConfigurationAvecDonneesMarche(afficherAlerte = true) {
        if (!configurationActuelle) capturerConfigurationTradingView(false);

        const urlMarche = getApiMarcheUrl();
        afficherStatus("Récupération des données de marché...");
        afficherEtatServeur("warning", "Appel /api/marche...");

        try {
            const donneesMarche = await appelerJson(urlMarche, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                cache: "no-store",
                body: JSON.stringify({
                    actif: configurationActuelle.graphique.actif,
                    intervalle: configurationActuelle.graphique.intervalle,
                    indicateur: configurationActuelle.graphique.indicateur,
                    categorieAnalyse: configurationActuelle.analyseIA.categorie
                })
            });

            configurationActuelle.marche = {
                prixActuel: donneesMarche.prixActuel ?? null,
                support: donneesMarche.support ?? null,
                resistance: donneesMarche.resistance ?? null,
                rsi: donneesMarche.rsi ?? null,
                ema20: donneesMarche.ema20 ?? null,
                ema50: donneesMarche.ema50 ?? null,
                macd: donneesMarche.macd ?? null,
                volume: donneesMarche.volume ?? "neutre",
                tendance: donneesMarche.tendance ?? "neutre",
                source: donneesMarche.source ?? "serveur_nodejs",
                api: urlMarche,
                dateMiseAJour: new Date().toISOString()
            };

            localStorage.setItem("configurationTradingViewIA", JSON.stringify(configurationActuelle));
            afficherConfiguration(configurationActuelle);
            afficherEtatServeur("ok", "Données de marché reçues");
            afficherStatus("Configuration enrichie avec les données de marché.");
            afficherInfosServeur(JSON.stringify(donneesMarche, null, 4));
            if (afficherAlerte) alert("Données de marché ajoutées.");
        } catch (erreur) {
            afficherEtatServeur("error", "Erreur /api/marche");
            afficherStatus("Impossible de récupérer les données de marché.");
            afficherInfosServeur("ERREUR /api/marche\n-----------------\nAdresse : " + urlMarche + "\n\n" + erreur.message);
            if (afficherAlerte) alert("Impossible d'ajouter les données de marché.");
        }
    }

    function nettoyerNomFichier(valeur) {
        return String(valeur || "non-defini")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9-_]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");
    }

    function genererTimestampFichier() {
        const maintenant = new Date();
        const annee = maintenant.getFullYear();
        const mois = String(maintenant.getMonth() + 1).padStart(2, "0");
        const jour = String(maintenant.getDate()).padStart(2, "0");
        const heure = String(maintenant.getHours()).padStart(2, "0");
        const minute = String(maintenant.getMinutes()).padStart(2, "0");
        const seconde = String(maintenant.getSeconds()).padStart(2, "0");
        return annee + mois + jour + "-" + heure + minute + seconde;
    }

    function genererNomCapturePostgres(configuration) {
        const actif = nettoyerNomFichier(configuration.graphique.actif);
        const indicateur = nettoyerNomFichier(configuration.graphique.indicateur);

        const categorieAnalyse =
            configuration?.analyseIA?.categorieLibelle ||
            configuration?.analyseIA?.categorie ||
            configuration?.snapshot?.categorieAnalyseLibelle ||
            configuration?.snapshot?.categorieAnalyse ||
            "Liquidité de marché";

        const categorie = nettoyerNomFichier(categorieAnalyse);
        const timestamp = genererTimestampFichier();

        /*
            Format demandé :
            ACTIF-INDICATEUR-CATEGORIE_ANALYSE-TIMESTAMP

            Exemple :
            BINANCE-BTCUSDT-RSI-ANALYSE-TECHNIQUE-20260510-154233
        */
        return actif + "-" + indicateur + "-" + categorie + "-" + timestamp;
    }

    function obtenirScreenshotBase64DepuisConfiguration() {
        if (!configurationActuelle || !configurationActuelle.snapshot) return null;
        return configurationActuelle.snapshot.screenshotBase64 || null;
    }

    async function enregistrerCapturePostgres(afficherAlerte = true, capturerAvant = true) {
        try {
            if (capturerAvant) {
                capturerConfigurationTradingView(false);
            }

            if (!configurationActuelle) {
                throw new Error("configurationActuelle est vide ou non définie.");
            }

            if (!configurationActuelle.graphique) {
                throw new Error("configurationActuelle.graphique est vide ou non défini.");
            }

            const urlCaptures = getApiCapturesUrl();
            const nomCapture = genererNomCapturePostgres(configurationActuelle);
            const screenshotBase64 = obtenirScreenshotBase64DepuisConfiguration();

            configurationActuelle.nomCapture = nomCapture;

            const categorieAnalyse =
                configurationActuelle?.analyseIA?.categorieLibelle ||
                configurationActuelle?.analyseIA?.categorie ||
                configurationActuelle?.snapshot?.categorieAnalyseLibelle ||
                configurationActuelle?.snapshot?.categorieAnalyse ||
                "Liquidité de marché";

            const donneesAEnregistrer = {
                actif: configurationActuelle.graphique.actif || "NON_RENSEIGNE",
                indicateur: configurationActuelle.graphique.indicateur || null,
                intervalle: configurationActuelle.graphique.intervalle || null,

                /*
                    On garde nom_fichier pour compatibilité avec ton ancien code.
                    On ajoute nom_capture pour la nouvelle colonne.
                    On ajoute aussi categorie_analyse pour server.js.
                */
                nom_fichier: nomCapture || ("capture-" + new Date().toISOString()),
                nom_capture: nomCapture || ("capture-" + new Date().toISOString()),
                categorie_analyse: categorieAnalyse,
                categorieAnalyse: categorieAnalyse,

                configuration_json: configurationActuelle,

                /*
                    Je garde ton choix actuel :
                    screenshot désactivé pour éviter les erreurs de taille ou de capture.
                */
                screenshot_base64: null
            };

            console.log("URL PostgreSQL :", urlCaptures);
            console.log("Données envoyées :", donneesAEnregistrer);

            afficherStatus("Enregistrement dans PostgreSQL...");
            afficherEtatServeur("warning", "Envoi vers PostgreSQL...");
            afficherInfosServeur(
                "ENVOI EN COURS\n" +
                "--------------\n" +
                "Route : " + urlCaptures + "\n" +
                "Table : trading_capture\n" +
                "Nom capture : " + donneesAEnregistrer.nom_capture
            );

            const reponse = await fetch(urlCaptures, {
                method: "POST",
                mode: "cors",
                credentials: "omit",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                cache: "no-store",
                body: JSON.stringify(donneesAEnregistrer)
            });

            const texte = await reponse.text();

            console.log("Statut HTTP :", reponse.status);
            console.log("Réponse brute serveur :", texte);

            let resultat;

            try {
                resultat = JSON.parse(texte);
            } catch (erreurJson) {
                throw new Error("Réponse non JSON du serveur : " + texte);
            }

            if (!reponse.ok || resultat.ok !== true) {
                throw new Error(resultat.detail || resultat.message || "Erreur serveur inconnue.");
            }

            console.log("Réponse PostgreSQL :", resultat);

            if (!resultat || resultat.ok !== true || resultat.statut !== "ok") {
                throw new Error("Réponse serveur incorrecte : " + JSON.stringify(resultat));
            }

            localStorage.setItem(
                "configurationTradingViewIA",
                JSON.stringify(configurationActuelle)
            );

            afficherStatus("Configuration enregistrée dans PostgreSQL.");
            afficherEtatServeur("ok", "Enregistrement réussi");
            afficherInfosServeur(
                "ENREGISTREMENT RÉUSSI\n" +
                "----------------------\n" +
                JSON.stringify(resultat, null, 4)
            );

            await chargerListeCapturesPostgres(false);

            if (afficherAlerte) {
                alert(
                    "Configuration enregistrée dans la base de données.\n\n" +
                    "Nom de la capture : " + donneesAEnregistrer.nom_capture
                );
            }

        } catch (erreur) {
            console.error("Erreur complète d'enregistrement PostgreSQL :", erreur);

            afficherStatus("Erreur lors de l'enregistrement.");
            afficherEtatServeur("error", "Erreur base de données");
            afficherInfosServeur(
                "ERREUR D'ENREGISTREMENT\n" +
                "-----------------------\n" +
                erreur.message
            );

            alert("Impossible d'enregistrer dans la base de données : " + erreur.message);
        }
    }

    async function chargerListeCapturesPostgres(afficherAlerte = true) {
        /*
            On garde l'ancienne URL fixe qui fonctionnait hier.
        */
        const urlCaptures = "https://trading-g8ie.onrender.com/api/captures";

        const select = document.getElementById("liste-captures-postgres");
        if (!select) return;

        afficherStatus("Chargement de la liste PostgreSQL...");
        afficherEtatServeur("warning", "Lecture /api/captures...");

        try {
            console.log("URL utilisée pour charger la liste :", urlCaptures);

            const resultat = await appelerJson(urlCaptures, { method: "GET", cache: "no-store" });

            select.innerHTML = '<option value="">Choisir une configuration</option>';

            if (!resultat.captures || resultat.captures.length === 0) {
                select.innerHTML = '<option value="">Aucune configuration enregistrée</option>';
            } else {
                resultat.captures.forEach(function(capture) {
                    const option = document.createElement("option");

                    /*
                        Important :
                        La valeur reste l'id, car la route de chargement est /api/captures/:id.
                    */
                    option.value = capture.id;

                    const dateCapture = capture.date_capture
                        ? new Date(capture.date_capture).toLocaleString("fr-CA")
                        : "date inconnue";

                    const nomCapture =
                        capture.nom_capture ||
                        capture.nom_fichier ||
                        (
                            (capture.actif || "actif") +
                            "-" +
                            (capture.indicateur || "indicateur") +
                            "-" +
                            dateCapture
                        );

                    /*
                        Affichage demandé :
                        on affiche le nom_capture dans la liste déroulante.
                    */
                    option.textContent =
                        capture.id +
                        " - " +
                        nomCapture +
                        " - " +
                        dateCapture;

                    select.appendChild(option);
                });
            }

            afficherStatus("Liste PostgreSQL chargée.");
            afficherEtatServeur("ok", "Captures chargées");
            afficherInfosServeur(
                "LISTE DES CAPTURES\n" +
                "------------------\n" +
                "Nombre : " + (resultat.captures ? resultat.captures.length : 0)
            );

            if (afficherAlerte) alert("Liste des captures chargée.");
        } catch (erreur) {
            afficherStatus("Impossible de charger la liste PostgreSQL.");
            afficherEtatServeur("error", "Erreur lecture /api/captures");
            afficherInfosServeur(
                "ERREUR LECTURE /api/captures\n" +
                "---------------------------\n" +
                erreur.message
            );

            if (afficherAlerte) alert("Impossible de charger la liste PostgreSQL.");
        }
    }

    async function chargerCapturePostgresSelectionnee() {
        const select = document.getElementById("liste-captures-postgres");
        if (!select || !select.value) {
            alert("Choisir une capture dans la liste.");
            return;
        }

        const urlCapture = getApiCapturesUrl() + "/" + encodeURIComponent(select.value);

        afficherStatus("Chargement de la capture PostgreSQL...");
        afficherEtatServeur("warning", "Lecture capture PostgreSQL...");

        try {
            const resultat = await appelerJson(urlCapture, { method: "GET", cache: "no-store" });
            const capture = resultat.capture;

            configurationActuelle = capture.configuration_json || null;

            if (!configurationActuelle) {
                throw new Error("La capture ne contient pas configuration_json.");
            }

            appliquerConfiguration(configurationActuelle);
            afficherConfiguration(configurationActuelle);
            afficherScreenshotPostgres(capture.screenshot_base64);
            localStorage.setItem("configurationTradingViewIA", JSON.stringify(configurationActuelle));

            afficherStatus("Capture PostgreSQL chargée.");
            afficherEtatServeur("ok", "Capture chargée");
            afficherInfosServeur(
                "CAPTURE CHARGÉE\n" +
                "---------------\n" +
                "ID : " + capture.id + "\n" +
                "Nom capture : " + (capture.nom_capture || capture.nom_fichier || "non renseigné") + "\n" +
                "Actif : " + capture.actif
            );

            alert("Capture PostgreSQL chargée.");
        } catch (erreur) {
            afficherStatus("Impossible de charger la capture PostgreSQL.");
            afficherEtatServeur("error", "Erreur capture PostgreSQL");
            afficherInfosServeur(
                "ERREUR CHARGEMENT CAPTURE\n" +
                "--------------------------\n" +
                erreur.message
            );

            alert("Impossible de charger la capture sélectionnée.");
        }
    }

    function afficherScreenshotPostgres(screenshotBase64) {
        const image = document.getElementById("image-capture-postgres");
        if (!image) return;

        if (screenshotBase64 && String(screenshotBase64).trim() !== "") {
            image.src = screenshotBase64;
            image.style.display = "block";
        } else {
            image.removeAttribute("src");
            image.style.display = "none";
        }
    }

    function appliquerConfiguration(configuration) {
        if (!configuration || !configuration.graphique) return;

        definirValeur("asset-selector", configuration.graphique.actif);
        definirValeur("interval-selector", configuration.graphique.intervalle);
        definirValeur("indicator-selector", configuration.graphique.indicateur);
        definirValeur("type-bougie", configuration.graphique.typeBougie);

        if (configuration.analyseIA) {
            definirValeur("categorie-analyse-btc", configuration.analyseIA.categorie);
            definirValeur("strategie-selector", configuration.analyseIA.strategie);
            actualiserDescriptionCategorie();
        }

        if (configuration.risque) {
            definirValeur("capital-input", configuration.risque.capitalInitial);
            definirValeur("risk-input", configuration.risque.risqueParPositionPourcent);
            definirValeur("stoploss-input", configuration.risque.stopLossPourcent);
            definirValeur("takeprofit-input", configuration.risque.takeProfitPourcent);
            definirValeur("levier-input", configuration.risque.levier);
            definirValeur("sens-selector", configuration.risque.sens);
        }

        if (configuration.snapshot) definirValeur("snapshot-url", configuration.snapshot.url);
        if (configuration.serveur && configuration.serveur.apiAnalyse) definirValeur("api-url", configuration.serveur.apiAnalyse);
        if (configuration.notes !== undefined) definirValeur("notes-analyse", configuration.notes);

        creerWidgetTradingView();
    }

    function definirValeur(id, valeur) {
        const element = document.getElementById(id);
        if (element && valeur !== undefined && valeur !== null) element.value = valeur;
    }

    function rechargerConfigurationTradingView() {
        const data = localStorage.getItem("configurationTradingViewIA");
        if (!data) {
            alert("Aucune configuration sauvegardée.");
            return;
        }

        try {
            configurationActuelle = JSON.parse(data);
            appliquerConfiguration(configurationActuelle);
            afficherConfiguration(configurationActuelle);
            afficherStatus("Configuration rechargée.");
            alert("Configuration rechargée.");
        } catch (erreur) {
            alert("Erreur : configuration sauvegardée invalide.");
        }
    }

    async function ouvrirPageDecision() {
        try {
            capturerConfigurationTradingView(false);

            afficherStatus("Préparation du snapshot avec les données de marché...");

            await enrichirConfigurationAvecDonneesMarche(false);

            localStorage.setItem(
                "configurationTradingViewIA",
                JSON.stringify(configurationActuelle)
            );

            window.open("decisions.html", "_blank");

        } catch (erreur) {
            console.error("Erreur ouverture decisions.html :", erreur);

            if (!configurationActuelle) {
                capturerConfigurationTradingView(false);
            }

            localStorage.setItem(
                "configurationTradingViewIA",
                JSON.stringify(configurationActuelle)
            );

            alert(
                "Les données de marché n'ont pas pu être ajoutées. " +
                "La page de décision va s'ouvrir avec les données disponibles."
            );

            window.open("decisions.html", "_blank");
        }
    }

    function importerJSONDepuisFichier(event) {
        const fichier = event.target.files[0];
        if (!fichier) return;

        const lecteur = new FileReader();
        lecteur.onload = function(e) {
            try {
                const configuration = JSON.parse(e.target.result);
                if (!configuration.graphique) throw new Error("Le fichier JSON ne contient pas de bloc graphique.");
                configurationActuelle = configuration;
                appliquerConfiguration(configurationActuelle);
                afficherConfiguration(configurationActuelle);
                localStorage.setItem("configurationTradingViewIA", JSON.stringify(configurationActuelle));
                afficherStatus("Configuration JSON importée.");
                alert("Configuration JSON importée avec succès.");
            } catch (erreur) {
                alert("Import impossible. Fichier JSON invalide.\n\n" + erreur.message);
            }

            event.target.value = "";
        };

        lecteur.readAsText(fichier);
    }

async function viderTableCaptures() {
    const confirmation = confirm(
        "Attention : cette action va supprimer toutes les captures enregistrées.\n\n" +
        "Voulez-vous vraiment vider la table trading_capture ?"
    );

    if (!confirmation) {
        return;
    }

    const motDePasse = await demanderMotDePasseAdmin();

    if (!motDePasse || motDePasse.trim() === "") {
        alert("Suppression annulée : mot de passe absent.");
        return;
    }

    try {
        const reponse = await fetch("https://trading-g8ie.onrender.com/api/vider-captures", {
            method: "POST",
            mode: "cors",
            credentials: "omit",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            cache: "no-store",
            body: JSON.stringify({
                motDePasse: motDePasse.trim()
            })
        });

        const texte = await reponse.text();
        const resultat = JSON.parse(texte);

        if (!reponse.ok || resultat.ok !== true) {
            throw new Error(resultat.message || "Erreur inconnue.");
        }

        alert("La table trading_capture a été vidée avec succès.");

        if (typeof chargerListeCapturesPostgres === "function") {
            chargerListeCapturesPostgres(false);
        }

    } catch (erreur) {
        alert("Impossible de vider la table trading_capture : " + erreur.message);
        console.error("Erreur vidage table :", erreur);
    }
}
    document.addEventListener("DOMContentLoaded", function () {
        const champApi = document.getElementById("api-url");
        if (champApi && !champApi.value.trim()) {
            champApi.value = API_BASE_URL_PAR_DEFAUT + "/api/analyse";
        }

        const selectCategorie = document.getElementById("categorie-analyse-btc");
        if (selectCategorie) {
            selectCategorie.addEventListener("change", function () {
                actualiserDescriptionCategorie();

                if (configurationActuelle) {
                    configurationActuelle.analyseIA.categorie = getCategorieAnalyseBTC();
                    configurationActuelle.analyseIA.categorieLibelle = getLibelleCategorieAnalyseBTC();
                    configurationActuelle.analyseIA.descriptionCategorie = getDescriptionCategorieAnalyseBTC();
                    afficherConfiguration(configurationActuelle);
                }
            });
        }

        actualiserDescriptionCategorie();
        creerWidgetTradingView();
        chargerListeCapturesPostgres(false);
    });
</script>
</body>
</html>Fichiers modifiés pour Trading Station IA

Variable Render utilisée :
ADMIN_DELETE_PASSWORD

À faire :
1. Remplacer index.html par le fichier index.html fourni.
2. Remplacer server.js par le fichier server.js fourni.
3. Vérifier dans Render que la variable ADMIN_DELETE_PASSWORD existe dans Environment.
4. Vérifier que DATABASE_URL existe toujours.
5. Redéployer le service Render.

Fonctionnement :
- Le bouton "Vider la table" demande maintenant un mot de passe.
- index.html envoie ce mot de passe à /api/vider-captures.
- server.js compare ce mot de passe avec process.env.ADMIN_DELETE_PASSWORD.
- Si le mot de passe est faux ou absent, la table n'est pas vidée.
PK    :R�\����'   /   
   .gitignore��OI���O)�I-�W���K�+RZz��`�*� L�gi PK    xT�\����(  �  %PDF-1.7
%🖤
5 0 obj
<</Filter /FlateDecode/Length 2054>>
stream
x��YK�G�ϯ�ِq������!vİā%I��e7`��C�U�խ��58E�5S�Sϯ=�7�~����l�3Zm�/�׉��j���߄Ϸ/��-���˿SX4NΆ1c͆s!f�N[�|{�>O���8L���k����D>A-�
��b�y��ke�>�Re1^A�� �+6/���y�l����>�I"f���O��ZSET PATH=%PATH%;C:\Program Files\Git\cmd

cd C:\xampp\htdocs\trading

git status

git add .

git commit -m "Mise à jour "

git push origin main

git status
git rm index.html
git commit -m "Supprimer ancien index.html"
git push origin main

git add index.html
git commit -m "Ajouter nouveau index.html"
git push origin main
{
  "name": "trading-pattern-ia",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "trading-pattern-ia",
      "version": "1.0.0",
      "dependencies": {
        "cors": "^2.8.5",
        "express": "^4.18.3",
        "pg": "^8.13.1"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/accepts": {
      "version": "1.3.8",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.8.tgz",
      "integrity": "sha512-PYAthTa2m2VKxuvSD3DPC/Gy+U+sOA1LAuT8mkmRuvw+NACSaeXEQ+NHcVF7rONl6qcaxV3Uuemwawk+7+SJLw==",
      "license": "MIT",
      "dependencies": {
        "mime-types": "~2.1.34",
        "negotiator": "0.6.3"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/array-flatten": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/array-flatten/-/array-flatten-1.1.1.tgz",
      "integrity": "sha512-PCVAQswWemu6UdxsDFFX/+gVeYqKAod3D3UVm91jHwynguOwAvYPhx8nNlM++NqRcK6CxxpUafjmhIdKiHibqg==",
      "license": "MIT"
    },
    "node_modules/body-parser": {
      "version": "1.20.5",
      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-1.20.5.tgz",
      "integrity": "sha512-3grm+/2tUOvu2cjJkvsIxrv/wVpfXQW4PsQHYm7yk4vfpu7Ekl6nEsYBoJUL6qDwZUx8wUhQ8tR2qz+ad9c9OA==",
      "license": "MIT",
      "dependencies": {
        "bytes": "~3.1.2",
        "content-type": "~1.0.5",
        "debug": "2.6.9",
        "depd": "2.0.0",
        "destroy": "~1.2.0",
        "http-errors": "~2.0.1",
        "iconv-lite": "~0.4.24",
        "on-finished": "~2.4.1",
        "qs": "~6.15.1",
        "raw-body": "~2.5.3",
        "type-is": "~1.6.18",
        "unpipe": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8",
        "npm": "1.2.8000 || >= 1.4.16"
      }
    },
    "node_modules/body-parser/node_modules/qs": {
      "version": "6.15.1",
      "resolved": "https://registry.npmjs.org/qs/-/qs-6.15.1.tgz",
      "integrity": "sha512-6YHEFRL9mfgcAvql/XhwTvf5jKcOiiupt2FiJxHkiX1z4j7WL8J/jRHYLluORvc1XxB5rV20KoeK00gVJamspg==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "side-channel": "^1.1.0"
      },
      "engines": {
        "node": ">=0.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/bytes": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.1.2.tgz",
      "integrity": "sha512-/Nf7TyzTx6S3yRJObOAV7956r8cr2+Oj8AC5dt8wSP3BQAoeX58NoHyCU8P8zGkNXStjTSi6fzO6F0pBdcYbEg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/call-bind-apply-helpers": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/call-bound": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/call-bound/-/call-bound-1.0.4.tgz",
      "integrity": "sha512-+ys997U96po4Kx/ABpBCqhA9EuxJaQWDQg7295H4hBphv3IZg0boBKuwYpt4YXp6MZ5AmZQnU/tyMTlRpaSejg==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "get-intrinsic": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/content-disposition": {
      "version": "0.5.4",
      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-0.5.4.tgz",
      "integrity": "sha512-FveZTNuGw04cxlAiWbzi6zTAL/lhehaWbTtgluJh4/E95DqMwTmha3KZN1aAWA8cFIhHzMZUvLevkw5Rqk+tSQ==",
      "license": "MIT",
      "dependencies": {
        "safe-buffer": "5.2.1"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/content-type": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/content-type/-/content-type-1.0.5.tgz",
      "integrity": "sha512-nTjqfcBFEipKdXCv4YDQWCfmcLZKm81ldF0pAopTvyrFGVbcR6P/VAAd5G7N+0tTr8QqiU0tFadD6FK4NtJwOA==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/cookie": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.7.2.tgz",
      "integrity": "sha512-yki5XnKuf750l50uGTllt6kKILY4nQ1eNIQatoXEByZ5dWgnKqbnqmTrBE5B4N7lrMJKQ2ytWMiTO2o0v6Ew/w==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/cookie-signature": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.7.tgz",
      "integrity": "sha512-NXdYc3dLr47pBkpUCHtKSwIOQXLVn8dZEuywboCOJY/osA0wFSLlSawr3KN8qXJEyX66FcONTH8EIlVuK0yyFA==",
      "license": "MIT"
    },
    "node_modules/cors": {
      "version": "2.8.6",
      "resolved": "https://registry.npmjs.org/cors/-/cors-2.8.6.tgz",
      "integrity": "sha512-tJtZBBHA6vjIAaF6EnIaq6laBBP9aq/Y3ouVJjEfoHbRBcHBAHYcMh/w8LDrk2PvIMMq8gmopa5D4V8RmbrxGw==",
      "license": "MIT",
      "dependencies": {
        "object-assign": "^4",
        "vary": "^1"
      },
      "engines": {
        "node": ">= 0.10"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/debug": {
      "version": "2.6.9",
      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
      "license": "MIT",
      "dependencies": {
        "ms": "2.0.0"
      }
    },
    "node_modules/depd": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/depd/-/depd-2.0.0.tgz",
      "integrity": "sha512-g7nH6P6dyDioJogAAGprGpCtVImJhpPk/roCzdb3fIh61/s/nPsfR6onyMwkCAR/OlC3yBC0lESvUoQEAssIrw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/destroy": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/destroy/-/destroy-1.2.0.tgz",
      "integrity": "sha512-2sJGJTaXIIaR1w4iJSNoN0hnMY7Gpc/n8D4qSCJw8QqFWXf7cuAgnEHxBpweaVcPevC2l3KpjYCx3NypQQgaJg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8",
        "npm": "1.2.8000 || >= 1.4.16"
      }
    },
    "node_modules/dunder-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/ee-first": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
      "integrity": "sha512-WMwm9LhRUo+WUaRN+vRuETqG89IgZphVSNkdFgeb6sS/E4OrDIN7t48CAewSHXc6C8lefD8KKfr5vY61brQlow==",
      "license": "MIT"
    },
    "node_modules/encodeurl": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-2.0.0.tgz",
      "integrity": "sha512-Q0n9HRi4m6JuGIV1eFlmvJB7ZEVxu93IrMyiMsGC0lrMJMWzRgx6WGquyfQgZVb31vhGgXnfmPNNXmxnOkRBrg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/es-define-property": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-object-atoms": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.1.tgz",
      "integrity": "sha512-FGgH2h8zKNim9ljj7dankFPcICIK9Cp5bm+c2gQSYePhpaG5+esrLODihIorn+Pe6FGJzWhXQotPv73jTaldXA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/escape-html": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
      "integrity": "sha512-NiSupZ4OeuGwr68lGIeym/ksIZMJodUGOSCZ/FSnTxcrekbvqrgdUxlJOMpijaKZVjAJrWrGs/6Jy8OMuyj9ow==",
      "license": "MIT"
    },
    "node_modules/etag": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz",
      "integrity": "sha512-aIL5Fx7mawVa300al2BnEE4iNvo1qETxLrPI/o05L7z6go7fCw1J6EQmbK4FmJ2AS7kgVF/KEZWufBfdClMcPg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/express": {
      "version": "4.22.1",
      "resolved": "https://registry.npmjs.org/express/-/express-4.22.1.tgz",
      "integrity": "sha512-F2X8g9P1X7uCPZMA3MVf9wcTqlyNp7IhH5qPCI0izhaOIYXaW9L535tGA3qmjRzpH+bZczqq7hVKxTR4NWnu+g==",
      "license": "MIT",
      "dependencies": {
        "accepts": "~1.3.8",
        "array-flatten": "1.1.1",
        "body-parser": "~1.20.3",
        "content-disposition": "~0.5.4",
        "content-type": "~1.0.4",
        "cookie": "~0.7.1",
        "cookie-signature": "~1.0.6",
        "debug": "2.6.9",
        "depd": "2.0.0",
        "encodeurl": "~2.0.0",
        "escape-html": "~1.0.3",
        "etag": "~1.8.1",
        "finalhandler": "~1.3.1",
        "fresh": "~0.5.2",
        "http-errors": "~2.0.0",
        "merge-descriptors": "1.0.3",
        "methods": "~1.1.2",
        "on-finished": "~2.4.1",
        "parseurl": "~1.3.3",
        "path-to-regexp": "~0.1.12",
        "proxy-addr": "~2.0.7",
        "qs": "~6.14.0",
        "range-parser": "~1.2.1",
        "safe-buffer": "5.2.1",
        "send": "~0.19.0",
        "serve-static": "~1.16.2",
        "setprototypeof": "1.2.0",
        "statuses": "~2.0.1",
        "type-is": "~1.6.18",
        "utils-merge": "1.0.1",
        "vary": "~1.1.2"
      },
      "engines": {
        "node": ">= 0.10.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/finalhandler": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-1.3.2.tgz",
      "integrity": "sha512-aA4RyPcd3badbdABGDuTXCMTtOneUCAYH/gxoYRTZlIJdF0YPWuGqiAsIrhNnnqdXGswYk6dGujem4w80UJFhg==",
      "license": "MIT",
      "dependencies": {
        "debug": "2.6.9",
        "encodeurl": "~2.0.0",
        "escape-html": "~1.0.3",
        "on-finished": "~2.4.1",
        "parseurl": "~1.3.3",
        "statuses": "~2.0.2",
        "unpipe": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/forwarded": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/forwarded/-/forwarded-0.2.0.tgz",
      "integrity": "sha512-buRG0fpBtRHSTCOASe6hD258tEubFoRLb4ZNA6NxMVHNw2gOcwHo9wyablzMzOA5z9xA9L1KNjk/Nt6MT9aYow==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/fresh": {
      "version": "0.5.2",
      "resolved": "https://registry.npmjs.org/fresh/-/fresh-0.5.2.tgz",
      "integrity": "sha512-zJ2mQYM18rEFOudeV4GShTGIQ7RbzA7ozbU9I/XBpm7kqgMywgmylMwXHxZJmkVoYkna9d2pVXVXPdYTP9ej8Q==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-intrinsic": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "function-bind": "^1.1.2",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-proto/-/get-proto-1.0.1.tgz",
      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/gopd": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.3.tgz",
      "integrity": "sha512-ej4AhfhfL2Q2zpMmLo7U1Uv9+PyhIZpgQLGT1F9miIGmiCJIoCgSmczFdrc97mWT4kVY72KA+WnnhJ5pghSvSg==",
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/http-errors": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-2.0.1.tgz",
      "integrity": "sha512-4FbRdAX+bSdmo4AUFuS0WNiPz8NgFt+r8ThgNWmlrjQjt1Q7ZR9+zTlce2859x4KSXrwIsaeTqDoKQmtP8pLmQ==",
      "license": "MIT",
      "dependencies": {
        "depd": "~2.0.0",
        "inherits": "~2.0.4",
        "setprototypeof": "~1.2.0",
        "statuses": "~2.0.2",
        "toidentifier": "~1.0.1"
      },
      "engines": {
        "node": ">= 0.8"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/iconv-lite": {
      "version": "0.4.24",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.24.tgz",
      "integrity": "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==",
      "license": "MIT",
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/inherits": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
      "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
      "license": "ISC"
    },
    "node_modules/ipaddr.js": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-1.9.1.tgz",
      "integrity": "sha512-0KI/607xoxSToH7GjN1FfSbLoU0+btTicjsQSWQlh/hZykN8KpmMf7uYwPW3R+akZ6R/w18ZlXSHBYXiYUPO3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/math-intrinsics": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/media-typer": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz",
      "integrity": "sha512-dq+qelQ9akHpcOl/gUVRTxVIOkAJ1wR3QAvb4RsVjS8oVoFjDGTc679wJYmUmknUF5HwMLOgb5O+a3KxfWapPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/merge-descriptors": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-1.0.3.tgz",
      "integrity": "sha512-gaNvAS7TZ897/rVaZ0nMtAyxNyi/pdbjbAwUpFQpN70GqnVfOiXpeUUMKRBmzXaSQ8DdTX4/0ms62r2K+hE6mQ==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/methods": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/methods/-/methods-1.1.2.tgz",
      "integrity": "sha512-iclAHeNqNm68zFtnZ0e+1L2yUIdvzNoauKU4WBA3VvH/vPFieF7qfRlwUZU+DA9P9bPXIS90ulxoUoCH23sV2w==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/mime/-/mime-1.6.0.tgz",
      "integrity": "sha512-x0Vn8spI+wuJ1O6S7gnbaQg8Pxh4NNHb7KSINmEWKiPE4RKOplvijn+NkmYmmRgP68mc70j2EbeTFRsrswaQeg==",
      "license": "MIT",
      "bin": {
        "mime": "cli.js"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/mime-db": {
      "version": "1.52.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
      "integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime-types": {
      "version": "2.1.35",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
      "integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "1.52.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/ms": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
      "license": "MIT"
    },
    "node_modules/negotiator": {
      "version": "0.6.3",
      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.3.tgz",
      "integrity": "sha512-+EUsqGPLsM+j/zdChZjsnX51g4XrHFOIXwfnCVPGlQk/k5giakcKsuxCObBRu6DSm9opw/O6slWbJdghQM4bBg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-inspect": {
      "version": "1.13.4",
      "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.13.4.tgz",
      "integrity": "sha512-W67iLl4J2EXEGTbfeHCffrjDfitvLANg0UlX3wFUUSTx92KXRFegMHUVgSqE+wvhAbi4WqjGg9czysTV2Epbew==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/on-finished": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.4.1.tgz",
      "integrity": "sha512-oVlzkg3ENAhCk2zdv7IJwd/QUD4z2RxRwpkcGY8psCVcCYZNq4wYnVWALHM+brtuJjePWiYF/ClmuDr8Ch5+kg==",
      "license": "MIT",
      "dependencies": {
        "ee-first": "1.1.1"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/parseurl": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.3.tgz",
      "integrity": "sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/path-to-regexp": {
      "version": "0.1.13",
      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-0.1.13.tgz",
      "integrity": "sha512-A/AGNMFN3c8bOlvV9RreMdrv7jsmF9XIfDeCd87+I8RNg6s78BhJxMu69NEMHBSJFxKidViTEdruRwEk/WIKqA==",
      "license": "MIT"
    },
    "node_modules/pg": {
      "version": "8.20.0",
      "resolved": "https://registry.npmjs.org/pg/-/pg-8.20.0.tgz",
      "integrity": "sha512-ldhMxz2r8fl/6QkXnBD3CR9/xg694oT6DZQ2s6c/RI28OjtSOpxnPrUCGOBJ46RCUxcWdx3p6kw/xnDHjKvaRA==",
      "license": "MIT",
      "dependencies": {
        "pg-connection-string": "^2.12.0",
        "pg-pool": "^3.13.0",
        "pg-protocol": "^1.13.0",
        "pg-types": "2.2.0",
        "pgpass": "1.0.5"
      },
      "engines": {
        "node": ">= 16.0.0"
      },
      "optionalDependencies": {
        "pg-cloudflare": "^1.3.0"
      },
      "peerDependencies": {
        "pg-native": ">=3.0.1"
      },
      "peerDependenciesMeta": {
        "pg-native": {
          "optional": true
        }
      }
    },
    "node_modules/pg-cloudflare": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/pg-cloudflare/-/pg-cloudflare-1.3.0.tgz",
      "integrity": "sha512-6lswVVSztmHiRtD6I8hw4qP/nDm1EJbKMRhf3HCYaqud7frGysPv7FYJ5noZQdhQtN2xJnimfMtvQq21pdbzyQ==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/pg-connection-string": {
      "version": "2.12.0",
      "resolved": "https://registry.npmjs.org/pg-connection-string/-/pg-connection-string-2.12.0.tgz",
      "integrity": "sha512-U7qg+bpswf3Cs5xLzRqbXbQl85ng0mfSV/J0nnA31MCLgvEaAo7CIhmeyrmJpOr7o+zm0rXK+hNnT5l9RHkCkQ==",
      "license": "MIT"
    },
    "node_modules/pg-int8": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/pg-int8/-/pg-int8-1.0.1.tgz",
      "integrity": "sha512-WCtabS6t3c8SkpDBUlb1kjOs7l66xsGdKpIPZsg4wR+B3+u9UAum2odSsF9tnvxg80h4ZxLWMy4pRjOsFIqQpw==",
      "license": "ISC",
      "engines": {
        "node": ">=4.0.0"
      }
    },
    "node_modules/pg-pool": {
      "version": "3.13.0",
      "resolved": "https://registry.npmjs.org/pg-pool/-/pg-pool-3.13.0.tgz",
      "integrity": "sha512-gB+R+Xud1gLFuRD/QgOIgGOBE2KCQPaPwkzBBGC9oG69pHTkhQeIuejVIk3/cnDyX39av2AxomQiyPT13WKHQA==",
      "license": "MIT",
      "peerDependencies": {
        "pg": ">=8.0"
      }
    },
    "node_modules/pg-protocol": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/pg-protocol/-/pg-protocol-1.13.0.tgz",
      "integrity": "sha512-zzdvXfS6v89r6v7OcFCHfHlyG/wvry1ALxZo4LqgUoy7W9xhBDMaqOuMiF3qEV45VqsN6rdlcehHrfDtlCPc8w==",
      "license": "MIT"
    },
    "node_modules/pg-types": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/pg-types/-/pg-types-2.2.0.tgz",
      "integrity": "sha512-qTAAlrEsl8s4OiEQY69wDvcMIdQN6wdz5ojQiOy6YRMuynxenON0O5oCpJI6lshc6scgAY8qvJ2On/p+CXY0GA==",
      "license": "MIT",
      "dependencies": {
        "pg-int8": "1.0.1",
        "postgres-array": "~2.0.0",
        "postgres-bytea": "~1.0.0",
        "postgres-date": "~1.0.4",
        "postgres-interval": "^1.1.0"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/pgpass": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/pgpass/-/pgpass-1.0.5.tgz",
      "integrity": "sha512-FdW9r/jQZhSeohs1Z3sI1yxFQNFvMcnmfuj4WBMUTxOrAyLMaTcE1aAMBiTlbMNaXvBCQuVi0R7hd8udDSP7ug==",
      "license": "MIT",
      "dependencies": {
        "split2": "^4.1.0"
      }
    },
    "node_modules/postgres-array": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/postgres-array/-/postgres-array-2.0.0.tgz",
      "integrity": "sha512-VpZrUqU5A69eQyW2c5CA1jtLecCsN2U/bD6VilrFDWq5+5UIEVO7nazS3TEcHf1zuPYO/sqGvUvW62g86RXZuA==",
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/postgres-bytea": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/postgres-bytea/-/postgres-bytea-1.0.1.tgz",
      "integrity": "sha512-5+5HqXnsZPE65IJZSMkZtURARZelel2oXUEO8rH83VS/hxH5vv1uHquPg5wZs8yMAfdv971IU+kcPUczi7NVBQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/postgres-date": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/postgres-date/-/postgres-date-1.0.7.tgz",
      "integrity": "sha512-suDmjLVQg78nMK2UZ454hAG+OAW+HQPZ6n++TNDUX+L0+uUlLywnoxJKDou51Zm+zTCjrCl0Nq6J9C5hP9vK/Q==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/postgres-interval": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/postgres-interval/-/postgres-interval-1.2.0.tgz",
      "integrity": "sha512-9ZhXKM/rw350N1ovuWHbGxnGh/SNJ4cnxHiM0rxE4VN41wsg8P8zWn9hv/buK00RP4WvlOyr/RBDiptyxVbkZQ==",
      "license": "MIT",
      "dependencies": {
        "xtend": "^4.0.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/proxy-addr": {
      "version": "2.0.7",
      "resolved": "https://registry.npmjs.org/proxy-addr/-/proxy-addr-2.0.7.tgz",
      "integrity": "sha512-llQsMLSUDUPT44jdrU/O37qlnifitDP+ZwrmmZcoSKyLKvtZxpyV0n2/bD/N4tBAAZ/gJEdZU7KMraoK1+XYAg==",
      "license": "MIT",
      "dependencies": {
        "forwarded": "0.2.0",
        "ipaddr.js": "1.9.1"
      },
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/qs": {
      "version": "6.14.2",
      "resolved": "https://registry.npmjs.org/qs/-/qs-6.14.2.tgz",
      "integrity": "sha512-V/yCWTTF7VJ9hIh18Ugr2zhJMP01MY7c5kh4J870L7imm6/DIzBsNLTXzMwUA3yZ5b/KBqLx8Kp3uRvd7xSe3Q==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "side-channel": "^1.1.0"
      },
      "engines": {
        "node": ">=0.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/range-parser": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/range-parser/-/range-parser-1.2.1.tgz",
      "integrity": "sha512-Hrgsx+orqoygnmhFbKaHE6c296J+HTAQXoxEF6gNupROmmGJRoyzfG3ccAveqCBrwr/2yxQ5BVd/GTl5agOwSg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/raw-body": {
      "version": "2.5.3",
      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-2.5.3.tgz",
      "integrity": "sha512-s4VSOf6yN0rvbRZGxs8Om5CWj6seneMwK3oDb4lWDH0UPhWcxwOWw5+qk24bxq87szX1ydrwylIOp2uG1ojUpA==",
      "license": "MIT",
      "dependencies": {
        "bytes": "~3.1.2",
        "http-errors": "~2.0.1",
        "iconv-lite": "~0.4.24",
        "unpipe": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/safe-buffer": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
      "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/safer-buffer": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
      "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==",
      "license": "MIT"
    },
    "node_modules/send": {
      "version": "0.19.2",
      "resolved": "https://registry.npmjs.org/send/-/send-0.19.2.tgz",
      "integrity": "sha512-VMbMxbDeehAxpOtWJXlcUS5E8iXh6QmN+BkRX1GARS3wRaXEEgzCcB10gTQazO42tpNIya8xIyNx8fll1OFPrg==",
      "license": "MIT",
      "dependencies": {
        "debug": "2.6.9",
        "depd": "2.0.0",
        "destroy": "1.2.0",
        "encodeurl": "~2.0.0",
        "escape-html": "~1.0.3",
        "etag": "~1.8.1",
        "fresh": "~0.5.2",
        "http-errors": "~2.0.1",
        "mime": "1.6.0",
        "ms": "2.1.3",
        "on-finished": "~2.4.1",
        "range-parser": "~1.2.1",
        "statuses": "~2.0.2"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/send/node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "license": "MIT"
    },
    "node_modules/serve-static": {
      "version": "1.16.3",
      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-1.16.3.tgz",
      "integrity": "sha512-x0RTqQel6g5SY7Lg6ZreMmsOzncHFU7nhnRWkKgWuMTu5NN0DR5oruckMqRvacAN9d5w6ARnRBXl9xhDCgfMeA==",
      "license": "MIT",
      "dependencies": {
        "encodeurl": "~2.0.0",
        "escape-html": "~1.0.3",
        "parseurl": "~1.3.3",
        "send": "~0.19.1"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/setprototypeof": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.2.0.tgz",
      "integrity": "sha512-E5LDX7Wrp85Kil5bhZv46j8jOeboKq5JMmYM3gVGdGH8xFpPWXUMsNrlODCrkoxMEeNi/XZIwuRvY4XNwYMJpw==",
      "license": "ISC"
    },
    "node_modules/side-channel": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/side-channel/-/side-channel-1.1.0.tgz",
      "integrity": "sha512-ZX99e6tRweoUXqR+VBrslhda51Nh5MTQwou5tnUDgbtyM0dBgmhEDtWGP/xbKn6hqfPRHujUNwz5fy/wbbhnpw==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.3",
        "side-channel-list": "^1.0.0",
        "side-channel-map": "^1.0.1",
        "side-channel-weakmap": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-list": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-list/-/side-channel-list-1.0.1.tgz",
      "integrity": "sha512-mjn/0bi/oUURjc5Xl7IaWi/OJJJumuoJFQJfDDyO46+hBWsfaVM65TBHq2eoZBhzl9EchxOijpkbRC8SVBQU0w==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-map": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-map/-/side-channel-map-1.0.1.tgz",
      "integrity": "sha512-VCjCNfgMsby3tTdo02nbjtM/ewra6jPHmpThenkTYh8pG9ucZ/1P8So4u4FGBek/BjpOVsDCMoLA/iuBKIFXRA==",
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-weakmap": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/side-channel-weakmap/-/side-channel-weakmap-1.0.2.tgz",
      "integrity": "sha512-WPS/HvHQTYnHisLo9McqBHOJk2FkHO/tlpvldyrnem4aeQp4hai3gythswg6p01oSoTl58rcpiFAjF2br2Ak2A==",
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3",
        "side-channel-map": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/split2": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/split2/-/split2-4.2.0.tgz",
      "integrity": "sha512-UcjcJOWknrNkF6PLX83qcHM6KHgVKNkV62Y8a5uYDVv9ydGQVwAHMKqHdJje1VTWpljG0WYpCDhrCdAOYH4TWg==",
      "license": "ISC",
      "engines": {
        "node": ">= 10.x"
      }
    },
    "node_modules/statuses": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/statuses/-/statuses-2.0.2.tgz",
      "integrity": "sha512-DvEy55V3DB7uknRo+4iOGT5fP1slR8wQohVdknigZPMpMstaKJQWhwiYBACJE3Ul2pTnATihhBYnRhZQHGBiRw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/toidentifier": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/toidentifier/-/toidentifier-1.0.1.tgz",
      "integrity": "sha512-o5sSPKEkg/DIQNmH43V0/uerLrpzVedkUh8tGNvaeXpfpuwjKenlSox/2O/BTlZUtEe+JG7s5YhEz608PlAHRA==",
      "license": "MIT",
      "engines": {
        "node": ">=0.6"
      }
    },
    "node_modules/type-is": {
      "version": "1.6.18",
      "resolved": "https://registry.npmjs.org/type-is/-/type-is-1.6.18.tgz",
      "integrity": "sha512-TkRKr9sUTxEH8MdfuCSP7VizJyzRNMjj2J2do2Jr3Kym598JVdEksuzPQCnlFPW4ky9Q+iA+ma9BGm06XQBy8g==",
      "license": "MIT",
      "dependencies": {
        "media-typer": "0.3.0",
        "mime-types": "~2.1.24"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/unpipe": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz",
      "integrity": "sha512-pjy2bYhSsufwWlKwPc+l3cN7+wuJlK6uz0YdJEOlQDbl6jo/YlPi4mb8agUkVC8BF7V8NuzeyPNqRksA3hztKQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/utils-merge": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/utils-merge/-/utils-merge-1.0.1.tgz",
      "integrity": "sha512-pMZTvIkT1d+TFGvDOqodOclx0QWkkgi6Tdoa8gC8ffGAAqz9pzPTZWAybbsHHoED/ztMtkv/VoYTYyShUn81hA==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4.0"
      }
    },
    "node_modules/vary": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",
      "integrity": "sha512-BNGbWLfd0eUPabhkXUVm0j8uuvREyTh5ovRa/dyow/BqAbZJyC+5fU+IzQOzmAKzYqYRAISoRhdQr3eIZ/PXqg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/xtend": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/xtend/-/xtend-4.0.2.tgz",
      "integrity": "sha512-LKYU1iAXJXUgAXn9URjiu+MWhyUXHsvfp7mcuYm9dSUKK0/CjtrUwFAxD82/mCWbtLsGjFIad0wIsod4zrTAEQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.4"
      }
    }
  }
}
{
  "name": "trading-pattern-ia",
  "version": "1.0.0",
  "description": "API Node.js pour Trading Station IA avec PostgreSQL",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "engines": {
    "node": ">=18"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.3",
    "pg": "^8.13.1"
  }
}# Module Pattern IA

## Fichiers inclus

- `pattern-ia.html`
- `assets/js/pattern-ia.js`
- `server.js`
- `package.json`

## Installation locale

Place ces fichiers dans le dossier de ton projet, par exemple :

```text
C:\xampp\htdocs\trading
```

Puis ouvre un terminal dans ce dossier :

```bash
npm install
npm start
```

Ensuite, ouvre :

```text
http://localhost:3000/pattern-ia.html
```

## Intégration dans le menu de index.html

Ajoute ce lien dans ton menu :

```html
<a href="pattern-ia.html">Analyse IA du graphique</a>
```

## Important

GitHub Pages ne peut pas exécuter `server.js`.

Donc :
- la page HTML peut être sur GitHub Pages ;
- le serveur Node.js doit être hébergé ailleurs : Render, Railway, VPS, GoDaddy avec Node.js, etc.

Dans ce cas, modifie le fichier :

```text
assets/js/pattern-ia.js
```

et remplace :

```javascript
const API_BASE_URL = "";
```

par exemple :

```javascript
const API_BASE_URL = "https://ton-serveur.onrender.com";
```

## Limite actuelle

Cette première version utilise les données Binance.

Pour XAUUSD, Nasdaq, Apple ou autres actions, il faudra brancher une API de marché compatible :
- Twelve Data
- Alpha Vantage
- Polygon
- Tiingo
- Yahoo Finance via module serveur

## Principe d'analyse

Le serveur :
1. récupère les bougies historiques ;
2. calcule RSI, EMA 20, EMA 50 et MACD ;
3. extrait le segment actuel ;
4. cherche des segments passés similaires ;
5. mesure la résultante après un certain nombre de bougies ;
6. retourne un signal : Acheter, Vendre ou Attendre.

Ce n’est pas une prédiction certaine. C’est une aide à la décision probabiliste.

"# trading" 
"# trading" 

@echo off
chcp 65001 >nul

echo ==========================================
echo Remplacement complet du dépôt trading
echo Source locale : C:\xampp\htdocs\trading
echo Dépôt GitHub : https://github.com/ehk0705/trading.git
echo Site publié : https://ehk0705.github.io/trading/
echo ==========================================
echo.

cd /d C:\xampp\htdocs

echo Suppression de l'ancien dossier temporaire trading-github s'il existe...
if exist trading-github (
    rmdir /S /Q trading-github
)

echo.
echo Clonage du dépôt GitHub trading...
git clone https://github.com/ehk0705/trading.git trading-github

if errorlevel 1 (
    echo.
    echo ERREUR : impossible de cloner le dépôt.
    echo Vérifie que le dépôt existe bien ici :
    echo https://github.com/ehk0705/trading
    echo.
    pause
    exit /b 1
)

echo.
echo Suppression complète du contenu du dépôt cloné...
cd /d C:\xampp\htdocs\trading-github

for /d %%D in (*) do (
    rmdir /S /Q "%%D"
)

for %%F in (*) do (
    del /F /Q "%%F"
)

echo.
echo Copie des fichiers locaux vers le dépôt GitHub...
xcopy C:\xampp\htdocs\trading . /E /I /Y

if errorlevel 1 (
    echo.
    echo ERREUR : problème pendant la copie.
    pause
    exit /b 1
)

echo.
echo Ajout des fichiers dans Git...
git add .

echo.
echo Création du commit...
git commit -m "Remplacement complet du projet trading"

echo.
echo Envoi vers GitHub...
git branch -M main
git push origin main

if errorlevel 1 (
    echo.
    echo ERREUR : le push vers GitHub a échoué.
    echo Vérifie ton identifiant GitHub ou ton jeton d'accès.
    pause
    exit /b 1
)

echo.
echo ==========================================
echo Opération terminée.
echo Vérifie le site :
echo https://ehk0705.github.io/trading/
echo ==========================================
echo.

pause
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
            "GET /api/vider-captures-test",
            "POST /api/vider-captures",
            "DELETE /api/vider-captures",
            "POST /api/vider-table",
            "DELETE /api/vider-table",
            "POST /api/vider-trading-capture",
            "DELETE /api/vider-trading-capture",
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

async function viderTableTradingCapture(req, res) {
    try {
        await creerTableSiAbsente();

        const db = obtenirPool();
        let methodeUtilisee = "TRUNCATE";

        try {
            await db.query("TRUNCATE TABLE trading_capture RESTART IDENTITY CASCADE;");
        } catch (erreurTruncate) {
            methodeUtilisee = "DELETE";
            await db.query("DELETE FROM trading_capture;");
        }

        res.json({
            ok: true,
            statut: "ok",
            message: "La table trading_capture a été vidée avec succès.",
            table: "trading_capture",
            methode: methodeUtilisee,
            route: req.originalUrl,
            methodeHttp: req.method,
            date: new Date().toISOString()
        });

    } catch (erreur) {
        return reponseErreur(
            res,
            500,
            "Impossible de vider la table trading_capture.",
            erreur
        );
    }
}

app.get("/api/vider-captures-test", (req, res) => {
    res.json({
        ok: true,
        statut: "ok",
        message: "La route de vidage existe. Utiliser POST ou DELETE /api/vider-captures pour vider la table.",
        routes: [
            "POST /api/vider-captures",
            "DELETE /api/vider-captures",
            "POST /api/vider-table",
            "DELETE /api/vider-table",
            "POST /api/vider-trading-capture",
            "DELETE /api/vider-trading-capture"
        ],
        date: new Date().toISOString()
    });
});

app.post("/api/vider-captures", viderTableTradingCapture);
app.delete("/api/vider-captures", viderTableTradingCapture);

/* Alias compatibles avec différents boutons index.html */
app.post("/api/vider-table", viderTableTradingCapture);
app.delete("/api/vider-table", viderTableTradingCapture);
app.post("/api/vider-trading-capture", viderTableTradingCapture);
app.delete("/api/vider-trading-capture", viderTableTradingCapture);

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
        methode: req.method,
        routeDemandee: req.originalUrl,
        aide: "Vérifier l'URL appelée dans index.html et redéployer server.js sur Render.",
        routesVidageDisponibles: [
            "GET /api/vider-captures-test",
            "POST /api/vider-captures",
            "DELETE /api/vider-captures",
            "POST /api/vider-table",
            "DELETE /api/vider-table",
            "POST /api/vider-trading-capture",
            "DELETE /api/vider-trading-capture"
        ]
    });
});

/* =========================
   LANCEMENT SERVEUR
========================= */

app.listen(PORT, "0.0.0.0", () => {
    console.log("Serveur Trading API actif sur le port " + PORT);
});/*
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
@echo off
setlocal

REM ==============================
REM Configuration Render
REM ==============================

set RENDER_API_KEY=COLLE_ICI_TA_CLE_API_RENDER
set SERVICE_ID=COLLE_ICI_LE_SERVICE_ID_RENDER

set DATABASE_URL=postgresql://trading_db_77ok_user:KGFDUKBFA7Hvaox2RvQcXchniWbogFan@dpg-d7st0jjeo5us73eq16e0-a:5432/trading_db_77ok

REM ==============================
REM Vérification
REM ==============================

if "%RENDER_API_KEY%"=="COLLE_ICI_TA_CLE_API_RENDER" (
    echo Erreur : ajoute ta cle API Render.
    pause
    REM exit /b 1
)

if "%SERVICE_ID%"=="COLLE_ICI_LE_SERVICE_ID_RENDER" (
    echo Erreur : ajoute le SERVICE_ID Render.
    pause
    REM exit /b 1
)

REM ==============================
REM Envoi de la variable DATABASE_URL
REM ==============================

curl -X PUT "https://api.render.com/v1/services/%SERVICE_ID%/env-vars/DATABASE_URL" ^
-H "Authorization: Bearer %RENDER_API_KEY%" ^
-H "Content-Type: application/json" ^
-d "{\"value\":\"%DATABASE_URL%\"}"

echo.
echo Variable DATABASE_URL envoyee a Render.
echo Redemarre ensuite ton service Render.
pause* [32mmain[m
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Capture Configuration TradingView IA</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <script src="https://s3.tradingview.com/tv.js"></script>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #07111f;
            color: white;
        }

        header {
            background: #0f172a;
            border-bottom: 2px solid #00d9ff;
            padding: 14px 20px;
        }

        .top-bar {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px;
        }

        .logo {
            font-size: 22px;
            font-weight: bold;
            color: #00d9ff;
            margin-right: 20px;
        }

        .logo span {
            color: #facc15;
        }

        .control-group {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        label {
            font-weight: bold;
            color: #00d9ff;
            font-size: 13px;
        }

        select,
        input,
        textarea {
            background: #020617;
            color: white;
            border: 1px solid #334155;
            border-radius: 6px;
            padding: 7px;
            font-size: 13px;
            max-width: 100%;
        }

        textarea {
            min-height: 80px;
            resize: vertical;
        }

        button {
            border: none;
            border-radius: 7px;
            padding: 8px 10px;
            font-weight: bold;
            cursor: pointer;
            font-size: 12px;
            white-space: nowrap;
        }

        button:hover {
            opacity: 0.85;
        }

        .btn-tv {
            background: #2962ff;
            color: white;
        }

        .btn-capture {
            background: #00d9ff;
            color: #00111a;
        }

        .btn-save {
            background: #22c55e;
            color: #03130a;
        }

        .btn-copy {
            background: #facc15;
            color: #1a1300;
        }

        .btn-export {
            background: #a855f7;
            color: white;
        }

        .btn-import {
            background: #14b8a6;
            color: #001a16;
        }

        .btn-decision {
            background: #eab308;
            color: #1a1300;
        }

        .btn-clear {
            background: #ef4444;
            color: white;
        }

        .btn-dark {
            background: #334155;
            color: white;
        }

        .btn-screen {
            background: #f97316;
            color: #1a0b00;
        }

        main {
            display: grid;
            grid-template-columns: minmax(0, 2.3fr) minmax(320px, 0.7fr);
            gap: 14px;
            padding: 14px;
        }

        .chart-panel,
        .side-panel {
            background: #111827;
            border: 1px solid #263244;
            border-radius: 12px;
            padding: 14px;
        }

        .chart-panel {
            min-width: 0;
        }

        .side-panel {
            min-width: 320px;
            overflow: hidden;
        }

        .chart-title-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            margin-bottom: 10px;
            width: 100%;
        }

        .chart-title-row h2 {
            margin: 0;
            padding-bottom: 0;
            border-bottom: none;
            line-height: 1.1;
            flex: 0 0 auto;
        }

        .chart-title-icons {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 8px;
            flex-shrink: 0;
            margin-left: auto;
        }

        .chart-title-icons img {
            width: 36px;
            height: 36px;
            object-fit: cover;
            border-radius: 6px;
            border: 1px solid #334155;
            background: #020617;
            padding: 1px;
        }

        #tradingview_chart {
            height: 700px;
            width: 100%;
            border-radius: 10px;
            overflow: hidden;
            background: #020617;
        }

        h2 {
            color: #00d9ff;
            font-size: 18px;
            margin-top: 0;
            border-bottom: 1px solid #263244;
            padding-bottom: 8px;
        }

        h3 {
            color: #facc15;
            font-size: 15px;
            margin-bottom: 8px;
        }

        .form-block {
            margin-bottom: 12px;
            min-width: 0;
        }

        .form-block label {
            display: block;
            margin-bottom: 5px;
        }

        .form-block input,
        .form-block select,
        .form-block textarea {
            width: 100%;
        }

        pre {
            background: #020617;
            color: #a7f3d0;
            padding: 12px;
            border-radius: 10px;
            border: 1px solid #263244;
            min-height: 260px;
            max-height: 420px;
            overflow: auto;
            font-size: 12px;
            white-space: pre-wrap;
            word-break: break-word;
        }

        .button-zone {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 12px 0;
        }

        .button-zone button {
            flex: 1 1 120px;
        }

        .status {
            background: #020617;
            border: 1px solid #263244;
            border-radius: 8px;
            padding: 10px;
            color: #facc15;
            font-size: 13px;
            margin-top: 10px;
        }

        .server-status {
            padding: 12px;
            border-radius: 8px;
            font-weight: bold;
            margin-bottom: 12px;
            text-align: center;
            font-size: 13px;
        }

        .server-status.neutral {
            background: #334155;
            color: #ffffff;
        }

        .server-status.ok {
            background: #064e3b;
            color: #86efac;
        }

        .server-status.error {
            background: #7f1d1d;
            color: #fecaca;
        }

        .server-status.warning {
            background: #713f12;
            color: #fde68a;
        }

        .server-info {
            background: #020617;
            border: 1px solid #334155;
            border-radius: 8px;
            padding: 10px;
            font-family: Consolas, monospace;
            font-size: 12px;
            color: #d1d5db;
            white-space: pre-wrap;
            word-break: break-word;
            min-height: 90px;
            max-height: 220px;
            overflow: auto;
        }

        .analysis-category-box {
            background: #0b1220;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 12px;
            margin: 14px 0;
        }

        .analysis-category-box h2 {
            margin-top: 0;
            color: #38bdf8;
        }

        .analysis-category-box label {
            display: block;
            margin-bottom: 6px;
        }

        .analysis-category-box select,
        .analysis-category-box input,
        .analysis-category-box textarea {
            width: 100%;
        }

        .category-description {
            margin-top: 10px;
            padding: 10px;
            background: #020617;
            border: 1px solid #334155;
            border-radius: 8px;
            color: #d1d5db;
            font-size: 12px;
            line-height: 1.5;
        }

        .ai-section {
            margin-top: 14px;
            background: #0b1220;
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 14px;
        }

        .ai-section h3 {
            margin-top: 0;
            color: #38bdf8;
        }

        .ai-result-box {
            background: #020617;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 14px;
            min-height: 220px;
            max-height: 520px;
            overflow: auto;
            white-space: pre-wrap;
            word-break: break-word;
            font-family: Consolas, monospace;
            font-size: 13px;
            color: #d1d5db;
        }

        .note {
            color: #cbd5e1;
            font-size: 12px;
            line-height: 1.5;
            margin-top: 8px;
        }

        .preview-box {
            display: none;
            margin-top: 10px;
        }

        .preview-box img {
            width: 100%;
            max-height: 260px;
            object-fit: contain;
            border: 1px solid #334155;
            border-radius: 8px;
            background: #020617;
        }

        footer {
            text-align: center;
            color: #94a3b8;
            font-size: 12px;
            padding: 16px;
            border-top: 1px solid #263244;
        }

        @media (max-width: 1200px) {
            main {
                grid-template-columns: minmax(0, 2fr) minmax(320px, 0.8fr);
            }

            #tradingview_chart {
                height: 650px;
            }
        }

        @media (max-width: 1000px) {
            main {
                grid-template-columns: 1fr;
            }

            .side-panel {
                min-width: 0;
            }

            #tradingview_chart {
                height: 520px;
            }
        }

        @media (max-width: 700px) {
            header {
                padding: 12px;
            }

            .top-bar {
                flex-direction: column;
                align-items: stretch;
            }

            .control-group {
                flex-direction: column;
                align-items: stretch;
            }

            button {
                width: 100%;
            }

            .button-zone button {
                flex: 1 1 100%;
            }

            .logo {
                text-align: center;
                margin-right: 0;
            }

            .chart-title-row {
                justify-content: space-between;
                flex-wrap: nowrap;
            }

            .chart-title-icons img {
                width: 30px;
                height: 30px;
            }

            #tradingview_chart {
                height: 460px;
            }
        }
    </style>
</head>

<body>

<header>
    <div class="top-bar">
        <div class="logo">TRADING STATION <span>IA</span></div>

        <div class="control-group">
            <label for="asset-selector">ACTIF :</label>
            <select id="asset-selector" onchange="actualiserGraphique()" title="Choisir l’actif à afficher dans le graphique.">
                <option value="BINANCE:BTCUSDT">Bitcoin / USDT</option>
                <option value="COINBASE:BTCUSD">Bitcoin / USD</option>
                <option value="BINANCE:ETHUSDT">Ethereum / USDT</option>
                <option value="OANDA:XAUUSD">Or / Dollar - XAUUSD</option>
                <option value="NASDAQ:AAPL">Apple - AAPL</option>
                <option value="NASDAQ:TSLA">Tesla - TSLA</option>
                <option value="NASDAQ:NVDA">Nvidia - NVDA</option>
                <option value="NASDAQ:MSFT">Microsoft - MSFT</option>
                <option value="NASDAQ:AMZN">Amazon - AMZN</option>
                <option value="NASDAQ:GOOGL">Google - GOOGL</option>
                <option value="SP:SPX">S&P 500</option>
                <option value="TVC:DXY">Dollar Index - DXY</option>
            </select>
        </div>

        <div class="control-group">
            <label for="interval-selector">INTERVALLE :</label>
            <select id="interval-selector" onchange="actualiserGraphique()" title="Choisir l’unité de temps du graphique.">
                <option value="1">1 minute</option>
                <option value="5">5 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 heure</option>
                <option value="240">4 heures</option>
                <option value="D">1 jour</option>
                <option value="W">1 semaine</option>
                <option value="M">1 mois</option>
            </select>
        </div>

        <div class="control-group">
            <label for="indicator-selector">INDICATEUR :</label>
            <select id="indicator-selector" onchange="actualiserGraphique()" title="Choisir l’indicateur principal utilisé pour l’analyse.">
                <option value="RSI">RSI</option>
                <option value="MACD">MACD</option>
                <option value="EMA">EMA</option>
                <option value="SUPERTREND">Supertrend</option>
                <option value="BOLLINGER">Bandes de Bollinger</option>
                <option value="ATR">ATR</option>
                <option value="VOLUME">Volume</option>
                <option value="LIQUIDITY_ZONE">Zones de liquidité</option>
            </select>
        </div>

        <button class="btn-capture" onclick="capturerConfigurationTradingView()" title="Capture la configuration JSON, les données de marché et le screenshot.">
            Capturer configuration
        </button>

        <button class="btn-save" onclick="sauvegarderConfiguration()" title="Sauvegarde la configuration dans le navigateur.">
            Sauvegarder
        </button>

        <button class="btn-save" onclick="rechargerConfigurationTradingView()" title="Recharge la dernière configuration sauvegardée localement.">
            Recharger
        </button>

        <button class="btn-export" onclick="exporterJSON()" title="Exporte la configuration dans un fichier JSON.">
            Exporter JSON
        </button>

        <button class="btn-import" onclick="ouvrirImportJSON()" title="Importe une configuration JSON déjà sauvegardée.">
            Importer JSON
        </button>

        <button class="btn-decision" onclick="ouvrirPageDecision()" title="Ouvre une page dédiée aux décisions IA.">
            Aide à la décision
        </button>

        <button class="btn-clear" onclick="effacerConfiguration()" title="Efface la configuration affichée.">
            Effacer
        </button>
    </div>
</header>

<main>

    <section class="chart-panel">
        <div class="chart-title-row">
            <h2>Graphique TradingView intégré</h2>

            <div class="chart-title-icons">
                <img src="img/bitcoin.jfif" alt="Symbole du Bitcoin">
                <img src="img/lingot-or.jfif" alt="Lingot d'or">
            </div>
        </div>

        <div id="tradingview_chart"></div>

        <input
            type="file"
            id="fichier-import-json"
            accept="application/json,.json"
            style="display:none;"
            onchange="importerJSONDepuisFichier(event)"
        >

        <section class="ai-section">
            <h3>Résultats de l’analyse IA</h3>
            <div id="resultat-analyse-ia" class="ai-result-box">Aucune analyse IA lancée.</div>
        </section>

        <div class="note">
            Cette page capture les paramètres contrôlés par l’interface : actif, intervalle,
            indicateur, catégorie d’analyse, données de marché et screenshot.
            Le JSON et le screenshot sont sauvegardés dans le dossier local choisi.
        </div>
    </section>

    <aside class="side-panel">

        <h2>Serveur Node.js Render</h2>

        <div id="etatServeur" class="server-status neutral">
            Serveur non testé
        </div>

        <div class="form-block">
            <label for="api-url">Adresse API Render</label>
            <input
                type="text"
                id="api-url"
                value="https://tading.onrender.com/api/analyse"
                title="Adresse de l’API Node.js déployée sur Render."
            >
        </div>

        <div class="button-zone">
            <button class="btn-copy" onclick="testerServeur()" type="button">Tester serveur</button>
            <button class="btn-dark" onclick="testerRouteAnalyse()" type="button">Tester /api/analyse</button>
            <button class="btn-tv" onclick="ouvrirServeurRender()" type="button">Ouvrir serveur</button>
        </div>

        <div id="infosServeur" class="server-info">
Aucun test effectué.
        </div>

        <section class="analysis-category-box">
            <h2>Catégorie d’analyse</h2>

            <label for="categorie-analyse-btc">Choisir une catégorie</label>

            <select id="categorie-analyse-btc" title="Choisir le type d’analyse IA à appliquer au marché.">
                <option value="macroeconomie">Macroéconomie</option>
                <option value="monnaie_bitcoin">Monnaie Bitcoin</option>
                <option value="donnees_on_chain">Données on-chain</option>
                <option value="minage">Minage</option>
                <option value="analyse_technique" selected>Analyse technique</option>
                <option value="derives">Dérivés</option>
                <option value="liquidite_marche">Liquidité de marché</option>
                <option value="institutionnel">Institutionnel</option>
                <option value="sentiment">Sentiment</option>
                <option value="reglementation_risques">Réglementation et risques</option>
            </select>

            <div id="description-categorie-analyse" class="category-description">
                Analyse technique : graphiques, tendances, supports, résistances, RSI et moyennes mobiles.
            </div>
        </section>

        <section class="analysis-category-box">
            <h2>Sauvegarde locale</h2>

            <div class="form-block">
                <label for="capture-nom">Nom unique de la capture</label>
                <input type="text" id="capture-nom" readonly>
            </div>

            <div class="form-block">
                <label for="capture-description">Description</label>
                <textarea
                    id="capture-description"
                    rows="4"
                    placeholder="Exemple : BTC en 1 jour avec RSI, cassure de résistance, volume fort."
                ></textarea>
            </div>

            <div class="button-zone">
                <button class="btn-dark" onclick="genererNouveauNomCapture()" type="button">
                    Nouveau nom
                </button>

                <button class="btn-save" onclick="choisirDossierLocal()" type="button">
                    Choisir dossier
                </button>
            </div>

            <div id="dossier-local-info" class="status">
                Aucun dossier local choisi.
            </div>
        </section>

        <section class="analysis-category-box">
            <h2>Screenshot</h2>

            <p class="note">
                Le navigateur demandera l’autorisation de capturer un écran, une fenêtre ou un onglet.
                Choisis l’onglet qui contient le graphique.
            </p>

            <div class="button-zone">
                <button class="btn-screen" onclick="capturerScreenshotManuel()" type="button">
                    Capturer screenshot
                </button>
            </div>

            <div id="apercu-screenshot-zone" class="preview-box">
                <label>Aperçu du screenshot</label>
                <img id="apercu-screenshot" src="" alt="Aperçu du screenshot">
            </div>
        </section>

        <h3>Configuration capturée</h3>

        <pre id="resultat-configuration">Aucune configuration capturée.</pre>

        <div id="status" class="status">
            En attente de capture.
        </div>
    </aside>

</main>

<footer>
    Page de capture de configuration TradingView pour analyse IA.
</footer>

<script>
    let widgetTradingView = null;
    let configurationActuelle = null;
    let dossierLocalHandle = null;
    let screenshotBlobActuel = null;
    let screenshotPreviewUrl = "";

    function valeurElement(id, valeurDefaut = "") {
        const element = document.getElementById(id);
        return element ? element.value : valeurDefaut;
    }

    function libelleElement(id, valeurDefaut = "") {
        const element = document.getElementById(id);

        if (!element || element.selectedIndex < 0) {
            return valeurDefaut;
        }

        return element.options[element.selectedIndex].text;
    }

    function nombreElement(id, valeurDefaut = 0) {
        const element = document.getElementById(id);

        if (!element) {
            return valeurDefaut;
        }

        return Number(element.value || valeurDefaut);
    }

    function definirValeur(id, valeur) {
        const element = document.getElementById(id);

        if (element && valeur !== undefined && valeur !== null) {
            element.value = valeur;
        }
    }

    function getApiAnalyseUrl() {
        return document.getElementById("api-url").value.trim();
    }

    function getApiBaseUrl() {
        const apiAnalyseUrl = getApiAnalyseUrl();
        return apiAnalyseUrl.replace(/\/api\/analyse\/?$/, "");
    }

    function getApiTestUrl() {
        return getApiBaseUrl() + "/api/test";
    }

    function getApiMarcheUrl() {
        return getApiBaseUrl() + "/api/marche";
    }

    function afficherEtatServeur(type, message) {
        const etat = document.getElementById("etatServeur");
        etat.className = "server-status " + type;
        etat.textContent = message;
    }

    function afficherInfosServeur(texte) {
        document.getElementById("infosServeur").textContent = texte;
    }

    function afficherAnalyseIA(texte) {
        document.getElementById("resultat-analyse-ia").textContent = texte;
    }

    function afficherConfiguration(configuration) {
        document.getElementById("resultat-configuration").textContent =
            JSON.stringify(configuration, null, 4);
    }

    function afficherStatus(message) {
        document.getElementById("status").textContent = message;
    }

    function getCategorieAnalyseBTC() {
        return valeurElement("categorie-analyse-btc", "analyse_technique");
    }

    function getLibelleCategorieAnalyseBTC() {
        return libelleElement("categorie-analyse-btc", "Analyse technique");
    }

    function getDescriptionCategorieAnalyseBTC() {
        const descriptions = {
            macroeconomie: "Macroéconomie : taux, inflation, liquidité mondiale, dollar, obligations et bilan de la Fed.",
            monnaie_bitcoin: "Monnaie Bitcoin : offre maximale, émission, halving et inflation de BTC.",
            donnees_on_chain: "Données on-chain : adresses, transactions, MVRV, realized price et flux des plateformes.",
            minage: "Minage : taux de hachage, difficulté, revenus et ventes des mineurs.",
            analyse_technique: "Analyse technique : graphiques, tendances, supports, résistances, RSI et moyennes mobiles.",
            derives: "Dérivés : contrats à terme, options, funding rates, open interest et liquidations.",
            liquidite_marche: "Liquidité de marché : volumes, carnets d’ordres, spreads et profondeur de marché.",
            institutionnel: "Institutionnel : FNB Bitcoin, achats d’entreprises, fonds, banques et adoption officielle.",
            sentiment: "Sentiment : réseaux sociaux, Google Trends, médias, peur et avidité.",
            reglementation_risques: "Réglementation et risques : lois, fiscalité, SEC, plateformes, garde et géopolitique."
        };

        const categorie = getCategorieAnalyseBTC();
        return descriptions[categorie] || descriptions.analyse_technique;
    }

    function actualiserDescriptionCategorie() {
        const zone = document.getElementById("description-categorie-analyse");

        if (zone) {
            zone.textContent = getDescriptionCategorieAnalyseBTC();
        }
    }

    function genererIdentifiantCourt() {
        return Math.random().toString(36).substring(2, 8);
    }

    function genererTimestampLisible() {
        const maintenant = new Date();

        const annee = maintenant.getFullYear();
        const mois = String(maintenant.getMonth() + 1).padStart(2, "0");
        const jour = String(maintenant.getDate()).padStart(2, "0");
        const heure = String(maintenant.getHours()).padStart(2, "0");
        const minute = String(maintenant.getMinutes()).padStart(2, "0");
        const seconde = String(maintenant.getSeconds()).padStart(2, "0");

        return annee + mois + jour + "-" + heure + minute + seconde;
    }

function genererNomCaptureUnique() {
    const actif = nettoyerNomFichier(valeurElement("asset-selector", "actif"));
    const indicateur = nettoyerNomFichier(valeurElement("indicator-selector", "indicateur"));
    const intervalle = nettoyerNomFichier(valeurElement("interval-selector", "intervalle"));
    const dateHeure = genererTimestampLisible();

    return actif + "-" + indicateur + "-" + intervalle + "-" + dateHeure;
}
    function genererNouveauNomCapture() {
        const nom = genererNomCaptureUnique();
        definirValeur("capture-nom", nom);
        afficherStatus("Nouveau nom de capture généré.");
        return nom;
    }

    function nettoyerNomFichier(valeur) {
        return String(valeur || "capture-trading")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9-_]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");
    }

    async function choisirDossierLocal() {
        if (!window.showDirectoryPicker) {
            alert(
                "Ton navigateur ne supporte pas le choix de dossier local.\n\n" +
                "Utilise Chrome ou Edge."
            );
            return;
        }

        try {
            dossierLocalHandle = await window.showDirectoryPicker({
                mode: "readwrite"
            });

            document.getElementById("dossier-local-info").textContent =
                "Dossier local choisi. Les captures seront sauvegardées dedans.";

            afficherStatus("Dossier local choisi.");

        } catch (erreur) {
            afficherStatus("Choix du dossier annulé.");
        }
    }

    function obtenirStyleTradingView() {
        const typeBougie = valeurElement("type-bougie", "bougies_japonaises");

        switch (typeBougie) {
            case "barres":
                return "0";
            case "bougies_japonaises":
                return "1";
            case "ligne":
                return "3";
            case "heikin_ashi":
                return "8";
            case "renko":
                return "4";
            case "kagi":
                return "5";
            case "point_figure":
                return "6";
            default:
                return "1";
        }
    }

    function choisirEtudeTradingView() {
        const indicateur = document.getElementById("indicator-selector").value;

        if (indicateur === "RSI") {
            return ["RSI@tv-basicstudies"];
        }

        if (indicateur === "MACD") {
            return ["MACD@tv-basicstudies"];
        }

        if (indicateur === "EMA") {
            return ["MASimple@tv-basicstudies"];
        }

        if (indicateur === "BOLLINGER") {
            return ["BB@tv-basicstudies"];
        }

        if (indicateur === "VOLUME") {
            return ["Volume@tv-basicstudies"];
        }

        return [];
    }

    function creerWidgetTradingView() {
        const symbole = document.getElementById("asset-selector").value;
        const intervalle = document.getElementById("interval-selector").value;

        document.getElementById("tradingview_chart").innerHTML = "";

        widgetTradingView = new TradingView.widget({
            autosize: true,
            symbol: symbole,
            interval: intervalle,
            timezone: "America/Toronto",
            theme: "dark",
            style: obtenirStyleTradingView(),
            locale: "fr",
            toolbar_bg: "#0f172a",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: "tradingview_chart",
            hide_side_toolbar: false,
            details: true,
            hotlist: true,
            calendar: false,
            studies: choisirEtudeTradingView()
        });
    }

    function actualiserGraphique() {
        creerWidgetTradingView();
        afficherStatus("Graphique actualisé.");
    }

    function ouvrirServeurRender() {
        const baseUrl = getApiBaseUrl();

        if (!baseUrl) {
            alert("Adresse API manquante.");
            return;
        }

        window.open(baseUrl, "_blank");
    }

    async function testerServeur() {
        const urlTest = getApiTestUrl();
        const debut = performance.now();

        afficherEtatServeur("warning", "Test du serveur en cours...");
        afficherInfosServeur("Test de la route :\n" + urlTest);

        try {
            const reponse = await fetch(urlTest, {
                method: "GET",
                cache: "no-store"
            });

            const duree = Math.round(performance.now() - debut);
            const texte = await reponse.text();

            let contenu;

            try {
                contenu = JSON.stringify(JSON.parse(texte), null, 2);
            } catch (erreurJson) {
                contenu = texte;
            }

            if (!reponse.ok) {
                throw new Error("Réponse HTTP " + reponse.status + "\n\n" + contenu);
            }

            afficherEtatServeur("ok", "Serveur connecté");

            afficherInfosServeur(
                "TEST RÉUSSI\n" +
                "-----------\n" +
                "Route : " + urlTest + "\n" +
                "Statut HTTP : " + reponse.status + "\n" +
                "Temps de réponse : " + duree + " ms\n\n" +
                "Réponse serveur :\n" +
                contenu
            );

        } catch (erreur) {
            afficherEtatServeur("error", "Serveur inaccessible");

            afficherInfosServeur(
                "TEST ÉCHOUÉ\n" +
                "-----------\n" +
                "Route testée : " + urlTest + "\n\n" +
                "Détail technique :\n" +
                erreur.message
            );
        }
    }

    async function testerRouteAnalyse() {
        const apiUrl = getApiAnalyseUrl();
        const debut = performance.now();

        afficherEtatServeur("warning", "Test de /api/analyse en cours...");
        afficherInfosServeur("Test de la route :\n" + apiUrl);

        try {
            const reponse = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-store",
                body: JSON.stringify({
                    test: true,
                    message: "Test depuis analyse-config-ia-marche.html",
                    dateTest: new Date().toISOString()
                })
            });

            const duree = Math.round(performance.now() - debut);
            const texte = await reponse.text();

            let contenu;

            try {
                contenu = JSON.stringify(JSON.parse(texte), null, 2);
            } catch (erreurJson) {
                contenu = texte;
            }

            if (!reponse.ok) {
                throw new Error("Réponse HTTP " + reponse.status + "\n\n" + contenu);
            }

            afficherEtatServeur("ok", "Route /api/analyse connectée");

            afficherInfosServeur(
                "TEST /api/analyse RÉUSSI\n" +
                "------------------------\n" +
                "Route : " + apiUrl + "\n" +
                "Statut HTTP : " + reponse.status + "\n" +
                "Temps de réponse : " + duree + " ms\n\n" +
                "Réponse serveur :\n" +
                contenu
            );

        } catch (erreur) {
            afficherEtatServeur("error", "Route /api/analyse inaccessible");

            afficherInfosServeur(
                "TEST /api/analyse ÉCHOUÉ\n" +
                "-------------------------\n" +
                "Route testée : " + apiUrl + "\n\n" +
                "Détail technique :\n" +
                erreur.message
            );
        }
    }

    async function capturerScreenshotDepuisNavigateur() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
            throw new Error("La capture d’écran n’est pas supportée par ce navigateur.");
        }

        const flux = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: false
        });

        const video = document.createElement("video");
        video.srcObject = flux;
        video.muted = true;

        await new Promise(function(resolve) {
            video.onloadedmetadata = function() {
                video.play();
                resolve();
            };
        });

        await new Promise(function(resolve) {
            setTimeout(resolve, 500);
        });

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const contexte = canvas.getContext("2d");
        contexte.drawImage(video, 0, 0, canvas.width, canvas.height);

        flux.getTracks().forEach(function(track) {
            track.stop();
        });

        return await new Promise(function(resolve, reject) {
            canvas.toBlob(function(blob) {
                if (!blob) {
                    reject(new Error("Impossible de créer le screenshot."));
                    return;
                }

                resolve(blob);
            }, "image/png");
        });
    }

    function afficherApercuScreenshot(blob) {
        const zone = document.getElementById("apercu-screenshot-zone");
        const image = document.getElementById("apercu-screenshot");

        if (!zone || !image || !blob) {
            return;
        }

        if (screenshotPreviewUrl) {
            URL.revokeObjectURL(screenshotPreviewUrl);
        }

        screenshotPreviewUrl = URL.createObjectURL(blob);
        image.src = screenshotPreviewUrl;
        zone.style.display = "block";
    }

    async function capturerScreenshotManuel() {
        try {
            afficherStatus("Demande de capture d’écran en cours...");
            screenshotBlobActuel = await capturerScreenshotDepuisNavigateur();
            afficherApercuScreenshot(screenshotBlobActuel);
            afficherStatus("Screenshot capturé.");
            alert("Screenshot capturé.");
        } catch (erreur) {
            afficherStatus("Capture d’écran annulée ou impossible.");
            alert("Capture d’écran annulée ou impossible.\n\nDétail : " + erreur.message);
        }
    }

    async function sauvegarderJsonEtScreenshotSurDisqueLocal(configuration, screenshotBlob) {
        if (!window.showDirectoryPicker) {
            throw new Error("Le navigateur ne supporte pas la sauvegarde directe dans un dossier local.");
        }

        if (!dossierLocalHandle) {
            await choisirDossierLocal();
        }

        if (!dossierLocalHandle) {
            throw new Error("Aucun dossier local n’a été choisi.");
        }

        const nomBase = nettoyerNomFichier(configuration.nomFichier || genererNomCaptureUnique());

        const nomJson = nomBase + ".json";
        const nomImage = nomBase + ".png";

        configuration.fichiersSauvegardes = {
            dossier: "dossier_local_choisi_par_utilisateur",
            nom: nomBase,
            json: nomJson,
            screenshot: screenshotBlob ? nomImage : null,
            date: new Date().toISOString()
        };

        const jsonFinal = JSON.stringify(configuration, null, 4);

        const fichierJsonHandle = await dossierLocalHandle.getFileHandle(nomJson, {
            create: true
        });

        const fluxJson = await fichierJsonHandle.createWritable();
        await fluxJson.write(jsonFinal);
        await fluxJson.close();

        if (screenshotBlob) {
            const fichierImageHandle = await dossierLocalHandle.getFileHandle(nomImage, {
                create: true
            });

            const fluxImage = await fichierImageHandle.createWritable();
            await fluxImage.write(screenshotBlob);
            await fluxImage.close();
        }

        return {
            nom: nomBase,
            json: nomJson,
            screenshot: screenshotBlob ? nomImage : null,
            date: new Date().toISOString()
        };
    }

    async function capturerConfigurationTradingView(ajouterMarcheAutomatiquement = true) {
        const actifSelect = document.getElementById("asset-selector");
        const intervalleSelect = document.getElementById("interval-selector");
        const indicateurSelect = document.getElementById("indicator-selector");

        let nomCapture = valeurElement("capture-nom", "").trim();

        if (!nomCapture) {
            nomCapture = genererNouveauNomCapture();
        }

        nomCapture = nettoyerNomFichier(nomCapture);

        const descriptionCapture = valeurElement("capture-description", "").trim();

        configurationActuelle = {
            nom: "Configuration TradingView IA",
            nomFichier: nomCapture,
            description: descriptionCapture || "Configuration capturée automatiquement avec screenshot.",
            dateCapture: new Date().toISOString(),

            serveur: {
                apiAnalyse: getApiAnalyseUrl(),
                apiTest: getApiTestUrl(),
                apiMarche: getApiMarcheUrl(),
                hebergeur: "Render seulement pour les données de marché",
                sauvegarde: "disque_local",
                type: "sauvegarde_locale_disque"
            },

            graphique: {
                actif: actifSelect.value,
                actifLibelle: actifSelect.options[actifSelect.selectedIndex].text,
                intervalle: intervalleSelect.value,
                intervalleLibelle: intervalleSelect.options[intervalleSelect.selectedIndex].text,
                indicateur: indicateurSelect.value,
                indicateurLibelle: indicateurSelect.options[indicateurSelect.selectedIndex].text,
                typeBougie: valeurElement("type-bougie", "bougies_japonaises"),
                typeBougieLibelle: libelleElement("type-bougie", "Bougies japonaises"),
                source: "widget_tradingview_integre"
            },

            analyseIA: {
                categorie: getCategorieAnalyseBTC(),
                categorieLibelle: getLibelleCategorieAnalyseBTC(),
                descriptionCategorie: getDescriptionCategorieAnalyseBTC(),
                strategie: valeurElement("strategie-selector", "suivi_tendance"),
                statut: "pret_pour_analyse"
            },

            risque: {
                capitalInitial: nombreElement("capital-input", 1000),
                risqueParPositionPourcent: nombreElement("risk-input", 1),
                stopLossPourcent: nombreElement("stoploss-input", 2),
                takeProfitPourcent: nombreElement("takeprofit-input", 4),
                levier: nombreElement("levier-input", 1),
                sens: valeurElement("sens-selector", "achat_vente")
            },

            snapshot: {
                screenshotLocal: screenshotBlobActuel ? "screenshot_deja_capture" : null,
                actif: actifSelect.value,
                actifLibelle: actifSelect.options[actifSelect.selectedIndex].text,
                intervalle: intervalleSelect.value,
                intervalleLibelle: intervalleSelect.options[intervalleSelect.selectedIndex].text,
                indicateur: indicateurSelect.value,
                indicateurLibelle: indicateurSelect.options[indicateurSelect.selectedIndex].text,
                categorieAnalyse: getCategorieAnalyseBTC(),
                categorieAnalyseLibelle: getLibelleCategorieAnalyseBTC(),
                descriptionCategorieAnalyse: getDescriptionCategorieAnalyseBTC(),
                dateSnapshot: new Date().toISOString(),
                source: "screenshot_navigateur"
            },

            marche: null,

            limites: {
                captureCompleteTradingView: true,
                dessinsInternesTradingView: true,
                captureImageAutomatiqueSnapshot: true,
                remarque: "La configuration JSON et le screenshot sont sauvegardés sur le disque local dans le dossier choisi par l’utilisateur."
            }
        };

        afficherConfiguration(configurationActuelle);
        afficherStatus("Configuration JSON capturée. Ajout des données de marché...");

        if (ajouterMarcheAutomatiquement) {
            await enrichirConfigurationAvecDonneesMarche({ silencieux: true });
        }

        try {
            if (!screenshotBlobActuel) {
                afficherStatus("Capture du screenshot en cours. Choisis l’onglet ou la fenêtre à capturer.");
                screenshotBlobActuel = await capturerScreenshotDepuisNavigateur();
                afficherApercuScreenshot(screenshotBlobActuel);
            }

            afficherStatus("Sauvegarde du JSON et du screenshot sur le disque local...");

            const resultatSauvegarde = await sauvegarderJsonEtScreenshotSurDisqueLocal(
                configurationActuelle,
                screenshotBlobActuel
            );

            localStorage.setItem("configurationTradingViewIA", JSON.stringify(configurationActuelle));

            afficherConfiguration(configurationActuelle);

            afficherStatus("Configuration JSON et screenshot sauvegardés sur le disque local.");

            afficherInfosServeur(
                "SAUVEGARDE LOCALE RÉUSSIE\n" +
                "-------------------------\n" +
                "Nom : " + resultatSauvegarde.nom + "\n" +
                "JSON : " + resultatSauvegarde.json + "\n" +
                "Screenshot : " + resultatSauvegarde.screenshot
            );

            afficherEtatServeur("ok", "Capture locale sauvegardée");

            alert("Configuration JSON et screenshot sauvegardés sur le disque local.");

        } catch (erreur) {
            afficherStatus("Erreur lors de la capture ou de la sauvegarde locale.");

            afficherEtatServeur("error", "Erreur capture locale");

            afficherInfosServeur(
                "ERREUR CAPTURE LOCALE\n" +
                "---------------------\n" +
                "Détail :\n" +
                erreur.message
            );

            alert("Impossible de sauvegarder le JSON et le screenshot sur le disque local.");
        }
    }

    async function enrichirConfigurationAvecDonneesMarche(options = {}) {
        const silencieux = options.silencieux === true;

        if (!configurationActuelle) {
            await capturerConfigurationTradingView(false);
        }

        const actif = configurationActuelle.graphique.actif;
        const intervalle = configurationActuelle.graphique.intervalle;
        const indicateur = configurationActuelle.graphique.indicateur;
        const categorieAnalyse = configurationActuelle.analyseIA.categorie;
        const urlMarche = getApiMarcheUrl();

        afficherStatus("Récupération des données de marché...");
        afficherEtatServeur("warning", "Appel /api/marche en cours...");

        try {
            const reponse = await fetch(urlMarche, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-store",
                body: JSON.stringify({
                    actif: actif,
                    intervalle: intervalle,
                    indicateur: indicateur,
                    categorieAnalyse: categorieAnalyse
                })
            });

            const texte = await reponse.text();
            let donneesMarche;

            try {
                donneesMarche = JSON.parse(texte);
            } catch (erreurJson) {
                throw new Error("Le serveur n’a pas retourné du JSON. Réponse reçue : " + texte);
            }

            if (!reponse.ok) {
                throw new Error("Réponse HTTP " + reponse.status + " : " + JSON.stringify(donneesMarche));
            }

            configurationActuelle.marche = {
                prixActuel: donneesMarche.prixActuel ?? null,
                support: donneesMarche.support ?? null,
                resistance: donneesMarche.resistance ?? null,
                rsi: donneesMarche.rsi ?? null,
                volume: donneesMarche.volume ?? "neutre",
                tendance: donneesMarche.tendance ?? "neutre",
                source: donneesMarche.source ?? "serveur_nodejs",
                api: urlMarche,
                dateMiseAJour: new Date().toISOString()
            };

            localStorage.setItem("configurationTradingViewIA", JSON.stringify(configurationActuelle));
            afficherConfiguration(configurationActuelle);
            afficherStatus("Configuration enrichie avec les données de marché.");
            afficherEtatServeur("ok", "Données de marché reçues");

            afficherInfosServeur(
                "Données de marché reçues depuis :\n" +
                urlMarche + "\n\n" +
                JSON.stringify(configurationActuelle.marche, null, 4)
            );

            if (!silencieux) {
                alert("Données de marché ajoutées à la configuration.");
            }

        } catch (erreur) {
            afficherStatus("Impossible de récupérer les données de marché.");
            afficherEtatServeur("error", "Erreur /api/marche");

            afficherInfosServeur(
                "ERREUR /api/marche\n" +
                "-----------------\n" +
                "Adresse : " + urlMarche + "\n\n" +
                "Détail technique :\n" +
                erreur.message
            );

            if (!silencieux) {
                alert("Impossible d’ajouter les données de marché.");
            }
        }
    }

    async function sauvegarderConfiguration() {
        if (!configurationActuelle) {
            await capturerConfigurationTradingView(false);
        }

        localStorage.setItem("configurationTradingViewIA", JSON.stringify(configurationActuelle));

        afficherStatus("Configuration sauvegardée dans le navigateur.");
        alert("Configuration sauvegardée.");
    }

    async function rechargerConfigurationTradingView() {
        const data = localStorage.getItem("configurationTradingViewIA");

        if (!data) {
            alert("Aucune configuration sauvegardée.");
            return;
        }

        try {
            configurationActuelle = JSON.parse(data);

            appliquerConfiguration(configurationActuelle);
            afficherConfiguration(configurationActuelle);
            afficherStatus("Configuration rechargée. Actualisation des données de marché en cours...");

            await enrichirConfigurationAvecDonneesMarche({ silencieux: true });

            alert("Configuration rechargée et données de marché actualisées.");
        } catch (erreur) {
            alert("Erreur : configuration sauvegardée invalide.");
        }
    }

    function appliquerConfiguration(configuration) {
        if (!configuration || !configuration.graphique) {
            return;
        }

        definirValeur("asset-selector", configuration.graphique.actif);
        definirValeur("interval-selector", configuration.graphique.intervalle);
        definirValeur("indicator-selector", configuration.graphique.indicateur);
        definirValeur("type-bougie", configuration.graphique.typeBougie);

        if (configuration.analyseIA && configuration.analyseIA.categorie) {
            definirValeur("categorie-analyse-btc", configuration.analyseIA.categorie);
            actualiserDescriptionCategorie();
        }

        if (configuration.serveur && configuration.serveur.apiAnalyse) {
            definirValeur("api-url", configuration.serveur.apiAnalyse);
        }

        if (configuration.nomFichier) {
            definirValeur("capture-nom", configuration.nomFichier);
        }

        if (configuration.description) {
            definirValeur("capture-description", configuration.description);
        }

        creerWidgetTradingView();
    }

    async function exporterJSON() {
        if (!configurationActuelle) {
            await capturerConfigurationTradingView(false);
        }

        const contenu = JSON.stringify(configurationActuelle, null, 4);
        const fichier = new Blob([contenu], { type: "application/json" });

        const lien = document.createElement("a");
        lien.href = URL.createObjectURL(fichier);
        lien.download = genererNomFichierJSON(configurationActuelle);
        lien.click();

        URL.revokeObjectURL(lien.href);

        afficherStatus("Configuration exportée en JSON.");
        alert("Fichier JSON exporté.");
    }

    function ouvrirImportJSON() {
        document.getElementById("fichier-import-json").click();
    }

    function importerJSONDepuisFichier(event) {
        const fichier = event.target.files[0];

        if (!fichier) {
            return;
        }

        const lecteur = new FileReader();

        lecteur.onload = async function(e) {
            try {
                const contenu = e.target.result;
                const configuration = JSON.parse(contenu);

                if (!configuration.graphique) {
                    throw new Error("Le fichier JSON ne contient pas de bloc graphique.");
                }

                configurationActuelle = configuration;

                appliquerConfiguration(configurationActuelle);
                afficherConfiguration(configurationActuelle);

                localStorage.setItem("configurationTradingViewIA", JSON.stringify(configurationActuelle));

                afficherStatus("Configuration JSON importée. Actualisation des données de marché en cours...");

                await enrichirConfigurationAvecDonneesMarche({ silencieux: true });

                alert("Configuration JSON importée et données de marché actualisées.");

            } catch (erreur) {
                alert("Import impossible. Le fichier JSON est invalide.\n\nDétail : " + erreur.message);
            }

            event.target.value = "";
        };

        lecteur.readAsText(fichier);
    }

    function genererNomFichierJSON(configuration) {
        const actif = nettoyerNomFichier(configuration.graphique.actif);
        const indicateur = nettoyerNomFichier(configuration.graphique.indicateur);
        const intervalle = nettoyerNomFichier(configuration.graphique.intervalle);
        const categorie = nettoyerNomFichier(configuration.analyseIA?.categorie || "analyse");
        const nom = nettoyerNomFichier(configuration.nomFichier || genererNomCaptureUnique());

        return nom + "-" + actif + "-" + indicateur + "-" + intervalle + "-" + categorie + ".json";
    }

    async function ouvrirPageDecision() {
        afficherStatus("Capture de la configuration courante avant ouverture de la page décisions...");

        if (!configurationActuelle) {
            const actifSelect = document.getElementById("asset-selector");
            const intervalleSelect = document.getElementById("interval-selector");
            const indicateurSelect = document.getElementById("indicator-selector");

            const nomCapture = nettoyerNomFichier(valeurElement("capture-nom", genererNomCaptureUnique()));

            configurationActuelle = {
                nom: "Configuration TradingView IA",
                nomFichier: nomCapture,
                description: valeurElement("capture-description", ""),
                dateCapture: new Date().toISOString(),

                serveur: {
                    apiAnalyse: getApiAnalyseUrl(),
                    apiTest: getApiTestUrl(),
                    apiMarche: getApiMarcheUrl(),
                    hebergeur: "Render seulement pour données de marché",
                    sauvegarde: "disque_local"
                },

                graphique: {
                    actif: actifSelect.value,
                    actifLibelle: actifSelect.options[actifSelect.selectedIndex].text,
                    intervalle: intervalleSelect.value,
                    intervalleLibelle: intervalleSelect.options[intervalleSelect.selectedIndex].text,
                    indicateur: indicateurSelect.value,
                    indicateurLibelle: indicateurSelect.options[indicateurSelect.selectedIndex].text,
                    source: "widget_tradingview_integre"
                },

                analyseIA: {
                    categorie: getCategorieAnalyseBTC(),
                    categorieLibelle: getLibelleCategorieAnalyseBTC(),
                    descriptionCategorie: getDescriptionCategorieAnalyseBTC()
                },

                marche: null
            };
        }

        afficherStatus("Actualisation des données de marché avant ouverture de la page décisions...");

        await enrichirConfigurationAvecDonneesMarche({
            silencieux: true
        });

        localStorage.setItem("configurationTradingViewIA", JSON.stringify(configurationActuelle));

        window.open("decisions.html", "_blank");
    }

    function effacerConfiguration() {
        if (!confirm("Voulez-vous vraiment effacer la configuration affichée ?")) {
            return;
        }

        configurationActuelle = null;
        screenshotBlobActuel = null;

        if (screenshotPreviewUrl) {
            URL.revokeObjectURL(screenshotPreviewUrl);
            screenshotPreviewUrl = "";
        }

        document.getElementById("resultat-configuration").textContent =
            "Aucune configuration capturée.";

        const zone = document.getElementById("apercu-screenshot-zone");
        const image = document.getElementById("apercu-screenshot");

        if (zone && image) {
            image.src = "";
            zone.style.display = "none";
        }

        afficherAnalyseIA("Aucune analyse IA lancée.");
        afficherStatus("Configuration effacée.");
        alert("Configuration effacée.");
    }

    document.addEventListener("DOMContentLoaded", function () {
        creerWidgetTradingView();
        genererNouveauNomCapture();

        const selectCategorie = document.getElementById("categorie-analyse-btc");

        if (selectCategorie) {
            selectCategorie.addEventListener("change", function () {
                actualiserDescriptionCategorie();

                if (configurationActuelle) {
                    configurationActuelle.analyseIA.categorie = getCategorieAnalyseBTC();
                    configurationActuelle.analyseIA.categorieLibelle = getLibelleCategorieAnalyseBTC();
                    configurationActuelle.analyseIA.descriptionCategorie = getDescriptionCategorieAnalyseBTC();

                    afficherConfiguration(configurationActuelle);
                }
            });

            actualiserDescriptionCategorie();
        }
    });
</script>

</body>
</html>
