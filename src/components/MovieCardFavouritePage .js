import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function MovieCardFavouritePage({ movie, handleRemove }) {
  const { title, posterUrl, releaseDate, rating, movieId } = movie;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movieId}`);
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation(); // stop from triggering Card's click
    handleRemove(movieId); // ✂️ call back to parent
  };

  return (
    <Card
      sx={{
        maxWidth: 250,
        backgroundColor: "#2e2e2e",
        color: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.7)",
        borderRadius: 2,
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.9)",
        },
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="375"
        image={posterUrl || "https://via.placeholder.com/500x750?text=No+Image"}
        alt={title}
        sx={{ borderRadius: "12px 12px 0 0", objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
          {releaseDate ? releaseDate.slice(0, 4) : "N/A"}
        </Typography>
        <Rating
          value={rating / 2}
          precision={0.5}
          readOnly
          size="small"
          sx={{ mt: 1, mb: 1, color: "#ff3d47" }}
        />
        <Button
          variant="outlined"
          color="error"
          fullWidth
          onClick={handleRemoveClick}
          sx={{
            borderColor: "#ff3d47",
            color: "#ff3d47",
            "&:hover": {
              backgroundColor: "rgba(255, 61, 71, 0.1)",
              borderColor: "#ff3d47",
            },
          }}
        >
          Remove from Favourites
        </Button>
      </CardContent>
    </Card>
  );
}

export default MovieCardFavouritePage;
