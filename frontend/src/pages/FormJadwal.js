import React from "react";
import { Helmet } from "react-helmet";
import FormJadwalComponent from "../components/FormJadwalComponent";

const FormJadwal = () => {
  return (
    <div>
      <Helmet>
        <title>BMG | Form Jadwal</title>
      </Helmet>
      <FormJadwalComponent />
    </div>
  );
};

export default FormJadwal;
