import React from "react";
import { Helmet } from "react-helmet";
import AbsensiComponent from "../components/AbsensiComponent";

const Absensi = () => {
  return (
    <div>
      <Helmet>
        <title>BMG | Absensi</title>
      </Helmet>
      <AbsensiComponent />
    </div>
  );
};

export default Absensi;
