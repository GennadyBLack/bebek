const bcrypt = require("bcrypt");
const rounds = 10;
const jwt = require("jsonwebtoken");
const tokenSecret = "my-token-secret";
const db = require("../config/db.config.js");
const sequelize = require("sequelize");
const User = db.user;
const Visit = db.visit;

// login
exports.login = async (req, res) => {
  try {
    const { email, password, visits } = req.body;
    await User.findOne({ where: { email: email }, include: Visit })
      .then((user) => {
        if (!user)
          res.status(404).json({ errors: "no user with that email found" });
        else {
          bcrypt.compare(password, user.password, async (errors, match) => {
            if (errors) res.status(500).json({ error: errors });
            else if (match) {
              console.log(user.visits, "visits");
              if (user.visits.length >= 5) {
                const firstVisitId = user.visits[0].id;
                await Visit.destroy({
                  where: { id: firstVisitId },
                });
              }
              await Visit.create({
                ...visits,
                userId: user.id,
              });
              res.status(200).json({ token: generateToken(user), user: user });
            } else res.status(403).json({ error: "passwords do not match" });
          });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// register
exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    bcrypt.hash(password, rounds, (error, hash) => {
      if (error) res.status(500).json({ error: error });
      else {
        const newUser = User.build({
          email: email,
          password: hash,
          username: username,
          status: true,
        });
        newUser
          .save()
          .then((user) => {
            res.status(200).json({ token: generateToken(user), user: user });
          })
          .catch((error) => {
            res.status(500).json({ error: error });
          });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

function generateToken(user) {
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: "24h" });
}
//me
exports.me = async (req, res) => {
  try {
    // console.log(req.user.id, "req.user.id");
    // console.log(req.user, "req.user.id");
    await User.findOne({
      where: { id: req.user.id },
      include: Visit,
    })
      .then((user) => {
        if (user) {
          res.status(200).json({ data: { user: user } });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.updateMe = async (req, res) => {
  const id = req?.user?.id;
  try {
    await User.update(
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
