const { getConfigValue } = require("../helpers/config.helper");

const cosmosdbConfig = {
  databaseName: "visualyzer",
  containers: {
    users: "users",
    visuals: "visuals",
  },
  connectionString: null,
};

const get = async () => {
  if (!cosmosdbConfig.connectionString) {
    const connectionStringValue = await getConfigValue(
      "CosmosConnectionString"
    );
    cosmosdbConfig.connectionString = connectionStringValue;
  }

  return cosmosdbConfig;
};

module.exports = {
  get,
};
