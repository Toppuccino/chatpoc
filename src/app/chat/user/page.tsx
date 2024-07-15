"use client";

import React, { useState, useRef, useEffect } from "react";
import { Avatar, Breadcrumb, Button, Layout, List, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { SendOutlined, FileAddOutlined } from "@ant-design/icons";
import { SizeType } from "antd/es/config-provider/SizeContext";
import ChatMessage from "@/app/components/ChatMessage";
import Link from "next/link";
import NavBar from "@/app/components/NavBar";
import LeftNav from "@/app/components/LeftNav";
import { IData } from "../../../../services/lists/list.model";
import { useSearchParams } from "next/navigation";

const { Sider, Content, Footer } = Layout;

const lorem =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tempore, molestiae eligendi fugit ut sequi quas omnis soluta vel similique a nulla minima. Blanditiis necessitatibus perferendis, nostrum maxime at autem.";
//   {
//     id: 2,
//     senderId: 2,
//     content: lorem,
//     timestamp: "2024-07-07T10:32:00",
//   },
//   {
//     id: 3,
//     senderId: 1,
//     content: "How are you?",
//     timestamp: "2024-07-07T10:35:00",
//   },
//   {
//     id: 4,
//     senderId: 2,
//     content: lorem,
//     timestamp: "2024-07-07T10:32:00",
//   },
//   {
//     id: 5,
//     senderId: 1,
//     content: "huh",
//     timestamp: "2024-07-07T10:32:00",
//   },
// ];

let messageArray: IData[] = [
  {
    user: {
      userId: "2",
      gender: "male",
      name: { title: "Mr", first: "شایان", last: "نكو نظر" },
      topMessage: "how are u?",
      picture: {
        large: "https://randomuser.me/api/portraits/men/38.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/38.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/38.jpg",
      },
      nat: "IR",
    },
    message: [
      {
        mBy: "1",
        mTo: "2",
        messageId: "1",
        content: "Hello!",
        timestamp: "2024-07-07T10:30:00",
      },
      {
        mBy: "2",
        mTo: "1",
        messageId: "2",
        content: lorem,
        timestamp: "2024-07-07T10:32:00",
      },
      {
        mBy: "1",
        mTo: "2",
        messageId: "3",
        content: "How are you?",
        timestamp: "2024-07-07T10:35:00",
      },
      {
        mBy: "2",
        mTo: "1",
        messageId: "4",
        content: lorem,
        timestamp: "2024-07-07T10:32:00",
      },
      {
        mBy: "1",
        mTo: "2",
        messageId: "5",
        content: "huh",
        timestamp: "2024-07-07T10:32:00",
      },
    ],
  },
  {
    user: {
      userId: "3",
      gender: "male",
      name: { title: "Mr", first: "Estefânio", last: "da Costa" },
      topMessage: "HELPPPPPPPPPP",
      picture: {
        large: "https://randomuser.me/api/portraits/men/2.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/2.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/2.jpg",
      },
      nat: "BR",
    },
    message: [
      {
        mBy: "1",
        mTo: "3",
        messageId: "1",
        content: "Hello!",
        timestamp: "2024-07-07T10:30:00",
      },
      {
        mBy: "3",
        mTo: "1",
        messageId: "2",
        content: "Wtf",
        timestamp: "2024-07-07T10:32:00",
      },
      {
        mBy: "3",
        mTo: "1",
        messageId: "3",
        content: "ANSWERRRRRR",
        timestamp: "2024-07-07T10:35:00",
      },
    ],
  },
];

export default function ChatUser() {
  const currentUserId = "1";
  const [messageInput, setMessageInput] = useState("");
  const [size, setSize] = useState<SizeType>("large");
  const [data, setData] = useState<IData[]>([]);
  const messageArrayEndRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const targetId = searchParams.get("targetId");
  const [pos, setPos] = useState<any>();

  const init = () => {
    if (targetId) {
      const position = findUserPosition(messageArray, targetId);
      setPos(position);
    }
    startAtBottom();
    fetchUserData();
  };

  useEffect(() => {
    init();
  }, [targetId]);

  useEffect(() => {
    scrollToBottom();
  }, [messageArray]);

  const scrollToBottom = () => {
    if (messageArrayEndRef.current) {
      messageArrayEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };

  const startAtBottom = () => {
    if (messageArrayEndRef.current) {
      messageArrayEndRef.current.scrollTop =
        messageArrayEndRef.current.scrollHeight;
    }
  };

  function findUserPosition(messageArray: IData[], targetId: string) {
    for (let i = 0; i < messageArray.length; i++) {
      if (messageArray[i].user.userId === targetId) {
        return i;
      }
    }
  }

  const fetchUserData = () => {
    setData(messageArray);
    // setLoading(false);
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

    if (targetId) {
      const newMessage = {
        mBy: currentUserId.toString(),
        mTo: targetId,
        messageId: (messageArray[pos].message.length + 1).toString(),
        content: messageInput,
        timestamp: new Date().toISOString(),
      };

      messageArray[pos].message.push(newMessage);
      console.log(newMessage);
      setMessageInput("");

      setTimeout(() => {
        scrollToBottom();
      }, 30);
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
                <List
                  dataSource={data}
                  renderItem={(item) => {
                    const mostRecentMessage =
                      item.message[item.message.length - 1];

                    return (
                      <List.Item key={item.user.topMessage}>
                        <List.Item.Meta
                          avatar={<Avatar src={item.user.picture.large} />}
                          title={
                            <Link
                              href={`/chat/user?targetId=${item.user.userId}`}
                            >
                              {item.user.name.last}
                            </Link>
                          }
                          description={
                            mostRecentMessage ? mostRecentMessage.content : ""
                          }
                        />
                        <span></span>
                      </List.Item>
                    );
                  }}
                />
              </div>
            </Sider>

            <Layout>
              <Content style={{ padding: "0 48px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item>Chat</Breadcrumb.Item>
                  <Breadcrumb.Item>{targetId}</Breadcrumb.Item>
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
                  {messageArray[pos] &&
                    messageArray[pos].message.map((message) => (
                      <ChatMessage
                        key={message.messageId}
                        mBy={message.mBy}
                        content={message.content}
                        timestamp={message.timestamp}
                      />
                    ))}
                  <div ref={messageArrayEndRef} />
                </div>
                {/* {pos !== undefined && (
                  <ChatInterface messages={messageArray[pos].message} />
                )} */}
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
