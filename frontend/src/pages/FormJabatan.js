import React from "react";
import { Helmet } from "react-helmet";
import FormJabatanComponent from "../components/FormJabatanComponent";

const FormJabatan = () => {
  return (
    <div>
      <Helmet>
        <title>BMG | FORM Jabatan</title>
      </Helmet>
      <FormJabatanComponent />
    </div>
  );
};

export default FormJabatan;
