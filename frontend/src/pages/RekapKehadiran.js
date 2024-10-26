import React from "react";
import Helmet from "react-helmet";
import RekapKehadiranComponent from "../components/RekapKehadiranComponent";

const RekapKehadiran = () => {
  return (
    <div>
      <Helmet>
        <title>BMG | Rekap Kehadiran</title>
      </Helmet>
      <RekapKehadiranComponent />
    </div>
  );
};

export default RekapKehadiran;
