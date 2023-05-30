import { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";
import PulseLoader from "react-spinners/PulseLoader";
import ColorLink from "../components/ColorLink";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import { Paper, Typography, Box, IconButton } from "@mui/material";

// Use these regex patterns to compare the location to the URL to verify which location we're on or not on -> use this to decide whether we want to display specific buttons in the header or not
const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  // Get the user status from the useAuth custom hook
  const { isManager, isAdmin } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  // Get the 'sendLogout' function and its statuses from the RTK Query custom hook
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  // Side effect
  useEffect(() => {
    // If logging out successfully, navigate to the home page
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]); // 'navigate' is put here as a dependency in order to avoid a warning (the 'navigate' function won't change)

  // Button handlers
  const onNewNoteClicked = () => navigate("/dash/notes/new");
  const onNewUserClicked = () => navigate("/dash/users/new");
  const onNotesClicked = () => navigate("/dash/notes");
  const onUsersClicked = () => navigate("/dash/users");

  // Theme switching
  const handleChangeTheme = () => {
    dispatch(toggleTheme());
  };

  let dashClass = null;
  if (
    // Making sure that we're not on the dash, notelist or userlist pages
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  // Buttons and whether we want to render them depending on the path
  let newNoteButton = null;
  // Use regex patterns to check the pathname. If the pathname matches a pattern, we'll render that button
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <IconButton
        className="icon-button"
        title="New Note"
        onClick={onNewNoteClicked}
      >
        <NoteAddIcon />
      </IconButton>
    );
  }

  // Only render the 'New User' button if we're on the User List page. Here, we don't need to check whether the user is an Admin or a Manager because only admins and managers can access the 'User List' page anyway (only admins and managers can access this page and click this button to create a new user)
  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <IconButton
        className="icon-button"
        title="New User"
        onClick={onNewUserClicked}
      >
        <PersonAddIcon />
      </IconButton>
    );
  }

  let userButton = null;
  // Only render the 'User' button if the user is a manager or admin
  if (isManager || isAdmin) {
    // We're making sure that we're not on the User List and the pathname includes 'dash' -> We don't want to provide the 'User' button to go to the same page that we're on. We also want to make sure that we're on the protected pages with 'dash'
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      userButton = (
        <IconButton
          className="icon-button"
          title="Users"
          onClick={onUsersClicked}
        >
          <SupervisedUserCircleIcon />
        </IconButton>
      );
    }
  }

  let notesButton = null;
  if (!NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
    notesButton = (
      <IconButton
        className="icon-button"
        title="Notes"
        onClick={onNotesClicked}
      >
        <DescriptionIcon />
      </IconButton>
    );
  }

  // Create the logout button
  const logoutButton = (
    <IconButton className="icon-button" title="Logout" onClick={sendLogout}>
      <LogoutIcon />
    </IconButton>
  );

  // Create the toggle theme button
  const themeButton = (
    <IconButton onClick={handleChangeTheme}>
      <DarkModeIcon />
    </IconButton>
  );

  // Class for error message. This is only for the 'log out' mutation as we're using its 'isError' status here
  const errClass = isError ? "errmsg" : "offscreen";

  let buttonContent;
  // Using the 'isLoading' status of the 'log out' mutation -> Check if we're in the process of logging out
  // If the user is not logging out, we'll render all the appropriate buttons for that user
  if (isLoading) {
    buttonContent = <PulseLoader color={"#FFF"} />;
  } else {
    buttonContent = (
      <>
        {themeButton}
        {newNoteButton}
        {newUserButton}
        {notesButton}
        {userButton}
        {logoutButton}
      </>
    );
  }

  // Content to be rendered
  // Put the error message just above the header so that it will be rendered on top of the header, not inside the header
  const content = (
    <Paper>
      <Typography className={errClass}>{error?.data?.message}</Typography>

      <Box component="header" className="dash-header">
        <Box className={`dash-header__container ${dashClass}`}>
          <ColorLink
            variant="h3"
            to="/dash"
            className="dash-header__title"
            component={Link}
            color="primary"
          >
            Meganote
          </ColorLink>

          <Box component="nav" className="dash-header__nav">
            {buttonContent}
          </Box>
        </Box>
      </Box>
    </Paper>
  );

  return content;
};

export default DashHeader;
