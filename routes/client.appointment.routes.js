const express = require("express");
const router = express.Router({ mergeParams: true });
const clientAppointmentController = require("../controllers/client.appointment.controller");

router.post("/", clientAppointmentController.appointment_post);
router.get("/", clientAppointmentController.appointments_get);
router.get("/:appointmentId", clientAppointmentController.appointment_get);
router.put("/:appointmentId", clientAppointmentController.appointment_put);
router.delete("/:appointmentId", clientAppointmentController.appointment_delete);
router.put("/:appointmentId/status", clientAppointmentController.appointment_status_put);
module.exports = router;
