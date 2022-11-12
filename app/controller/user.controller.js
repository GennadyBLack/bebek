// Получение полей `foo` и `bar`
// Model.findAll({
//     attributes: ['foo', 'bar'],
// })  SELECT foo, bar FROM ...;
const sendError = require("../helpers/errorHelper");
const db = require("../config/db.config.js");
const User = db.user;
const gueryHelper = require("../helpers/queryHelper");
// FETCH all users const test = await User.findAndCountAll()
exports.findAll = async (req, res) => {
  await gueryHelper(User, req, res);
};

// Find a Task by Id
exports.findById = (req, res) => {
  try {
    const include = req.query.include ? req.query.include.split(".") : [];
    User.findByPk(req.params.userId, { include: include })
      .then((User) => {
        res.send(User);
      })
      .catch((error) => {
        sendError(res, error);
      });
  } catch (error) {
    sendError(res, error);
  }
};

// Update a Task
exports.update = (req, res) => {
  var User = req.body;
  const id = req.params.taskId;
  User.update(
    { username: req.body.username },
    { where: { id: req.params.userId } }
  )
    .then(() => {
      res.status(200).send(User);
    })
    .catch((err) => {
      sendError(res, err);
    });
};

// Delete a Task by Id
exports.delete = (req, res) => {
  const id = req.params.userId;
  User.destroy({
    where: { id: id },
  })
    .then(() => {
      res.status(200).send("Task has been deleted!");
    })
    .catch((err) => {
      sendError(res, err);
    });
};
exports.test = (req, res) => {
  User.findAll({ include: "boards" })
    .then((users) => {
      // Send all tasks to Client
      res.send(users);
    })
    .catch((err) => {
      sendError(res, err);
    });
};

exports.createChat = (req, res) => {
  try {
    User.findOne({ where: { id: req.params.userId } })
      .then((User) => {
        User.createChat({
          ...req.body,
        });
        res.send(User);
      })
      .catch((err) => {
        sendError(res, err);
      });
  } catch (error) {
    console.log(error, "ERROR FROM USER CONROLLER");
  }
};

// Find a Task by Id
exports.findUserChats = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const chats = await user.getChats({ include: ["users"] });

    res.status(200).send(chats);
  } catch (error) {
    sendError(res, error);
  }
};
