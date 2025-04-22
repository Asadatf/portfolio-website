import pinecone from "./pinecone";
import { getEmbedding } from "./embeddings";
import { PORTFOLIO_INFO } from "./portfolio-data";

/**
 * Retrieves relevant portfolio context from Pinecone based on the user query.
 * @param query - The user's message or query
 * @returns Retrieved context or a fallback string
 */
export async function retrieveContext(query: string): Promise<string> {
  try {
    if (!process.env.PINECONE_INDEX_NAME) {
      throw new Error(
        "PINECONE_INDEX_NAME is not defined in environment variables"
      );
    }

    const index = pinecone.index(process.env.PINECONE_INDEX_NAME);

    // Generate embedding for the query
    console.log(`🔢 Generating embedding for query: "${query}"`);
    const queryEmbedding = await getEmbedding(query);

    // Determine query type and adjustments
    const queryLower = query.toLowerCase();
    let topK = 3; // Default
    let minScore = 0.7; // Default relevance threshold

    // Adjust parameters based on query type
    if (
      queryLower.includes("project") ||
      queryLower.includes("portfolio") ||
      queryLower.includes("work") ||
      queryLower.includes("app") ||
      queryLower.includes("application") ||
      queryLower.includes("website") ||
      queryLower.includes("cyberfort") ||
      queryLower.includes("notes") ||
      queryLower.includes("fake news")
    ) {
      topK = 6; // Increase for project queries
      minScore = 0.6; // Lower threshold for projects
      console.log("📱 Project-related query detected - adjusting parameters");
    } else if (
      queryLower.includes("skill") ||
      queryLower.includes("technology") ||
      queryLower.includes("tech") ||
      queryLower.includes("programming") ||
      queryLower.includes("language") ||
      queryLower.includes("framework")
    ) {
      topK = 4; // More skills info
      minScore = 0.65; // Lower threshold for skills
    } else if (
      queryLower.includes("education") ||
      queryLower.includes("university") ||
      queryLower.includes("college") ||
      queryLower.includes("school") ||
      queryLower.includes("gpa") ||
      queryLower.includes("degree")
    ) {
      topK = 3; // Education info
    } else if (
      queryLower.includes("award") ||
      queryLower.includes("achievement") ||
      queryLower.includes("honor") ||
      queryLower.includes("recognition") ||
      queryLower.includes("dean") ||
      queryLower.includes("sadequain") ||
      queryLower.includes("highest") ||
      queryLower.includes("caie")
    ) {
      topK = 3; // Get all award information
      minScore = 0.6; // Lower threshold for awards
    }

    // Query the vector database
    console.log(`🔍 Querying Pinecone with topK=${topK}, minScore=${minScore}`);
    const queryResults = await index.query({
      vector: queryEmbedding,
      topK,
      includeMetadata: true,
    });

    // Check if we got meaningful results
    if (!queryResults.matches || queryResults.matches.length === 0) {
      console.log("⚠️ No matches found in vector DB");
      return getDefaultContextForQuery(query);
    }

    // Extract and join the text from the matches
    const matchTexts = queryResults.matches
      .filter((match) => match.score && match.score > minScore) // Apply the adjusted threshold
      .map((match) => {
        console.log(`✓ Match: ${match.id} (Score: ${match.score})`);
        return match.metadata?.text as string;
      })
      .filter(Boolean);

    if (matchTexts.length === 0) {
      console.log("⚠️ No high-relevance matches found");
      return getDefaultContextForQuery(query);
    }

    const context = matchTexts.join("\n\n");

    // If looking for projects but didn't get all projects, add them explicitly
    if (
      queryLower.includes("project") ||
      queryLower.includes("all project") ||
      queryLower.includes("projects") ||
      queryLower === "tell me about his projects" ||
      queryLower === "what projects has he worked on"
    ) {
      if (
        !context.includes("CyberFort") ||
        !context.includes("Notes App") ||
        !context.includes("Fake News Detection")
      ) {
        console.log(
          "⚠️ Not all projects were retrieved, adding complete project information"
        );
        return getProjectsContext() + "\n\n" + context;
      }
    }

    // If this is about awards but didn't include both, add all awards
    if (
      (queryLower.includes("award") ||
        queryLower.includes("achievement") ||
        queryLower.includes("honor")) &&
      (!context.includes("Dean's List") || !context.includes("Sadequain"))
    ) {
      console.log(
        "⚠️ Not all awards were retrieved, adding complete awards information"
      );
      return getAwardsContext() + "\n\n" + context;
    }

    return context;
  } catch (error) {
    console.error("❌ Error retrieving context from Pinecone:", error);
    return getDefaultContextForQuery(query);
  }
}

/**
 * Gets a default context when no relevant information is found
 */
function getDefaultContextForQuery(query: string): string {
  const queryLower = query.toLowerCase();

  if (
    queryLower.includes("project") ||
    queryLower.includes("work") ||
    queryLower.includes("portfolio")
  ) {
    return getProjectsContext();
  }

  if (
    queryLower.includes("award") ||
    queryLower.includes("achievement") ||
    queryLower.includes("honor")
  ) {
    return getAwardsContext();
  }

  if (
    queryLower.includes("education") ||
    queryLower.includes("university") ||
    queryLower.includes("degree")
  ) {
    return `Education: Asad is pursuing a B.Sc in Computer Science at FAST NUCES (2021 – Present) in Karachi, Pakistan with a GPA of 3.48 / 4.0. Previously completed A level at Foundation Public School (2018 – 2020) in Karachi, Pakistan.`;
  }

  return `Here's some general information about Asad:
    
    Name: ${PORTFOLIO_INFO.personal.name}
    Title: ${PORTFOLIO_INFO.personal.title}
    Education: ${PORTFOLIO_INFO.personal.education}
    Current work: ${PORTFOLIO_INFO.experience.current}`;
}

/**
 * Gets formatted information about all projects
 */
function getProjectsContext(): string {
  return `Asad has worked on the following projects:

1. Notes App: A full-stack serverless MERN application for efficient note management with advanced features. Built with React and Node.js, enabling secure CRUD operations. Migrated to serverless architecture using AWS (Lambda, API Gateway, S3), improving scalability and performance. Technologies used: React.js, Node.js, Express.js, MongoDB Atlas, AWS (Lambda, API Gateway, S3, CloudFront), Vite, Tiptap, Formik, JWT, Mocha, VITEST, React Testing Library. GitHub: https://github.com/Asadatf/Serverless-Notes-App

2. Fake News Detection Website: Developed a fake news detection website that classifies text as real or fake. Implemented supervised learning for text classification (fake vs. real news) using CSV files for training and testing data. Technologies used: HTML/CSS, FLASK, Scikit-learn, Pandas, NumPy, Jupyter, VS Code. GitHub: https://github.com/Asadatf/FakeNewsDetection

3. CyberFort: A gamified, AI-powered learning platform that teaches cybersecurity through interactive 2D games. Features adaptive learning paths, personalized challenges, real-time threat simulations, and intelligent tutoring components. Technologies used: React, Node.js, MongoDB, Express, Phaser.js. Live link: https://fyp-website-gilt.vercel.app/. GitHub: https://github.com/Asadatf/FYP`;
}

/**
 * Gets formatted information about all awards
 */
function getAwardsContext(): string {
  return `Asad has received the following awards and achievements:

1. Dean's List of Honor: Spring '23 — Spring '22 — Fall '21
2. Sadequain Grammar School's Highest Achiever in CAIE (GCE O Level) 2018`;
}
