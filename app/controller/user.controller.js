// Получение полей `foo` и `bar`
// Model.findAll({
//     attributes: ['foo', 'bar'],
// })  SELECT foo, bar FROM ...;
const paginator = require("../helpers/paginationHelpers");
const db = require("../config/db.config.js");
const User = db.user;
const Chat = db.chat;

// FETCH all users const test = await User.findAndCountAll()
exports.findAll = (req, res) => {
  //paginator
  const { page } = req.query;
  const { limit, offset } = paginator.getPagination(page);
  //query
  var condition = { include: "chats" };

  User.findAndCountAll({ limit, offset, ...condition })
    .then((users) => {
      // Send all tasks to Client
      const response = paginator.getPagingData(users, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};

// Find a Task by Id
exports.findById = (req, res) => {
  User.findById(req.params.userId)
    .then((User) => {
      res.send(User);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
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
      res.status(500).send("Error -> " + err);
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
      res.status(500).send("Error -> " + err);
    });
};
exports.test = (req, res) => {
  User.findAll({ include: "boards" })
    .then((users) => {
      // Send all tasks to Client
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
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
        res.status(500).send("Error -> " + err);
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
    console.log(error);
  }
};
