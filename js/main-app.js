// js/main-app.js
const App = {
    init: function() {
        console.log("App démarrée");
        this.updateChart("BINANCE:BTCUSDT");
        this.setupSelector();
        this.launchEngine();
    },

    updateChart: function(symbol) {
        new TradingView.widget({
            "autosize": true,
            "symbol": symbol,
            "interval": "60",
            "theme": "dark",
            "style": "1",
            "locale": "fr",
            "allow_symbol_change": true,
            "container_id": "tv_chart_container"
        });
    },

    setupSelector: function() {
        const selector = document.getElementById('asset-selector');
        if(selector) {
            selector.addEventListener('change', (e) => this.updateChart(e.target.value));
        }
    },

    launchEngine: function() {
        const box = document.getElementById('signal-box');
        
        // On vérifie immédiatement si le moteur existe
        if (typeof TradingEngine === 'undefined') {
            box.innerText = "ERREUR: FICHIER MOTEUR MANQUANT";
            box.style.color = "red";
            return;
        }

        // Boucle d'analyse ultra-rapide (toutes les 2 secondes)
        setInterval(() => {
            const mockRsi = Math.floor(Math.random() * 50) + 25; // Simule un flux
            const decision = TradingEngine.analyze(mockRsi, 65000, 62000);
            
            box.innerText = decision.signal;
            box.className = "signal-display " + decision.style;
        }, 2000);
    }
};

window.onload = () => App.init();