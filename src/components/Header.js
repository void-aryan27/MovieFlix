import React from "react";
import { Box, Typography } from "@mui/material";
import Navbar from "./Navbar";
import logo from "../images/logo.png";

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        padding: 2,
        mb: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "#121212",
        color: "#fff",
        px: 3,
        py: 2,
      }}
    >
      {/* Logo + Text Wrapper */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <img
          src={logo}
          alt="MovieFlix Logo"
          style={{ height: 30, width: "auto", userSelect: "none" }}
        />
        <Typography variant="h5" fontWeight="bold" sx={{ userSelect: "none" }}>
          MovieFlix
        </Typography>
      </Box>

      {/* Navbar stays right */}
      <Navbar />
    </Box>
  );
};

export default Header;
