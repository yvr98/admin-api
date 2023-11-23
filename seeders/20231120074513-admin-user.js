"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = bcrypt.hashSync("password", 8);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "admin@admin.com",
          password: hashedPassword,
          isAdmin: true, // set as admin
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
