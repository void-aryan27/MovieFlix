import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import backgroundImg from "../images/PurpleLove.jpg";
import axios from "axios";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {

      console.log("🧪 Form Data:", data);
      console.log("🧪 Token:", token);

      const response = await axios.post(
        "http://localhost:8080/USER-SERVICE/reset-password",
        {
          token: token,
          newPassword: data.password,
        }
      );

      if (response.status === 200) {
        alert("Password reset successfully!");
        navigate("/");
      } else {
        alert("Failed to reset password.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Something went wrong. Try again.");
    }
  };

console.log("Token from URL:", token);


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
          Reset Your Password
        </Typography>
        <Typography sx={{ fontSize: 15, color: "black" }} gutterBottom>
          Set a new password below 👇
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <TextField
            fullWidth
            type="password"
            label="New Password"
            margin="normal"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            margin="normal"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
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
