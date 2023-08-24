'use strict';
let categoryData = require('./data/record-categories.json').categories

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // RecordMainCategories
    const mainCategoryNames = Object.keys(categoryData)
    const mainCategories = []
    mainCategoryNames.forEach(name => {
      mainCategories.push({
        name: name,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    })
    await queryInterface.bulkInsert('RecordMainCategories', mainCategories, {})

    // RecordCategories
    const mainCategoriesWithId = await queryInterface.sequelize.query(
      'SELECT id, name FROM RecordMainCategories;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const categories = mainCategoriesWithId.flatMap(mainCategory => {
      return categoryData[mainCategory.name].map(category => {
        return {
          mainCategoryId: mainCategory.id,
          name: category.name,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    })
    await queryInterface.bulkInsert('RecordCategories', categories, {})

    // RecordSubCategories
    const categoriesWithId = await queryInterface.sequelize.query(
      'SELECT id, name FROM RecordCategories;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    // Reconstruct categoryData to array of record category (erase main category)
    categoryData = Object.values(categoryData).flatMap(mainCategory => {
      return mainCategory
    })
    const subCategories = categoriesWithId.flatMap(categoryFromDB => {
      const data = []
      categoryData.forEach(category => {
        if (category.name === categoryFromDB.name) {
          category.subCategories.forEach(subCategory => {
            data.push({
              categoryId: categoryFromDB.id,
              name: subCategory.name,
              createdAt: new Date(),
              updatedAt: new Date()
            })
          })
        }
      })
      return data
    })
    await queryInterface.bulkInsert('RecordSubCategories', subCategories, {})
  },

  async down(queryInterface, Sequelize) {
    // Delete order matters since there are foreign key between tables
    // await queryInterface.bulkDelete('RecordSubCategories', null, {})
    await queryInterface.bulkDelete('RecordCategories', null, {})
    await queryInterface.bulkDelete('RecordMainCategories', null, {})

  }
};
