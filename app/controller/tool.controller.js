const fs = require("fs");
const path = require("path");
const db = require("../config/db.config");

exports.upload = async (req, res) => {
  try {
    // var img = Object.keys(req?.body);
    //   'fileName',  'type',
    // 'base64',    'uri',
    // 'assetId',   'width',
    // 'height',    'fileSize',
    // 'cancelled'

    const uploadFromMobile = req?.body?.type;
    var ext = uploadFromMobile
      ? req.body.uri.split(".")[req.body.uri.split(".").length - 1]
      : req?.body.uri?.split(";")[0].match(/jpg|jpeg|png|gif|svg/)[0];

    let base = req?.body?.base64;

    //обрезаем первую часть, где хранится расширение, оставляем только это расширение

    if (!ext.match(/jpg|jpeg|png|gif|svg/)) {
      res.status(500).json({ error: "Unsupported image format!" });
    }

    //создаем баффер из второй части с инфой о картинке в base64
    var buf = Buffer.from(base, "base64");
    //создаем путь до папки на сервере
    var dir = "/app/uploads";
    if (!fs.existsSync(path.join(global.appRoot, dir))) {
      fs.mkdirSync(path.join(global.appRoot, dir));
    }
    const fileName = `${Date.now()}.${ext}`;
    let filePath = path.join(global.appRoot, `app/uploads/${fileName}`); //
    // console.log(filePath, "filePAth");

    fs.writeFileSync(filePath, buf);
    console.log(fileName, "fileName");
    //по идее нужно feed переименовать в post, наверное, и создать отдельную таблицу feed (ну или оставить посты прикрепленными к юзеру как сейчас)
    res.status(200).send(`${fileName}`);
  } catch (error) {
    console.error(error, "error");
    res.status(500).json({ error: error });
  }
};

exports.files = async (req, res) => {
  try {
    res.sendFile(
      path.join(`${global.appRoot}/app/uploads/`, `${req.params.file}`)
    );
  } catch (error) {
    res.status(500).json({ error: err });
  }
  //по запросу возвращаем файл
};
