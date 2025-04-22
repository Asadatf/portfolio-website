#!/usr/bin/env node

import { seedPortfolio } from "../app/lib/seed-portfolio";

/**
 * Command line script to seed the vector database with portfolio information
 */
async function main() {
  console.log("📚 Starting portfolio vector database seeding...");

  try {
    // Check for required environment variables
    if (!process.env.PINECONE_API_KEY) {
      throw new Error(
        "PINECONE_API_KEY is not defined in environment variables"
      );
    }

    if (!process.env.PINECONE_INDEX_NAME) {
      throw new Error(
        "PINECONE_INDEX_NAME is not defined in environment variables"
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }

    // Run the seeding process
    await seedPortfolio();

    console.log("✅ Portfolio vector database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

main();
