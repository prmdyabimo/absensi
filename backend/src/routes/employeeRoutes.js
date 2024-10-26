const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const authenticateJWT = require("../middleware/authenticateJWT");

router.get("/", authenticateJWT, employeeController.getEmployee);
router.post("/", authenticateJWT, employeeController.saveEmployee);
router.delete("/:id", authenticateJWT, employeeController.deleteEmployee);
router.put("/:id", authenticateJWT, employeeController.updateEmployee);

module.exports = router;
