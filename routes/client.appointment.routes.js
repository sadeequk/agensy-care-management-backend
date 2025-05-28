const express = require("express");
const router = express.Router({ mergeParams: true });
const appointmentController = require("../controllers/appointment.controller");

router.post("/", appointmentController.appointment_post);
router.get("/", appointmentController.appointments_get);
router.get("/:appointmentId", appointmentController.appointment_get);
router.put("/:appointmentId", appointmentController.appointment_put);
router.delete("/:appointmentId", appointmentController.appointment_delete);

module.exports = router;
