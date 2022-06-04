module.exports = (sequelize, Sequelize) => {
  const Answer = sequelize.define("answer", {
    title: {
      type: Sequelize.STRING,
      max: 140,
      min: 4,
    },
    // right: {
    //   type: Sequelize.BOOLEAN,
    //   defaultValue: false,
    // },
  });

  return Answer;
};
