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
    requestUserId: {
      type: Sequelize.INTEGER,
    },
    meId: {
      type: Sequelize.INTEGER,
    },
  });

  return FriendRequest;
};
