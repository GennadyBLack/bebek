module.exports = (sequelize, Sequelize) => {
  const Feed = sequelize.define("feed", {
    title: {
      type: Sequelize.STRING,
    },
    desc: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM("approved", "unapproved"),
      defaultValue: "unapproved",
    },
  });

  return Feed;
};
