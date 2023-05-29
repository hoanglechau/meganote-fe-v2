import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import { Box, Typography } from "@mui/material";
import ColorLink from "../../components/ColorLink";

const Welcome = () => {
  // Get the username and status from the useAuth custom hook
  const { username, isManager, isAdmin } = useAuth();

  // Custom hook to set the page title
  useTitle(`Meganote: ${username}`);

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  // Content to be rendered
  // Only show the "View User Settings" and "Add New User" links if the user is a manager or admin
  const content = (
    <Box component="section" className="welcome">
      <Typography variant="h6" color="text">
        {today}
      </Typography>

      <Typography variant="h3" color="primary">
        Welcome {username}!
      </Typography>

      <ColorLink to="/dash/notes">View Notes</ColorLink>

      <ColorLink to="/dash/notes/new">Add New Note</ColorLink>

      {(isManager || isAdmin) && (
        <ColorLink to="/dash/users">View User Settings</ColorLink>
      )}

      {(isManager || isAdmin) && (
        <ColorLink to="/dash/users/new">Add New User</ColorLink>
      )}
    </Box>
  );

  return content;
};

export default Welcome;
