const db = require("../config/db.config.js");
const paginator = require("../helpers/paginationHelpers");
const Question = db.question;

// FETCH all boards
exports.findAll = async (req, res) => {
  const { page } = req.query;
  const { limit, offset } = paginator.getPagination(page);

  const condition = {
    // where: { chatId: req.params.chatId },
    // order: [["id", "DESC"]],
    // include: "user",
  };

  await Question.findAndCountAll({ limit, offset, ...condition })
    .then((question) => {
      const response = paginator.getPagingData(question, page, limit);
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

  await Question.findAndCountAll({ limit, offset, ...condition })
    .then((question) => {
      const response = paginator.getPagingData(question, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};

exports.findById = async (req, res) => {
  await Question.findByPk(req.params.questionId, {
    include: { all: true, nested: true },
  })
    .then((Question) => {
      res.send(Question);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};

exports.update = async (req, res) => {
  const id = req.params.questionId;

  try {
    await Question.update(
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
  const id = req.params.questionId;
  await Question.destroy({
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
  console.log(req.params, "REQ");
  console.log(req.body, "REQ BODYU");
  let quizId = req?.params?.quizId;

  await Question.create({
    ...req?.body,
    quizId,
  })
    .then((question) => {
      res.status(200).send(question);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};
