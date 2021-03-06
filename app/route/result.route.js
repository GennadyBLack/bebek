const middleware = require("../middleware/chekToken");
module.exports = function (app) {
  const result = require("../controller/result.controller.js");

  app.get("/api/results", result.findAll);

  app.get("/api/results/:feedId", result.findById);

  app.patch("/api/results/:feedId", middleware.verify, result.update);

  app.delete("/api/results/:feedId", middleware.verify, result.delete);

  app.get("/api/results/my", middleware.verify, result.my);

  app.post("/api/results", middleware.verify, result.create);
};
