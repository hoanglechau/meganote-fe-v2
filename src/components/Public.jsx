import { Paper, Box, Typography, Divider } from "@mui/material";
import ColorLink from "./ColorLink";

const Public = () => {
  const content = (
    <Paper component="section" className="public">
      <Box component="header">
        <Typography variant="h2" color="primary">
          Welcome to{" "}
          <Box component="span" className="nowrap">
            Meganote!
          </Box>
        </Typography>
      </Box>
      <Divider />
      <Box component="main" className="public__main">
        <Typography variant="h5" color="text">
          The ultimate note taking experience!
        </Typography>
      </Box>
      <Divider />
      <Box component="footer">
        <ColorLink variant="h5" to="/login">
          User Login
        </ColorLink>
      </Box>
    </Paper>
  );

  return content;
};

export default Public;
