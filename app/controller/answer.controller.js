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
    .catch((error) => {
      res.status(500).json({ error: error });
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
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

exports.findById = async (req, res) => {
  await Answer.findByPk(req.params.answerId, {
    include: { all: true, nested: true },
  })
    .then((Answer) => {
      res.send(Answer);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
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
  } catch (error) {
    res.status(500).json({ error: error });
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
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

exports.create = async (req, res) => {
  const questionId = req.body.id;
  await Answer.create({
    ...req?.body.data,
    questionId,
  })
    .then((answer) => {
      res.status(200).send(answer);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};
