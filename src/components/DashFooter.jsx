import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Paper, IconButton, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const DashFooter = () => {
  // Get the username and status from the useAuth custom hook
  const { username, status } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Navigate to the home page when the home button is clicked
  const onGoHomeClicked = () => navigate("/dash");

  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <IconButton
        className="dash-footer__button icon-button"
        title="Home"
        onClick={onGoHomeClicked}
      >
        <HomeIcon />
      </IconButton>
    );
  }

  // Content to be rendered
  const content = (
    <Paper component="footer" className="dash-footer">
      {goHomeButton}
      <Typography color="secondary">Current User: {username}</Typography>
      <Typography color="secondary">Status: {status}</Typography>
    </Paper>
  );

  return content;
};

export default DashFooter;
