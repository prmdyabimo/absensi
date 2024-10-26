import React from "react";
import { Helmet } from "react-helmet";
import DashboardComponent from "../components/DashboardComponent";

const Dashboard = () => {
  return (
    <div>
      <Helmet>
        <title>BMG | Dashboard</title>
      </Helmet>
      <DashboardComponent />
    </div>
  );
};

export default Dashboard;
