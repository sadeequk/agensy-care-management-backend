const express = require("express");
const router = express.Router();
const clientAppointmentController = require("../controllers/client.appointment.controller");

router.get("/", clientAppointmentController.clients_appointments_get);

module.exports = router;
