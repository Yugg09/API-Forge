import { GoogleGenAI } from "@google/genai";
import {
  ExplainAPIInput,
  GenerateTestsInput,
} from "../validators/ai.validator";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function testGemini() {
  const result = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: "Say Hello from Gemini",
  });

  return result.text;
}

export async function explainAPI(data: ExplainAPIInput) {
  const prompt = `
Explain this API.

Method: ${data.method}
URL: ${data.url}

Request Body:
${JSON.stringify(data.body, null, 2)}

Response:
${JSON.stringify(data.response, null, 2)}

Include:

# Purpose

# Endpoint

# Request Body

# Response Explanation

# Common Status Codes

# Common Errors

# Best Practices
`;

  const result = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });

  return result.text;
}

export async function generateTestCases(data: GenerateTestsInput) {
  const prompt = `
Generate professional API test cases.

Method: ${data.method}
URL: ${data.url}

Body:
${JSON.stringify(data.body, null, 2)}

Generate:

1. Positive Test Cases
2. Negative Test Cases
3. Edge Cases
4. Security Test Cases
5. Performance Test Cases

Return in markdown.
`;

  const result = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });

  return result.text;
}