'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecordSubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RecordSubCategory.hasMany(models.Record, {
        foreignKey: 'subCategoryId',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      })
      RecordSubCategory.belongsTo(models.RecordCategory, { foreignKey: 'categoryId' })
    }
  }
  RecordSubCategory.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'RecordSubCategory',
  });
  return RecordSubCategory;
};