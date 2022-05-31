const middleware = require("../middleware/chekToken");
module.exports = function (app) {
  const answer = require("../controller/answer.controller.js");

  app.get("/api/answers", answer.findAll);

  app.get("/api/answers/:feedId", answer.findById);

  app.patch("/api/answers/:feedId", middleware.verify, answer.update);

  app.delete("/api/answers/:feedId", middleware.verify, answer.delete);

  app.get("/api/answers/my", middleware.verify, answer.my);

  app.post("/api/answers", middleware.verify, answer.create);
};
