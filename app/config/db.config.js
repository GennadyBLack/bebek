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

//Добавляем таблицу в бд, импортируя модель
db.user = require("../model/user.model.js")(sequelize, Sequelize);
db.chat = require("../model/chat.model.js")(sequelize, Sequelize);
db.message = require("../model/message.model.js")(sequelize, Sequelize);
db.unreadMessage = require("../model/unreadMessage.model.js")(
  sequelize,
  Sequelize
);

db.usersFriends = require("../model/usersFriends.model.js")(
  sequelize,
  Sequelize
);

db.friendRequest = require("../model/friendsRequest.model.js")(
  sequelize,
  Sequelize
);
db.feed = require("../model/feed.model.js")(sequelize, Sequelize);
db.comment = require("../model/comment.model.js")(sequelize, Sequelize);
db.quiz = require("../model/quiz/quiz.model.js")(sequelize, Sequelize);
db.answer = require("../model/quiz/answer.model.js")(sequelize, Sequelize);
db.question = require("../model/quiz/question.model.js")(sequelize, Sequelize);
db.result = require("../model/quiz/result.model.js")(sequelize, Sequelize);
db.visit = require("../model/visit.model.js")(sequelize, Sequelize);
db.userPage = require("../model/userPage.model.js")(sequelize, Sequelize);

//?RELATONSHIPS
db.user.belongsToMany(db.chat, { through: "userChats" });
db.chat.belongsToMany(db.user, { through: "userChats" });

db.chat.hasMany(db.message, { onDelete: "CASCADE" });
db.message.belongsTo(db.chat);

db.user.hasMany(db.message, { onDelete: "CASCADE" });
db.message.belongsTo(db.user);

db.chat.hasMany(db.unreadMessage, { onDelete: "CASCADE" });
db.unreadMessage.belongsTo(db.chat);

db.user.hasMany(db.unreadMessage, { onDelete: "CASCADE" });
db.unreadMessage.belongsTo(db.user);

db.user.hasMany(db.feed, { onDelete: "CASCADE" });
db.feed.belongsTo(db.user);

db.user.hasMany(db.visit, { onDelete: "CASCADE" });
db.visit.belongsTo(db.visit);

db.feed.hasMany(db.comment, { onDelete: "CASCADE" });
db.comment.belongsTo(db.user);

//quiz
db.quiz.hasMany(db.question, { onDelete: "CASCADE" });
db.question.belongsTo(db.quiz);

db.question.hasMany(db.answer, { onDelete: "CASCADE" });
db.answer.belongsTo(db.question);

db.quiz.hasMany(db.result, { onDelete: "CASCADE" });
db.result.belongsTo(db.quiz);

db.user.hasMany(db.result, { onDelete: "CASCADE" });
db.result.belongsTo(db.user);

db.user.belongsToMany(db.user, {
  as: "friends",
  foreignKey: "user_id",
  otherKey: "friend_id",
  through: db.usersFriends,
});

db.user.belongsToMany(db.user, {
  as: "userFriends",
  foreignKey: "friend_id",
  otherKey: "user_id",
  through: db.usersFriends,
});

db.user.belongsToMany(db.userPage, {
  as: "pagePosts",
  foreignKey: "user_id",

  through: db.usersFriends,
});

db.userPage.belongsToMany(db.user, {
  as: "pagePosts",
  foreignKey: "page_id",
  through: db.usersFriends,
});

db.user.belongsToMany(db.user, {
  as: "friendsRequest",
  foreignKey: "user_id",
  otherKey: "friend_id",
  through: db.friendRequest,
});

db.user.belongsToMany(db.user, {
  as: "myFriendsRequest",
  foreignKey: "friend_id",
  otherKey: "user_id",
  through: db.friendRequest,
});

module.exports = db;
