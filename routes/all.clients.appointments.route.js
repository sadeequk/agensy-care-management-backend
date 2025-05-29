const express = require("express");
const router = express.Router();
const clientAppointmentController = require("../controllers/client.appointment.controller");

router.get("/", clientAppointmentController.clients_appointments_get); //api for get appointments for all clients of the requesting user
module.exports = router;
