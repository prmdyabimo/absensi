const db = require("../config/database");

const getJabatan = async (req, res) => {
  try {
    const { rows: jabatan } = await db.query("SELECT * FROM glbm_jabatan");

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Success",
      data: jabatan,
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

const saveJabatan = async (req, res) => {
  const { nama_jabatan } = req.body;

  if (!nama_jabatan) {
    return res.status(200).json({
      status: "failed",
      code: 400,
      message: "Nama jabatan harus diisi",
      data: {},
    });
  }

  try {
    const {
      rows: [jabatan],
    } = await db.query("SELECT * FROM glbm_jabatan WHERE nama = $1", [
      nama_jabatan,
    ]);

    if (jabatan) {
      return res.status(200).json({
        status: "failed",
        code: 400,
        message: "Nama jabatan sudah ada",
        data: jabatan,
      });
    }

    const { rows } = await db.query(
      "INSERT INTO glbm_jabatan (nama) VALUES ($1)",
      [nama_jabatan]
    );

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Jabatan berhasil ditambahkan",
      data: {
        nama_jabatan,
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

const updateJabatan = async (req, res) => {
  const { id } = req.params;
  const { nama_jabatan } = req.body;

  if (!nama_jabatan) {
    return res.status(200).json({
      status: "failed",
      code: 400,
      message: "Nama jabatan harus diisi",
      data: {},
    });
  }

  try {
    const {
      rows: [jabatan],
    } = await db.query("SELECT * FROM glbm_jabatan WHERE id = $1", [id]);

    if (!jabatan) {
      return res.status(200).json({
        status: "failed",
        code: 404,
        message: "Jabatan tidak ditemukan",
        data: {},
      });
    }

    await db.query(
      "UPDATE glbm_jabatan SET nama = $1 WHERE id = $2 ",
      [nama_jabatan, id]
    );

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Jabatan berhasil diupdate",
      data: {
        nama_jabatan,
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

const deleteJabatan = async (req, res) => {
  const { id } = req.params;

  try {
    const {
      rows: [jabatan],
    } = await db.query("SELECT * FROM glbm_jabatan WHERE id = $1", [id]);

    if (!jabatan) {
      return res.status(200).json({
        status: "failed",
        code: 404,
        message: "Jabatan tidak ditemukan",
        data: {},
      });
    }

    await db.query("DELETE FROM glbm_jabatan WHERE id = $1", [id]);

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Jabatan berhasil dihapus",
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
}

const jabatan = { getJabatan, saveJabatan, updateJabatan, deleteJabatan };

module.exports = jabatan;
