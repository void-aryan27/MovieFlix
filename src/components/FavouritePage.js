import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export function FavouritePage() {
  const [movies, setMovies] = useState([]);
  const { user, token } = useAuth();
  const username = user?.username;
  const navigate = useNavigate();

  useEffect(() => {
    if (!username || !token) return;

    axios
      .get(`http://localhost:8080/FAVOURITES-SERVICE/api/v1/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setMovies(res.data))
      .catch((err) => console.error("Error fetching favourite movies:", err));
  }, [username, token]);

  async function handleRemove(movieId) {
    try {
      await axios.delete(
        `http://localhost:8080/FAVOURITES-SERVICE/api/v1/${username}/remove/${movieId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMovies((prev) =>
        prev.filter((movie) => movie.movieId !== movieId)
      );
    } catch (error) {
      console.error("Error removing movie:", error);
    }
  }

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "600",
          marginBottom: "2rem",
          textAlign: "center",
          background: "linear-gradient(to right, #ff3d47, #ff758c)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "0.8px",
        }}
      >
        {username ? `${username}'s Favourites` : "Your Favourites"}
      </h2>

      <div
        style={{
          display: "flex",
          gap: "24px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {movies.length ? (
          movies.map((movie) => (
            <div
              key={movie.movieId}
              onClick={() => navigate(`/movie/${movie.movieId}`)}
              style={{
                width: "180px",
                backgroundColor: "#1e1e1e",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                style={{
                  width: "100%",
                  height: "270px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  backgroundColor: "#333",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/180x270?text=Image+Not+Found";
                }}
              />

              <div
                style={{
                  padding: "12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexGrow: 1,
                }}
              >
                <h3
                  style={{
                    fontSize: "1rem",
                    color: "#fff",
                    textAlign: "center",
                    maxWidth: "100%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    marginBottom: "12px",
                  }}
                  title={movie.title}
                >
                  {movie.title}
                </h3>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent card click
                    handleRemove(movie.movieId);
                  }}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#ff3d47",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                    boxShadow: "0 3px 10px rgba(255, 61, 71, 0.4)",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e0353f")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ff3d47")
                  }
                >
                  Remove
                </button>
              </div>
            </div>
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
            No favourites yet! Time to add some bangers 🔥
          </p>
        )}
      </div>
    </div>
  );
}
