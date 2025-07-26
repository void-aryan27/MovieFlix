import React, { useState } from "react";
import axios from "axios";
import backgroundImg from "../images/PurpleLove.jpg";
import {
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const indianLanguages = [
    "English",
    "Hindi",
    "Tamil",
    "Telugu",
    "Kannada",
    "Marathi",
  ];

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("username", data.name);
    formData.append("password", data.password);
    formData.append("email", data.email);
    formData.append("preferredLanguage", data.preferredLanguage || "");
    formData.append("favoriteMoviesIds", "");

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    if (selectedFile) {
      formData.append("profileImage", selectedFile);
    }

    try {
      await axios.post(
        "http://localhost:8080/USER-SERVICE/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSnackbar({
        open: true,
        message: "Registration successful!",
        severity: "success",
      });
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      const message =
        error.response && error.response.status === 409
          ? "User already exists!"
          : "Registration failed!";
      setSnackbar({ open: true, message, severity: "error" });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleTogglePassword = () => setShowPassword(!showPassword);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: { xs: 2, sm: 4 },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          bgcolor: "rgba(233, 192, 219, 0.85)",
          borderRadius: "20px",
          padding: { xs: 2, sm: 4 },
          width: { xs: "100%", sm: "90%", md: 400 },
          maxWidth: 500,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" gutterBottom textAlign="center">
          Create an account
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          {profileImage && (
            <Box
              component="img"
              src={profileImage}
              alt="Profile Preview"
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                objectFit: "cover",
                mb: 1,
              }}
            />
          )}
          <Button
            variant="contained"
            component="label"
            size="small"
            sx={{
              mb: 1,
              color: "white",
              backgroundColor: "black",
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            Upload Profile Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Minimum 3 characters" },
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 characters" },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControl
            component="fieldset"
            error={!!errors.preferredLanguage}
            sx={{ width: "100%", mt: 2 }}
          >
            <FormLabel component="legend" sx={{ mb: 1, textAlign: "center" }}>
              Preferred Language
            </FormLabel>
            <Controller
              name="preferredLanguage"
              control={control}
              defaultValue=""
              rules={{ required: "Select one language" }}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  row
                  sx={{ justifyContent: "center", flexWrap: "wrap" }}
                >
                  {indianLanguages.map((lang) => (
                    <FormControlLabel
                      key={lang}
                      value={lang}
                      control={<Radio size="small" />}
                      label={lang}
                    />
                  ))}
                </RadioGroup>
              )}
            />
            {errors.preferredLanguage && (
              <Typography color="error" variant="body2" sx={{ mt: 0.5 }}>
                {errors.preferredLanguage.message}
              </Typography>
            )}
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              color: "white",
              backgroundColor: "black",
              "&:hover": { backgroundColor: "#333" },
            }}
            type="submit"
          >
            Register
          </Button>
        </form>

        <Typography
          color="black"
          sx={{ fontSize: 15, pt: 2, textAlign: "center" }}
        >
          Already have an account?
          <Button
            variant="text"
            sx={{ fontSize: 11, color: "purple" }}
            onClick={() => navigate("/")}
          >
            Sign In
          </Button>
        </Typography>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}
