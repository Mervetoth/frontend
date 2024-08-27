import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import IUser from "../../types/user.types";
import logoLight from "../../assets/images/logo/logo-light-mode.png";
import logoDark from "../../assets/images/logo/logo-dark-mode.png";

import { ThemeContext } from "../../Theme"; // Import ThemeContext
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

type Props = {
  currentUser: IUser | undefined;
  showModeratorBoard: boolean;
  showAdminBoard: boolean;
  logOut: () => void;
};

const Navbar: React.FC<Props> = ({
  currentUser,
  showModeratorBoard,
  showAdminBoard,
  logOut,
}) => {
  // Access theme and toggleTheme from the ThemeContext
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("useContext must be used within a ThemeProvider");
  }

  const { theme, toggleTheme } = themeContext;
  useEffect(() => {
    // Apply theme to the document body or other global elements
    document.body.className = theme;
  }, [theme]);

  // Determine the logo based on the current theme
  const logo = theme === "dark-theme" ? logoDark : logoLight;

  return (
    <nav className="navbar navbar-expand --bg-primary ">
      {/* Logo section */}
      <Link to={"/home"} className="navbar-logo">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </Link>

      <div className="navbar-nav mr-auto">
        <li className="link nav-item">
          <Link to={"/register-ip"} className="nav-link">
            Register IP
          </Link>
        </li>
        <li className="link nav-item">
          <Link to={"/manage-ip"} className="nav-link">
            Manage IP
          </Link>
        </li>
        <li className="link nav-item">
          <Link to={"/transfer-ip"} className="nav-link">
            Transfer IP
          </Link>
        </li>
        <li className="link nav-item">
          <Link to={"/plagiarism-detection"} className="nav-link">
            Plagiarism Detection
          </Link>
        </li>
      </div>

      {currentUser ? (
        <div className="navbar-nav ml-auto">
          <li className="link nav-item">
            <Link to={"/profile"} className="nav-link">
              {currentUser.username}
            </Link>
          </li>
          <li className="link nav-item">
            <a href="/login" className="nav-link" onClick={logOut}>
              LogOut
            </a>
          </li>
        </div>
      ) : (
        <div className="navbar-nav ml-auto">
          <li className="link nav-item">
            <Link to={"/login"} className="nav-link">
              Register/Log In
            </Link>
          </li>
          <li className="link nav-item">
            <button
              onClick={toggleTheme}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              {theme === "dark-theme" ? (
                <Brightness7Icon className="link nav-item" />
              ) : (
                <Brightness4Icon className="link nav-item" />
              )}
            </button>
          </li>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
