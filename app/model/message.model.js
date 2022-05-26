module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define("message", {
    text: {
      type: Sequelize.STRING,
      max: 250,
      min: 1,
    },
    type: {
      type: Sequelize.ENUM("text", "image", "post"),
      defaultValue: "text",
    },
    status: {
      type: Sequelize.ENUM("pending", "readed", "sended"),
      defaultValue: "pending",
    },
  });

  return Message;
};
