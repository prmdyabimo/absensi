const express = require("express");
const router = express.Router();
const pengajuanIzinController = require("../controllers/pengajuanIzinController");
const authenticateJWT = require("../middleware/authenticateJWT");

router.get("/", authenticateJWT, pengajuanIzinController.getPengajuanIzin);
router.post("/", authenticateJWT, pengajuanIzinController.savePengajuanIzin);
router.put("/:id", authenticateJWT, pengajuanIzinController.approvePengajuanIzin);
router.put("/reject/:id", authenticateJWT, pengajuanIzinController.rejectPengajuanIzin);

module.exports = router;
