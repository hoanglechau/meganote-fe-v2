import { Link } from "react-router-dom";
import { Typography, useTheme } from "@mui/material";

const ColorLink = ({ to, children }) => {
  const theme = useTheme();

  const linkStyle = {
    color:
      theme.palette.mode === "dark"
        ? theme.palette.text.dark
        : theme.palette.text.light,
    textDecoration: "none",
    cursor: "pointer",
  };

  return (
    <Typography variant="h6" component={Link} to={to} style={linkStyle}>
      {children}
    </Typography>
  );
};

export default ColorLink;
