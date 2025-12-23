import React from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav
      style={{
        backgroundColor: "#3dcd58",
        height: "64px",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        gap: "12px",
      }}
    >
      <img
        src={logo} 
        alt="Logo"
        style={{
          height: "200px",
          width: "200px",
          objectFit: "contain",
        }}
      />

      <span
        style={{
          color: "#ffffff",
          fontSize: "22px",
          fontWeight: 600,
          letterSpacing: "0.5px",
        }}
      >
        CQA-POC
      </span>
    </nav>
  );
};

export default Navbar;
