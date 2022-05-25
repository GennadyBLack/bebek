module.exports = function (app) {
  const feed = require("../controller/feed.controller.js");

  // Retrieve all Feed
  app.get("/api/feeds", feed.findAll);

  // Retrieve a single Board by Id
  app.get("/api/feeds/:feedId", feed.findById);

  // Update a Chat with Id
  app.patch("/api/feeds/:feedId", feed.update);

  // Delete a Customer with Id
  app.delete("/api/feeds/:feedId", feed.delete);

  //CREATE MESSAGE
  //   app.post(
  //     "/api/chats/:chatId/message",
  //     middleware.verify,
  //     feed.createMessage
  //   );

  //CREATE CHAT
  app.post("/api/feeds", feed.create);
};
