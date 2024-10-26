import React from "react";
import { Helmet } from "react-helmet";
import LoginComponent from "../components/LoginComponent";

const Login = () => {
  return (
    <div>
      <Helmet>
        <title>BMG | Login</title>
      </Helmet>
      <LoginComponent />
    </div>
  );
};

export default Login;
