const db = require("../config/db.config.js");
const Task = db.task;
const paginator = require("../helpers/paginationHelpers");

exports.findAll = (req, res) => {
  const { page } = req.query;
  const { limit, offset } = paginator.getPagination(page);
  const condition = {};
  Task.findAndCountAll({ limit, offset, ...condition })
    .then((task) => {
      const response = paginator.getPagingData(task, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.findById = (req, res) => {
  Task.findByPk(req.params.taskId, { include: { all: true, nested: true } })
    .then((Task) => {
      res.send(Task);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.update = async (req, res) => {
  const id = req.params.taskId;
  await Task.update(
    { ...req.body.data },
    {
      where: {
        id: id,
      },
    }
  );
};

exports.delete = (req, res) => {
  const id = req.params.taskId;
  Task.destroy({
    where: { id: id },
  })
    .then(() => {
      res.status(200).send("Board has been deleted!");
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.create = (req, res) => {
  Task.create({
    ...req.body,
  })
    .then(() => {
      res.status(200).send("Board has been deleted!");
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
