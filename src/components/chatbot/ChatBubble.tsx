import React from "react";
import styles from "@/styles/chatbot/ChatBubble.module.css";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date;
}

interface ChatBubbleProps {
  message: ChatMessage;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  if (isSystem) {
    return (
      <div className={`${styles.messageContent} ${styles.systemContent}`}>
        <p className={styles.messageText}>{message.content}</p>
      </div>
    );
  }

  return (
    <div
      className={`${styles.messageBubble} ${isUser ? styles.userMessage : ""}`}
    >
      {/* Avatar */}
      <div
        className={`${styles.avatar} ${
          isUser ? styles.userAvatar : styles.assistantAvatar
        }`}
      >
        {isUser ? "Y" : "A"}
      </div>

      {/* Message Bubble */}
      <div
        className={`${styles.messageContent} ${
          isUser ? styles.userContent : styles.assistantContent
        }`}
      >
        <p className={styles.messageText}>{message.content}</p>

        {/* Optional timestamp */}
        {message.timestamp && (
          <div
            className={`${styles.timestamp} ${
              isUser ? styles.userTimestamp : styles.assistantTimestamp
            }`}
          >
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
