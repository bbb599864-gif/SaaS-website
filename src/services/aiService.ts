import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export interface InventoryHealthScore {
  sku: string;
  score: number;
  factors: string[];
  recommendation: string;
}

export interface DemandForecast {
  sku: string;
  forecast: number;
  confidence: number;
  message: string;
}

export const getInventoryHealthScore = async (sku: string, data: any): Promise<InventoryHealthScore> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the inventory health for SKU ${sku} based on this data: ${JSON.stringify(data)}. Provide a score (0-100), factors, and a recommendation.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          sku: { type: Type.STRING },
          score: { type: Type.NUMBER },
          factors: { type: Type.ARRAY, items: { type: Type.STRING } },
          recommendation: { type: Type.STRING }
        },
        required: ["sku", "score", "factors", "recommendation"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const getDemandForecast = async (sku: string, history: any): Promise<DemandForecast> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Predict the demand for SKU ${sku} for the next 30 days based on this historical data: ${JSON.stringify(history)}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          sku: { type: Type.STRING },
          forecast: { type: Type.NUMBER },
          confidence: { type: Type.NUMBER },
          message: { type: Type.STRING }
        },
        required: ["sku", "forecast", "confidence", "message"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const detectAnomalies = async (data: any): Promise<string[]> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Detect any anomalies in this warehouse data: ${JSON.stringify(data)}. Return a list of anomaly descriptions.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });

  return JSON.parse(response.text);
};
