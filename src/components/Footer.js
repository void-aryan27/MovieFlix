import React from "react";
import { Box, Typography, IconButton, Link } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#121212",
        color: "rgba(255, 255, 255, 0.6)",
        py: 2,
        textAlign: "center",
        fontSize: "0.9rem",
        mt: "auto",
        userSelect: "none",
      }}
    >
      <Typography>
        🎬 MovieVerse &nbsp;&middot;&nbsp; © {new Date().getFullYear()} &nbsp;&nbsp;🖤
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Link href="#" target="_blank" rel="noopener" color="inherit" sx={{ mx: 1 }}>
          <IconButton aria-label="Twitter" sx={{ color: "rgba(255,255,255,0.7)" }}>
            <TwitterIcon />
          </IconButton>
        </Link>
        <Link href="#" target="_blank" rel="noopener" color="inherit" sx={{ mx: 1 }}>
          <IconButton aria-label="Instagram" sx={{ color: "rgba(255,255,255,0.7)" }}>
            <InstagramIcon />
          </IconButton>
        </Link>
        <Link href="#" target="_blank" rel="noopener" color="inherit" sx={{ mx: 1 }}>
          <IconButton aria-label="LinkedIn" sx={{ color: "rgba(255,255,255,0.7)" }}>
            <LinkedInIcon />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
