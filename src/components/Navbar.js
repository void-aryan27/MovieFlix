import { NavLink } from "react-router-dom";
import { Box, Button } from "@mui/material";

// Import the icons
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import { TrendingUp } from "@mui/icons-material";

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/Home", icon: <HomeIcon /> },
    { name: "Favourites", path: "/favourites", icon: <FavoriteIcon /> },
   {
      name: "Recommendations",
      path: "/recommendation",
      icon: <TrendingUp/>,
    },
 { name: "Profile", path: "/profile", icon: <PersonIcon /> },
  ];

  return (
    <Box sx={{ display: "flex", gap: 3 }}>
      {navItems.map(({ name, path, icon }) => (
        <Button
          key={name}
          component={NavLink}
          to={path}
          sx={{
            color: "white",
            minWidth: "50px",
            padding: "8px",
            "&.active": {
              borderBottom: "2px solid #FF4081",
              color: "#FF4081",
            },
            "& svg": {
              fontSize: "28px",
            },
          }}
        >
          {icon}
        </Button>
      ))}
    </Box>
  );
};

export default Navbar;
