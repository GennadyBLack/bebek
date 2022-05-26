module.exports = function (app) {
  const task = require("../controller/task.controller.js");
  const middleware = require("../middleware/chekToken");

  app.get("/api/tasks", task.findAll);

  app.get("/api/tasks/:taskId", task.findById);

  app.patch("/api/tasks/:taskId", middleware.verify, task.update);

  app.delete("/api/tasks/:taskId", middleware.verify, task.delete);

  app.post("/api/tasks", middleware.verify, task.create);
};
