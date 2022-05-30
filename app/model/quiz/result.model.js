module.exports = (sequelize, Sequelize) => {
  const Result = sequelize.define("result", {
    record: {
      type: Sequelize.STRING,
    },
    right: {
      type: Sequelize.STRING,
    },
    wrong: {
      type: Sequelize.STRING,
    },
  });

  return Result;
};
