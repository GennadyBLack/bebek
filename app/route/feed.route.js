const middleware = require("../middleware/chekToken");
module.exports = function (app) {
  const feed = require("../controller/feed.controller.js");

  app.get("/api/feeds", feed.findAll);

  app.get("/api/feeds/:feedId", feed.findById);

  app.patch("/api/feeds/:feedId", middleware.verify, feed.update);

  app.delete("/api/feeds/:feedId", middleware.verify, feed.delete);

  app.get("/api/feeds/my", middleware.verify, feed.my);

  app.post("/api/feeds", middleware.verify, feed.create);

  app.post(
    "/api/feeds/comments/:feedId",
    middleware.verify,
    feed.createComments
  );
  app.delete(
    "/api/feeds/comments/:commentId",
    middleware.verify,
    feed.deleteComment
  );

  app.patch(
    "/api/feeds/comments/:commentId",
    middleware.verify,
    feed.updateComment
  );
  app.get("/api/feeds/comments/:feedId", feed.getCommentsByFeedId);

  app.get("/api/feeds/comments", feed.getComments);
};
