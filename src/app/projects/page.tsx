"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import styles from "@/styles/Projects.module.css";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  demo: string;
}

export default function Projects() {
  const projects: Project[] = [
    {
      id: 1,
      title: "Final Year Project-CyberFort",
      description:
        "CyberFort is a gamified, AI-powered platform that teaches cybersecurity through interactive 2D games and adaptive learning paths. It features real-time threat simulations, personalized content, and hands-on challenges to make cybersecurity learning engaging and practical.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      image: "/images/projects/fyp.png",
      github: "https://github.com/Asadatf/FYP",
      demo: "https://fyp-website-gilt.vercel.app/",
    },
    {
      id: 2,
      title: "Serverless Notes App",
      description:
        "A full-stack serverless MERN application for efficient note management with advanced features. Built with React and Node.js, enabling secure CRUD operations.",
      tech: ["React.js", "Node.js", "AWS Lambda", "MongoDB"],
      image: "/images/projects/notes-app.png",
      github: "https://github.com/Asadatf/Serverless-Notes-App",
      demo: "",
    },
    {
      id: 3,
      title: "Fake News Detection",
      description:
        "Developed a fake news detection website that classifies text as real or fake. Implemented supervised learning for text classification using CSV files for training and testing.",
      tech: ["Machine Learning", "Python", "Flask", "Scikit-learn"],
      image: "/images/projects/fake-news.png",
      github: "https://github.com/Asadatf/FakeNewsDetection",
      demo: "",
    },
  ];

  return (
    <section className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.header}
      >
        <h1 className={styles.title}>
          My <span className={styles.highlight}>Projects</span>
        </h1>
        <p className={styles.subtitle}>
          A showcase of my work, featuring web applications, AI systems, and
          software solutions that demonstrate my technical skills and
          creativity.
        </p>
      </motion.div>

      <div className={styles.projectGrid}>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            className={styles.projectCard}
          >
            <div className={styles.imageContainer}>
              <div className={styles.imageOverlay}></div>
              <img
                src={project.image || "/images/projects/default.jpg"}
                alt={project.title}
                className={styles.projectImage}
              />
              <h3 className={styles.projectTitle}>{project.title}</h3>
            </div>

            <div className={styles.projectContent}>
              <p className={styles.projectDescription}>{project.description}</p>

              <div className={styles.techContainer}>
                {project.tech.map((tech, idx) => (
                  <span key={idx} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className={styles.linkContainer}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  <FaGithub size={20} />
                  <span>GitHub</span>
                </a>

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    <FaExternalLinkAlt size={16} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
