'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Transaction.belongsTo(models.User, {
        foreignKey: 'id',
        target_Key: 'UserId'
      })
      Transaction.belongsTo(models.Category, {
        foreignKey: 'id',
        target_Key: 'CategoryId'
      })



    }
  };
  Transaction.init({
    description: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};