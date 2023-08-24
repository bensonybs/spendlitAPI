'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecordCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RecordCategory.belongsTo(models.RecordMainCategory, { foreignKey: 'mainCategoryId' })
      RecordCategory.hasMany(models.RecordSubCategory, {
        foreignKey: 'categoryId',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      })
    }
  }
  RecordCategory.init({
    mainCategoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'RecordCategory',
  });
  return RecordCategory;
};