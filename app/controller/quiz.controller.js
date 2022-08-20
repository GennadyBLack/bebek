const db = require("../config/db.config.js");
const paginator = require("../helpers/paginationHelpers");
const gueryHelper = require("../helpers/queryHelper");
const Quiz = db.quiz;
const User = db.user;
const Result = db.result;
const Question = db.question;

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
  await gueryHelper(Quiz, req, res);
  // await Quiz.findAndCountAll({ limit, offset, ...condition })
  //   .then((quiz) => {
  //     const response = paginator.getPagingData(quiz, page, limit);
  //     res.send(response);
  //   })
  //   .catch((err) => {
  //     res.status(500).json({ error: err });
  //   });
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
      res.status(500).json({ error: err });
    });
};

exports.findById = async (req, res) => {
  try {
    await Quiz.findByPk(req.params.quizId, {
      include: [{ all: true, nested: true, order: ["id", "ASC"] }],
      order: [[{ model: Question }, "id", "asc"]],
    })
      .then((Quiz) => {
        res.status(200).send(Quiz);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({ error: err });
      });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: err });
  }
};

exports.update = async (req, res) => {
  const id = req.params.quizId;
  console.log(req.params, req.body, "REQ");
  try {
    await Quiz.update(
      { ...req.body },
      {
        where: {
          id: id,
        },
      }
    ).then(() => res.status(200).send("Успешно"));
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.quizId;
  console.log(req.params);
  await Quiz.destroy({
    where: { id },
  })
    .then(() => {
      res.status(200).send("Quiz has been deleted!");
    })
    .catch((err) => {
      res.status(500).json({ error: err });
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
      res.status(500).json({ error: err });
    });
};

exports.createResult = async (req, res) => {
  try {
    // console.log(req.body, "req-body");
    const id = req.params.quizId;
    const restart = req?.body?.restart

    await User.findByPk(req.user.id).then(async (response) => {
      // console.log(response, "response");
      const quizResults = await Result.findAll({
        where: {
          quizId: id,
          userId: req.user.id,
        },
      });
      // console.log(quizResults, "quizResults");

      //Todo аргумент для создания резалта при рестарте
      if (!quizResults.length || restart) {
        console.log(req?.body?.restart, 'restart')
        response
          .createResult({ quizId: id })
          .then((r) => res.status(200).send(r));
        return;
      }
      res.status(200).send(response);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
};
