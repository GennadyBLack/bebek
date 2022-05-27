const fs = require("fs");
const path = require("path");

exports.upload = async (req, res) => {
  var img = req?.body?.uri;
  var ext = img.split(";")[0].match(/jpeg|png|gif/)[0];
  var buf = Buffer.from(img.split(","[0]), "base64");
  let filePath = `app/uploads/${Date.now()}.${ext}`;
  const fileName = path.join(global.appRoot, filePath);
  fs.writeFileSync(fileName, buf);
  res.send(`${fileName}`);
};

exports.files = async (req, res) => {
  res.sendFile(
    path.join(`${global.appRoot}/app/uploads/`, `${req.params.file}`)
  );
};
