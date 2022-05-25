const db = require("../config/db.config.js");
const Feed = db.feed;

// FETCH all boards
exports.findAll = (req, res) => {
  Feed.findAll()
    .then((feed) => {
      res.send(feed);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};

exports.findById = (req, res) => {
  Feed.findByPk(req.params.feedId, { include: { all: true, nested: true } })
    .then((Feed) => {
      res.send(Feed);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};

exports.update = async (req, res) => {
  const id = req.params.feedId;
  await Feed.update(
    { ...req.body.data },
    {
      where: {
        id: id,
      },
    }
  );
};

exports.delete = (req, res) => {
  const id = req.params.feedId;
  Feed.destroy({
    where: { id: id },
  })
    .then(() => {
      res.status(200).send("Board has been deleted!");
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};

exports.create = (req, res) => {
  Feed.create({
    ...req.body,
  })
    .then(() => {
      res.status(200).send("Board has been deleted!");
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};

// exports.createMessage = (req, res) => {
//   try {
//     Chat.findByPk(req.params.chatId)
//       .then((Chat) => {
//         Chat.createMessage({
//           ...req.body,
//           userId: req.user.id,
//         });
//         res.send(Chat);
//       })
//       .catch((err) => {
//         res.status(500).send("Error -> " + err);
//       });
//   } catch (error) {
//     console.log(error, "ERROR FROM USER CONROLLER");
//   }
// };

// exports.createFeed = async (req, res) => {
//   try {
//     if (!req?.body.person) {
//       throw new Error("Choose person to start a chat");
//     }
//     const isChatExist = await Feed.findAll({
//       where: {
//         title: [
//           `${req.body.person}.${req.body.current}`,
//           `${req.body.current}.${req.body.person}`,
//         ],
//       },
//     });
//     if (isChatExist.length > 0) {
//       res.status(420).send("Chat already exists");
//       return;
//     }

//Проверка на существующий чат
//Ищем в userChats чат, в котором есть оба id. Если такой есть, выкидываем ошибку.
// if (!req?.body.person) {
//   throw new Error("Choose person to start a chat");
// }

//     const chat = await Feed.create({
//       title: `${req.body.current}.${req.body.person}`,
//     });
//     chat.setUsers([req.body.current, req.body.person]);
//     chat.save();
//     res.status(200).send(chat);
//   } catch (error) {
//     res.status(400).send("error man");
//     console.log(error, "ERROR FROM USER CONROLLER");
//   }
// };
