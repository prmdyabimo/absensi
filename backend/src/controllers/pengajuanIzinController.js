const db = require("../config/database");

const getPengajuanIzin = async (req, res) => {
  const { username, id_jabatan } = req.user;

  try {
    let pengajuan_izin;

    switch (id_jabatan) {
      case 1:
        // Administrator
        const result = await db.query(
          "SELECT * FROM vw_pengajuan_izin ORDER BY tanggal DESC"
        );
        pengajuan_izin = result.rows;
        break;
      case 2:
        // Supervisor
        const result2 = await db.query(
          "SELECT * FROM vw_pengajuan_izin WHERE username = $1 OR username_atasan = $1  ORDER BY tanggal DESC",
          [username]
        );
        pengajuan_izin = result2.rows;
        break;
      case 3:
        // HR
        const result3 = await db.query(
          "SELECT * FROM vw_pengajuan_izin WHERE approve_spv = TRUE ORDER BY tanggal DESC"
        );
        pengajuan_izin = result3.rows;
        break;
      case 4:
        // Karyawan
        const result4 = await db.query(
          "SELECT * FROM vw_pengajuan_izin WHERE username = $1 ORDER BY tanggal DESC",
          [username]
        );
        pengajuan_izin = result4.rows;
        break;
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Data Pengajuan Izin Ditemukan",
      data: pengajuan_izin,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      status: "failed",
      code: 500,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const savePengajuanIzin = async (req, res) => {
  const { jenis_izin, tanggal, keterangan } = req.body;
  const { username, id_jabatan } = req.user;
  const tanggalApprove = new Date().toISOString();

  if (!jenis_izin || !tanggal || !keterangan) {
    return res.status(200).json({
      status: "failed",
      code: 400,
      message: "Semua Input Tidak Boleh Kosong",
      data: {},
    });
  }

  try {
    switch (id_jabatan) {
      case 1:
        // Administrator
        await db.query(
          "INSERT INTO prct_pengajuan_izin (username, jenis_izin, tanggal, keterangan, approve_spv, user_approve_spv, tgl_approve_spv, approve_hr, user_approve_hr, tgl_approve_hr) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
          [
            username,
            jenis_izin,
            tanggal,
            keterangan,
            true,
            username,
            tanggalApprove,
            true,
            username,
            tanggalApprove,
          ]
        );
        break;
      case 2:
        // Supervisor
        await db.query(
          "INSERT INTO prct_pengajuan_izin (username, jenis_izin, tanggal, keterangan, approve_spv, user_approve_spv, tgl_approve_spv) VALUES ($1, $2, $3, $4, $5, $6, $7)",
          [username, jenis_izin, tanggal, keterangan, true, username, tanggal]
        );
        break;
      case 3:
        // HR
        await db.query(
          "INSERT INTO prct_pengajuan_izin (username, jenis_izin, tanggal, keterangan, approve_spv, user_approve_spv, tgl_approve_spv, approve_hr, user_approve_hr, tgl_approve_hr) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
          [
            username,
            jenis_izin,
            tanggal,
            keterangan,
            true,
            username,
            tanggalApprove,
            true,
            username,
            tanggalApprove,
          ]
        );
        break;
      case 4:
        await db.query(
          "INSERT INTO prct_pengajuan_izin (username, jenis_izin, tanggal, keterangan) VALUES ($1, $2, $3, $4)",
          [username, jenis_izin, tanggal, keterangan]
        );
        break;
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Pengajuan Izin Berhasil",
      data: { username, jenis_izin, tanggal, keterangan },
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      status: "failed",
      code: 500,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const approvePengajuanIzin = async (req, res) => {
  const { id } = req.params;
  const { username, id_jabatan } = req.user;
  const tanggal = new Date().toISOString();

  try {
    if (id_jabatan === 4) {
      return res.status(200).json({
        status: "failed",
        code: 403,
        message: "Anda Tidak Memiliki Hak Akses",
        data: {},
      });
    }

    switch (id_jabatan) {
      case 1:
        await db.query(
          "UPDATE prct_pengajuan_izin SET approve_spv = TRUE, user_approve_spv = $1, tgl_approve_spv = $2, approve_hr = TRUE, user_approve_hr = $1, tgl_approve_hr = $2 WHERE id = $3",
          [username, tanggal, id]
        );
        break;
      case 2:
        await db.query(
          "UPDATE prct_pengajuan_izin SET approve_spv = TRUE, user_approve_spv = $1, tgl_approve_spv = $2 WHERE id = $3",
          [username, tanggal, id]
        );
        break;
      case 3:
        await db.query(
          "UPDATE prct_pengajuan_izin SET approve_hr = TRUE, user_approve_hr = $1, tgl_approve_hr = $2 WHERE id = $3",
          [username, tanggal, id]
        );
        break;
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Pengajuan Izin Berhasil Diapprove",
      data: {},
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      status: "failed",
      code: 500,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const rejectPengajuanIzin = async (req, res) => {
  const { id } = req.params;
  const { username, id_jabatan } = req.user;
  const tanggal = new Date().toISOString();

  try {
    if (id_jabatan === 4) {
      return res.status(200).json({
        status: "failed",
        code: 403,
        message: "Anda Tidak Memiliki Hak Akses",
        data: {},
      });
    }

    await db.query("UPDATE prct_pengajuan_izin SET reject = TRUE, user_reject = $1, tgl_reject = $2 WHERE id = $3", [username, tanggal, id])

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Pengajuan Izin Berhasil Ditolak",
      data: {},
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      status: "failed",
      code: 500,
      message: "Internal Server Error",
      data: {},
    });
  }
}

const PengajuanIzin = {
  getPengajuanIzin,
  savePengajuanIzin,
  approvePengajuanIzin,
  rejectPengajuanIzin,
};

module.exports = PengajuanIzin;
