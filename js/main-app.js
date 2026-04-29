const App = {
    // Cette variable stockera l'instance du graphique
    tvWidget: null,

    init: function() {
        // Chargement par défaut au démarrage
        this.createChart("BINANCE:BTCUSDT");

        // Écouteur sur le menu déroulant
        const selector = document.getElementById('asset-selector');
        if (selector) {
            selector.addEventListener('change', (e) => {
                console.log("Changement vers :", e.target.value);
                this.createChart(e.target.value);
            });
        }
        
        this.startAnalysis();
    },

    createChart: function(symbol) {
        // On s'assure que le conteneur est vide avant de reconstruire
        document.getElementById('tv_chart_container').innerHTML = "";

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
            "allow_symbol_change": true, // C'est ici que vous avez la recherche interne
            "withdateranges": true,
            "hide_side_toolbar": false, // Affiche les outils à gauche
            "container_id": "tv_chart_container"
        });
    },

    startAnalysis: function() {
        const box = document.getElementById('signal-box');
        setInterval(() => {
            if (typeof TradingEngine !== 'undefined') {
                const rsi = Math.floor(Math.random() * 60) + 20;
                const res = TradingEngine.analyze(rsi, 65000, 62000);
                box.innerText = res.signal;
                box.className = "signal-display " + res.style;
            }
        }, 2000);
    }
};

window.onload = () => App.init();
