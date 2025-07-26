import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MovieList from "../components/MovieList";
import PageWrapper from "../components/PageWrapper";
import { Snackbar, Alert } from "@mui/material";
import { useAuth } from "../auth/AuthContext"; // ✅ adjust path if needed

const Home = () => {
  const { user } = useAuth(); // 🔥 using auth context now
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (user && user.username) {
      setOpenSnackbar(true);
    }
  }, [user]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <PageWrapper>
      <Header />
      <MovieList />
      <Footer />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Welcome, {user?.username}!
        </Alert>
      </Snackbar>
    </PageWrapper>
  );  
};

export default Home;
