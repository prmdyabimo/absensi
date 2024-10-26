const express = require("express");
const router = express.Router();
const jadwalController = require("../controllers/jadwalController");
const authenticateJWT = require("../middleware/authenticateJWT");

router.get("/", authenticateJWT, jadwalController.getJadwal);
router.post("/", authenticateJWT, jadwalController.saveJadwal);
router.put("/:id", authenticateJWT, jadwalController.updateJadwal);
router.delete("/:id", authenticateJWT, jadwalController.deleteJadwal);

module.exports = router;
