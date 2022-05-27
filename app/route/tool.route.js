// const multer = require("multer");

// const _upload = multer({ dest: "/tmp/" });
const tool = require("../controller/tool.controller.js");

module.exports = function (app) {
  app.post("/api/upload", tool.upload);
};
