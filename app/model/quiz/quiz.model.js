module.exports = (sequelize, Sequelize) => {
  const Quiz = sequelize.define("quiz", {
    title: {
      type: Sequelize.STRING,
      max: 60,
      min: 4,
    },
    desc: {
      type: Sequelize.STRING,
      max: 60,
      min: 4,
    },
    //time to solve
    time: {
      type: Sequelize.STRING,
      max: 60,
      min: 4,
    },
    rating: {
      type: Sequelize.INTEGER,
      max: 60,
      min: 4,
    },
  });

  return Quiz;
};
