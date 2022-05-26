const multer = require("multer");

const _upload = multer({ dest: "/tmp/" });

module.exports = function (app) {
  const tool = require("../controller/tool.controller.js");
  app.post("/api/upload", _upload.single("file"), tool.upload);
};
