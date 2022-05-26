module.exports = (sequelize, Sequelize) => {
  const Chat = sequelize.define("chat", {
    title: {
      type: Sequelize.STRING,
      max: 50,
      min: 3,
    },
  });

  return Chat;
};
