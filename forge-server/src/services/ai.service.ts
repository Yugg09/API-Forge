import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function testGemini() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Say Hello from Gemini",
  });

  return response.text;
}