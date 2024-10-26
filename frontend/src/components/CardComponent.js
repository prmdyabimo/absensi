import React from "react";
import EmployeeHook from "../hooks/EmployeeHook";
import AbsensiHook from "../hooks/AbsensiHook";
import PengajuanIzinHook from "../hooks/PengajuanIzinHook";

const CardComponent = () => {
  const employee = EmployeeHook.Employee();
  const absensi = AbsensiHook.Absensi();
  const pengajuanIzin = PengajuanIzinHook.PengajuanIzin();

  return (
    <div className="flex justify-center">
      <div className="w-full sm:px-6 lg:px-8 flex flex-row gap-4">
        <div className="flex flex-col w-full mx-auto my-2">
          <div className="w-full flex md:flex-row flex-col gap-4 justify-center md:px-0 px-4">
            <div className="lg:w-1/4 w-full flex flex-col bg-white border-b-8 border-[#ECFFBD] rounded-lg shadow-xl">
              <div className="w-full p-6 flex flex-row justify-between items-center">
                <div className="flex flex-col">
                  <h5 className="text-xl font-bold tracking-tight text-gray-700">
                    Jumlah Karyawan
                  </h5>
                  <p className="text-gray-400 text-[14px]">
                    Berdasarkan Data Karyawan
                  </p>
                </div>
              </div>
              <div className="w-full px-6 pb-6 flex flex-row justify-between items-center">
                <p className="font-extrabold text-gray-700 text-4xl">
                  {employee.length}
                </p>
              </div>
            </div>
            <div className="lg:w-1/4 w-full flex flex-col bg-white border-b-8 border-[#FCDFDE] rounded-lg shadow-xl">
              <div className="w-full p-6 flex flex-row justify-between items-center">
                <div className="flex flex-col">
                  <h5 className="text-xl font-bold tracking-tight text-gray-700">
                    Jumlah Kehadiran
                  </h5>
                  <p className="text-gray-400 text-[14px]">
                    Berdasarkan Data Kehadiran
                  </p>
                </div>
              </div>
              <div className="w-full px-6 pb-6 flex flex-row justify-between items-center">
                <p className="font-extrabold text-gray-700 text-4xl">
                  {absensi.length}
                </p>
              </div>
            </div>
            <div className="lg:w-1/4 w-full flex flex-col bg-white border-b-8 border-[#e0fcde] rounded-lg shadow-xl">
              <div className="w-full p-6 flex flex-row justify-between items-center">
                <div className="flex flex-col">
                  <h5 className="text-xl font-bold tracking-tight text-gray-700">
                    Jumlah Izin
                  </h5>
                  <p className="text-gray-400 text-[14px]">
                    Berdasarkan Data Izin
                  </p>
                </div>
              </div>
              <div className="w-full px-6 pb-6 flex flex-row justify-between items-center">
                <p className="font-extrabold text-gray-700 text-4xl">
                  {pengajuanIzin.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
