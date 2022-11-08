const searchBuilder = require("sequelize-search-builder");
const db = require("../config/db.config");
const queryHelper = async (model, req, res) => {
  const include = req?.params?.include
    ? req?.params?.include
    : [{ all: true, nested: true }];
  // Set req.query param to Search Builder constructor
  // console.log(Object.keys(db.quiz), "MODEL");
  const query = {};
  for (const key in req.query) {
    if (typeof req.query[key] === "string") {
      query[key] = JSON.parse(req.query[key]);
    } else {
      query[key] = req.query[key];
    }
  }
  const search = new searchBuilder(db.Sequelize, query),
    whereQuery = search.getWhereQuery(),
    orderQuery = search.getOrderQuery(),
    // orderQuery = [
    //   ["id", "asc"],
    //   ["questions", "id", "asc"],
    // ],
    limitQuery = search.getLimitQuery(),
    offsetQuery = search.getOffsetQuery();
  // return res.send(orderQuery);
  //TODO:доделать чтобы можно было указывать екстенды иначе слишком много данных тянется
  const data = await model.findAndCountAll({
    include: include,
    where: whereQuery,
    order: orderQuery,
    limit: limitQuery,
    offset: offsetQuery,
    logging: console.log,
  });
  return res.send({
    data: data.rows,
    meta: [data.count],
  });
};
module.exports = queryHelper;
