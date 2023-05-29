import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Switch } from "@mui/material";
import { toggleTheme } from "../features/theme/themeSlice";

const DashFooter = () => {
  // Theme switch
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();
  const [isDarkTheme, setIsDarkTheme] = useState(theme === "dark");

  const handleChangeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    dispatch(toggleTheme());
  };

  // Get the username and status from the useAuth custom hook
  const { username, status } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Navigate to the home page when the home button is clicked
  const onGoHomeClicked = () => navigate("/dash");

  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <button
        className="dash-footer__button icon-button"
        title="Home"
        onClick={onGoHomeClicked}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  // Content to be rendered
  const content = (
    <footer className="dash-footer">
      {goHomeButton}
      <p>Current User: {username}</p>
      <p>Status: {status}</p>
      <Switch
        checked={isDarkTheme}
        onChange={handleChangeTheme}
        inputProps={{ "aria-label": "controlled" }}
      />
    </footer>
  );

  return content;
};

export default DashFooter;
