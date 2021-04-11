const { Router } = require("express");

const placeRouter = Router();

const data = [
  {
    id: 3,
    name: "London",
    description: "The capital of UK",
  }
];

placeRouter.get("/places", (req, res) => {
  res.json(data);
});

module.exports = placeRouter;
