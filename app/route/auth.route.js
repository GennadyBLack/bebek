module.exports = function (app) {
  const auth = require("../controller/auth.controller.js");
  const middleware = require("../middleware/chekToken");
  // Auth
  app.post("/api/auth/login", auth.login);
  app.post("/api/auth/register", auth.register);
  //meeeeeeeeeee
  app.post("/api/auth/me", middleware.verify, auth.me);
  app.patch("/api/auth/me", middleware.verify, auth.updateMe);
  //Friendssssss
  app.get("/api/auth/me/friends", middleware.verify, auth.getFriends);

  app.get(
    "/api/auth/me/friends_requests",
    middleware.verify,
    auth.getFriendsRequest
  );

  app.post(
    "/api/auth/me/friends_requests",
    middleware.verify,
    auth.createFriendsRequest
  );

  app.post("/api/auth/me/friends", middleware.verify, auth.createFriends);

  app.patch(
    "/api/auth/me/friends/:id",
    middleware.verify,
    auth.updateFriendRequest
  );
};
