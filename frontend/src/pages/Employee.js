import React from "react";
import { Helmet } from "react-helmet";
import EmployeeComponent from "../components/EmployeeComponent";

const Employee = () => {
  return (
    <div>
      <Helmet>
        <title>BMG | Employee</title>
      </Helmet>
      <EmployeeComponent />
    </div>
  );
};

export default Employee;
