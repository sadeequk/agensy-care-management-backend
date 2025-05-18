const { HealthcareProvider, Client } = require("../models");

exports.createProvider = (providerData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = await HealthcareProvider.create(providerData);
      resolve(provider);
    } catch (error) {
      console.error("HealthcareProviderService [createProvider] Error:", error);
      reject(error);
    }
  });
};

exports.getAllProviders = (query = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const providers = await HealthcareProvider.findAll({
        where: query,
        order: [["created_at", "DESC"]],
        include: [
          {
            model: Client,
            as: "client",
            attributes: ["id", "first_name", "last_name"],
          },
        ],
      });
      resolve(providers);
    } catch (error) {
      reject(error);
    }
  });
};

exports.getProvidersByClientId = (clientId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const providers = await HealthcareProvider.findAll({
        where: { client_id: clientId },
        order: [["created_at", "DESC"]],
      });
      resolve(providers);
    } catch (error) {
      reject(error);
    }
  });
};

exports.getProviderById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = await HealthcareProvider.findOne({ where: { id } });
      if (!provider) {
        reject(new Error("Healthcare provider not found"));
      }
      resolve(provider);
    } catch (error) {
      reject(error);
    }
  });
};

exports.updateProvider = (id, providerData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = await HealthcareProvider.findByPk(id);
      if (!provider) {
        reject(new Error("Healthcare provider not found"));
      }
      const updated = await provider.update(providerData);
      resolve(updated);
    } catch (error) {
      reject(error);
    }
  });
};

exports.deleteProvider = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = await HealthcareProvider.findByPk(id);
      if (!provider) {
        reject(new Error("Healthcare provider not found"));
      }
      await provider.destroy();
      resolve({ message: "Healthcare provider deleted successfully" });
    } catch (error) {
      reject(error);
    }
  });
};

exports.toggleProviderActive = (id, active) => {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = await HealthcareProvider.findByPk(id);
      if (!provider) {
        reject(new Error("Healthcare provider not found"));
      }
      provider.active = active;
      await provider.save();
      resolve(provider);
    } catch (error) {
      reject(error);
    }
  });
};
