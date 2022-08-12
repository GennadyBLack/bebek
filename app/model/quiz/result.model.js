module.exports = (sequelize, Sequelize) => {
  const Result = sequelize.define("result", {
    record: {
      type: Sequelize.STRING,
    },
    right: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
    },
    wrong: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
    },
    completed: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Result;
};
