const db = require("../config/db.config.js");
const paginator = require("../helpers/paginationHelpers");
const Quiz = db.quiz;

// FETCH all boards
exports.findAll = async (req, res) => {
  const { page } = req.query;
  const { limit, offset } = paginator.getPagination(page);

  const condition = {
    include: { all: true, nested: true },
    // where: { chatId: req.params.chatId },
    // order: [["id", "DESC"]],
    // include: "user",
  };

  await Quiz.findAndCountAll({ limit, offset, ...condition })
    .then((quiz) => {
      const response = paginator.getPagingData(quiz, page, limit);
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

  await Quiz.findAndCountAll({ limit, offset, ...condition })
    .then((quiz) => {
      const response = paginator.getPagingData(quiz, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};

exports.findById = async (req, res) => {
  await Quiz.findByPk(req.params.quizId, {
    include: { all: true, nested: true },
  })
    .then((Quiz) => {
      res.status(200).send(Quiz);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};

exports.update = async (req, res) => {
  const id = req.params.quizId;

  try {
    await Quiz.update(
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
  const id = req.params.quizId;
  await Quiz.destroy({
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

  await Quiz.create({
    ...req?.body,
    userId: userId,
  })
    .then((quiz) => {
      res.status(200).send(quiz);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};
