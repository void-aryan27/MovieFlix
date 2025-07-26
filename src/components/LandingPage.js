// components/LandingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import logo from "../images/logo.png"; // Replace with your actual logo path

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    
<Box
  sx={{
    minHeight: "100vh",
    width: "100%",
    overflowX: "hidden", // 🧠 prevents horizontal scroll
    backgroundColor: "rgba(0,0,0,0.5)", // optional overlay feel
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    textAlign: "center",
    position: "relative",
    padding: 4,
    boxSizing: "border-box", // ✅ ensures padding doesn't overflow
  }}
>

  {/* <video
  autoPlay
  muted
  loop
  playsInline
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1, // 🧠 pushes it behind your content
  }}
>
  <source src="/videos/bg-video.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video> */}


<video
  autoPlay
  muted
  loop
  playsInline
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1,
  }}
>
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
</video>


      {/* Logo Animation */}
      <img src={logo} alt="Logo" style={{ width: 150, animation: "pulse 2s infinite" }} />

      <Typography variant="h3" sx={{ mt: 4, fontWeight: "bold" }}>
        Welcome to MovieFlix
      </Typography>
      <Typography variant="h6" sx={{ mt: 2, maxWidth: 500 }}>
        Your one-stop hub for exploring, loving, and curating your movie universe.
      </Typography>

      {/* Top-right Buttons */}
      <Box sx={{ position: "absolute", top: 20, right: 20 }}>
        <Button
          variant="outlined"
          sx={{ mr: 2, color: "#fff", borderColor: "#fff" }}
          onClick={() => navigate("/login")}
        >
          Sign In
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}
