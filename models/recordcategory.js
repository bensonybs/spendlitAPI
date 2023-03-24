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
      RecordCategory.belongsTo(models.User, { foreignKey: 'userId' })
      RecordCategory.hasMany(models.Record, {
        foreignKey: 'subCategoryId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      RecordCategory.hasMany(models.RecordSubCategory, {
        foreignKey: 'categoryId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'   
      })
    }
  }
  RecordCategory.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    budget: DataTypes.DECIMAL,
    isDefault: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'RecordCategory',
  });
  return RecordCategory;
};