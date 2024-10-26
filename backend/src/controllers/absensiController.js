const db = require("../config/database");

const saveAbsensi = async (req, res) => {
  const { mode_absen, keterangan } = req.body;
  const { username } = req.user;
  const tanggal = new Date()
    .toLocaleDateString("id-ID", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");
  const hari = new Date().toLocaleDateString("id-ID", { weekday: "long" });

  let jamMasuk = new Date().toLocaleTimeString("id-ID").replace(/\./g, ":");
  let jamKeluar = null;
  let statusMasuk = "";
  let statusKeluar = "";

  if (!mode_absen || !keterangan) {
    return res.status(200).json({
      status: "failed",
      code: 400,
      message: "Semua Input Tidak Boleh Kosong",
      data: {},
    });
  }

  try {
    const {
      rows: [absensi],
    } = await db.query(
      "SELECT * FROM prct_absensi WHERE username = $1 AND tanggal = $2",
      [username, tanggal]
    );

    // Jadwal Kerja
    const {
      rows: [jadwal],
    } = await db.query("SELECT * FROM glbm_jadwal WHERE hari = $1", [hari]);

    if (!jadwal) {
      return res.status(200).json({
        status: "failed",
        code: 400,
        message: "Tidak ada jadwal kerja pada hari " + hari,
        data: {},
      });
    }

    // Cek Apakah Udh User Tsb Udh Melakukan Absen Masuk dan Keluar Pada Tanggal Tsb
    if (absensi) {
      if (absensi.jam_masuk !== null && absensi.jam_keluar !== null) {
        return res.status(200).json({
          status: "failed",
          code: 400,
          message: "Anda sudah absen masuk dan keluar hari ini",
          data: {},
        });
      }
    }

    if (mode_absen === "MASUK") {
      // Absen Masuk
      if (absensi && absensi.jam_masuk !== null) {
        return res.status(200).json({
          status: "failed",
          code: 400,
          message: "Anda sudah absen masuk hari ini",
          data: {},
        });
      }

      statusMasuk = jamMasuk > jadwal.jam_masuk ? "TERLAMBAT" : "TEPAT WAKTU";
      statusKeluar = null;
    } else {
      // Absen Pulang
      if (absensi && absensi.jam_keluar !== null) {
        return res.status(200).json({
          status: "failed",
          code: 400,
          message: "Anda sudah absen keluar hari ini",
          data: {},
        });
      } else if (!absensi || absensi.jam_masuk === null) {
        return res.status(200).json({
          status: "failed",
          code: 400,
          message:
            "Anda belum absen masuk hari ini, silahkan absen masuk terlebih dahulu",
          data: {},
        });
      }

      jamKeluar = new Date().toLocaleTimeString("id-ID").replace(/\./g, ":");
      statusKeluar =
        jamKeluar < jadwal.jam_keluar ? "PULANG TERLALU CEPAT" : "TEPAT WAKTU";
    }

    if (absensi) {
      // Absen Pulang
      await db.query(
        "UPDATE prct_absensi SET jam_keluar = $1, keterangan = $2, status_keluar = $3 WHERE username = $4 AND tanggal = $5",
        [jamKeluar, keterangan, statusKeluar, username, tanggal]
      );
    } else {
      // Absen Masuk
      await db.query(
        "INSERT INTO prct_absensi (username, tanggal, jam_masuk, jam_keluar, keterangan, status_masuk, status_keluar) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [
          username,
          tanggal,
          jamMasuk,
          jamKeluar,
          keterangan,
          statusMasuk,
          statusKeluar,
        ]
      );
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      message:
        "Berhasil melakukan absen " + mode_absen + " pada tanggal " + tanggal,
      data: {
        username,
        mode_absen,
        keterangan,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      code: 500,
      message: "Internal server error",
      data: {},
    });
  }
};

const getAbsensi = async (req, res) => {
  const { username, id_jabatan } = req.user;

  try {
    let absensi;

    if (id_jabatan === 1 || id_jabatan === 3) {
      const result = await db.query(
        "SELECT * FROM vw_rekap_kehadiran ORDER BY tanggal DESC"
      );
      absensi = result.rows;
    } else {
      const result2 = await db.query(
        "SELECT * FROM vw_rekap_kehadiran WHERE username = $1 AND jenis = 'ABSEN' ORDER BY tanggal DESC",
        [username]
      );
      absensi = result2.rows;
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Absensi hari ini",
      data: absensi,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      code: 500,
      message: "Internal server error",
      data: {},
    });
  }
};

const absensi = { saveAbsensi, getAbsensi };

module.exports = absensi;
