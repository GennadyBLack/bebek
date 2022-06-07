const middleware = require("../middleware/chekToken");
module.exports = function (app) {
  const quiz = require("../controller/quiz.controller.js");

  app.get("/api/quiz", middleware.verify, quiz.findAll);

  app.get("/api/quiz/:quizId", middleware.verify, quiz.findById);

  app.patch("/api/quiz/:quizId", middleware.verify, quiz.update);

  app.delete("/api/quiz/:quizId", middleware.verify, quiz.delete);

  app.get("/api/quiz/my", middleware.verify, quiz.my);

  app.post("/api/quiz", middleware.verify, quiz.create);

  app.post("/api/quiz/:quizId/start", middleware.verify, quiz.createResult);
};
