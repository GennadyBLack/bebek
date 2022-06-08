const searchBuilder = require("sequelize-search-builder");
const db = require("../config/db.config");
const queryHelper = async (model, req, res) => {
  // Set req.query param to Search Builder constructor
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
    limitQuery = search.getLimitQuery(),
    offsetQuery = search.getOffsetQuery();

  return res.send({
    data: await model.findAll({
      include: [{ all: true, nested: true }],
      where: whereQuery,
      order: orderQuery,
      limit: limitQuery,
      offset: offsetQuery,
      logging: console.log,
    }),
  });
};
module.exports = queryHelper;
