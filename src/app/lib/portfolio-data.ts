// Function to calculate age from date of birth
function calculateAge(dob: string): number {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

// Portfolio information
export const PORTFOLIO_INFO = {
  personal: {
    name: "Asad Tariq",
    DOB: "21 October 2001",
    Age: calculateAge("21 October 2001"),
    title: "Software Engineer",
    location: "Karachi, Pakistan",
    education: "B.Sc in Computer Science at FAST NUCES (GPA: 3.48/4.0)",
    about:
      "An aspiring Software Engineer with experience in web development, database management, and Machine Learning. Passionate about creating meaningful projects, learning new technologies, and tackling exciting challenges.",
  },
  education: {
    degree: "B.Sc in Computer Science",
    university: "FAST NUCES",
    period: "2021 – Present",
    location: "Karachi, Pakistan",
    gpa: "3.48 / 4.0",
    previousEducation: {
      degree: "A level",
      institution: "Foundation Public School",
      period: "2018 – 2020",
      location: "Karachi, Pakistan",
    },
  },
  experience: {
    current:
      "Currently working as a Trainee Software Developer (MERN/Next.js) at Empiric Technology since February 2025. Building full-stack apps using React.js, Next.js, and Node.js with CMS integration via Strapi. Assisting in API development, deployment (Vercel), and cross-functional collaboration.",
    past: "Full Stack MERN Developer Intern at 10Pearls from October 2024 to December 2024. Created a responsive note-taking app with user authentication and full CRUD features.",
    currentTechnologies:
      "React.js, Next.js, Node.js, Express.js, Strapi CMS, Vercel, Git",
    pastTechnologies: "React.js, Node.js, Express.js, MongoDB, JWT",
    skills: {
      programmingLanguages: "C, C++, JavaScript, Python",
      webDevelopment: "HTML, CSS, React.js, Next.js, Node.js, Express.js",
      backend: "MongoDB, MySQL, PostgreSQL, Strapi, Payload CMS",
      cloudDevOps: "AWS (Lambda, S3, API Gateway, CloudFront), Vercel, Git",
      machineLearning: "Scikit-learn, Pandas, NumPy, TensorFlow, Keras",
      gameDevelopment: "Phaser.js",
      softSkills:
        "Problem Solving, Responsiveness, Attention to Detail, Teamwork, Communication",
    },
  },
  projects: [
    {
      title: "Notes App",
      description:
        "A full-stack serverless MERN application for efficient note management with advanced features. Built a full-stack note-taking app with React and Node.js, enabling secure CRUD operations. Migrated to serverless architecture using AWS (Lambda, API Gateway, S3), improving scalability and performance.",
      technologies:
        "React.js, Node.js, Express.js, MongoDB Atlas, AWS (Lambda, API Gateway, S3, CloudFront), Vite, Tiptap, Formik, JWT, Mocha, VITEST, React Testing Library",
      github: "https://github.com/Asadatf/Serverless-Notes-App",
    },
    {
      title: "Fake News Detection Website",
      description:
        "Developed a fake news detection website that classifies text as real or fake. Implemented supervised learning for text classification (fake vs. real news) using CSV files for training and testing data.",
      technologies:
        "HTML/CSS, FLASK, Scikit-learn, Pandas, NumPy, Jupyter, VS Code",
      github: "https://github.com/Asadatf/FakeNewsDetection",
    },
    {
      title: "CyberFort",
      description:
        "A gamified, AI-powered learning platform that teaches cybersecurity through interactive 2D games. Features adaptive learning paths, personalized challenges, real-time threat simulations, and intelligent tutoring components.",
      technologies: "React, Node.js, MongoDB, Express, Phaser.js",
      link: "https://fyp-website-gilt.vercel.app/",
      github: "https://github.com/Asadatf/FYP",
    },
  ],
  awards: [
    "Dean's List of Honor: Spring '23 — Spring '22 — Fall '21",
    "Sadequain Grammar School's Highest Achiever in CAIE (GCE O Level) 2018",
  ],
  contact: {
    email: "asad.tariqatf@gmail.com",
    linkedin: "https://linkedin.com/in/asad-tariq-atf",
    github: "https://github.com/Asadatf",
  },
};
