module.exports = {
  HOST: //add host
  USER: //add databse user name
  PASSWORD: //add database password
  DB: //add database name
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
