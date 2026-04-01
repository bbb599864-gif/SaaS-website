import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export class AIService {
  static async getForecast(sku: string, history: any[]) {
    try {
      const model = "gemini-3-flash-preview";
      const prompt = `
        As a Senior WMS Inventory Intelligence system, analyze the following SKU data:
        SKU: ${sku}
        History: ${JSON.stringify(history)}
        
        Your goal is to optimize operational efficiency and capital allocation.
        Consider:
        1. Demand Forecasting (Next 30 days).
        2. Inventory Health (Stockouts vs Overstock).
        3. ABC Classification impact.
        4. EOQ (Economic Order Quantity) vs JIT (Just-In-Time) suitability.
        5. Anomaly Detection in consumption patterns.
        
        Return the result in JSON format with fields: 
        forecast (number), 
        healthScore (number, 0-100), 
        recommendation (string), 
        factors (string[]),
        jitSuitability (boolean),
        eoqSuggestion (number).
      `;

      const result = await ai.models.generateContent({
        model,
        contents: [{ parts: [{ text: prompt }] }],
        config: { responseMimeType: "application/json" }
      });

      return JSON.parse(result.text || "{}");
    } catch (error) {
      console.error("AI Forecast Error:", error);
      return { forecast: 0, healthScore: 50, recommendation: "Unable to generate forecast.", factors: [] };
    }
  }

  static async detectAnomalies(movements: any[]) {
    try {
      const model = "gemini-3-flash-preview";
      const prompt = `
        Analyze these inventory movements for anomalies (unusual spikes, drops, or patterns):
        ${JSON.stringify(movements)}
        
        Return a list of detected anomalies in JSON format.
      `;

      const result = await ai.models.generateContent({
        model,
        contents: [{ parts: [{ text: prompt }] }],
        config: { responseMimeType: "application/json" }
      });

      return JSON.parse(result.text || "[]");
    } catch (error) {
      console.error("AI Anomaly Detection Error:", error);
      return [];
    }
  }
}
