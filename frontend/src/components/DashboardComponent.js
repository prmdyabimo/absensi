import React from "react";
import LayoutComponent from "./LayoutComponent";
import CardComponent from "./CardComponent";

const DashboardComponent = () => {
  return (
    <>
      <LayoutComponent />

      <div className="mt-20 px-6">
        <CardComponent />
      </div>
    </>
  );
};

export default DashboardComponent;
