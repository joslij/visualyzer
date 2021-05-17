const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

const keyVaultName = process.env.KEY_VAULT_NAME;
const keyVaultUri = `https://${keyVaultName}.vault.azure.net`;
const credential = new DefaultAzureCredential();
const client = new SecretClient(keyVaultUri, credential);

const getConfigValue = async (name) => {
  const secret = await client.getSecret(name);
  if (secret) {
    return secret.value;
  } else {
    throw new Error("Failed to get configuration value!");
  }
};

module.exports = {
  getConfigValue,
};
