import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // ✅ adjust path if needed

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import backgroundImg from "../images/PurpleLove.jpg";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { login } = useAuth(); // 💥 use context to update token

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/USER-SERVICE/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const resData = await response.json();

        login(resData.token, resData.username, resData.email);

        setSnackbar({
          open: true,
          message: `Welcome ${resData.username}`,
          severity: "success",
        });

        // 🔥 Delay the navigation a bit (let Snackbar breathe)
        setTimeout(() => {
          navigate("/home", {
            state: { welcomeMessage: `Welcome ${resData.username}` },
          });
        }, 1000); // wait 1 sec before navigating
      } else {
        const errorMsg = await response.text();
        setSnackbar({
          open: true,
          message: "Login failed: " + errorMsg,
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Network error. Please check your backend!",
        severity: "error",
      });
    }
  };

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
      }}
    >
      <Paper
        sx={{
          bgcolor: "rgba(233, 192, 219, 0.8)",
          borderRadius: "20px",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: { xs: "90%", sm: 350 },
        }}
      >
        <Typography variant="h5" gutterBottom>
          WELCOME
        </Typography>
        <Typography variant="h6" color="black" gutterBottom>
          Please enter your details to Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
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
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
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

          <Button
            fullWidth
            variant="text"
            sx={{ color: "purple", paddingLeft: 22 }}
            onClick={() => navigate("/forgot")}
          >
            forgot password?
          </Button>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 1, color: "white", backgroundColor: "black" }}
          >
            Sign In
          </Button>
        </form>

        <Typography color="black" sx={{ fontSize: 15, pt: 2 }}>
          Not a member?
          <Button
            variant="text"
            sx={{ fontSize: 10, color: "purple" }}
            onClick={() => navigate("/register")}
          >
            register now
          </Button>
        </Typography>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000} // stays for 5 seconds now
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
