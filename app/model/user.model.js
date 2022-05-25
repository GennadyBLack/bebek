module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      // set(value) {
      //     // Перед записью в БД пароли следует "хэшировать" с помощью криптографической функции
      //     this.setDataValue('password', hash(value))
      //   },
    },
    description: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.BOOLEAN,
    },
  });

  return User;
};
