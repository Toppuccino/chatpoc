"use client";

import { Button, Input } from "antd";
import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = () => {
    setSubmitted(true);
    // Handle the login logic here
  };

  const isUsernameError = submitted && username === "";
  const isPasswordError = submitted && password === "";

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-96 h-96 rounded-xl shadow-xl flex flex-col justify-center items-center">
        <div className="w-2/3 space-y-4 text-center">
          <h4 className="text-3xl font-bold mb-10">Login</h4>
          <Input
            status={isUsernameError ? "error" : ""}
            placeholder="Username"
            prefix={<UserOutlined />}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input.Password
            status={isPasswordError ? "error" : ""}
            placeholder="Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="mx-auto" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
