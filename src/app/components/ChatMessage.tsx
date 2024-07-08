import React from "react";
import { Avatar, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface ChatMessageProps {
  userId: number;
  content: string;
  timestamp: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  userId,
  content,
  timestamp,
}) => {
  const isCurrentUser = (senderId: number): boolean => senderId === 1;

  return isCurrentUser(userId) ? (
    <div style={{ margin: 20, display: "flex", justifyContent: "flex-end" }}>
      <Card
        style={{
          backgroundColor: "#1476ff",
          color: "white",
          width: 300,
          borderRadius: 24,
          marginRight: 10,
        }}
      >
        <p>{content}</p>
      </Card>
      <Avatar icon={<UserOutlined />} />
    </div>
  ) : (
    <div style={{ margin: 20, display: "flex", justifyContent: "flex-start" }}>
      <Avatar icon={<UserOutlined />} />
      <Card
        style={{
          backgroundColor: "#f0f0f0",
          color: "black",
          width: 300,
          borderRadius: 24,
          marginLeft: 10,
        }}
      >
        <p>{content}</p>
      </Card>
    </div>
  );
};

export default ChatMessage;
