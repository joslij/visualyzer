const { Router } = require("express");

const animalRouter = Router();

const data = [
  {
    id: 1,
    name: "human",
    description: "existing for some reason",
  },
  {
    id: 2,
    name: "birds",
    description: "those that sings",
  },
];

animalRouter.get("/animals", (req, res) => {
  res.json(data);
});

module.exports = animalRouter;
