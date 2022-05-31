const middleware = require("../middleware/chekToken");
module.exports = function (app) {
  const question = require("../controller/question.controller.js");

  app.get("/api/questions", question.findAll);

  app.get("/api/questions/:feedId", question.findById);

  app.patch("/api/questions/:feedId", middleware.verify, question.update);

  app.delete("/api/questions/:feedId", middleware.verify, question.delete);

  app.get("/api/questions/my", middleware.verify, question.my);

  app.post("/api/questions", middleware.verify, question.create);
};
