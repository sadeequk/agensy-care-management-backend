const healthcareProviderService = require("../services/healthcare.provider.service");
const clientService = require("../services/client.service");
const joiSchemas = require("../validation/healthcare.provider.schemas");

exports.provider_post = async (req, res) => {
  try {
    const { id } = req.params;
    const providerData = await joiSchemas.provider_post.validateAsync(req.body);
    const client = await clientService.getClientWithAccessCheck(req.user.id, id);
    if (!client) {
      return res.fail("Client not found or you don't have permission to add healthcare providers");
    }

    const provider = await healthcareProviderService.createProvider({
      ...providerData,
      client_id: id,
    });

    return res.success(provider);
  } catch (error) {
    console.error("HealthcareProviderController [client_provider_post] Error:", error);
    return res.serverError(error);
  }
};

exports.providers_get = async (req, res) => {
  try {
    const { id } = req.params;
    const providers = await healthcareProviderService.getProvidersByClientId(id);
    return res.success(providers);
  } catch (error) {
    console.error("HealthcareProviderController [client_providers_get] Error:", error);
    return res.serverError(error);
  }
};

exports.provider_get = async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await healthcareProviderService.getProviderById(id);
    if (!provider) {
      return res.fail("Healthcare provider not found");
    }
    return res.success(provider);
  } catch (error) {
    console.error("HealthcareProviderController [client_provider_get] Error:", error);
    return res.serverError(error);
  }
};

exports.provider_put = async (req, res) => {
  try {
    const { id } = req.params;
    const providerData = await joiSchemas.provider_put.validateAsync(req.body);

    const provider = await healthcareProviderService.updateProvider(id, providerData);
    return res.success(provider);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.fail(error.message);
    }
    console.error("HealthcareProviderController [client_provider_put] Error:", error);
    return res.serverError(error);
  }
};

exports.provider_delete = async (req, res) => {
  try {
    const { id } = req.params;
    await healthcareProviderService.deleteProvider(id);
    return res.success({ message: "Healthcare provider deleted successfully" });
  } catch (error) {
    console.error("HealthcareProviderController [client_provider_delete] Error:", error);
    return res.serverError(error);
  }
};

exports.provider_status_put = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = await joiSchemas.provider_toggle_active.validateAsync(req.body);

    const provider = await healthcareProviderService.toggleProviderActive(id, active);
    return res.success(provider);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.fail(error.message);
    }
    console.error("HealthcareProviderController [client_provider_toggle_active] Error:", error);
    return res.serverError(error);
  }
};
