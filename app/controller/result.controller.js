const db = require("../config/db.config.js");
const paginator = require("../helpers/paginationHelpers");
const gueryHelper = require("../helpers/queryHelper");
const Result = db.result;

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
  await gueryHelper(Result, req, res);
  // await Result.findAndCountAll({ limit, offset, ...condition })
  //   .then((result) => {
  //     const response = paginator.getPagingData(result, page, limit);
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

  await Result.findAndCountAll({ limit, offset, ...condition })
    .then((result) => {
      const response = paginator.getPagingData(result, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.findById = async (req, res) => {
  await Result.findByPk(req.params.resultId, {
    include: { all: true, nested: true },
  })
    .then((Result) => {
      res.send(Result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.update = async (req, res) => {
  const id = req.params.resultId;
  console.log(
    req.params,
    req.body,
    "req.body.bodyreq.body.bodyreq.body.bodyreq.body.bodyreq.body.bodyreq.body.bodyreq.body.bodyreq.body.body"
  );
  try {
    await Result.update(
      { ...req.body },
      {
        where: {
          id,
        },
      }
    )
      .then(
        async () =>
          await Result.findByPk(id).then((r) => res.status(200).send(r))
      )
      .catch((e) => res.status(400).json({ error: e }));
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.resultId;
  await Result.destroy({
    where: { id: id },
  })
    .then(() => {
      res.status(200).send("Board has been deleted!");
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.deleteAllUserResults = async (req, res) => {
  // const id = req.params.resultId;
  let userId = req?.user?.id;
  await Result.destroy({
    where: { userId },
  })
    .then(() => {
      res.status(200).send("Results have been deleted!");
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.create = async (req, res) => {
  let userId = req?.user?.id;
  let quizId = req?.body.quizId;
  console.log(req, "req");
  await Result.create({
    ...req?.body,
    userId: userId,
    quizId: quizId,
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
