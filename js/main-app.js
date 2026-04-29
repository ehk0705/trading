/**
 * TRADING STATION v2.0 - Core Application
 * Gère l'interactivité entre les menus, le graphique et le moteur d'analyse.
 */

const App = {
    // Variable pour stocker l'instance du widget si nécessaire
    tvWidget: null,

    /**
     * Initialisation de l'application
     */
    init: function() {
        console.log("Démarrage de la Trading Station...");
        
        // 1. Chargement du graphique par défaut (Bitcoin)
        this.updateChart();

        // 2. Configuration des écouteurs d'événements (Sélecteurs)
        this.setupEventListeners();

        // 3. Lancement du moteur de calcul des signaux
        this.startSignalEngine();
    },

    /**
     * Configure les réactions aux changements dans les menus déroulants
     */
    setupEventListeners: function() {
        const assetSelector = document.getElementById('asset-selector');
        const indicatorSelector = document.getElementById('indicator-selector');

        if (assetSelector) {
            assetSelector.addEventListener('change', () => {
                console.log("Nouvel actif sélectionné : " + assetSelector.value);
                this.updateChart();
            });
        }

        if (indicatorSelector) {
            indicatorSelector.addEventListener('change', () => {
                console.log("Nouvel indicateur sélectionné : " + indicatorSelector.value);
                this.updateChart();
            });
        }
    },

    /**
     * Met à jour le graphique TradingView en fonction des sélections
     */
    updateChart: function() {
        const symbol = document.getElementById('asset-selector').value;
        const indicator = document.getElementById('indicator-selector').value;
        const infoCard = document.getElementById('info-custom');
        const infoText = document.getElementById('custom-text');

        let studies = [];
        
        // Cacher la carte d'info par défaut
        if (infoCard) infoCard.style.display = "none";

        // --- GESTION DES INDICATEURS ---
        switch(indicator) {
            // Indicateurs Standards (IDs internes TradingView)
            case "RSI":
                studies.push("RSI@tv-basicstudies");
                break;
            case "MACD":
                studies.push("MACD@tv-basicstudies");
                break;
            case "EMA":
                studies.push("Moving Average Exponential@tv-basicstudies");
                break;
            case "SMA":
                studies.push("Moving Average@tv-basicstudies");
                break;
            case "SUPERTREND":
                studies.push("Supertrend@tv-basicstudies");
                break;
            case "BOLLINGER":
                studies.push("Bollinger Bands@tv-basicstudies");
                break;
            
            // Indicateurs Custom (Affichage de l'aide contextuelle)
            case "CUSTOM:BTC_CYCLE":
                if (infoCard) {
                    infoCard.style.display = "block";
                    infoText.innerText = "Indicateur BTC Cycle Index : Analyse des sommets et bas de cycles. Référez-vous aux zones de Fibonacci sur votre accès Whop.";
                }
                break;
            case "CUSTOM:ELITE_V2":
                if (infoCard) {
                    infoCard.style.display = "block";
                    infoText.innerText = "Elite V2 Alarm : Surveillez les signaux de 'Squeeze' et les alertes de volume sur le graphique.";
                }
                break;
        }

        // Nettoyage du conteneur avant reconstruction (Essentiel pour GitHub/Local)
        const container = document.getElementById('tv_chart_container');
        if (container) container.innerHTML = "";

        // Création du nouveau Widget
        this.tvWidget = new TradingView.widget({
            "autosize": true,
            "symbol": symbol,
            "interval": "60",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "fr",
            "toolbar_bg": "#1e2329",
            "enable_publishing": false,
            "allow_symbol_change": true,
            "withdateranges": true,
            "hide_side_toolbar": false,
            "container_id": "tv_chart_container",
            "studies": studies, // Injecte l'indicateur sélectionné
            "disabled_features": ["header_screenshot"],
            "enabled_features": ["study_templates"]
        });
    },

    /**
     * Pilote le moteur d'analyse et met à jour l'UI des signaux
     */
    startSignalEngine: function() {
        const signalBox = document.getElementById('signal-box');
        
        setInterval(() => {
            // On vérifie que le moteur d'analyse est bien chargé
            if (typeof TradingEngine !== 'undefined') {
                // Simulation de flux de données pour le calcul
                const mockRsi = Math.floor(Math.random() * (75 - 25) + 25);
                const mockPrice = 65000;
                const mockMA = 60000;

                const result = TradingEngine.analyze(mockRsi, mockPrice, mockMA);
                
                if (signalBox) {
                    signalBox.innerText = result.signal;
                    signalBox.className = "signal-display " + result.style;
                }
            } else {
                if (signalBox) signalBox.innerText = "ERREUR MOTEUR";
            }
        }, 3000); // Mise à jour toutes les 3 secondes
    }
};

/**
 * Lancement au chargement de la fenêtre
 */
window.onload = function() {
    App.init();
};