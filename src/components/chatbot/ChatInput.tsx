import React, { useState } from "react";
import styles from "@/styles/chatbot/ChatInput.module.css";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  disabled,
  placeholder = "Ask me about Asad...",
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim() && !disabled) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form className={styles.inputForm} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <input
          className={styles.textInput}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
        />
        <button
          type="submit"
          className={styles.sendButton}
          disabled={disabled || !message.trim()}
        >
          <Send
            size={18}
            color="white"
            className={`${styles.sendButtonIcon} ${
              disabled || !message.trim() ? styles.disabled : ""
            }`}
          />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
