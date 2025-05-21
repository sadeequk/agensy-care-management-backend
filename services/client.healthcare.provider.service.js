const { HealthcareProvider } = require("../models");

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

      await provider.destroy();
      resolve({ message: "Healthcare provider deleted successfully" });
    } catch (error) {
      reject(error);
    }
  });
};

exports.ProviderStatus = (healthCareProviderId, active) => {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = await HealthcareProvider.findByPk(healthCareProviderId);

      provider.active = active;
      await provider.save();
      resolve(provider);
    } catch (error) {
      reject(error);
    }
  });
};
