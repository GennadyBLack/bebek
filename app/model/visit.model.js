module.exports = (sequelize, Sequelize) => {
  const Visit = sequelize.define("visits", {
    device: {
      type: Sequelize.STRING,
      allowNull: false,
      min: 0,
      max: 286,
      defaultValue:''
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
      min: 5,
      max: 286,
      defaultValue:''
    },
    region: {
      type: Sequelize.STRING,
      allowNull: false,
      min: 5,
      max: 286,
      defaultValue:''
    },
    country_name: {
      type: Sequelize.STRING,
      allowNull: false,
      min: 5,
      max: 286,
      defaultValue:''
    },
    ip: {
      type: Sequelize.STRING,
      allowNull: false,
      min: 5,
      max: 50,
      defaultValue:''
    },
    time: {
      type: Sequelize.STRING,
      allowNull: false,
      min: 6,
      max: 50,
      defaultValue:''
    },
  });

  return Visit;
};
