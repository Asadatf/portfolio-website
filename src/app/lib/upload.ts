import pinecone from "./pinecone";
import { getEmbedding } from "./embeddings";

// Define the structure of metadata as a flexible record
interface DocumentMetadata {
  [key: string]: any; // Allow any key-value pair in the metadata
}

export async function storeDocument(id: string, text: string): Promise<void> {
  try {
    const indexName = process.env.PINECONE_INDEX_NAME!;
    const index = pinecone.index(indexName);

    const embedding = await getEmbedding(text);

    // Use a more flexible metadata structure
    const metadata: DocumentMetadata = {
      text, // Store the original text as metadata
    };

    await index.upsert([
      {
        id,
        values: embedding,
        metadata, // Pass flexible metadata here
      },
    ]);

    console.log(`✅ Stored document: ${id}`);
  } catch (error) {
    console.error(`❌ Failed to store document ${id}:`, error);
    throw error;
  }
}
