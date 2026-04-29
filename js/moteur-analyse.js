const TradingEngine = {
    analyze: function(rsi, price, ma200) {
        let score = 0;
        
        // Logique RSI
        if (rsi < 30) score += 2; // Survente forte
        else if (rsi < 40) score += 1; // Survente légère
        else if (rsi > 70) score -= 2; // Surachat
        
        // Logique Tendance
        if (price > ma200) score += 1; // Haussier
        else score -= 1; // Baissier

        // Synthèse du signal
        if (score >= 2) return { signal: "ACHAT FORT", style: "buy-bg" };
        if (score >= 1) return { signal: "ACHAT PRUDENT", style: "buy-bg" };
        if (score <= -1) return { signal: "VENTE / PRUDENCE", style: "sell-bg" };
        return { signal: "NEUTRE / ATTENTE", style: "neutral" };
    }
};