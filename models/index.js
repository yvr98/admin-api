const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Company = require("./company.model.js")(sequelize, Sequelize);
db.Employee = require("./employee.model.js")(sequelize, Sequelize);
db.User = require("./user.model.js")(sequelize, Sequelize);

// Setup associations
db.Company.hasMany(db.Employee, { as: "employees" });
db.Employee.belongsTo(db.Company, {
  foreignKey: "companyId",
  as: "company",
});

module.exports = db;
