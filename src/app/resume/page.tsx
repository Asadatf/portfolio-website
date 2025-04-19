"use client";

import React, { useState } from "react";
import {
  FaDownload,
  FaShare,
  FaEnvelope,
  FaLink,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import styles from "@/styles/Resume.module.css";

export default function ResumePage() {
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const resumeUrl = "/resume.pdf";
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleDownload = () => {
    // Create a link and trigger download instead of opening in a new tab
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Asad_Tariq_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleShareMenu = () => {
    setIsShareMenuOpen(!isShareMenuOpen);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    alert("Link copied to clipboard!");
    setIsShareMenuOpen(false);
  };

  const handleEmailShare = () => {
    const subject = "Asad's Resume";
    const body = `Check out Asad's resume: ${pageUrl}`;
    window.open(
      `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        body
      )}`
    );
    setIsShareMenuOpen(false);
  };

  const handleLinkedInShare = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        pageUrl
      )}`
    );
    setIsShareMenuOpen(false);
  };

  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        pageUrl
      )}&text=${encodeURIComponent("Check out Asad's resume!")}`
    );
    setIsShareMenuOpen(false);
  };

  const handleWhatsAppShare = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        `Check out Asad's resume: ${pageUrl}`
      )}`
    );
    setIsShareMenuOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.resumeContainer}>
        <div className={styles.controls}>
          <button className={styles.controlButton} onClick={handleDownload}>
            <FaDownload />
            <span>Download</span>
          </button>
          <div className={styles.shareWrapper}>
            <button className={styles.controlButton} onClick={toggleShareMenu}>
              <FaShare />
              <span>Share</span>
            </button>
            {isShareMenuOpen && (
              <div className={styles.shareMenu}>
                <button onClick={handleCopyLink} className={styles.shareOption}>
                  <FaLink />
                  <span>Copy Link</span>
                </button>
                <button
                  onClick={handleEmailShare}
                  className={styles.shareOption}
                >
                  <FaEnvelope />
                  <span>Email</span>
                </button>
                <button
                  onClick={handleLinkedInShare}
                  className={styles.shareOption}
                >
                  <FaLinkedin />
                  <span>LinkedIn</span>
                </button>
                <button
                  onClick={handleTwitterShare}
                  className={styles.shareOption}
                >
                  <FaTwitter />
                  <span>Twitter</span>
                </button>
                <button
                  onClick={handleWhatsAppShare}
                  className={styles.shareOption}
                >
                  <FaWhatsapp />
                  <span>WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={styles.resumeContent}>
          <div className={styles.pdfWrapper}>
            <embed
              src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              type="application/pdf"
              className={styles.resumeFrame}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
