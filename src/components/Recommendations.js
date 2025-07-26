import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { useAuth } from "./AuthContext";

export function Recommendations() {
  const { user, token } = useAuth();
  const [languageCode, setLanguageCode] = useState("en");
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  const username = user?.username;
  const displayName =
    username && username.length > 0
      ? username.charAt(0).toUpperCase() + username.slice(1)
      : null;

  useEffect(() => {
    if (username) {
      axios
        .get(
          `http://localhost:8080/FAVOURITES-SERVICE/api/v1/${username}/recommendations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setLanguageCode(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch preferred language:", err);
        });
    }
  }, [username, token]);

  useEffect(() => {
    if (languageCode) {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_original_language=${languageCode}`
        )
        .then((res) => {
          setRecommendedMovies(res.data.results);
        })
        .catch((err) => {
          console.error("Failed to fetch recommended movies:", err);
        });
    }
  }, [languageCode]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        padding: "40px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "600",
          marginBottom: "2rem",
          color: "#ffffff",
          textAlign: "center",
          background: "linear-gradient(to right, #ff3d47, #ff758c)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "0.8px",
        }}
      >
        {displayName
          ? `Specially recommended for you, ${displayName}`
          : "Movie Recommendations"}
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: recommendedMovies.length ? "center" : "center",
          minHeight: "200px",
        }}
      >
        {recommendedMovies.length ? (
          recommendedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p
            style={{
              fontSize: "1.1rem",
              color: "#aaa",
              width: "100%",
              textAlign: "center",
              marginTop: "4rem",
              fontStyle: "italic",
            }}
          >
            Fetching your perfect picks...
          </p>
        )}
      </div>
    </div>
  );
}
