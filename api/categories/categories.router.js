const categoryRouter = require("express").Router();
const {
  getCategories,
  createCategory,
  getOneCategory,
} = require("./categories.controllers");

categoryRouter.get("/categories", getCategories);
categoryRouter.post("/categories", createCategory);
categoryRouter.get("/categories/:id", getOneCategory);

module.exports = categoryRouter;
