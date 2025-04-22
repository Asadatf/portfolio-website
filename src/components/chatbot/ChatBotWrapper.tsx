import React, { useState } from "react";
import ChatToggle from "./ChatToggle";
import ChatInterface from "./ChatInterface";
const ChatbotWrapper: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <ChatToggle isOpen={isChatOpen} toggleChat={toggleChat} />
      <ChatInterface isOpen={isChatOpen} toggleChat={toggleChat} />
    </>
  );
};

export default ChatbotWrapper;
