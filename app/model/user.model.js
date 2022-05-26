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
  });

  return User;
};
