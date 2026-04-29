const TradingEngine = {
    analyze: function(rsi, price, ma200) {
        let score = 0;
        if (rsi < 35) score += 1;
        if (rsi > 65) score -= 1;
        if (price > ma200) score += 1;
        let decision = { signal: "ATTENTE", style: "neutral" };
        if (score >= 2) decision = { signal: "ACHAT FORT", style: "buy-bg" };
        else if (score <= -1) decision = { signal: "VENTE / PRUDENCE", style: "sell-bg" };
        return decision;
    }
};
3. Page de Pilotage (HTML)
