import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Container, Box } from "@mui/material";

const MainLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#1e1e1e",
        color: "#fff",
      }}
    >
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, py: 3 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default MainLayout;
