const middleware = require("../middleware/chekToken");

module.exports = function (app) {
  const chats = require("../controller/chat.controller.js");

  // Retrieve all Boards
  app.get("/api/chats", middleware.verify, chats.findAll);

  // Retrieve a single Board by Id
  app.get("/api/chats/:chatId", middleware.verify, chats.findById);

  // Update a Chat with Id
  app.patch("/api/chats/:chatId", middleware.verify, chats.update);

  // Delete a Customer with Id
  app.delete("/api/chats/:chatId", chats.delete);

  //CREATE MESSAGE
  app.post(
    "/api/chats/:chatId/message",
    middleware.verify,
    chats.createMessage
  );

  //CREATE CHAT
  app.post("/api/chats", chats.createChat);
};
