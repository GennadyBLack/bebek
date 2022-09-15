const fs = require("fs");
const path = require("path");
const db = require("../config/db.config");

exports.upload = async (req, res) => {
  try {
    //берем uri из тела реквеста
    var img = req?.body?.uri;
    //обрезаем первую часть, где хранится расширение, оставляем только это расширение
    var ext = img.split(";")[0].match(/jpeg|png|gif/)[0];
    //создаем баффер из второй части с инфой о картинке в base64
    var buf = Buffer.from(img.split(",")[1], "base64");
    //создаем путь до папки на сервере
    var dir = "../app/uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    let filePath = `app/uploads/${Date.now()}.${ext}`; //
    console.log(filePath, "filePAth");
    const fileName = path.join(global.appRoot, filePath);
    console.log(fileName, "fileName");
    //записываем файл
    fs.writeFileSync(fileName, buf);
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
