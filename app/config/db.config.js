//Setup Sequelize-PostgreSQL
const env = require("./env.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  // operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  },
});

//Создаем бд
const db = {};

//Подрубаем сиквалайз для облегченного обращения к бд
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
//Добавляем таблицу в бд, импортируя модель
db.user = require("../model/user.model.js")(sequelize, Sequelize);
db.chat = require("../model/chat.model.js")(sequelize, Sequelize);
db.message = require("../model/message.model.js")(sequelize, Sequelize);
db.unreadMessage = require("../model/unreadMessage.model.js")(
  sequelize,
  Sequelize
);
// db.setting = require("../model/setting.model.js")(sequelize, Sequelize);

//?RELATONSHIPS
db.user.belongsToMany(db.chat, { through: "userChats" });
db.chat.belongsToMany(db.user, { through: "userChats" });

db.chat.hasMany(db.message, { onDelete: "CASCADE" });
db.message.belongsTo(db.chat);

db.user.hasMany(db.message);
db.message.belongsTo(db.user);

db.chat.hasMany(db.unreadMessage, { onDelete: "CASCADE" });
db.unreadMessage.belongsTo(db.chat);

db.user.hasMany(db.unreadMessage);
db.unreadMessage.belongsTo(db.user);

module.exports = db;
