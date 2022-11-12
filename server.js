var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const tokenSecret = "my-token-secret";
const bcrypt = require("bcrypt");
const rounds = 10;

global.appRoot = __dirname;

const cors = require("cors");
const config = {
  cors: {
    origin: "*",
    credentials: false,
  },
};

const corsOptions = {
  origin: "http://localhost:19006",
  optionsSuccessStatus: 200,
};

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/config/db.config.js");
const User = db.user;

const force = false;

// const force = true;

db.sequelize.sync({ force }).then(() => {
  console.log(
    `
    
    
    
    <===========================================================RESET SERVER BITCH=========================================================>
    
    
    
    `
  );
  if (force) {
    initial();
  }
});

function initial() {
  try {
    // const password = "tester";
    // const username = "tester";
    // const email = "tester@mail.ru";

    // bcrypt.hash(password, rounds, (error, hash) => {
    //   if (error) res.status(500).json({ error: error });
    //   else {
    //     const newUser = User.build({
    //       email: email,
    //       password: hash,
    //       username: username,
    //       status: true,
    //     });
    //     newUser
    //       .save()
    //       .then((user) => {
    //         console.log("user has avtomatic created");
    //       })
    //       .catch((error) => {
    //         console.log(error, "FROM INITIAL FUNCTION IN SERVER");
    //       });
    //   }
    // });

    const users = [
      {
        password: "tester",
        username: "tester",
        email: "tester@mail.ru",
        status: true,
      },
      {
        password: "salami",
        username: "salami",
        email: "salami@mail.ru",
        status: true,
      },
    ];

    const bcryptUser = async (user) => {
      await bcrypt.hash(user.password, rounds, (error, hash) => {
        if (error) res.status(500).json({ error: error });
        else {
          const newUser = User.build({
            password: hash,
            username: user.username,
            email: user.email,
            status: true,
          });
          newUser
            .save()
            .then((user) => {
              console.log("user has avtomatic created");
            })
            .catch((error) => {
              console.log(error, "FROM INITIAL FUNCTION IN SERVER");
            });
        }
      });
    };
    users.forEach(async (item) => {
      await bcryptUser(item);
    });
  } catch (error) {
    comsole.log(error, "FROM INITIAL FUNCTION IN SERVER");
  }
}

//=============== Routes=========================
require("./app/route/message.route.js")(app);
require("./app/route/auth.route.js")(app);
require("./app/route/user.route.js")(app);
require("./app/route/chat.route.js")(app);
require("./app/route/feed.route.js")(app);
require("./app/route/tool.route.js")(app);
require("./app/route/quiz.route.js")(app);
require("./app/route/answer.route.js")(app);
require("./app/route/question.route.js")(app);
require("./app/route/result.route.js")(app);

app.use(express.static("public"));
// Create a Server
const http = require("http").Server(app);
//Create socket
const io = require("socket.io")(http, config);
var server = http.listen(8081, function () {
  var host = server.address().host;
  var port = server.address().port;
});
// Static files

try {
  io.use(function (socket, next) {
    if (socket.handshake.auth && socket.handshake.auth.token) {
      jwt.verify(
        socket.handshake.auth.token,
        tokenSecret,
        function (err, response) {
          if (err) return next(new Error("Invalid JWT-Token"));
          socket.userID = response.data.id;
          socket.username = response.data.username;
          socket.decoded = response;
          next();
        },
        null
      );
    } else {
      next(new Error("Authentication error"));
    }
  }).on("connection", async function (socket) {
    try {
      //смена статуса
      await User.update(
        { status: true },
        {
          where: {
            id: socket.userID,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }

    socket.on("ping", () => {
      socket.emit("pong");
    });

    socket.join(`notify:${socket.userID}`); // подключаем пользователя к своей комнате.
    console.error(`USER CONNECTED ${socket.userID}`);

    socket.on("openChat", (data) => {
      socket.join(`personal:${data.chatId}`);
    });
    socket.on("typing", (data) => {
      io.to(`personal:${data.chatId}`).emit("typing", data);
    });
    socket.on("stopTyping", (data) => {
      io.to(`personal:${data.chatId}`).emit("stopTyping", data);
    });

    socket.on("sendMessage", (data) => {
      io.to(`notify:${data.userId}`).emit(`notify:${data.userId}`, data);
      io.to(`personal:${data.chatId}`).emit("sendMessage", data);
    });

    socket.on("disconnect", async function () {
      try {
        await User.update(
          { status: false },
          {
            where: {
              id: socket.userID,
            },
          }
        );
        socket.emit(`status:${socket.userID}`, false);
        console.log(`User ID:${socket.userID} disconnected`);
      } catch (error) {
        console.log(error);
      }
    });
  });
} catch (e) {
  console.log(e);
} finally {
}
