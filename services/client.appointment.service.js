const { ClientAppointment, Client, User } = require("../models");

module.exports.createAppointment = (userId, clientId, data) =>
  new Promise(async (resolve, reject) => {
    try {
      //will add user permission for creating appoiitnment in future or it will be managed by frontend
      const appointment = await ClientAppointment.create({ ...data, created_by: userId, client_id: clientId });
      resolve(appointment);
    } catch (error) {
      console.error("AppointmentService [createAppointment] Error:", error);
      reject(error);
    }
  });

module.exports.getAppointment = (appointmentId) =>
  new Promise(async (resolve, reject) => {
    try {
      const appointment = await ClientAppointment.findByPk(appointmentId, {
        include: [
          { model: Client, as: "client" },
          { model: User, as: "creator" },
        ],
      });
      if (!appointment) return reject(new Error("Appointment not found"));
      resolve(appointment);
    } catch (error) {
      console.error("AppointmentService [getAppointment] Error:", error);
      reject(error);
    }
  });

module.exports.getAppointmentsForClient = (clientId) =>
  new Promise(async (resolve, reject) => {
    try {
      const appointments = await ClientAppointment.findAll({
        where: { client_id: clientId },
        include: [{ model: User, as: "creator" }],
        order: [["start_time", "DESC"]],
      });
      resolve(appointments);
    } catch (error) {
      console.error("AppointmentService [getAppointmentsForClient] Error:", error);
      reject(error);
    }
  });

module.exports.updateAppointment = (appointmentId, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const appointment = await ClientAppointment.findByPk(appointmentId);
      if (!appointment) return reject(new Error("Appointment not found"));
      await appointment.update(data);
      resolve(appointment);
    } catch (error) {
      console.error("AppointmentService [updateAppointment] Error:", error);
      reject(error);
    }
  });

module.exports.deleteAppointment = (appointmentId) =>
  new Promise(async (resolve, reject) => {
    try {
      const appointment = await ClientAppointment.findByPk(appointmentId);
      if (!appointment) return reject(new Error("Appointment not found"));
      await appointment.destroy();
      resolve(true);
    } catch (error) {
      console.error("AppointmentService [deleteAppointment] Error:", error);
      reject(error);
    }
  });
