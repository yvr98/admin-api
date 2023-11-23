module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define(
    "company",
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
      },
      logo: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: "Companies",
      freezeTableName: true,
    }
  );
  return Company;
};
