import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useAuth } from "./AuthContext";

const MovieCard = ({ movie }) => {
  const { title, poster_path, release_date, vote_average, id } = movie;
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const navigate = useNavigate();
  const { user, token } = useAuth(); // 👑 pulling from context
  const username = user?.username;

  const [isFavourite, setIsFavourite] = useState(false);

  // Check if movie is already favourite on mount
  useEffect(() => {
    if (!username || !token) return;

    const checkIfFavourite = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/FAVOURITES-SERVICE/api/v1/${username}/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsFavourite(res.data); // Assuming API returns true/false
      } catch (err) {
        console.error("Error checking favourite status:", err);
      }
    };

    checkIfFavourite();
  }, [id, username, token]);

  // Add/remove favourite handler
  const toggleFavourite = async (e) => {
    e.stopPropagation(); // prevent card click navigation

    try {
      if (!isFavourite) {
        // Add to favourites
        const movieToSend = {
          movieId: id.toString(),
          title,
          posterUrl,
          overview: movie.overview || "",
          releaseDate: release_date,
          rating: vote_average,
        };

        await axios.post(
          `http://localhost:8080/FAVOURITES-SERVICE/api/v1/${username}/add`,
          movieToSend,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsFavourite(true);
      } else {
        // Remove from favourites
        await axios.delete(
          `http://localhost:8080/FAVOURITES-SERVICE/api/v1/${username}/remove/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsFavourite(false);
      }
    } catch (err) {
      console.error("Failed to toggle favourite:", err);
    }
  };

  // Navigate on card click (but not when clicking heart)
  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <Card
      sx={{
        width: 250,
        height: 460,
        bgcolor: "#1e1e1e",
        color: "white",
        boxShadow: 3,
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
        },
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="280"
        image={posterUrl}
        alt={title}
        sx={{ objectFit: "cover" }}
      />

      <IconButton
        onClick={toggleFavourite}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: isFavourite ? "red" : "white",
          zIndex: 10,
        }}
        aria-label={
          isFavourite ? "Remove from favourites" : "Add to favourites"
        }
      >
        {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>

      <CardContent
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingBottom: 2,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "#bbb" }}>
          {release_date ? release_date.slice(0, 4) : "N/A"}
        </Typography>
        <Rating
          name="read-only"
          value={vote_average / 2}
          precision={0.5}
          readOnly
          size="small"
          sx={{ mt: 1 }}
        />
      </CardContent>
    </Card>
  );
};

export default MovieCard;
