module.exports = (sequelize, Sequelize) => {
  const Question = sequelize.define("question", {
    title: {
      type: Sequelize.STRING,
      max: 140,
      min: 4,
    },
  });

  return Question;
};
