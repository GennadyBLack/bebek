const fs = require("fs");
const path = require("path");

exports.upload = async (req, res) => {
  var img = req?.body?.uri;
  var ext = img.split(";")[0].match(/jpeg|png|gif/)[0];
  var buf = Buffer.from(img.split(","[0]), "base64");

  let filePath = `uploads/${Date.now()}.${ext}`;
  fs.writeFileSync(path.join(__dirname, filePath), buf);
};
