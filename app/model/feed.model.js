module.exports = (sequelize, Sequelize) => {
  const Feed = sequelize.define("feed", {
    title: {
      type: Sequelize.STRING,
      max: 50,
      min: 5,
    },
    desc: {
      type: Sequelize.STRING,
      max: 250,
      min: 10,
    },
    status: {
      type: Sequelize.ENUM("approved", "unapproved"),
      defaultValue: "unapproved",
    },
  });

  return Feed;
};
