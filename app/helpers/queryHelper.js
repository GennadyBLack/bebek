const searchBuilder = require("sequelize-search-builder");
const db = require("../config/db.config");
const sendError = require("../helpers/errorHelper");

const queryHelper = async (model, req, res) => {
  try {
    const include = req?.query?.include
      ? req?.query?.include?.split(".")
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
    const search = new searchBuilder(db.Sequelize, query).setConfig({
        "default-limit": 20,
      }),
      whereQuery = search.getWhereQuery(),
      orderQuery = search.getOrderQuery(),
      // orderQuery = [
      //   ["id", "asc"],
      //   ["questions", "id", "asc"],
      // ],
      limitQuery = search.getLimitQuery(),
      offsetQuery = search.getOffsetQuery();
    //TODO:доделать чтобы можно было указывать екстенды иначе слишком много данных тянется
    const data = await model.findAndCountAll({
      distinct: true,
      include: include,
      where: whereQuery,
      order: orderQuery,
      limit: limitQuery,
      offset: offsetQuery,
      logging: console.log,
    });

    return res.send({
      data: data.rows,
      meta: {
        count: data.count,
        limit: limitQuery,
        offset: offsetQuery,
      },
    });
  } catch (error) {
    console.log("================ERRRRROOOOOR================");
    console.log(error);
    console.log("================ERRRRROOOOOR================");
    sendError(res, error);
  }
};

module.exports = queryHelper;
