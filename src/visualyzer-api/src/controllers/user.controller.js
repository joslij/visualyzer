const { StatusCodes } = require("http-status-codes");
const { getById, getAll } = require("../db/user");

const getUserById = async (req, res) => {
  const response = await getById(req.params.id);
  res.status(response.statusCode).json(response);
};

const getMyProfile = async (req, res) => {
  const userIdFromToken = res.locals.user.id;
  const userIdProvided = req.params.id;
  if (userIdFromToken === userIdProvided) {
    return await getUserById(req, res);
  } else {
    res.status(StatusCodes.FORBIDDEN).json({
      message: "Not authrozied",
    });
  }
};

const getAllUsers = async (req, res) => {
  const response = await getAll();
  res.status(response.statusCode).json(response);
};

module.exports = {
  getUserById,
  getMyProfile,
  getAllUsers,
};
