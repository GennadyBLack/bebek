module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      min: 4,
      max: 40,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
      min: 5,
      max: 23,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      min: 6,
      max: 23,
      // set(value) {
      //     // Перед записью в БД пароли следует "хэшировать" с помощью криптографической функции
      //     this.setDataValue('password', hash(value))
      //   },
    },
    description: {
      type: Sequelize.STRING,
      max: 250,
    },
    status: {
      type: Sequelize.BOOLEAN,
      max: 50,
    },
    avatar: Sequelize.STRING,
    tel: {
      type: Sequelize.STRING,
      allowNull: true,
      min: 6,
      max: 11,
    },
    position: {
      type: Sequelize.STRING,
      // get() {
      //   try {
      //     const val = this.getDataValue("username");
      //     return val.split(".") ?? "";
      //   } catch (error) {
      //     return "";
      //   }
      // },
    },
    menu: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: ["Profile", "Feed", "Quiz"],
    },
    visits: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: ["{}"],
    },
  });

  return User;
};
