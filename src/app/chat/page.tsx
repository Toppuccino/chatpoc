"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Divider, Layout, List, Menu, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import {
  SendOutlined,
  FileAddOutlined,
  BackwardOutlined,
  BackwardFilled,
  HomeFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  MessageFilled,
  UserOutlined,
  HomeOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";

interface DataType {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

const { Header, Sider, Content, Footer } = Layout;

export default function Chat() {
  const currentUserId = 1;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [collapsed, setCollapsed] = useState(false);

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
  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={true}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["2"]}
          items={[
            {
              key: "1",
              icon: (
                <Link href="/">
                  <HomeFilled />
                </Link>
              ),
              label: "Home",
            },
            {
              key: "2",
              icon: (
                <Link href="/chat">
                  <MessageFilled />
                </Link>
              ),
              label: "Chat",
            },
          ]}
        />
      </Sider>
      {/* <Header style={{ padding: 10, backgroundColor: "#1476ff" }}></Header> */}

      <Layout>
        {/* <Sider trigger={null} collapsible collapsed={true}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["2"]}
            items={[
              {
                key: "1",
                icon: (
                  <Link href="/">
                    <HomeFilled />
                  </Link>
                ),
                label: "Home",
              },
              {
                key: "2",
                icon: (
                  <Link href="/chat">
                    <MessageFilled />
                  </Link>
                ),
                label: "Chat",
              },
            ]}
          />
        </Sider> */}
        {/* <Header style={{ padding: 10, backgroundColor: "#1476ff" }}></Header> */}

        <Layout>
          {/* <Content style={{ height: "calc(100vh - 64px)" }}> */}
          <Content className="h-screen">
            <div
              id="scrollableDiv"
              style={{
                height: "100%",
                overflow: "auto",
                padding: "0 16px",
                border: "1px solid rgba(140, 140, 140, 0.35)",
              }}
            >
              <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={data.length < 50}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
              >
                <List
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item key={item.email}>
                      <List.Item.Meta
                        avatar={<Avatar src={item.picture.large} />}
                        title={<Link href="/chat/user">{item.name.last}</Link>}
                        description={item.email}
                      />
                      <div>On Going</div>
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
            </div>
            {/* <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Chats</Breadcrumb.Item>
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
              adwa
            </div> */}
          </Content>
          {/* <Footer style={{ textAlign: "center" }}></Footer> */}
        </Layout>
      </Layout>
    </Layout>
  );
}
