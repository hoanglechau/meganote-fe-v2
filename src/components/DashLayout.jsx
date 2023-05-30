import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";
import { Paper, Divider } from "@mui/material";

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <Divider />
      <Paper className="dash-container">
        <Outlet />
      </Paper>
      <Divider />
      <DashFooter />
    </>
  );
};

export default DashLayout;
