const db = require("../config/database");

const getJadwal = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM glbm_jadwal");
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Data Jadwal Ditemukan",
      data: rows,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      status: "failed",
      code: 500,
      message: "Internal server error",
      data: {},
    });
  }
};

const saveJadwal = async (req, res) => {
  const { hari, jam_masuk, jam_keluar } = req.body;

  if (!hari || !jam_masuk || !jam_keluar) {
    return res.status(200).json({
      status: "failed",
      code: 400,
      message: "Semua input tidak boleh kosong",
      data: {},
    });
  }

  try {
    const {
      rows: [jadwal],
    } = await db.query("SELECT * FROM glbm_jadwal WHERE hari = $1", [hari]);

    if (jadwal) {
      return res.status(200).json({
        status: "failed",
        code: 400,
        message: "Jadwal sudah ada",
        data: jadwal,
      });
    }

    await db.query(
      "INSERT INTO glbm_jadwal (hari, jam_masuk, jam_keluar) VALUES ($1, $2, $3)",
      [hari, jam_masuk, jam_keluar]
    );
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Berhasil menambahkan jadwal",
      data: {
        hari,
        jam_masuk,
        jam_keluar,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      status: "failed",
      code: 500,
      message: "Internal server error",
      data: {},
    });
  }
};

const updateJadwal = async (req, res) => {
  const { id } = req.params;
  const { hari, jam_masuk, jam_keluar } = req.body;

  if (!hari || !jam_masuk || !jam_keluar) {
    return res.status(200).json({
      status: "failed",
      code: 400,
      message: "Semua input tidak boleh kosong",
      data: {},
    });
  }

  try {
    const {
      rows: [jadwal],
    } = await db.query("SELECT * FROM glbm_jadwal WHERE id = $1", [id]);

    if (!jadwal) {
      return res.status(200).json({
        status: "failed",
        code: 404,
        message: "Jadwal tidak ditemukan",
        data: {},
      });
    }

    await db.query(
      "UPDATE glbm_jadwal SET hari = $1, jam_masuk = $2, jam_keluar = $3 WHERE id = $4",
      [hari, jam_masuk, jam_keluar, id]
    );

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Berhasil mengubah jadwal",
      data: {
        hari,
        jam_masuk,
        jam_keluar,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "failed",
      code: 500,
      message: "Internal server error",
      data: {},
    });
  }
};

const deleteJadwal = async (req, res) => {
  const { id } = req.params;

  try {
    const {
      rows: [jadwal],
    } = await db.query("SELECT * FROM glbm_jadwal WHERE id = $1", [id]);

    if (!jadwal) {
      return res.status(200).json({
        status: "failed",
        code: 404,
        message: "Jadwal tidak ditemukan",
        data: {},
      });
    }

    await db.query("DELETE FROM glbm_jadwal WHERE id = $1", [id]);

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Berhasil menghapus jadwal",
      data: {},
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "failed",
      code: 500,
      message: "Internal server error",
      data: {},
    });
  }
};

const jadwalController = {
  getJadwal,
  saveJadwal,
  updateJadwal,
  deleteJadwal,
};

module.exports = jadwalController;
