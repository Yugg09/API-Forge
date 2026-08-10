import { GoogleGenAI } from "@google/genai";


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

export async function explainAPI(data: any) {
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

export async function generateTestCases(data: any) {
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

export async function analyzeResponse(
    data: any
  ) {
    const prompt = `
  You are a Senior Backend Engineer.
  
  Analyze the following API response.
  
  Method:
  ${data.method}
  
  URL:
  ${data.url}
  
  Status Code:
  ${data.status}
  
  Request Body:
  ${JSON.stringify(data.requestBody, null, 2)}
  
  Response:
  ${JSON.stringify(data.response, null, 2)}
  
  Generate a report with:
  
  # Overall Score (out of 10)
  
  # Strengths
  
  # Bugs
  
  # Security Issues
  
  # Performance Suggestions
  
  # REST API Best Practices
  
  # Improvements
  
  # Final Verdict
  `;
  
    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });
  
    return result.text;
  }

