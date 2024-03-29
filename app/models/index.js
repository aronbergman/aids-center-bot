const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize = sequelize;
db.sequelize = sequelize;
db.sequelize = sequelize;
db.sequelize = sequelize;
db.sequelize = sequelize;

db.buttons = require("./button.model.js")(sequelize, Sequelize);
db.adminButtons = require("./adminButton.model.js")(sequelize, Sequelize);
db.contents = require("./content.model.js")(sequelize, Sequelize);
db.amdinContents = require("./adminContent.model.js")(sequelize, Sequelize);
db.statistics = require("./statistics.model.js")(sequelize, Sequelize);
db.sessions = require("./sessions.model.js")(sequelize, Sequelize);

module.exports = db;
