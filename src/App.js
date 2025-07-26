import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieList from "./components/MovieList"; // This now has search bar too
import MovieDetail from "./components/MovieDetail";
import { FavouritePage } from "./components/FavouritePage";
import LoginPage from "./components/Login";
import RegisterPage from "./components/RegisterPage";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./components/LandingPage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import { Recommendations } from "./components/Recommendations";

function App() {
  console.log("TMDB API Key:", process.env.REACT_APP_TMDB_API_KEY);

  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <MovieList />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        {/* Remove the /search route entirely */}

        <Route
          path="/favourites"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <FavouritePage />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/movie/:id"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <MovieDetail />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <Profile />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommendation"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <Recommendations />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
