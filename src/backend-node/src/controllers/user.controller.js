const { getById, getAll } = require("../db/user");

const getUserById = async (req, res) => {
  const response = await getById(req.params.id);
  res.status(response.statusCode).json(response);
};

const getAllUsers = async (req, res) => {
  const response = await getAll();
  res.status(response.statusCode).json(response);
};

module.exports = {
  getUserById,
  getAllUsers,
};
