import AuthMiddleware from "./middleware/AuthMiddleware";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Employee from "./pages/Employee";
import FormEmployee from "./pages/FormEmployee";
import Absensi from "./pages/Absensi";
import PengajuanIzin from "./pages/PengajuanIzin";
import FormPengajuanIzin from "./pages/FormPengajuanIzin";
import RekapKehadiran from "./pages/RekapKehadiran";
import Jabatan from "./pages/Jabatan";
import FormJabatan from "./pages/FormJabatan";
import Jadwal from "./pages/Jadwal";
import FormJadwal from "./pages/FormJadwal";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <AuthMiddleware>
                <Dashboard />
              </AuthMiddleware>
            }
          />
          <Route
            path="/employee"
            element={
              <AuthMiddleware>
                <Employee />
              </AuthMiddleware>
            }
          />
          <Route
            path="/employee/form"
            element={
              <AuthMiddleware>
                <FormEmployee />
              </AuthMiddleware>
            }
          />
          <Route
            path="/employee/edit/:id"
            element={
              <AuthMiddleware>
                <FormEmployee />
              </AuthMiddleware>
            }
          />
          <Route
            path="/absensi"
            element={
              <AuthMiddleware>
                <Absensi />
              </AuthMiddleware>
            }
          />
          <Route
            path="/pengajuan-izin"
            element={
              <AuthMiddleware>
                <PengajuanIzin />
              </AuthMiddleware>
            }
          />
          <Route
            path="/pengajuan-izin/form"
            element={
              <AuthMiddleware>
                <FormPengajuanIzin />
              </AuthMiddleware>
            }
          />
          <Route
            path="/rekap-kehadiran"
            element={
              <AuthMiddleware>
                <RekapKehadiran />
              </AuthMiddleware>
            }
          />
          <Route
            path="/jabatan"
            element={
              <AuthMiddleware>
                <Jabatan />
              </AuthMiddleware>
            }
          />
          <Route
            path="/jabatan/form"
            element={
              <AuthMiddleware>
                <FormJabatan />
              </AuthMiddleware>
            }
          />
          <Route
            path="/jabatan/edit/:id"
            element={
              <AuthMiddleware>
                <FormJabatan />
              </AuthMiddleware>
            }
          />
          <Route
            path="/jadwal"
            element={
              <AuthMiddleware>
                <Jadwal />
              </AuthMiddleware>
            }
          />
          <Route
            path="/jadwal/form"
            element={
              <AuthMiddleware>
                <FormJadwal />
              </AuthMiddleware>
            }
          />
          <Route
            path="/jadwal/edit/:id"
            element={
              <AuthMiddleware>
                <FormJadwal />
              </AuthMiddleware>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
