import React from "react";
import { MessageCircle, X } from "lucide-react";
import styles from "@/styles/chatbot/ChatToggle.module.css";

interface ChatToggleProps {
  isOpen: boolean;
  toggleChat: () => void;
}

const ChatToggle: React.FC<ChatToggleProps> = ({ isOpen, toggleChat }) => {
  return (
    <div onClick={toggleChat} className={styles.toggleButton}>
      {isOpen ? (
        <X size={24} color="white" />
      ) : (
        <MessageCircle size={24} color="white" />
      )}
    </div>
  );
};

export default ChatToggle;
