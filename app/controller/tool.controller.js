const fs = require("fs");

exports.upload = async (req, res) => {
  const file = global.appRoot + "/uploads/" + req.file.filename;
  fs.rename(req.file.path, file, function (err) {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      res.send(file).status(200);
    }
  });
};
