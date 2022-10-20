module.exports = (sequelize, Sequelize) => {
  const Visit = sequelize.define("visits", {
    device: {
      type: Sequelize.STRING,
      allowNull: false,
      min: 0,
      max: 286,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
      min: 5,
      max: 286,
    },
    region: {
      type: Sequelize.STRING,
      allowNull: false,
      min: 5,
      max: 286,
    },
    country_name: {
      type: Sequelize.STRING,
      allowNull: false,
      min: 5,
      max: 286,
    },
    ip: {
      type: Sequelize.STRING,
      allowNull: false,
      min: 5,
      max: 50,
    },
    time: {
      type: Sequelize.STRING,
      allowNull: false,
      min: 6,
      max: 50,
    },
  });

  return Visit;
};
