import React, { useState, useEffect } from "react";
import { Button, Avatar, Menu, Typography } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  ReadOutlined,
  FundOutlined,
  MenuOutlined,
  GithubOutlined,
} from "@ant-design/icons";

import icon from "../assets/CARAT_logo.png";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(true);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size={75} />
        <Typography.Title level={2} className="logo">
          <Link to="/">CARAT</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />} style={{ color: "#fff" }}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />} style={{ color: "#fff" }}>
            <Link to="/coins">Coins</Link>
          </Menu.Item>
          <Menu.Item icon={<ReadOutlined />} style={{ color: "#fff" }}>
            <Link to="/news">News</Link>
          </Menu.Item>
          <Menu.Item icon={<GithubOutlined />} style={{ color: "#fff" }}>
            <a
              href="https://github.com/HarmonyEarth/carat"
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub
            </a>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
