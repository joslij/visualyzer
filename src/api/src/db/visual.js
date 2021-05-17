const { CosmosClient } = require("@azure/cosmos");
const { v4: uuid } = require("uuid");
const { StatusCodes } = require("http-status-codes");
const { escape } = require("html-escaper");

const { get: getCosmosDbConfig } = require("../config/cosmosdb.config");
const { getById: getUserById } = require("./user");
const { response: responseModel } = require("../models/response.model");
const { getModelFromDatabaseItem } = require("../models/visual.model");

let container = null;

const getContainer = async () => {
  if (!container) {
    const cosmosdbConfig = await getCosmosDbConfig();
    const client = new CosmosClient(cosmosdbConfig.connectionString);
    const database = client.database(cosmosdbConfig.databaseName);
    container = database.container(cosmosdbConfig.containers.visuals);
  }
  return container;
};

const getById = async (id, userId = null, getRaw = false) => {
  const container = await getContainer();
  let response = null;

  try {
    let querySpecification = {};
    if (userId) {
      querySpecification = {
        query: `SELECT * FROM c WHERE c.id = "${id}" AND c.userId = "${userId}"`,
      };
    } else {
      querySpecification = {
        query: `SELECT * FROM c WHERE c.id = "${id}"`,
      };
    }

    const { resources: visualItems } = await container.items
      .query(querySpecification)
      .fetchAll();

    if (visualItems && visualItems.length === 1) {
      const visualItem = visualItems[0];
      const user = await getUserById(visualItem.userId);
      response = responseModel({
        statusCode: StatusCodes.OK,
        data: getRaw
          ? visualItem
          : getModelFromDatabaseItem(user.data, visualItem),
      });
    } else {
      response = responseModel({
        statusCode: StatusCodes.NOT_FOUND,
        message: "Visual not found",
      });
    }
  } catch (error) {
    console.error(error);

    response = responseModel({
      statusCode: error.code ?? StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Failed to get visual",
    });
  }

  return response;
};

const getItems = async (querySpecification) => {
  const container = await getContainer();
  let response = null;

  try {
    const { resources: visualItems, statusCode } = await container.items
      .query(querySpecification)
      .fetchAll();

    const users = [];
    const visuals = [];
    for (const item of visualItems) {
      let user = users.find((i) => i.id === item.userId);
      if (!user) {
        const response = await getUserById(item.userId);
        user = response.data;
        users.push(user);
      }
      const response = getModelFromDatabaseItem(user, item);
      visuals.push(response);
    }

    response = responseModel({
      statusCode: statusCode ?? StatusCodes.OK,
      data: visuals,
    });
  } catch (error) {
    console.error(error);

    response = responseModel({
      statusCode: error.code ?? StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Failed to get visuals",
    });
  }

  return response;
};

const getAllUserVisuals = async (userId) => {
  const querySpecification = {
    query: `SELECT * FROM c WHERE c.userId = '${userId}' ORDER BY c._ts DESC`,
  };

  return getItems(querySpecification);
};

const getAllUserVisualsInCategory = async (userId, categoryName) => {
  const querySpecification = {
    query: `SELECT * FROM c WHERE c.userId = '${userId}' AND ARRAY_CONTAINS(c.categories, '${categoryName}') ORDER BY c._ts DESC`,
  };

  return getItems(querySpecification);
};

const getAllPublicVisuals = async () => {
  const querySpecification = {
    query: `SELECT * FROM c WHERE c.isPublic = true ORDER BY c._ts DESC`,
  };

  return getItems(querySpecification);
};

const getAllPublicVisualsInCategory = async (categoryName) => {
  const querySpecification = {
    query: `SELECT * FROM c WHERE ARRAY_CONTAINS(c.categories, '${categoryName}') AND c.isPublic = true ORDER BY c._ts DESC`,
  };

  return getItems(querySpecification);
};

const create = async (visualModel) => {
  const container = await getContainer();
  let response = null;

  try {
    const { resource: visualItem, statusCode } = await container.items.create(
      visualModel
    );

    const { data: user } = await getUserById(visualItem.userId);

    response = responseModel({
      statusCode: statusCode,
      data: getModelFromDatabaseItem(user, visualItem),
    });
  } catch (error) {
    console.error(error);

    response = responseModel({
      statusCode: error.code,
      message: "Failed to create visual",
    });
  }

  return response;
};

const operationTypes = {
  like: "LIKE",
  dislike: "DISLIKE",
  toggleShare: "TOGGLE_SHARE",
  addComment: "ADD_COMMENT",
};

const update = async (id, userId, operationType, operationData) => {
  const container = await getContainer();
  let response = null;
  try {
    response = await getById(id, null, true);
    const item = response.data;
    const { data: user } = await getUserById(userId);

    if (item) {
      const { likes, dislikes, comments } = item.reactions;
      switch (operationType) {
        case operationTypes.like:
          if (!likes.includes(userId)) {
            likes.push(userId);
          }
          if (dislikes.includes(userId)) {
            dislikes.splice(dislikes.indexOf(userId), 1);
          }
          break;
        case operationTypes.dislike:
          if (!dislikes.includes(userId)) {
            dislikes.push(userId);
          }
          if (likes.includes(userId)) {
            likes.splice(likes.indexOf(userId), 1);
          }
          break;
        case operationTypes.toggleShare:
          item.isPublic = !item.isPublic;
          break;
        case operationTypes.addComment:
          comments.push({
            id: uuid(),
            author: user.displayName,
            text: escape(operationData),
            ts: new Date().getTime(),
          });
      }

      const { resource: updatedItem, statusCode } =
        await container.items.upsert(item);

      response = responseModel({
        statusCode: statusCode ?? StatusCodes.NOT_FOUND,
        data: getModelFromDatabaseItem(user, updatedItem),
      });
    }
  } catch (error) {
    console.error(error);

    response = responseModel({
      statusCode: error.code,
      message: "Failed to update visual",
    });
  }

  return response;
};

const deleteItem = async (id, userId) => {
  const container = await getContainer();
  let response = null;
  try {
    const { statusCode, id: itemId } = await container
      .item(id, userId)
      .delete();
    response = responseModel({
      statusCode: statusCode,
      data: itemId,
    });
  } catch (error) {
    console.error(error);

    response = responseModel({
      statusCode: error.code,
      message: "Failed to delete visual. Ensure that you own the visual.",
    });
  }

  return response;
};

module.exports = {
  getAllPublicVisuals,
  getAllPublicVisualsInCategory,
  getAllUserVisuals,
  getAllUserVisualsInCategory,
  getById,
  create,
  update,
  deleteItem,
  operationTypes,
};
