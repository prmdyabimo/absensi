const db = require("../config/database");
const bcryptjs = require("bcryptjs");

const getEmployee = async (req, res) => {
  try {
    const { rows: employees } = await db.query("SELECT k.*, j.nama AS nama_jabatan FROM glbm_karyawan k LEFT JOIN glbm_jabatan j ON k.id_jabatan = j.id");

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Success",
      data: employees,
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

const saveEmployee = async (req, res) => {
  const { username, fullname, email, password, id_jabatan, username_atasan } =
    req.body;

  if (
    !username ||
    !fullname ||
    !email ||
    !password ||
    !id_jabatan ||
    !username_atasan
  ) {
    return res.status(200).json({
      status: "failed",
      code: 400,
      message: "Semua Input Tidak Boleh Kosong",
      data: {},
    });
  }

  try {
    const {
      rows: [user],
    } = await db.query("SELECT * FROM glbm_karyawan WHERE username = $1", [
      username,
    ]);

    if (user)
      return res.status(200).json({
        status: "failed",
        code: 400,
        message: "User sudah terdaftar",
        data: {},
      });

    const hashedPassword = await bcryptjs.hash(password, 10);

    await db.query(
      "INSERT INTO glbm_karyawan (username, fullname, email, password, id_jabatan, username_atasan) VALUES ($1, $2, $3, $4, $5, $6)",
      [username, fullname, email, hashedPassword, id_jabatan, username_atasan]
    );

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "User berhasil didaftarkan",
      data: {
        username,
        fullname,
        email,
        id_jabatan,
        username_atasan,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      code: 500,
      message: "Internal server error",
      data: {},
    });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const {
      rows: [user],
    } = await db.query("SELECT * FROM glbm_karyawan WHERE id = $1", [id]);

    if (!user) {
      return res.status(200).json({
        status: "failed",
        code: 400,
        message: "User tidak ditemukan",
        data: {},
      });
    }

    await db.query("DELETE FROM glbm_karyawan WHERE id = $1", [id]);

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "User berhasil dihapus",
      data: {
        id,
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

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { fullname, email, password, id_jabatan, username_atasan } = req.body;

  if (!fullname || !email || !id_jabatan || !username_atasan) {
    return res.status(200).json({
      status: "failed",
      code: 400,
      message: "Semua Input Tidak Boleh Kosong",
      data: {},
    });
  }

  try {
    const {
      rows: [user],
    } = await db.query("SELECT * FROM glbm_karyawan WHERE id = $1", [id]);

    if (!user) {
      return res.status(200).json({
        status: "failed",
        code: 400,
        message: "User tidak ditemukan",
        data: {},
      });
    }

    if (password) {
      const hashedPassword = await bcryptjs.hash(password, 10);
      await db.query(
        "UPDATE glbm_karyawan SET fullname = $1, email = $2, password = $3, id_jabatan = $4, username_atasan = $5 WHERE id = $6",
        [fullname, email, hashedPassword, id_jabatan, username_atasan, id]
      );
    } else {
      await db.query(
        "UPDATE glbm_karyawan SET fullname = $1, email = $2, id_jabatan = $3, username_atasan = $4 WHERE id = $5",
        [fullname, email, id_jabatan, username_atasan, id]
      );
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "User berhasil diupdate",
      data: {
        user,
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

const employee = { getEmployee, saveEmployee, deleteEmployee, updateEmployee };

module.exports = employee;
