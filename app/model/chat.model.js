module.exports = (sequelize, Sequelize) => {
  const Chat = sequelize.define("chat", {
    title: {
      type: Sequelize.STRING,
    },
  });

  return Chat;
};
