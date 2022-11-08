module.exports = (sequelize, Sequelize) => {
  const FriendRequest = sequelize.define("friendRequest", {
    text: {
      type: Sequelize.STRING,
      max: 250,
      min: 1,
    },
    status: {
      type: Sequelize.ENUM("pending", "confirm", "rejected"),
      defaultValue: "pending",
    },
    user_id: Sequelize.BIGINT,
    friend_id: Sequelize.BIGINT,
  });

  return FriendRequest;
};
