const middleware = require("../middleware/chekToken");

module.exports = function (app) {
  const messages = require("../controller/message.controller.js");

  // Retrieve all Boards
  app.get("/api/messages/:chatId", messages.findAll);

  // Retrieve a single Board by Id
  app.get("/api/messages/:chatId", messages.findById);

  // Update a Chat with Id
  app.patch("/api/messages/:chatId", middleware.verify, messages.update);

  // Delete a Customer with Id
  app.delete("/api/messages/:chatId", middleware.verify, messages.delete);
};
