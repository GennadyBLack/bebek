module.exports = (sequelize, Sequelize) => {
  const unreadMessage = sequelize.define("message", {
    status: {
      type: Sequelize.ENUM("read", "sent"),
      defaultValue: "sent",
    },
  });

  return unreadMessage;
};
