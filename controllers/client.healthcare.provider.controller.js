const healthcareProviderService = require("../services/client.healthcare.provider.service");
const clientService = require("../services/client.service");
const joiSchemas = require("../validation/client.healthcare.provider.schemas");

exports.provider_post = async (req, res) => {
  try {
    const clientId = req.clientId;
    const providerData = await joiSchemas.provider_post.validateAsync(req.body);
    const client = await clientService.getClientWithAccessCheck(req.user.id, clientId);
    if (!client) return res.fail("Client not found or you don't have permission to add healthcare providers");

    const provider = await healthcareProviderService.createProvider({
      ...providerData,
      client_id: clientId,
    });

    return res.success(provider);
  } catch (error) {
    console.error("HealthcareProviderController [provider_post] Error:", error);
    return res.serverError(error);
  }
};

exports.providers_get = async (req, res) => {
  try {
    const clientId = req.clientId;
    const providers = await healthcareProviderService.getProvidersByClientId(clientId);
    if (!providers) return res.fail("Providers not foound fro this client");
    return res.success(providers);
  } catch (error) {
    console.error("HealthcareProviderController [providers_get] Error:", error);
    return res.serverError(error);
  }
};

exports.provider_get = async (req, res) => {
  try {
    const { healthCareProviderId } = req.params;
    const provider = await healthcareProviderService.getProviderById(healthCareProviderId);
    if (!provider) return res.fail("Healthcare provider not found");

    return res.success(provider);
  } catch (error) {
    console.error("HealthcareProviderController [provider_get] Error:", error);
    return res.serverError(error);
  }
};

exports.provider_put = async (req, res) => {
  try {
    const { healthCareProviderId } = req.params;
    const providerData = await joiSchemas.provider_put.validateAsync(req.body);
    const isfound = await healthcareProviderService.getProviderById(healthCareProviderId);
    if (!isfound) return res.fail("Healthcare provider not found");

    const provider = await healthcareProviderService.updateProvider(healthCareProviderId, providerData);
    return res.success(provider);
  } catch (error) {
    console.error("HealthcareProviderController [provider_put] Error:", error);
    return res.serverError(error);
  }
};

exports.provider_delete = async (req, res) => {
  try {
    const { healthCareProviderId } = req.params;
    await healthcareProviderService.deleteProvider(healthCareProviderId);
    return res.success({ message: "Healthcare provider deleted successfully" });
  } catch (error) {
    console.error("HealthcareProviderController [provider_delete] Error:", error);
    return res.serverError(error);
  }
};

exports.provider_status_put = async (req, res) => {
  try {
    const { healthCareProviderId } = req.params;
    const { active } = await joiSchemas.provider_toggle_active.validateAsync(req.body);
    const provider = await healthcareProviderService.ProviderStatus(healthCareProviderId, active);
    return res.success(provider);
  } catch (error) {
    console.error("HealthcareProviderController [provider_status_put] Error:", error);
    return res.serverError(error);
  }
};
