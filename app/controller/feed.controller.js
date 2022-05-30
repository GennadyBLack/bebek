const db = require("../config/db.config.js");
const paginator = require("../helpers/paginationHelpers");
const Feed = db.feed;

// FETCH all boards
exports.findAll = async (req, res) => {
  const { page } = req.query;
  const { limit, offset } = paginator.getPagination(page);

  const condition = {
    // where: { chatId: req.params.chatId },
    // order: [["id", "DESC"]],
    // include: "user",
  };

  await Feed.findAndCountAll({ limit, offset, ...condition })
    .then((feed) => {
      console.log(feed, "FEED");
      const response = paginator.getPagingData(feed, page, limit);
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

  await Feed.findAndCountAll({ limit, offset, ...condition })
    .then((feed) => {
      const response = paginator.getPagingData(feed, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};

exports.findById = async (req, res) => {
  await Feed.findByPk(req.params.feedId, {
    include: { all: true, nested: true },
  })
    .then((Feed) => {
      res.send(Feed);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};

exports.update = async (req, res) => {
  const id = req.params.feedId;
  console.log(id, req.body.data, "THE DAAATAAAA");

  try {
    await Feed.update(
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
  const id = req.params.feedId;
  await Feed.destroy({
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

  await Feed.create({
    ...req?.body,
    userId: userId,
  })
    .then((feed) => {
      res.status(200).send(feed);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};
