import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import LayoutComponent from "./LayoutComponent";
import AbsensiHook from "../hooks/AbsensiHook";

DataTable.use(DT);

const RekapKehadiranComponent = () => {
  const [tableData, setTableData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const absensi = AbsensiHook.Absensi();

  useEffect(() => {
    if (absensi.length > 0) {
      const filteredData = absensi.filter((item) => {
        const itemDate = new Date(item.tanggal);
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (startDate && endDate) {
          return itemDate >= start && itemDate <= end;
        }
        return true;
      });

      const formattedData = filteredData.map((item) => [
        item.fullname,
        item.jenis,
        new Date(item.tanggal).toLocaleDateString("id-ID", {}),
        item.jam_masuk_jadwal,
        item.jam_keluar_jadwal,
        item.jam_masuk,
        item.jam_keluar,
        item.keterangan,
        item.status_masuk,
        item.status_keluar,
      ]);

      setTableData(formattedData);
    }
  }, [absensi, startDate, endDate]);

  return (
    <>
      <LayoutComponent />
      <div className="mt-20 px-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          List Rekap Kehadiran
        </h1>

        {/* Input Tanggal */}
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

        <DataTable
          data={tableData}
          className="display table table-striped table-bordered table-responsive"
          options={{
            columnDefs: [
              {
                targets: [1],
                createdCell: (td, cellData) => {
                  ReactDOM.render(
                    <span
                      className={`inline-flex text-center items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded-full ${
                        cellData === "ABSEN"
                          ? "text-blue-100 bg-blue-600"
                          : "text-yellow-100 bg-yellow-600"
                      }`}
                    >
                      {cellData}
                    </span>,
                    td
                  );
                },
              },
              {
                targets: [8],
                createdCell: (td, cellData) => {
                  ReactDOM.render(
                    <span
                      className={`inline-flex text-center items-center justify-center px-2 py-1 text-xs font-bold leading-none ${
                        cellData === "TERLAMBAT"
                          ? "text-red-100 bg-red-600"
                          : cellData === "TEPAT WAKTU"
                          ? "text-green-100 bg-green-600"
                          : "text-yellow-100 bg-yellow-600"
                      } rounded-full`}
                    >
                      {cellData ?? " - "}
                    </span>,
                    td
                  );
                },
              },
              {
                targets: [9],
                createdCell: (td, cellData) => {
                  ReactDOM.render(
                    <span
                      className={`inline-flex text-center items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded-full ${
                        cellData === "PULANG TERLALU CEPAT"
                          ? "text-red-100 bg-red-600"
                          : cellData === "TEPAT WAKTU"
                          ? "text-green-100 bg-green-600"
                          : "text-yellow-100 bg-yellow-600"
                      }`}
                    >
                      {cellData ?? " - "}
                    </span>,
                    td
                  );
                },
              },
            ],
          }}
        >
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Jenis</th>
              <th>Tanggal</th>
              <th>Jadwal Masuk</th>
              <th>Jadwal Keluar</th>
              <th>Jam Masuk</th>
              <th>Jam Keluar</th>
              <th>Keterangan</th>
              <th>Status Masuk</th>
              <th>Status Keluar</th>
            </tr>
          </thead>
        </DataTable>
      </div>
    </>
  );
};

export default RekapKehadiranComponent;
