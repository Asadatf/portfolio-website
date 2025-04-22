import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import Loader from "./Loader";
import styles from "@/styles/chatbot/ChatInterface.module.css";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date;
}

interface ChatInterfaceProps {
  isOpen: boolean;
  toggleChat: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  isOpen,
  toggleChat,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm Asad's virtual assistant. How can I help you learn more about Asad, his projects, skills, or experience?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve or create a session ID
    const storedSessionId = localStorage.getItem("portfolioChatSessionId");
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = generateUUID();
      localStorage.setItem("portfolioChatSessionId", newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  const handleSendMessage = async (content: string) => {
    if (!sessionId) return;

    const userMessage: ChatMessage = {
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const botResponse = await processMessage(content);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: botResponse,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I encountered an error. Please try again later.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Call the API route that uses vector database retrieval
  const processMessage = async (message: string): Promise<string> => {
    try {
      // Show typing indicator for minimum time even if response is fast
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await fetch("/api/portfolio-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: message, sessionId }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error fetching response:", error);
      return "I'm having trouble connecting to my knowledge base. Please try again in a moment.";
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.chatContainer}>
      {/* Chat Header */}
      <div className={styles.chatHeader}>
        <h4 className={styles.chatTitle}>Asad's Assistant</h4>
        <div className={styles.closeButton} onClick={toggleChat}>
          <X color="white" size={18} />
        </div>
      </div>

      {/* Chat Messages */}
      <div className={styles.messagesContainer}>
        {messages.map((message, index) => (
          <ChatBubble key={index} message={message} />
        ))}
        {isLoading && (
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className={styles.inputContainer}>
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};

export default ChatInterface;
