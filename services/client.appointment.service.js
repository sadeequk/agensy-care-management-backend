const { ClientAppointment, Client, User, HealthcareProvider } = require("../models");

module.exports.createAppointment = (userId, clientId, primaryUserId, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const appointment = await ClientAppointment.create({
        ...data,
        created_by: userId,
        client_id: clientId,
        primary_user_id: primaryUserId,
      });
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

module.exports.appointmentToggle = (appointmentId, active) =>
  new Promise(async (resolve, reject) => {
    try {
      const appointment = await ClientAppointment.findByPk(appointmentId);
      if (!appointment) return reject(new Error("Appointment not found"));
      await appointment.update({ active });
      resolve(appointment);
    } catch (error) {
      console.error("AppointmentService [appointmentToggle] Error:", error);
      reject(error);
    }
  });

module.exports.getAppointmentsOfAllClients = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const appointments = await ClientAppointment.findAll({
        include: [
          {
            model: Client,
            as: "client",
            attributes: ["id", "first_name", "last_name"],
            include: [
              {
                model: User,
                through: { attributes: [] }, //no field in response, from junction table
                required: true, //to ensure that the user is associated with the client
                where: { id: userId },
                attributes: [], // no field in repsonse ,from user table
              },
            ],
          },
          {
            model: User,
            as: "createdBy",
            attributes: ["id", "first_name", "last_name", "email"],
          },
        ],
        order: [["start_time", "DESC"]],
      });
      resolve(appointments);
    } catch (error) {
      console.error("AppointmentService [getAppointmentsOfAllClients] Error:", error);
      reject(error);
    }
  });

module.exports.getSubUserClientsAppointments = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const appointments = await ClientAppointment.findAll({
        include: [
          {
            model: Client,
            as: "client",
            attributes: ["id", "first_name", "last_name"],
            include: [
              {
                model: User,
                as: "Users",
                through: { attributes: [] },
                required: true,
                where: { id: userId },
                attributes: [],
              },
            ],
          },
          {
            model: User,
            as: "createdBy",
            attributes: ["id", "first_name", "last_name", "email"],
          },
        ],
        order: [["start_time", "DESC"]],
      });
      resolve(appointments);
    } catch (error) {
      console.error("AppointmentService [getSubUserClientsAppointments] Error:", error);
      reject(error);
    }
  });
