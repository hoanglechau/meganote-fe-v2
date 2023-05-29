import { Link } from "react-router-dom";
import { Paper, Box, Typography, Button } from "@mui/material";

const Public = () => {
  const content = (
    <Paper component="section" className="public">
      <Box component="header">
        <Typography variant="h2">
          Welcome to{" "}
          <Box component="span" className="nowrap">
            Meganote!
          </Box>
        </Typography>
      </Box>
      <Box component="main" className="public__main">
        <Typography variant="h5">
          The ultimate note taking experience!
        </Typography>
      </Box>
      <Box component="footer">
        <Button variant="outlined">
          <Link to="/login">User Login</Link>
        </Button>
      </Box>
    </Paper>
  );

  return content;
};

export default Public;
