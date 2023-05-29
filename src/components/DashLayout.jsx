import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";
import { Paper } from "@mui/material";

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <Paper className="dash-container">
        <Outlet />
      </Paper>
      <DashFooter />
    </>
  );
};

export default DashLayout;
