"use client";

import React, { useState, useRef, useEffect } from "react";
import { Breadcrumb, Button, Card, Layout, Menu, message } from "antd";
import Title from "antd/es/typography/Title";
import SubMenu from "antd/es/menu/SubMenu";
import TextArea from "antd/es/input/TextArea";
import { SendOutlined, FileAddOutlined } from "@ant-design/icons";
import { SizeType } from "antd/es/config-provider/SizeContext";
import ChatMessage from "./components/ChatMessage";

const { Header, Sider, Content, Footer } = Layout;

const lorem =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tempore, molestiae eligendi fugit ut sequi quas omnis soluta vel similique a nulla minima. Blanditiis necessitatibus perferendis, nostrum maxime at autem.";

let messages = [
  { id: 1, senderId: 1, content: "Hello!", timestamp: "2024-07-07T10:30:00" },
  {
    id: 2,
    senderId: 2,
    content: lorem,
    timestamp: "2024-07-07T10:32:00",
  },
  {
    id: 3,
    senderId: 1,
    content: "How are you?",
    timestamp: "2024-07-07T10:35:00",
  },
  {
    id: 4,
    senderId: 2,
    content: lorem,
    timestamp: "2024-07-07T10:32:00",
  },
  {
    id: 5,
    senderId: 2,
    content: lorem,
    timestamp: "2024-07-07T10:32:00",
  },
  {
    id: 6,
    senderId: 2,
    content: lorem,
    timestamp: "2024-07-07T10:32:00",
  },
  {
    id: 7,
    senderId: 2,
    content: lorem,
    timestamp: "2024-07-07T10:32:00",
  },
];

export default function Home() {
  const [size, setSize] = useState<SizeType>("large");
  const currentUserId = 1;
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for the messages container

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.value);
    setMessageInput(event.target.value);
  };

  const handleSubmit = () => {
    if (messageInput.trim() === "") {
      message.error("Please enter a message.");
      return;
    }

    // Assuming you have a function to send the message to a backend or manage state
    const newMessage = {
      id: messages.length + 1,
      senderId: currentUserId,
      content: messageInput,
      timestamp: new Date().toISOString(),
    };

    messages.push(newMessage);
    setMessageInput("");

    // Use setTimeout to ensure the scroll happens after the DOM updates
    setTimeout(() => {
      scrollToBottom();
    }, 30);
  };

  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };

  const startAtBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    startAtBottom;
  }, []);

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom whenever messages update
  }, [messages]);

  return (
    <Layout>
      <Header style={{ padding: 10 }}>
        <Title style={{ color: "white" }} level={3}>
          Chat
        </Title>
      </Header>
      <Layout>
        <Sider
          // style={{ backgroundColor: "white" }}
          width={300}
          theme="light"
        >
          <Menu defaultSelectedKeys={["Chat"]} mode="inline" theme="light">
            <Menu.Item key="Chat">Chat</Menu.Item>
            <SubMenu title={<span>About Us</span>}>
              <Menu.ItemGroup title="Alphabet" key="Alphabet">
                <Menu.Item>a</Menu.Item>
                <Menu.Item>b</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ padding: "0 48px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User#5213128989a</Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{
                background: "#fff",
                height: "calc(100vh - 220px)",
                // paddingTop: 24,
                // paddingLeft: 24,
                // paddingRight: 24,
                borderRadius: 12,
                overflowY: "auto",
              }}
            >
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  userId={message.senderId}
                  content={message.content}
                  timestamp={message.timestamp}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </Content>

          <Footer style={{ textAlign: "center" }}>
            <div className="flex flex-row w-full items-center">
              {/* <TextArea
                value={messageInput}
                onChange={handleInputChange}
                placeholder="Type Something..."
                className="p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0"
              /> */}
              <TextArea
                placeholder="Type Something..."
                autoSize
                className="p-4 border-0 shadow- rounded-lg bg-light focus:ring-0 focus:border-0"
                onChange={handleInputChange}
                value={messageInput}
              />
              <div style={{ margin: "24px 0" }} />

              <Button
                onClick={handleSubmit}
                icon={<SendOutlined />}
                size={size}
                type="primary"
                shape="circle"
                className="ml-4 p-4 cursor-pointer shadow-lg"
              ></Button>

              <Button
                icon={<FileAddOutlined />}
                size={size}
                type="primary"
                shape="circle"
                className="ml-4 p-4 cursor-pointer shadow-md"
              ></Button>
            </div>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}
