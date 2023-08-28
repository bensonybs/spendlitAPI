'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecordMainCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RecordMainCategory.hasMany(models.RecordCategory, {
        foreignKey: 'mainCategoryId',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      })
    }
  }
  RecordMainCategory.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RecordMainCategory',
  });
  return RecordMainCategory;
};