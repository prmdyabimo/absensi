import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import LayoutComponent from "./LayoutComponent";
import PengajuanIzinHook from "../hooks/PengajuanIzinHook";
import { jwtDecode } from "jwt-decode";

DataTable.use(DT);

const PengajuanIzinComponent = () => {
  const [tableData, setTableData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const pengajuanIzin = PengajuanIzinHook.PengajuanIzin();
  
  const { handleApprove, messages: approveMessages } =
    PengajuanIzinHook.ApprovePengejuanIzin();
  const { handleReject, messages: rejectMessages } =
    PengajuanIzinHook.RejectPengajuanIzin();
  
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const user = decoded.user;

  const handleConfirm = async (id) => {
    const confirm = window.confirm("Apakah anda yakin ingin approve data ini?");
    if (confirm) {
      const result = await handleApprove(id);
      setTimeout(() => {
        if (result) {
          window.location.reload();
        }
      }, 1500);
    }
  };

  const handleRejectConfirm = async (id) => {
    const confirm = window.confirm("Apakah anda yakin ingin reject data ini?");
    if (confirm) {
      const result = await handleReject(id);
      setTimeout(() => {
        if (result) {
          window.location.reload();
        }
      }, 1500);
    }
  };

  useEffect(() => {
    if (pengajuanIzin.length > 0) {
      const filteredData = pengajuanIzin.filter((item) => {
        const itemDate = new Date(item.tanggal);
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (startDate && endDate) {
          return itemDate >= start && itemDate <= end;
        }
        return true;
      });


      const formattedData = filteredData.map((item) => [
        item.username,
        item.fullname,
        new Date(item.tanggal).toLocaleDateString("id-ID", {}),
        item.jenis_izin,
        item.keterangan,
        item.status,
        item.id,
      ]);
      setTableData(formattedData);
    }
  }, [pengajuanIzin, startDate, endDate]);

  return (
    <>
      <LayoutComponent />
      <div className="mt-20 px-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          List Pengajuan Izin
        </h1>

        <div className="flex justify-center mb-4">
          <div className="mr-4">
            <label htmlFor="start-date" className="block mb-2">
              Tanggal Awal:
            </label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border px-4 py-2 rounded"
            />
          </div>
          <div>
            <label htmlFor="end-date" className="block mb-2">
              Tanggal Akhir:
            </label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border px-4 py-2 rounded"
            />
          </div>
        </div>

        <div className="my-4">
          <a
            href="/pengajuan-izin/form"
            className="bg-[#D3A038] hover:bg-[#e1bd74] text-white font-bold py-2 px-4 rounded"
          >
            Buat Pengajuan
          </a>
        </div>

        {(approveMessages.status || rejectMessages.status) && (
          <div
            id="alert_message"
            className={`flex items-center p-2 mb-2 text-sm font-medium border-t-4 ${
              approveMessages.status === "success" ||
              rejectMessages.status === "success"
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
              {approveMessages.message
                ? approveMessages.message
                : rejectMessages.message}
            </div>
          </div>
        )}

        <DataTable
          data={tableData}
          className="display table table-striped table-bordered table-responsive"
          options={{
            columnDefs: [
              {
                targets: [5],
                createdCell: (td, cellData, rowData) => {
                  if (cellData === "Disetujui") {
                    ReactDOM.render(
                      <span className="inline-flex text-center items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-100 bg-green-600 rounded-full">
                        {cellData}
                      </span>,
                      td
                    );
                  } else if (
                    cellData === "Menunggu Persetujuan HR" ||
                    cellData === "Menunggu Persetujuan Supervisor"
                  ) {
                    ReactDOM.render(
                      <span className="inline-flex text-center items-center justify-center px-2 py-1 text-xs font-bold leading-none text-yellow-100 bg-yellow-600 rounded-full">
                        {cellData}
                      </span>,
                      td
                    );
                  } else if (cellData === "Ditolak") {
                    ReactDOM.render(
                      <span className="inline-flex text-center items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                        {cellData}
                      </span>,
                      td
                    );
                  } else {
                    ReactDOM.render(
                      <span className="inline-flex text-center items-center justify-center px-2 py-1 text-xs font-bold leading-none text-blue-100 bg-blue-600 rounded-full">
                        {cellData}
                      </span>,
                      td
                    );
                  }
                },
              },
              {
                targets: [6],
                createdCell: (td, cellData, rowData) => {
                  ReactDOM.render(
                    <>
                      {user.id_jabatan !== 4 && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleConfirm(cellData)}
                            className={`font-bold py-2 px-4 rounded ${
                              (user.id_jabatan === 2 &&
                                rowData[5] === "Menunggu Persetujuan HR") ||
                              (user.id_jabatan === 3 &&
                                rowData[5] === "Disetujui") ||
                              rowData[5] === "Disetujui" ||
                              rowData[5] === "Ditolak"
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-700 text-white"
                            }`}
                            disabled={
                              (user.id_jabatan === 2 &&
                                rowData[5] === "Menunggu Persetujuan HR") ||
                              (user.id_jabatan === 3 &&
                                rowData[5] === "Disetujui") ||
                              rowData[5] === "Disetujui" ||
                              rowData[5] === "Ditolak"
                                ? true
                                : false
                            }
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectConfirm(cellData)}
                            className={`font-bold py-2 px-4 rounded ${
                              (user.id_jabatan === 2 &&
                                rowData[5] === "Menunggu Persetujuan HR") ||
                              (user.id_jabatan === 3 &&
                                rowData[5] === "Disetujui") ||
                              rowData[5] === "Disetujui" ||
                              rowData[5] === "Ditolak"
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-700 text-white"
                            }`}
                            disabled={
                              (user.id_jabatan === 2 &&
                                rowData[5] === "Menunggu Persetujuan HR") ||
                              (user.id_jabatan === 3 &&
                                rowData[5] === "Disetujui") ||
                              rowData[5] === "Disetujui" ||
                              rowData[5] === "Ditolak"
                                ? true
                                : false
                            }
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </>,
                    td
                  );
                },
              },
            ],
          }}
        >
          <thead>
            <tr>
              <th>Username</th>
              <th>Full Name</th>
              <th>Tanggal</th>
              <th>Jenis Izin</th>
              <th>Keterangan</th>
              <th>Status</th>
              {user.id_jabatan !== 4 && <th>Aksi</th>}
            </tr>
          </thead>
        </DataTable>
      </div>
    </>
  );
};

export default PengajuanIzinComponent;
