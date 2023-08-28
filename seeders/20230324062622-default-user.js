'use strict';
const bcrypt = require('bcryptjs')
const Users = require('./data/default-users.json').users
require('dotenv').config()

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
    const DEFAULT_PASSWORD = process.env.DEFAULT_USER_PASSWORD
    Users.forEach(user => {
      user.password = bcrypt.hashSync(DEFAULT_PASSWORD, 10)
      user.createdAt = new Date()
      user.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Users', Users, {})
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
