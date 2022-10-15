const db = require("../config/db.config.js");
const Chat = db.chat;

// FETCH all boards
exports.findAll = (req, res) => {
  //where: { userId: req?.user?.id
  Chat.findAll({})
    .then((chats) => {
      res.send(chats);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};

exports.findById = (req, res) => {
  Chat.findByPk(req.params.chatId, { include: { all: true, nested: true } })
    .then((Chat) => {
      res.send(Chat);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};

exports.update = async (req, res) => {
  const id = req.params.chatId;
  await Chat.update(
    { ...req.body.data },
    {
      where: {
        id: id,
      },
    }
  );
};

exports.delete = (req, res) => {
  const id = req.params.boardId;
  Chat.destroy({
    where: { id: id },
  })
    .then(() => {
      res.status(200).send("Board has been deleted!");
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

exports.createMessage = (req, res) => {
  try {
    Chat.findByPk(req.params.chatId)
      .then((Chat) => {
        Chat.createMessage({
          ...req.body,
          userId: req.user.id,
        });
        res.send(Chat);
      })
      .catch((err) => {
        res.status(500).send("Error -> " + err);
      });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.createChat = async (req, res) => {
  try {
    if (!req?.body.person) {
      throw new Error("Choose person to start a chat");
    }
    const isChatExist = await Chat.findAll({
      where: {
        title: [
          `${req.body.person}.${req.body.current}`,
          `${req.body.current}.${req.body.person}`,
        ],
      },
    });
    if (isChatExist.length > 0) {
      res.status(420).send("Chat already exists");
      return;
    }

    //Проверка на существующий чат
    //Ищем в userChats чат, в котором есть оба id. Если такой есть, выкидываем ошибку.
    // if (!req?.body.person) {
    //   throw new Error("Choose person to start a chat");
    // }

    const chat = await Chat.create({
      title: `${req.body.current}.${req.body.person}`,
    });
    chat.setUsers([req.body.current, req.body.person]);
    chat.save();
    res.status(200).send(chat);
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error, "ERROR FROM USER CONROLLER");
  }
};
