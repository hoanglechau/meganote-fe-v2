import { Link } from "react-router-dom";
import { Typography, useTheme } from "@mui/material";

const ColorLink = ({ variant, to, color, children }) => {
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
    <Typography
      variant={variant}
      color={color}
      component={Link}
      to={to}
      style={linkStyle}
    >
      {children}
    </Typography>
  );
};

export default ColorLink;
