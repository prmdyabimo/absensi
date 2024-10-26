import React from "react";
import { Helmet } from "react-helmet";
import FormPengajuanIzinComponent from "../components/FormPengajuanIzinComponent";

const FormPengajuanIzin = () => {
  return (
    <div>
      <Helmet>
        <title>BMG | FORM Pengajuan Izin</title>
      </Helmet>
      <FormPengajuanIzinComponent />
    </div>
  );
};

export default FormPengajuanIzin;
