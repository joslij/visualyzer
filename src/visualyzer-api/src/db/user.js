const { CosmosClient } = require("@azure/cosmos");
const { v4: uuid } = require("uuid");
const { StatusCodes } = require("http-status-codes");

const { get: getCosmosDbConfig } = require("../config/cosmosdb.config");
const {
  getEncryptedStringStrong,
  compareEncryptedStringStrong,
} = require("../helpers/crypto.helper");
const { response: responseModel } = require("../models/response.model");
const { user: userModel } = require("../models/user.model");

let container = null;

const getContainer = async () => {
  if (!container) {
    const cosmosdbConfig = await getCosmosDbConfig();
    const client = new CosmosClient(cosmosdbConfig.connectionString);
    const database = client.database(cosmosdbConfig.databaseName);
    container = database.container(cosmosdbConfig.containers.users);
  }
  return container;
};

const getById = async (id) => {
  const container = await getContainer();
  let response = null;

  try {
    const querySpecification = {
      query: `SELECT * FROM c WHERE c.id = "${id}"`,
    };

    const { resources: userItems } = await container.items
      .query(querySpecification)
      .fetchAll();

    if (userItems && userItems.length === 1) {
      response = responseModel({
        statusCode: StatusCodes.OK,
        data: userModel(userItems[0]),
      });
    } else {
      response = responseModel({
        statusCode: StatusCodes.NOT_FOUND,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error(error);

    response = responseModel({
      statusCode: error.code ?? StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Failed to get user",
    });
  }

  return response;
};

const getByEmail = async (email) => {
  const container = await getContainer();
  let response = null;

  try {
    const querySpecification = {
      query: `SELECT * FROM c WHERE c.email = "${email}"`,
    };

    const { resources: userItems } = await container.items
      .query(querySpecification)
      .fetchAll();

    if (userItems && userItems.length === 1) {
      response = responseModel({
        statusCode: StatusCodes.OK,
        data: userModel(userItems[0]),
      });
    } else {
      response = responseModel({
        statusCode: StatusCodes.NOT_FOUND,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error(error);

    response = responseModel({
      statusCode: error.code ?? StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Failed to get user",
    });
  }

  return response;
};

const getByCredentials = async (email, password) => {
  const container = await getContainer();
  let response = null;

  try {
    const querySpecification = {
      query: `SELECT * FROM c WHERE c.email = "${email}"`,
    };

    const { resources: userItems } = await container.items
      .query(querySpecification)
      .fetchAll();

    if (userItems && userItems.length === 1) {
      const encryptedPassword = userItems[0].password;
      const doesPasswordMatch = await compareEncryptedStringStrong(
        password,
        encryptedPassword
      );

      if (doesPasswordMatch) {
        response = responseModel({
          statusCode: StatusCodes.OK,
          data: userModel(userItems[0]),
        });
      } else {
        response = responseModel({
          statusCode: StatusCodes.BAD_REQUEST,
          message: "User doesn't exist OR password is incorrect",
        });
      }
    } else {
      response = responseModel({
        statusCode: StatusCodes.NOT_FOUND,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error(error);

    response = responseModel({
      statusCode: error.code ?? StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Failed to get user",
    });
  }

  return response;
};

const getAll = async () => {
  const container = await getContainer();
  let response = null;

  try {
    const querySpecification = {
      query: "SELECT * FROM c",
    };

    const { resources: userItems, statusCode } = await container.items
      .query(querySpecification)
      .fetchAll();

    const users = userItems.map((item) => {
      return userModel(item);
    });

    response = responseModel({
      statusCode: statusCode ?? StatusCodes.OK,
      data: users,
    });
  } catch (error) {
    console.error(error);

    response = responseModel({
      statusCode: error.code ?? StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Failed to get users",
    });
  }

  return response;
};

const create = async ({
  firstName,
  lastName,
  displayName,
  email,
  password,
}) => {
  const container = await getContainer();
  let response = null;

  try {
    const encryptedPassword = await getEncryptedStringStrong(password);
    const userItemToInsert = {
      id: uuid(),
      firstName,
      lastName,
      displayName,
      email,
      password: encryptedPassword,
      role: "user",
    };

    const { resource: userItem, statusCode } = await container.items.create(
      userItemToInsert
    );

    response = responseModel({
      statusCode: statusCode,
      data: userModel(userItem),
    });
  } catch (error) {
    console.error(error);

    response = responseModel({
      statusCode: error.code,
      message:
        error.code === StatusCodes.CONFLICT
          ? "User email address is already in use"
          : "Failed to create user",
    });
  }

  return response;
};

module.exports = {
  getById,
  getByEmail,
  getByCredentials,
  getAll,
  create,
};
