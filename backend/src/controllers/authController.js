const db = require("../config/database");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const {
      rows: [user],
    } = await db.query("SELECT * FROM glbm_karyawan WHERE username = $1", [
      username,
    ]);
    const isPasswordMatch = user
      ? await bcryptjs.compare(password, user.password)
      : false;

    if (!user || !isPasswordMatch)
      return res.status(200).json({
        status: "failed",
        code: 401,
        message: "Username atau Password salah",
        data: {},
      });

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Login berhasil",
      data: { user, token },
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

const logout = (req, res) => {
  const { token } = req.body;

  if (!token)
    return res.status(200).json({
      status: "failed",
      code: 401,
      message: "Token not found",
      data: {},
    });

  return res.status(200).json({
    status: "success",
    code: 200,
    message: "Logout berhasil",
    data: {
      token,
    },
  });
};

module.exports = { login, logout };
