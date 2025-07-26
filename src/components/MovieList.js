import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";
import { Box, Grid, Button, Typography } from "@mui/material";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    if (query.trim() === "") {
      const fetchPopularMovies = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular`,
            {
              params: {
                api_key: API_KEY,
                language: "en-US",
                page: page,
              },
            }
          );
          setMovies(response.data.results);
          setTotalPages(response.data.total_pages);
        } catch (error) {
          console.error("Error fetching popular movies:", error);
        }
      };
      fetchPopularMovies();
    }
  }, [API_KEY, page, query]);

  useEffect(() => {
    if (query.trim() !== "") {
      const fetchSearchResults = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie`,
            {
              params: {
                api_key: API_KEY,
                query: query,
              },
            }
          );
          setMovies(response.data.results);
          setTotalPages(1);
          setPage(1);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };
      fetchSearchResults();
    }
  }, [API_KEY, query]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "white",
        padding: "16px 32px 32px 32px",
      }}
    >
      {/* Pass query and setQuery directly */}
      <SearchBar query={query} setQuery={setQuery} />

      <Grid container spacing={3} justifyContent="center">
        {movies.length ? (
          movies.map((movie) => (
            <Grid item key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))
        ) : (
          <Typography sx={{ mt: 4, width: "100%", textAlign: "center" }} variant="h6">
            No movies found
          </Typography>
        )}
      </Grid>

      {query.trim() === "" && (
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </Button>
          <Typography color="white" variant="body1">
            Page {page} of {totalPages}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MovieList;
