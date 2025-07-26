import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Typography,
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "./AuthContext"; // ✅ adjust path if needed

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const { user, token } = useAuth(); // 🧠 context magic
  const username = user?.username;

  useEffect(() => {
    if (!username || !token) return;

    const checkIfMovieIsFavourite = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/FAVOURITES-SERVICE/api/v1/${username}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsFavourite(res.data);
      } catch (err) {
        console.error("Error fetching favourite status:", err);
      }
    };

    checkIfMovieIsFavourite();
  }, [id, username, token]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: { api_key: API_KEY, language: "en-US" },
          }
        );
        setMovie(movieRes.data);

        const videoRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos`,
          {
            params: { api_key: API_KEY, language: "en-US" },
          }
        );

        const trailers = videoRes.data.results.filter(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );

        if (trailers.length > 0) {
          setTrailerKey(trailers[0].key);
        }
      } catch (error) {
        console.error("Error fetching movie details or trailer:", error);
      }
    };

    fetchMovie();
  }, [id, API_KEY]);

  const handleToggleFavourite = async () => {
    try {
      if (!username || !token || !movie) return;

      const movieToSend = {
        movieId: movie.id.toString(),
        title: movie.title,
        posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        overview: movie.overview,
        releaseDate: movie.release_date,
        rating: movie.vote_average,
      };

      if (!isFavourite) {
        await axios.post(
          `http://localhost:8080/FAVOURITES-SERVICE/api/v1/${username}/add`,
          movieToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsFavourite(true);
      } else {
        await axios.delete(
          `http://localhost:8080/FAVOURITES-SERVICE/api/v1/${username}/remove/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsFavourite(false);
      }
    } catch (err) {
      console.error("Failed to toggle favourite:", err);
    }
  };

  if (!movie)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 10,
          color: "#fff",
          backgroundColor: "#121212",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#121212",
        color: "#eee",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ maxWidth: "900px", margin: "auto", textAlign: "center" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          {movie.title}
          <Tooltip
            title={isFavourite ? "Remove from Favourites" : "Add to Favourites"}
          >
            <IconButton
              onClick={handleToggleFavourite}
              aria-label="toggle favourite"
              sx={{
                ml: 2,
                color: isFavourite ? "error.main" : "red",
                border: isFavourite ? "none" : "2px solid red",
                borderRadius: "50%",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: isFavourite
                    ? "rgba(255, 0, 0, 0.2)"
                    : "rgba(255, 0, 0, 0.1)",
                },
              }}
            >
              {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
        </Typography>

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{
            display: "block",
            margin: "20px auto",
            width: "280px",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(255, 0, 0, 0.7)",
          }}
        />

        <Typography
          variant="body1"
          sx={{ mt: 3, lineHeight: 1.6, fontSize: "1.1rem", fontWeight: "500" }}
        >
          {movie.overview}
        </Typography>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: 2,
            fontWeight: "600",
            fontSize: "0.95rem",
          }}
        >
          <Typography>Release Date: {movie.release_date}</Typography>
          <Typography>Rating: {movie.vote_average}/10</Typography>
          <Typography>Runtime: {movie.runtime} mins</Typography>
          <Typography>
            Genres: {movie.genres.map((g) => g.name).join(", ")}
          </Typography>
        </Box>

        {trailerKey && (
          <Box sx={{ my: 5, display: "flex", justifyContent: "center" }}>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                borderRadius: "10px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
              }}
            ></iframe>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MovieDetail;
