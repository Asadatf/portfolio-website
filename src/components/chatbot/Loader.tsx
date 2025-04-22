import React from "react";
import styles from "@/styles/chatbot/Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
