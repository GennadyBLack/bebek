module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    title: {
      type: Sequelize.STRING,
      max: 50,
    },
    status: {
      type: Sequelize.ENUM("important", "completed"),
      defaultValue: "unapproved",
    },
  });

  return Task;
};
