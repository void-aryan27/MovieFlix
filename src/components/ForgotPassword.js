import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import backgroundImg from "../images/PurpleLove.jpg";
import axios from "axios";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/USER-SERVICE/forgot-password",
        {
          email: data.email,
        }
      );

      if (response.status === 200) {
        alert("Password reset link sent to: " + data.email);
        alert("Password reset link sent! Check your email.");
// No need to navigate, because link is emailed now

      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("User not found. Please check your email.");
      } else {
        alert("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          bgcolor: "rgba(233, 192, 219, 0.8)",
          borderRadius: "20px",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 350,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Forgot your password?
        </Typography>
        <Typography sx={{ fontSize: 15, color: "black" }} gutterBottom>
          Please enter your email address below to reset your password.
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, color: "white", backgroundColor: "black" }}
          >
            Reset Password
          </Button>
        </form>

        <Button
          variant="text"
          sx={{ fontSize: 12, mt: 1, color: "purple" }}
          onClick={() => navigate("/")}
        >
          Back to Login
        </Button>
      </Paper>
    </Box>
  );
}
