import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LayoutComponent from "./LayoutComponent";
import EmployeeHook from "../hooks/EmployeeHook";
import JabatanHook from "../hooks/JabatanHook";

const FormEmployeeComponent = () => {
  const { id } = useParams();
  const { handleSave, messages: saveMessages } = EmployeeHook.SaveEmployee();
  const { handleUpdate, messages: updateMessages } =
    EmployeeHook.UpdateEmployee();
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    id_jabatan: "",
    username_atasan: "",
  });
  const [employees, setEmployees] = useState([]);
  const [jabatan, setJabatan] = useState([]);

  const allEmployees = EmployeeHook.Employee();
  const allJabatan = JabatanHook.Jabatan();

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
    if (allEmployees.length > 0) setEmployees(allEmployees);
    if (allJabatan.length > 0) setJabatan(allJabatan);
  }, [allEmployees, allJabatan]);

  useEffect(() => {
    if (id) {
      const employeeToEdit = allEmployees.find(
        (item) => item.id === parseInt(id)
      );
      if (employeeToEdit) {
        setFormData({
          username: employeeToEdit.username,
          fullname: employeeToEdit.fullname,
          email: employeeToEdit.email,
          password: "",
          id_jabatan: employeeToEdit.id_jabatan,
          username_atasan: employeeToEdit.username_atasan,
        });
      }
    }
  }, [id, allEmployees]);

  const renderEmployees = () => {
    return employees.map((item, index) => (
      <option key={index} value={item.username}>
        {item.fullname}
      </option>
    ));
  };

  const renderJabatan = () => {
    return jabatan.map((item, index) => (
      <option key={index} value={item.id}>
        {item.nama}
      </option>
    ));
  };

  return (
    <>
      <LayoutComponent />
      <div className="mt-20 px-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {id ? "Edit Karyawan" : "Form Karyawan"}
        </h1>

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
                  <div className="flex w-full gap-3">
                    <div className="w-full">
                      <label className="block mb-1">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={`${id ? 'bg-gray-200' : ''} border border-gray-300 p-2 w-full`}
                        disabled={id ? true : false}
                      />
                    </div>
                    <div className="w-full">
                      <label className="block mb-1">Full Name</label>
                      <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 w-full"
                      />
                    </div>
                  </div>
                  <div className="flex w-full gap-3">
                    <div className="w-full">
                      <label className="block mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 w-full"
                      />
                    </div>
                    <div className="w-full">
                      <label className="block mb-1">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 w-full"
                      />
                    </div>
                  </div>
                  <div className="flex w-full gap-3">
                    <div className="w-full">
                      <label className="block mb-1">Jabatan</label>
                      <select
                        name="id_jabatan"
                        value={formData.id_jabatan}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 w-full"
                      >
                        <option value="">Pilih Jabatan</option>
                        {renderJabatan()}
                      </select>
                    </div>
                    <div className="w-full">
                      <label className="block mb-1">Username Atasan</label>
                      <select
                        name="username_atasan"
                        value={formData.username_atasan}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 w-full"
                      >
                        <option value="">Pilih Atasan</option>
                        {renderEmployees()}
                      </select>
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

export default FormEmployeeComponent;
