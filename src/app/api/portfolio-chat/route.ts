import { GoogleGenerativeAI } from "@google/generative-ai";
import Chat from "@/app/models/chat";
import sequelize from "@/app/lib/sequelize";
import { retrieveContext } from "@/app/lib/retrieve";
import { PORTFOLIO_INFO } from "@/app/lib/portfolio-data";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Base system prompt with general portfolio guidance
const BASE_SYSTEM_PROMPT = `You are a personal chatbot for Asad Tariq, a Software Engineer. 
Answer user queries based on the provided portfolio information.

Guidelines:
- Only respond to questions about Asad Tariq's background, skills, education, experience, projects, technologies used, awards, achievements, and contact details.
- If a user asks anything outside the scope of the portfolio (like political opinions, general knowledge questions, etc.), respond with: "Sorry, I can only answer questions about Asad Tariq and his work."
- Keep answers clear, professional, and concise.
- Don't invent answers or speculate beyond the given data.
- When discussing Asad's projects, ALWAYS mention all three projects: Notes App, Fake News Detection Website, and CyberFort - along with their GitHub links.
- When asked about education, include his GPA and university information.
- When asked about awards or achievements, ALWAYS mention BOTH the Dean's List honors AND the Sadequain Grammar School's Highest Achiever award in CAIE (GCE O Level) 2018.
- Provide honest assessments of his skills based on the information provided.
- NEVER say "The provided portfolio information does not list specific project names." This is incorrect. His portfolio includes detailed information about all projects.`;

// ✅ API route for handling chat
export async function POST(req: Request) {
  const { query, sessionId } = await req.json();

  try {
    await sequelize.sync();

    // 1️⃣ Retrieve recent chat history
    const chatHistory = await Chat.findAll({
      where: { sessionId },
      order: [["createdAt", "ASC"]],
      limit: 5,
    });

    const historyText = chatHistory
      .map(
        (chat) => `User: ${chat.userMessage}\nBot: ${chat.botResponse || ""}`
      )
      .join("\n");

    // 2️⃣ Detect specific query types that need special handling
    const queryLower = query.toLowerCase();
    let forceFallback = false;

    // Special handling for project queries
    if (
      queryLower.includes("project") ||
      queryLower.includes("portfolio") ||
      queryLower === "tell me about his projects" ||
      queryLower === "what has he worked on"
    ) {
      console.log(
        "🚨 Project-specific query detected, enforcing complete project information"
      );
      forceFallback = true;
    }

    // Special handling for awards queries
    if (
      queryLower.includes("award") ||
      queryLower.includes("achievement") ||
      queryLower.includes("honor") ||
      queryLower.includes("recognition")
    ) {
      console.log(
        "🏆 Awards-specific query detected, enforcing complete awards information"
      );
      forceFallback = true;
    }

    // 3️⃣ Retrieve relevant context from vector DB
    console.log(`🔍 Retrieving context for query: "${query}"`);
    const retrievedContext = await retrieveContext(query);

    // If the context was not found or we're forcing fallback
    let contextToUse = retrievedContext;

    if (
      retrievedContext === "No relevant portfolio info found." ||
      forceFallback
    ) {
      // Create fallback context based on query type
      if (queryLower.includes("project")) {
        contextToUse = `Asad has worked on the following projects:

1. Notes App: A full-stack serverless MERN application for efficient note management with advanced features. Built with React and Node.js, enabling secure CRUD operations. Migrated to serverless architecture using AWS (Lambda, API Gateway, S3), improving scalability and performance. Technologies used: React.js, Node.js, Express.js, MongoDB Atlas, AWS (Lambda, API Gateway, S3, CloudFront), Vite, Tiptap, Formik, JWT, Mocha, VITEST, React Testing Library. GitHub: https://github.com/Asadatf/Serverless-Notes-App

2. Fake News Detection Website: Developed a fake news detection website that classifies text as real or fake. Implemented supervised learning for text classification (fake vs. real news) using CSV files for training and testing data. Technologies used: HTML/CSS, FLASK, Scikit-learn, Pandas, NumPy, Jupyter, VS Code. GitHub: https://github.com/Asadatf/FakeNewsDetection

3. CyberFort: A gamified, AI-powered learning platform that teaches cybersecurity through interactive 2D games. Features adaptive learning paths, personalized challenges, real-time threat simulations, and intelligent tutoring components. Technologies used: React, Node.js, MongoDB, Express, Phaser.js. Live link: https://fyp-website-gilt.vercel.app/. GitHub: https://github.com/Asadatf/FYP`;
      } else if (
        queryLower.includes("award") ||
        queryLower.includes("achievement") ||
        queryLower.includes("honor")
      ) {
        contextToUse = `Asad has received the following awards and achievements:

1. Dean's List of Honor: Spring '23 — Spring '22 — Fall '21
2. Sadequain Grammar School's Highest Achiever in CAIE (GCE O Level) 2018`;
      } else {
        contextToUse = `Here's some general information about Asad:
      
      Name: ${PORTFOLIO_INFO.personal.name}
      Title: ${PORTFOLIO_INFO.personal.title}
      Education: ${PORTFOLIO_INFO.personal.education}
      Current work: ${PORTFOLIO_INFO.experience.current}`;
      }
    }

    console.log(`✅ Using context: ${contextToUse.substring(0, 100)}...`);

    // 4️⃣ Generate response using Gemini with vector-retrieved context
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const fullPrompt = `
    ${BASE_SYSTEM_PROMPT}
    
    RELEVANT PORTFOLIO INFORMATION:
    ${contextToUse}
    
    CONVERSATION HISTORY:
    ${historyText}
    
    USER QUERY: ${query}
    
    Respond to the user query based on the provided relevant portfolio information. 
    Be accurate and thorough, especially about projects and achievements.`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const botMessage = response.text();

    // 5️⃣ Store the conversation
    await Chat.create({
      sessionId,
      userMessage: query,
      botResponse: botMessage,
    });

    return Response.json({
      response: botMessage,
    });
  } catch (error) {
    console.error("Chat error:", error);
    return Response.json({ error: "Something went wrong!" }, { status: 500 });
  }
}
