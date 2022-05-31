const db = require("../config/db.config.js");
const paginator = require("../helpers/paginationHelpers");
const Answer = db.answer;

// FETCH all boards
exports.findAll = async (req, res) => {
  const { page } = req.query;
  const { limit, offset } = paginator.getPagination(page);

  const condition = {
    // where: { chatId: req.params.chatId },
    // order: [["id", "DESC"]],
    // include: "user",
  };

  await Answer.findAndCountAll({ limit, offset, ...condition })
    .then((answer) => {
      const response = paginator.getPagingData(answer, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};

exports.my = async (req, res) => {
  const { page } = req.query;
  const { limit, offset } = paginator.getPagination(page);

  const condition = {
    where: {
      userId: req.user.id,
    },
    // order: [["id", "DESC"]],
    // include: "user",
  };

  await Answer.findAndCountAll({ limit, offset, ...condition })
    .then((answer) => {
      const response = paginator.getPagingData(answer, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};

exports.findById = async (req, res) => {
  await Answer.findByPk(req.params.answerId, {
    include: { all: true, nested: true },
  })
    .then((Answer) => {
      res.send(Answer);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};

exports.update = async (req, res) => {
  const id = req.params.answerId;

  try {
    await Answer.update(
      { ...req.body.data },
      {
        where: {
          id: id,
        },
      }
    ).then(() => res.status(200).send("Успешно"));
  } catch (e) {
    res.status(500).send("Error -> " + err);
  }
};

exports.delete = async (req, res) => {
  const id = req.params.answerId;
  await Answer.destroy({
    where: { id: id },
  })
    .then(() => {
      res.status(200).send("Board has been deleted!");
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};

exports.create = async (req, res) => {
  let userId = req?.user?.id;

  await Answer.create({
    ...req?.body,
    userId: userId,
  })
    .then((answer) => {
      res.status(200).send(answer);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};
