import React, { useState } from "react";
import LayoutComponent from "./LayoutComponent";
import PengajuanIzinHook from "../hooks/PengajuanIzinHook";

const FormPengajuanIzinComponent = () => {
  const [formData, setFormData] = useState({
    jenis_izin: "",
    tanggal: "",
    keterangan: "",
  });
  const { handleSave, messages } = PengajuanIzinHook.SavePengajuanIzin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
  };

  return (
    <>
      <LayoutComponent />
      <div className="mt-20 px-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Form Pengajuan Izin
        </h1>

        <div className="flex justify-center">
          <div className="md:w-1/2 w-full sm:px-6 lg:px-8 flex flex-row gap-4 ">
            <div className="flex flex-col w-full mx-auto my-2">
              {messages.status && (
                <div
                  id="alert_message"
                  className={`flex items-center p-2 mb-2 text-sm font-medium border-t-4 ${
                    messages.status === "success"
                      ? "border-green-300 bg-green-50 text-green-800"
                      : "border-red-300 bg-red-50 text-red-800"
                  }`}
                  role="alert"
                >
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <div className="ml-3">{messages.message}</div>
                </div>
              )}
              <div className="w-full flex md:flex-row flex-col gap-4 justify-center md:px-0 px-4">
                <form onSubmit={handleSubmit} className="space-y-4 w-full">
                  <div className="flex w-full gap-3">
                    <div className="w-full">
                      <label className="block mb-1">Jenis Izin</label>
                      <select
                        name="jenis_izin"
                        value={formData.jenis_izin}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 w-full"
                      >
                        <option value="">Pilih Jenis Izin</option>
                        <option value="CUTI">CUTI</option>
                        <option value="SAKIT">SAKIT</option>
                        <option value="DAN LAIN-LAIN">DAN LAIN-LAIN</option>
                      </select>
                    </div>
                    <div className="w-full">
                      <label className="block mb-1">Tanggal</label>
                      <input
                        type="date"
                        name="tanggal"
                        value={formData.tanggal}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 w-full"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="w-full">
                      <label className="block mb-1">Keterangan</label>
                      <input
                        type="text"
                        name="keterangan"
                        value={formData.keterangan}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 w-full"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#D3A038] hover:bg-[#e1bd74] text-white py-2 px-4 rounded w-full"
                  >
                    Simpan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormPengajuanIzinComponent;
