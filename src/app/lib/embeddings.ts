import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * Generates an embedding vector for the given text using Gemini's embedding model.
 * @param text - The input text to embed
 * @returns A number[] vector representing the embedding
 */
export async function getEmbedding(text: string): Promise<number[]> {
  if (!text || text.trim().length === 0) {
    throw new Error("Text for embedding cannot be empty.");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

    const result = await model.embedContent(text);

    return result.embedding.values;
  } catch (error) {
    console.error("❌ Failed to generate embedding:", error);
    throw new Error("Embedding generation failed.");
  }
}
