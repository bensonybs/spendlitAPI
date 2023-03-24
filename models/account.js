'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.hasMany(models.Record, { 
        foreignKey: 'fromAccountId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      Account.hasMany(models.Record, {
        foreignKey: 'toAccountId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      Account.belongsTo(models.User, { foreignKey: 'userId' })
      Account.belongsTo(models.AccountType, { foreignKey: 'accountTypeId' })
    }
  }
  Account.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    initialAmount: DataTypes.DECIMAL,
    description: DataTypes.STRING,
    accountTypeId: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};