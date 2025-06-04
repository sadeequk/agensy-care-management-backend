const clientAppointmentService = require("../services/client.appointment.service");
const joiSchemas = require("../validation/client.appointment.schemas");
const { USER_ROLES } = require("../constants/index");

exports.appointment_post = async (req, res) => {
  try {
    const userId = req.user.id;
    const clientId = req.clientId;
    const primaryUserId = req.user.role == USER_ROLES.PRIMARY_USER ? userId : req.user.primary_user_id;
    const results = await joiSchemas.appointment_post.validateAsync(req.body);
    const appointment = await clientAppointmentService.createAppointment(userId, clientId, primaryUserId, results);
    return res.success(appointment);
  } catch (error) {
    console.error("AppointmentController [appointment_post ] Error:", error);
    return res.fail(error.message);
  }
};

exports.appointment_get = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await clientAppointmentService.getAppointment(appointmentId);
    return res.success(appointment);
  } catch (error) {
    console.error("AppointmentController [appointment_get] Error:", error);
    return res.fail(error.message);
  }
};

exports.appointments_get = async (req, res) => {
  try {
    const clientId = req.clientId;
    const appointments = await clientAppointmentService.getAppointmentsForClient(clientId);
    return res.success(appointments);
  } catch (error) {
    console.error("AppointmentController [appointments_post ] Error:", error);
    return res.fail(error.message);
  }
};

exports.appointment_put = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const validated = await joiSchemas.appointment_put.validateAsync(req.body);
    const appointment = await clientAppointmentService.updateAppointment(appointmentId, validated);
    return res.success(appointment);
  } catch (error) {
    console.error("AppointmentController [appointment_put ] Error:", error);
    return res.fail(error.message);
  }
};

exports.appointment_delete = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    await clientAppointmentService.deleteAppointment(appointmentId);
    return res.success({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("AppointmentController [appointment_delete] Error:", error);
    return res.fail(error.message);
  }
};

exports.appointment_status_put = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { active } = await joiSchemas.appointment_status_put.validateAsync(req.body);

    const appointment = await clientAppointmentService.appointmentToggle(appointmentId, active);
    return res.success(appointment);
  } catch (error) {
    console.error("AppointmentController [appointment_status_put] Error:", error);
    return res.fail(error.message);
  }
};

exports.clients_appointments_get = async (req, res) => {
  try {
    const userId = req.user.id;
    const primaryUserId = req.user.role == USER_ROLES.PRIMARY_USER ? userId : req.user.primary_user_id;
    let appointments;
    if (req.user.role == USER_ROLES.PRIMARY_USER) {
      appointments = await clientAppointmentService.getAppointmentsOfAllClients(primaryUserId);
    } else {
      appointments = await clientAppointmentService.getSubUserClientsAppointments(userId);
    }
    console.log(req.user.role);
    return res.success(appointments);
  } catch (error) {
    console.error("AppointmentController [clients_appointments_get] Error:", error);
    return res.fail(error.message);
  }
};
