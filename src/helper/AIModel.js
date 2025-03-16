import { GoogleGenerativeAI } from "@google/generative-ai";

export async function run(prompt) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Missing Gemini API key");
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    if (!result || !result.response) {
      throw new Error("No response from Gemini");
    }
    
    const formattedResponse = { response: result.response.text() };
    return formattedResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(`Failed to get AI response: ${error.message}`);
  }
}