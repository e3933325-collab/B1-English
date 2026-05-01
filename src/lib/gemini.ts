import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getTopicContent(topicTitle: string) {
  const prompt = `
    You are an expert English teacher.
    Provide a learning module for the B1 (Intermediate) topic: "${topicTitle}".
    Format the response strictly as JSON with this structure:
    {
      "explanation": "Clear explanation of the topic in Ukrainian, with English examples.",
      "keyRules": ["Rule 1", "Rule 2"],
      "examples": [{"en": "Example in English", "uk": "Переклад українською"}],
      "practice": [
        {
          "question": "Fill in the blank: I ____ (be) to London twice.",
          "options": ["have been", "was", "am"],
          "correctIndex": 0,
          "explanation": "Why this is correct."
        }
      ]
    }
    The explanation should be engaging and suitable for B1 students. Use Ukrainian for the general instructions but keep English examples clear.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    if (!response.text) return null;
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
}
