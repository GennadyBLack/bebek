const fs = require("fs");
const path = require("path");
const db = require("../config/db.config");
const Feed = db.feed;

exports.upload = async (req, res) => {
  //берем uri из тела реквеста
  var img = req?.body?.uri;
  //обрезаем первую часть, где хранится расширение, оставляем только это расширение
  var ext = img.split(";")[0].match(/jpeg|png|gif/)[0];
  //создаем баффер из второй части с инфой о картинке в base64
  var buf = Buffer.from(img.split(",")[1], "base64");
  //создаем путь до папки на сервере
  let filePath = `app/uploads/${Date.now()}.${ext}`; //
  const fileName = path.join(global.appRoot, filePath);
  //записываем файл
  fs.writeFileSync(fileName, buf);
  //по идее нужно feed переименовать в post, наверное, и создать отдельную таблицу feed (ну или оставить посты прикрепленными к юзеру как сейчас)
  await Feed.create({
    ...req.body,
    path: `${global.appRoot}/${filePath}`,
  })
    .then(() => {
      //возвращаем путь в ответе
      res.status(200).send(`${fileName}`);
      // res.status(200).send("Feed has been created!");
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};

exports.files = async (req, res) => {
  //по запросу возвращаем файл
  res.sendFile(
    path.join(`${global.appRoot}/app/uploads/`, `${req.params.file}`)
  );
};
