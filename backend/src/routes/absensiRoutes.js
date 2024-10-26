const express = require("express");
const router = express.Router();
const absensiController = require("../controllers/absensiController");
const authenticateJWT = require("../middleware/authenticateJWT");

router.get("/", authenticateJWT, absensiController.getAbsensi);
router.post("/", authenticateJWT, absensiController.saveAbsensi);

module.exports = router;
