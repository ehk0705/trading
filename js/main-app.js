const App = {
    init: function() {
        this.updateChart();
        
        // Écouteurs sur les deux menus
        document.getElementById('asset-selector').addEventListener('change', () => this.updateChart());
        document.getElementById('indicator-selector').addEventListener('change', () => this.updateChart());
        
        this.startEngine();
    },

    updateChart: function() {
        const symbol = document.getElementById('asset-selector').value;
        const indicator = document.getElementById('indicator-selector').value;
        const infoCard = document.getElementById('info-custom');
        const infoText = document.getElementById('custom-text');

        let studies = [];
        infoCard.style.display = "none";

        // 1. Gestion des indicateurs standards
        if (indicator === "RSI") studies.push("RSI@tv-basicstudies");
        if (indicator === "MACD") studies.push("MACD@tv-basicstudies");
        if (indicator === "BOLLINGER") studies.push("BB@tv-basicstudies");

        // 2. Gestion des indicateurs CUSTOM
        if (indicator.includes("CUSTOM")) {
            infoCard.style.display = "block";
            if (indicator === "CUSTOM:BTC_CYCLE") {
                infoText.innerText = "Analyse de cycle chargée. Consultez votre accès Whop pour les niveaux de résistance historiques.";
            } else {
                infoText.innerText = "Mode Elite V2 (Alarm) actif. Utilisez les outils de dessin pour marquer les zones de liquidité détectées.";
            }
        }

        // 3. Reconstruction du graphique
        document.getElementById('tv_chart_container').innerHTML = "";
        new TradingView.widget({
            "autosize": true,
            "symbol": symbol,
            "interval": "60",
            "theme": "dark",
            "style": "1",
            "locale": "fr",
            "toolbar_bg": "#1e2329",
            "allow_symbol_change": true,
            "container_id": "tv_chart_container",
            "studies": studies
        });
    },

    startEngine: function() {
        const box = document.getElementById('signal-box');
        setInterval(() => {
            if (typeof TradingEngine !== 'undefined') {
                const rsi = Math.floor(Math.random() * 40) + 30;
                const res = TradingEngine.analyze(rsi, 60000, 58000);
                box.innerText = res.signal;
                box.className = "signal-display " + res.style;
            }
        }, 2000);
    }
};

window.onload = () => App.init();