const middleware = require("../middleware/chekToken");
module.exports = function (app) {
  const result = require("../controller/result.controller.js");

  app.get("/api/results", result.findAll);

  app.get("/api/results/:resultId", result.findById);

  app.patch("/api/results/:resultId", middleware.verify, result.update);

  app.delete("/api/results/:resultId", middleware.verify, result.delete);

  app.delete("/api/results/", middleware.verify, result.deleteAllUserResults);

  app.get("/api/results/my", middleware.verify, result.my);

  app.post("/api/results", middleware.verify, result.create);
};
