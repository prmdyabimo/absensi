import React from "react";
import { Helmet } from "react-helmet";
import PengajuanIzinComponent from "../components/PengajuanIzinComponent";

const PengajuanIzin = () => {
  return (
    <div>
      <Helmet>
        <title>BMG | Pengajuan Izin</title>
      </Helmet>
      <PengajuanIzinComponent />
    </div>
  );
};

export default PengajuanIzin;
