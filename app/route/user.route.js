
module.exports = function (app) {
  const user = require("../controller/user.controller.js");
  const middleware = require('../middleware/chekToken')
  // Create a new Task
  // app.post('/api/user', user.create);

  // Retrieve all Tasks
  app.get("/api/users", user.findAll);

  app.get("/api/users/test", user.test);

  // Retrieve a single Customer by Id
  app.get("/api/user/:userId", user.findById);

  // Update a Customer with Id
  app.put("/api/user/:userId", user.update);

  // Delete a Customer with Id
  app.delete("/api/user/:userId", user.delete);

  app.post("/api/users/:userId/chat", user.createChat);

  app.get("/api/me/chats",middleware.verify, user.findUserChats);
};
