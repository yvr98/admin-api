module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define(
    "employee",
    {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
    },

    {
      tableName: "Employees",
      freezeTableName: true,
    }
  );
  return Employee;
};
