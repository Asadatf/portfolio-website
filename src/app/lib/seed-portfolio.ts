import { storeDocument } from "./upload";
import { PORTFOLIO_INFO } from "./portfolio-data";

/**
 * Seed the vector database with portfolio chunks
 */
export async function seedPortfolio() {
  try {
    console.log("🌱 Starting portfolio data seeding...");

    // Create chunks of portfolio information
    const chunks = [
      // Personal information chunks
      {
        id: "personal-info-1",
        text: `Name: ${PORTFOLIO_INFO.personal.name}. I am a ${PORTFOLIO_INFO.personal.title}. I am ${PORTFOLIO_INFO.personal.Age} years old, born on ${PORTFOLIO_INFO.personal.DOB}.`,
      },
      {
        id: "personal-info-2",
        text: `I am located in ${PORTFOLIO_INFO.personal.location}.`,
      },
      {
        id: "personal-info-3",
        text: `About me: ${PORTFOLIO_INFO.personal.about}`,
      },

      // Education chunks
      {
        id: "education-1",
        text: `Education: I am pursuing a ${PORTFOLIO_INFO.education.degree} at ${PORTFOLIO_INFO.education.university} (${PORTFOLIO_INFO.education.period}) in ${PORTFOLIO_INFO.education.location} with a GPA of ${PORTFOLIO_INFO.education.gpa}.`,
      },
      {
        id: "education-2",
        text: `Previous Education: I completed my ${PORTFOLIO_INFO.education.previousEducation.degree} at ${PORTFOLIO_INFO.education.previousEducation.institution} (${PORTFOLIO_INFO.education.previousEducation.period}) in ${PORTFOLIO_INFO.education.previousEducation.location}.`,
      },

      // Experience chunks
      {
        id: "experience-current",
        text: `Current work: ${PORTFOLIO_INFO.experience.current} Technologies used: ${PORTFOLIO_INFO.experience.currentTechnologies}`,
      },
      {
        id: "experience-past",
        text: `Past experience: ${PORTFOLIO_INFO.experience.past} Technologies used: ${PORTFOLIO_INFO.experience.pastTechnologies}`,
      },

      // Skills chunks
      {
        id: "skills-programming",
        text: `Programming Languages: ${PORTFOLIO_INFO.experience.skills.programmingLanguages}`,
      },
      {
        id: "skills-web",
        text: `Web Development Skills: ${PORTFOLIO_INFO.experience.skills.webDevelopment}`,
      },
      {
        id: "skills-backend",
        text: `Backend & CMS Skills: ${PORTFOLIO_INFO.experience.skills.backend}`,
      },
      {
        id: "skills-cloud",
        text: `Cloud & DevOps Skills: ${PORTFOLIO_INFO.experience.skills.cloudDevOps}`,
      },
      {
        id: "skills-ml",
        text: `Machine Learning Skills: ${PORTFOLIO_INFO.experience.skills.machineLearning}`,
      },
      {
        id: "skills-game",
        text: `Game Development Skills: ${PORTFOLIO_INFO.experience.skills.gameDevelopment}`,
      },
      {
        id: "skills-soft",
        text: `Soft Skills: ${PORTFOLIO_INFO.experience.skills.softSkills}`,
      },

      // Project chunks
      ...PORTFOLIO_INFO.projects.map((project, index) => ({
        id: `project-${index}`,
        text: `Project: ${project.title}. Description: ${
          project.description
        }. Technologies used: ${project.technologies}. ${
          project.link ? `Live link: ${project.link}.` : ""
        } GitHub: ${project.github}`,
      })),

      // Awards chunks
      {
        id: "awards-deans-list",
        text: `Academic Achievement: Dean's List of Honor: Spring '23 — Spring '22 — Fall '21`,
      },
      {
        id: "awards-sadequain",
        text: `Academic Achievement: Sadequain Grammar School's Highest Achiever in CAIE (GCE O Level) 2018.`,
      },

      // Contact information
      {
        id: "contact-info",
        text: `Email: ${PORTFOLIO_INFO.contact.email}, LinkedIn: ${PORTFOLIO_INFO.contact.linkedin}, GitHub: ${PORTFOLIO_INFO.contact.github}`,
      },
    ];

    // Store each chunk in the vector database
    for (const chunk of chunks) {
      console.log(`📝 Storing chunk: ${chunk.id}`);
      await storeDocument(chunk.id, chunk.text);
    }

    console.log("✅ Portfolio data seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding portfolio data:", error);
  }
}

// If this file is run directly, seed the database
if (require.main === module) {
  seedPortfolio()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Failed to seed portfolio data:", err);
      process.exit(1);
    });
}
