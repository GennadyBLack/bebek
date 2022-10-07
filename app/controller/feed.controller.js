const db = require("../config/db.config.js");
const paginator = require("../helpers/paginationHelpers");
const Feed = db.feed;
const gueryHelper = require("../helpers/queryHelper");
const fs = require("fs");
const Comment = db.comment;

// FETCH all boards
exports.findAll = async (req, res) => {
  await gueryHelper(Feed, req, res);
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
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

exports.findById = async (req, res) => {
  await Feed.findByPk(req.params.feedId, {
    include: { all: true, nested: true },
  })
    .then((Feed) => {
      res.send(Feed);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

exports.update = async (req, res) => {
  const id = req.params.feedId;
  try {
    await Feed.update(
      { ...req?.body?.data },
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
  const id = req.params.feedId;
  const feed = await Feed.findByPk(id);
  console.log(feed, "FEED");
  // fs.unlink();
  await Feed.destroy({
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
  let userId = req?.user?.id;

  await Feed.create({
    ...req?.body,
    userId: userId,
  })
    .then((feed) => {
      res.status(200).send(feed);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

exports.createComments = async (req, res) => {
  try {
    await Comment.create({
      title: req.body.title,
      userId: req.user.id,
      feedId: req.params.feedId,
    })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((e) => {
        res.status(500).json({ error: e });
      });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.deleteComment = async (req, res) => {
  const id = req.params.commentId;
  await Comment.destroy({
    where: { id: id },
  })
    .then(() => {
      res.status(200).send("Comment has been deleted!");
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

exports.updateComment = async (req, res) => {
  const id = req.params.commentId;

  try {
    await Comment.update(
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

exports.getCommentsByFeedId = async (req, res) => {
  const { page } = req.query;
  const { limit, offset } = paginator.getPagination(page);

  const condition = {
    where: {
      feedId: req.params.feedId,
    },
    // order: [["id", "DESC"]],
    // include: "user",
  };

  await Comment.findAndCountAll({ limit, offset, ...condition })
    .then((feed) => {
      const response = paginator.getPagingData(feed, page, limit);
      res.send(response);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

exports.getComments = async (req, res) => {
  await gueryHelper(Comment, req, res);
};
