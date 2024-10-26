const express = require("express");
const router = express.Router();
const jabatanController = require("../controllers/jabatanController");
const authenticateJWT = require("../middleware/authenticateJWT");

router.get("/", authenticateJWT, jabatanController.getJabatan);
router.post("/", authenticateJWT, jabatanController.saveJabatan);
router.put("/:id", authenticateJWT, jabatanController.updateJabatan);
router.delete("/:id", authenticateJWT, jabatanController.deleteJabatan);

module.exports = router;
