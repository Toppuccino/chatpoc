"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Avatar,
  Breadcrumb,
  Button,
  Divider,
  Layout,
  List,
  Skeleton,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { SendOutlined, FileAddOutlined } from "@ant-design/icons";
import { SizeType } from "antd/es/config-provider/SizeContext";
import ChatMessage from "@/app/components/ChatMessage";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import NavBar from "@/app/components/NavBar";
import LeftNav from "@/app/components/LeftNav";
import { IDataType } from "../../../../services/lists/list.model";

const { Sider, Content, Footer } = Layout;

const User = "User#5213128989a";

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
    senderId: 1,
    content: "huh",
    timestamp: "2024-07-07T10:32:00",
  },
];

export default function Home() {
  const currentUserId = 1;
  const [messageInput, setMessageInput] = useState("");
  const [size, setSize] = useState<SizeType>("large");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IDataType[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMoreData();
  }, []);

  useEffect(() => {
    startAtBottom;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        console.log({ data });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

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

  return (
    <Layout>
      <Layout className="h-screen">
        <LeftNav />

        <Layout>
          <NavBar />

          <Layout>
            <Sider theme="light" width={300}>
              <div
                id="scrollableDiv"
                style={{
                  height: "calc(100vh - 64px)",
                  overflowY: "auto",
                  overflowX: "hidden",
                  padding: "0 16px",
                  borderInlineEnd: "1px solid rgba(0, 0, 0, 0.07)",
                  scrollbarColor: "unset",
                  scrollbarWidth: "thin",
                }}
              >
                <InfiniteScroll
                  dataLength={data.length}
                  next={loadMoreData}
                  hasMore={data.length < 50}
                  loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                  endMessage={
                    <Divider plain>It is all, nothing more 🤐</Divider>
                  }
                  scrollableTarget="scrollableDiv"
                >
                  <List
                    dataSource={data}
                    renderItem={(item) => (
                      <List.Item key={item.email}>
                        <List.Item.Meta
                          avatar={<Avatar src={item.picture.large} />}
                          title={
                            <Link href="/chat/user">{item.name.last}</Link>
                          }
                          description={item.email}
                        />
                        <span></span>
                      </List.Item>
                    )}
                  />
                </InfiniteScroll>
              </div>
            </Sider>

            <Layout>
              <Content style={{ padding: "0 48px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item>Chat</Breadcrumb.Item>
                  <Breadcrumb.Item>{User}</Breadcrumb.Item>
                </Breadcrumb>
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
      </Layout>
    </Layout>
  );
}
