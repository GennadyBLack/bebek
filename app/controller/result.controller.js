const db = require("../config/db.config.js");
const paginator = require("../helpers/paginationHelpers");
const Result = db.result;

// FETCH all boards
exports.findAll = async (req, res) => {
  const { page } = req.query;
  const { limit, offset } = paginator.getPagination(page);

  const condition = {
    // where: { chatId: req.params.chatId },
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

  try {
    await Result.update(
      { ...req.body.data },
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

exports.create = async (req, res) => {
  let userId = req?.user?.id;

  await Result.create({
    ...req?.body,
    userId: userId,
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
