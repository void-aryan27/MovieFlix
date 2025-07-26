import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function SearchBar({ query, setQuery }) {
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <TextField
      value={query}
      onChange={handleChange}
      placeholder="Search movies..."
      variant="outlined"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {query && (
              <IconButton onClick={handleClear} edge="end" aria-label="clear search">
                <CloseIcon style={{ color: "white" }} />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
      sx={{
        mb: 3,
        input: { color: "white" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "white" },
          "&:hover fieldset": { borderColor: "#ff4444" },
          "&.Mui-focused fieldset": { borderColor: "#ff4444" },
        },
      }}
    />
  );
}

export default SearchBar;
