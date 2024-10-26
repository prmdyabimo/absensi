import React from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Sidebar = ({ isOpen }) => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const user = decoded.user;

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-60 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <a
        className="pt-24 mb-3 flex items-center justify-center border-b-2 border-solid border-gray-100 py-6"
        href="/dashboard"
      >
        <span className="text-lg font-semibold">{user.username}</span>
      </a>
      <ul className="relative m-0 list-none px-2">
        <li className="relative">
          <Link
            to="/dashboard"
            className="flex items-center rounded-md px-6 py-2 text-gray-600 hover:bg-slate-50 transition duration-300"
          >
            <span className="mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 text-gray-400"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
            </span>
            <span>Beranda</span>
          </Link>
        </li>
        <span className="px-6 py-4 text-xs font-bold uppercase text-gray-600">
          SISTEM
        </span>
        <li className="relative">
          <Link
            to="/absensi"
            className="flex items-center rounded-md px-6 py-2 text-gray-600 hover:bg-slate-50 transition duration-300"
          >
            <span className="mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </span>
            <span>Absensi</span>
          </Link>
        </li>
        {(user.id_jabatan === 1 || user.id_jabatan === 3) && (
          <li className="relative">
            <Link
              to="/rekap-kehadiran"
              className="flex items-center rounded-md px-6 py-2 text-gray-600 hover:bg-slate-50 transition duration-300"
            >
              <span className="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </span>
              <span>Rekap Kehadiran</span>
            </Link>
          </li>
        )}
        <li className="relative">
          <Link
            to="/pengajuan-izin"
            className="flex items-center rounded-md px-6 py-2 text-gray-600 hover:bg-slate-50 transition duration-300"
          >
            <span className="mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </span>
            <span>Pengajuan Izin</span>
          </Link>
        </li>
        {(user.id_jabatan === 1 || user.id_jabatan === 3) && (
          <>
            <span className="px-6 py-4 text-xs font-bold uppercase text-gray-600">
              MASTER DATA
            </span>
            <li className="relative">
              <Link
                to="/employee"
                className="flex items-center rounded-md px-6 py-2 text-gray-600 hover:bg-slate-50 transition duration-300"
              >
                <span className="mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </span>
                <span>Karyawan</span>
              </Link>
            </li>
            <li className="relative">
              <Link
                to="/jabatan"
                className="flex items-center rounded-md px-6 py-2 text-gray-600 hover:bg-slate-50 transition duration-300"
              >
                <span className="mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </span>
                <span>Jabatan</span>
              </Link>
            </li>
            <li className="relative">
              <Link
                to="/jadwal"
                className="flex items-center rounded-md px-6 py-2 text-gray-600 hover:bg-slate-50 transition duration-300"
              >
                <span className="mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </span>
                <span>Jadwal</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
