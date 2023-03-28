'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Record.belongsTo(models.User, { foreignKey: 'userId' })
      Record.belongsTo(models.RecordCategory, { foreignKey: 'categoryId' })
      Record.belongsTo(models.RecordSubCategory, { foreignKey: 'subCategoryId' })
      Record.belongsTo(models.Account, { foreignKey: 'fromAccountId' })
      Record.belongsTo(models.Account, { foreignKey: 'toAccountId' })
    }
  }
  Record.init({
    date: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    categoryId: DataTypes.INTEGER,
    subCategoryId: DataTypes.INTEGER,
    fromAccountId: DataTypes.INTEGER,
    toAccountId: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Record',
  });
  return Record;
};