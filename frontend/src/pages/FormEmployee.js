import React from "react";
import { Helmet } from "react-helmet";
import FormEmployeeComponent from "../components/FormEmployeeComponent";

const FormEmployee = () => {
  return (
    <div>
      <Helmet>
        <title>BMG | Form Employee</title>
      </Helmet>
      <FormEmployeeComponent />
    </div>
  );
};

export default FormEmployee;
