'use strict';
const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const DEFAULT_PASSWORD = '12345678'
    await queryInterface.bulkInsert('Users', [{
      name: 'user1',
      email: 'user1@default.com',
      password: bcrypt.hashSync(DEFAULT_PASSWORD, 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'user2',
      email: 'user2@default.com',
      password: bcrypt.hashSync(DEFAULT_PASSWORD, 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
};
