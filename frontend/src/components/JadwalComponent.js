import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import LayoutComponent from "./LayoutComponent";
import JadwalHook from "../hooks/JadwalHook";
import { useNavigate } from "react-router-dom";

DataTable.use(DT);

const JadwalComponent = () => {
  const [tableData, setTableData] = useState([]);
  const jadwal = JadwalHook.Jadwal();
  const { handleDelete, messages } = JadwalHook.DeleteJadwal();
  const navigate = useNavigate();

  const handleConfirm = async (id) => {
    const confirm = window.confirm(
      "Apakah anda yakin ingin menghapus data ini?"
    );
    if (confirm) {
      const result = await handleDelete(id);
      setTimeout(() => {
        if (result) {
          window.location.reload();
        }
      }, 1500);
    }
  };

  const handleEdit = (id) => {
    navigate(`/jadwal/edit/${id}`);
  };

  useEffect(() => {
    if (jadwal.length > 0) {
      const formattedData = jadwal.map((item) => [
        item.hari,
        item.jam_masuk,
        item.jam_keluar,
        item.id,
      ]);
      setTableData(formattedData);
    }
  }, [jadwal]);

  return (
    <>
      <LayoutComponent />
      <div className="mt-20 px-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Daftar Jadwal</h1>
        <div className="my-4">
          <a
            href="/jadwal/form"
            className="bg-[#D3A038] hover:bg-[#e1bd74] text-white font-bold py-2 px-4 rounded"
          >
            Tambah Jadwal
          </a>
        </div>

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

        <DataTable
          data={tableData}
          className="display table table-striped table-bordered table-responsive"
          options={{
            columnDefs: [
              {
                targets: [3],
                createdCell: (td, cellData, rowData) => {
                  ReactDOM.render(
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(cellData)}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleConfirm(cellData)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Hapus
                      </button>
                    </div>,
                    td
                  );
                },
              },
            ],
          }}
        >
          <thead>
            <tr>
              <th>Hari</th>
              <th>Jam Masuk</th>
              <th>Jam Keluar</th>
              <th>Aksi</th>
            </tr>
          </thead>
        </DataTable>
      </div>
    </>
  );
};

export default JadwalComponent;
