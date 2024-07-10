import React from "react";
import { Avatar, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";

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
    <div
      style={{
        margin: 20,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {/* <span style={{ marginLeft: 20, marginTop: 6, color: "gray" }}>
        {timestamp}
      </span> */}
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
    <div
      style={{
        margin: 20,
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
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
      {/* <span style={{ marginLeft: 20, marginTop: 6, color: "gray" }}>
        {timestamp}
      </span> */}
    </div>
  );
};

export default ChatMessage;
