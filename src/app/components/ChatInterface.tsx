import React, { useRef, useEffect } from "react";
import ChatMessage from "@/app/components/ChatMessage";
import { IMessage } from "../../../services/lists/list.model";

interface ChatInterfaceProps {
  messages: IMessage[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages }) => {
  const messageArrayEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messageArrayEndRef.current) {
      messageArrayEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };

  return (
    <div
      className="h-screen"
      style={{
        background: "#fff",
        height: "calc(100vh - 220px)",
        borderRadius: 12,
        overflowY: "auto",
      }}
    >
      {messages.map((message) => (
        <ChatMessage
          key={message.messageId}
          mBy={message.mBy}
          content={message.content}
          timestamp={message.timestamp}
        />
      ))}
      <div ref={messageArrayEndRef} />
    </div>
  );
};

export default ChatInterface;
