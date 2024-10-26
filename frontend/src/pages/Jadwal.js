import React from "react";
import { Helmet } from "react-helmet";
import JadwalComponent from "../components/JadwalComponent";

const Jadwal = () => {
  return (
    <div>
      <Helmet>
        <title>BMG | Jadwal</title>
      </Helmet>
      <JadwalComponent />
    </div>
  );
};

export default Jadwal;
