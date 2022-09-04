const { Router } = require("express");
const controller = require("../controllers");

/**
 *
 * @param {import('express').Application} app
 */
module.exports = function (app) {
  var router = Router();

  router.post("/create", controller.create);

  router.put("/edit", controller.edit);

  router.delete("/delete", controller.delete);

  router.get("/getAll", controller.getAllBooks);

  router.delete("/deleteAll", controller.deleteAll);

  app.use("/api", router);
};
