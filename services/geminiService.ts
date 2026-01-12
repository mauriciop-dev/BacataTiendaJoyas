
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const productDiscoveryTool: FunctionDeclaration = {
  name: "searchProducts",
  description: "Busca joyas en el catálogo de Bacata Gold basándose en atributos técnicos.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      gem_type: { type: Type.STRING, description: "Tipo de gema (ej: Esmeralda, Diamante)" },
      carats: { type: Type.STRING, description: "Rango de quilates aproximado" },
      origin: { type: Type.STRING, description: "Origen de la piedra (ej: Muzo, Chivor)" },
      max_price: { type: Type.NUMBER, description: "Precio máximo en USD" }
    }
  }
};

export const createAgentChat = (products: Product[]) => {
  return ai.models.generateContent({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: `
        Eres el Asistente Experto de Bacata Gold. 
        Tu objetivo es ayudar a los clientes a encontrar la joya perfecta de esmeralda colombiana.
        Tienes acceso a las herramientas de búsqueda de productos.
        Responde siempre con un tono elegante, profesional y amable.
        Si el usuario pregunta por detalles técnicos, usa los datos del catálogo.
        Si el usuario decide comprar, guíalo al proceso de checkout.
        
        CATÁLOGO ACTUAL: ${JSON.stringify(products)}
      `,
      tools: [{ functionDeclarations: [productDiscoveryTool] }]
    },
    contents: [] // Will be managed in the UI component
  });
};

export const getAIResponse = async (prompt: string, products: Product[]) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: `Eres Bacata Gold AI. Usa este catálogo: ${JSON.stringify(products)}`
    }
  });
  return response.text;
};
