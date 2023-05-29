import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { toggleTheme } from "../features/theme/themeSlice";
import { Paper } from "@mui/material";

const DashFooter = () => {
  // Theme switching
  const dispatch = useDispatch();

  const handleChangeTheme = () => {
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
    <Paper component="footer" className="dash-footer">
      {goHomeButton}
      <p>Current User: {username}</p>
      <p>Status: {status}</p>
      <IconButton onClick={handleChangeTheme}>
        <DarkModeIcon />
      </IconButton>
    </Paper>
  );

  return content;
};

export default DashFooter;
