import React, { useEffect, useState } from "react";
import LayoutComponent from "./LayoutComponent";
import JadwalHook from "../hooks/JadwalHook";
import { useParams } from "react-router-dom";

const FormJadwalComponent = () => {
  const { id } = useParams();
  const { handleSave, messages: saveMessages } = JadwalHook.SaveJadwal();
  const { handleUpdate, messages: updateMessages } = JadwalHook.UpdateJadwal();
  const [formData, setFormData] = useState({
    hari: "",
    jam_masuk: "",
    jam_keluar: "",
  });

  const allJadwal = JadwalHook.Jadwal();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      handleUpdate(id, formData);
    } else {
      handleSave(formData);
    }
  };

  useEffect(() => {
    if (id) {
      const jadwalToEdit = allJadwal.find((item) => item.id === parseInt(id));
      if (jadwalToEdit) {
        setFormData({
          hari: jadwalToEdit.hari,
          jam_masuk: jadwalToEdit.jam_masuk,
          jam_keluar: jadwalToEdit.jam_keluar,
        });
      }
    }
  }, [id, allJadwal]);

  return (
    <>
      <LayoutComponent />
      <div className="mt-20 px-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Form Jadwal</h1>

        <div className="flex justify-center">
          <div className="md:w-1/2 w-full sm:px-6 lg:px-8 flex flex-row gap-4 ">
            <div className="flex flex-col w-full mx-auto my-2">
              {(saveMessages.status || updateMessages.status) && (
                <div
                  id="alert_message"
                  className={`flex items-center p-2 mb-2 text-sm font-medium border-t-4 ${
                    saveMessages.status === "success" ||
                    updateMessages.status === "success"
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
                  <div className="ml-3">
                    {saveMessages.message
                      ? saveMessages.message
                      : updateMessages.message}
                  </div>
                </div>
              )}
              <div className="w-full flex md:flex-row flex-col gap-4 justify-center md:px-0 px-4">
                <form onSubmit={handleSubmit} className="space-y-4 w-full">
                  <div className="w-full">
                    <div className="w-full">
                      <label className="block mb-1">Hari</label>
                      <select
                        name="hari"
                        value={formData.hari}
                        onChange={handleChange}
                        className={` ${id ? "bg-gray-200" : ""} border border-gray-300 p-2 w-full`}
                        disabled={id ? true : false}
                      >
                        <option value="">PILIH HARI</option>
                        <option value="Senin">Senin</option>
                        <option value="Selasa">Selasa</option>
                        <option value="Rabu">Rabu</option>
                        <option value="Kamis">Kamis</option>
                        <option value="Jumat">Jumat</option>
                        <option value="Sabtu">Sabtu</option>
                        <option value="Minggu">Minggu</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-full">
                      <label className="block mb-1">Jam Masuk</label>
                      <input
                        type="time"
                        name="jam_masuk"
                        value={formData.jam_masuk}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 w-full"
                      />
                    </div>
                    <div className="w-full">
                      <label className="block mb-1">Jam Keluar</label>
                      <input
                        type="time"
                        name="jam_keluar"
                        value={formData.jam_keluar}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 w-full"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#D3A038] hover:bg-[#e1bd74] text-white py-2 px-4 rounded w-full"
                  >
                    {id ? "Update" : "Simpan"}
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

export default FormJadwalComponent;
