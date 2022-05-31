const middleware = require("../middleware/chekToken");
module.exports = function (app) {
  const quiz = require("../controller/quiz.controller.js");

  app.get("/api/quiz", quiz.findAll);

  app.get("/api/quiz/:quizId", quiz.findById);

  app.patch("/api/quiz/:quizId", middleware.verify, quiz.update);

  app.delete("/api/quiz/:quizId", middleware.verify, quiz.delete);

  app.get("/api/quiz/my", middleware.verify, quiz.my);

  app.post("/api/quiz", middleware.verify, quiz.create);
};
