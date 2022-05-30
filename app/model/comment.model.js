module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    title: {
      type: Sequelize.STRING,
      max: 50,
      min: 5,
    },
    status: {
      type: Sequelize.ENUM("approved", "unapproved"),
      defaultValue: "unapproved",
    },
    poster: Sequelize.STRING,
  });

  return Comment;
};
