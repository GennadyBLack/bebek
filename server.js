var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const tokenSecret = "my-token-secret";

const cors = require("cors");
// const socket = require("socket.io");
const config = {
  cors: {
    origin: "*",
    credentials: false,
  },
};
const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200,
};

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(cors(corsOptions));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/config/db.config.js");
const User = db.user;
// force: true will drop the table if it already exists
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and Resync with { force: true }");
  // initial();
});

// function initial() {
//   const user = User.create({
//     username: "admin",
//     email: "admin@mail.ru",
//     password: "admin",
//     role: "admin",
//   });
// }

//=============== Routes====================
require("./app/route/message.route.js")(app);
require("./app/route/auth.route.js")(app);
require("./app/route/user.route.js")(app);
require("./app/route/chat.route.js")(app);

app.use(express.static("public"));
// Create a Server
const http = require("http").Server(app);
//Create socket
const io = require("socket.io")(http, config);
var server = http.listen(8081, function () {
  var host = server.address().host;
  var port = server.address().port;

  console.log(`App listening at ${port} ${host}`);
});
// Static files

// Socket setup

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

    socket.join(`notify:${socket.userID}`); // подключаем пользователя к своей комнате.
    console.error(`USER CONNECTED ${socket.userID}`);

    // socket.broadcast.emit(`status:${socket?.userID}`, true); //status connect true
    // socket.emit(`status:${socket.userID}`, true); //status connect true

    socket.on("openChat", (data) => {
      socket.join(`personal:${data.chatId}`); // подключаем пользователя к комнате чата.
    });
    socket.on("typing", (data) => {
      io.to(`personal:${data.chatId}`).emit("typing", data);
      // socket.broadcast.emit("typing", data);
    });
    socket.on("stopTyping", (data) => {
      io.to(`personal:${data.chatId}`).emit("stopTyping", data);
    });

    // socket.on("joined", async (id) => {
    //   socket.broadcast.emit("joined", id);
    // });
    // socket.on("leave", (id) => {
    //   socket.broadcast.emit("leave", id);
    // });
    socket.on("sendMessage", (data) => {
      // направляем оповещение с сообщением в канал notify
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
