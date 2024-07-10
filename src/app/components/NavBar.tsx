// components/NavBar.js
import React from "react";
import { Avatar, Layout } from "antd";

const { Header } = Layout;

const NavBar = () => (
  <Header
    style={{
      padding: 10,
      backgroundColor: "#fff",
      boxShadow:
        "0 1px 2px 0 rgba(0, 0, 0, 0.03),0 1px 6px -1px rgba(0, 0, 0, 0.02),0 2px 4px 0 rgba(0, 0, 0, 0.02)",
      zIndex: "1000",
    }}
  >
    <div
      className="flex justify-end items-center"
      style={{ height: "100%", marginRight: "8px" }}
    >
      <Avatar>T</Avatar>
    </div>
  </Header>
);

export default NavBar;
