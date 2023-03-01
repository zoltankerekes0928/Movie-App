import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TvIcon from "@mui/icons-material/Tv";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import "./navStyle.css";

const Nav: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    switch (value) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/favorites");
        break;
      case 2:
        navigate("/tvseries");
        break;
      case 3:
        navigate("/movies");
        break;
      case 4:
        navigate("/search");
        break;
      default:
        navigate("/");
    }
  }, [value, navigate]);

  return (
    <BottomNavigation
      className="footer"
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        label="Main"
        style={{ color: "white" }}
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        label="Favorites"
        style={{ color: "white" }}
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Tvseries"
        style={{ color: "white" }}
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        label="Movies"
        style={{ color: "white" }}
        icon={<MovieFilterIcon />}
      />
      <BottomNavigationAction
        label="Search"
        style={{ color: "white" }}
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  );
};

export default Nav;
