"use client";

import React from "react";
import { ReactTyped } from "react-typed";
import { FaLinkedin, FaGithub, FaFileDownload } from "react-icons/fa";
import styles from "@/styles/Hero.module.css";

interface HeroProps {
  name: string;
  positions: string[];
  aboutMe: string;
  linkedin: string;
  github: string;
  cvLink: string;
  profileImage: string;
}

const Hero: React.FC<HeroProps> = ({
  name,
  positions,
  aboutMe,
  linkedin,
  github,
  cvLink,
  profileImage,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.descripcion}>
          <h1>{name}</h1>
          <h2>
            {" "}
            <ReactTyped
              strings={positions}
              typeSpeed={40}
              backSpeed={50}
              backDelay={1000}
              loop
            />
          </h2>
          <p>{aboutMe}</p>
          <div className={styles.icons}>
            <a
              href={linkedin}
              className={styles.hoverText}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.tooltipText} id="fade">
                LinkedIn
              </span>
              <FaLinkedin />
            </a>
            <a
              href={github}
              className={styles.hoverText}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.tooltipText} id="fade">
                GitHub
              </span>
              <FaGithub />
            </a>
            <a
              href={cvLink}
              className={styles.hoverText}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.tooltipText} id="fade">
                Resume
              </span>
              <FaFileDownload />
            </a>
          </div>
        </div>
        <div className={styles.image}>
          <img src={profileImage} alt={`${name}'s profile`} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
