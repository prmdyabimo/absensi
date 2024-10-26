const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/database");

// Import routes
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const jabatanRoutes = require("./routes/jabatanRoutes");
const absensiRoutes = require("./routes/absensiRoutes");
const pengajuanIzinRoutes = require("./routes/pengajuanIzinRoutes");
const jadwalRoutes = require("./routes/jadwalRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

db.connect();

// Routing
app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/jabatan", jabatanRoutes);
app.use("/api/absensi", absensiRoutes);
app.use("/api/pengajuan-izin", pengajuanIzinRoutes);
app.use("/api/jadwal", jadwalRoutes); 

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
