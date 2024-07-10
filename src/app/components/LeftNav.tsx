import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeFilled,
  MessageFilled,
  UserOutlined,
  SettingFilled,
} from "@ant-design/icons";
import Link from "next/link";

const { Sider } = Layout;

const LeftNav = ({}) => (
  <Sider collapsed={true}>
    <Menu theme="dark" defaultSelectedKeys={["2"]} className="mt-16">
      <Menu.Item
        key="1"
        icon={
          <Link href="/">
            <HomeFilled />
          </Link>
        }
      >
        Home
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={
          <Link href="/chat">
            <MessageFilled />
          </Link>
        }
      >
        Chat
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="4" icon={<SettingFilled />}>
        Settings
      </Menu.Item>
    </Menu>
  </Sider>
);

export default LeftNav;
