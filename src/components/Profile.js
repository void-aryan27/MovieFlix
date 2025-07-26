import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axios from "axios";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";

const indianLanguages = [
  "Hindi", "English", "Tamil", "Telugu", "Bengali", "Gujarati", "Kannada",
];

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!user?.username) return;

    axios
      .get(`http://localhost:8080/USER-SERVICE/user/${user.username}`)
      .then((res) => {
        setUserData(res.data);
        setValue("username", res.data.username);
        setValue("email", res.data.email);
        setValue("preferredLanguage", res.data.preferredLanguage || "");
      })
      .catch((err) => console.error("Failed to fetch user:", err));
  }, [user, setValue]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      logout();
      navigate("/", { replace: true });
    }
  };

  const onSubmit = (data) => {
    axios
      .put(
        `http://localhost:8080/USER-SERVICE/update/${user.username}`,
        data
      )
      .then(() => {
        setUserData((prev) => ({ ...prev, ...data }));
        setIsEditing(false);
        alert("Profile updated!");
      })
      .catch((err) => {
        console.error(err);
        alert("Update failed");
      });
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#121212",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "60px 20px 20px 20px",
        }}
      >
        <div
          style={{
            position: "relative",
            maxWidth: 400,
            width: "100%",
            padding: "30px",
            backgroundColor: "#2e2e2e",
            color: "#fff",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.7)",
            textAlign: "center",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          {/* Edit Icon Top-Right */}
          <button
            onClick={() => setIsEditing(true)}
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              background: "none",
              border: "none",
              color: "#ff3d47",
              display: "flex",
              alignItems: "center",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            <EditIcon fontSize="small" />
            <span style={{ marginLeft: "4px" }}>Edit</span>
          </button>

          {/* Profile Image */}
          {userData?.profileImageUrl ? (
            <img
              src={`http://localhost:8080${userData.profileImageUrl}`}
              alt="Profile"
              width={120}
              height={120}
              style={{ borderRadius: "50%", marginBottom: "20px" }}
            />
          ) : (
            <div
              style={{
                margin: "0 auto 20px",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: "#444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3rem",
                color: "#aaa",
                userSelect: "none",
              }}
            >
              👤
            </div>
          )}

          {/* Info */}
          <h2 style={{ marginBottom: "8px" }}>
            Welcome,{" "}
            <span style={{ color: "#ff3d47" }}>
              {user?.username || "Guest"}
            </span>
          </h2>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.75)",
              marginBottom: "30px",
            }}
          >
            Email: {userData?.email || "N/A"}
          </p>

          {/* Logout */}
          <button
            onClick={handleLogout}
            style={{
              padding: "12px 30px",
              backgroundColor: "#ff3d47",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "1rem",
              boxShadow: "0 4px 10px rgba(255, 61, 71, 0.5)",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* ✨ Dark-Themed Edit Modal */}
      {isEditing && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              backgroundColor: "#2e2e2e",
              color: "#fff",
              padding: "30px",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "400px",
              fontFamily: "'Segoe UI', sans-serif",
            }}
          >
            <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
              Edit Profile
            </h2>

            {/* Username */}
            <label>Username</label>
            <input
              disabled
              type="text"
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                backgroundColor: "#444",
                color: "#ccc",
                border: "none",
                borderRadius: "5px",
              }}
              {...(control && { ...control.register })}
              value={userData?.username || ""}
            />

            {/* Email */}
            <label>Email</label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    backgroundColor: "#1e1e1e",
                    color: "#fff",
                    border: "1px solid #555",
                    borderRadius: "5px",
                  }}
                />
              )}
            />
            {errors.email && (
              <Typography color="error" variant="body2" sx={{ mb: 1 }}>
                {errors.email.message}
              </Typography>
            )}

            {/* Preferred Language */}
            <FormControl
              component="fieldset"
              error={!!errors.preferredLanguage}
              sx={{ width: "100%", mt: 2 }}
            >
              <FormLabel
                component="legend"
                sx={{ mb: 1, textAlign: "center", color: "#fff" }}
              >
                Preferred Language
              </FormLabel>
              <Controller
                name="preferredLanguage"
                control={control}
                rules={{ required: "Select one language" }}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                    row
                    sx={{
                      justifyContent: "center",
                      flexWrap: "wrap",
                      color: "#fff",
                    }}
                  >
                    {indianLanguages.map((lang) => (
                      <FormControlLabel
                        key={lang}
                        value={lang}
                        control={<Radio size="small" sx={{ color: "#fff" }} />}
                        label={lang}
                        sx={{ color: "#fff" }}
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

            {/* Save + Cancel */}
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <button
                type="submit"
                style={{
                  padding: "10px 25px",
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                style={{
                  marginLeft: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#999",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Profile;
