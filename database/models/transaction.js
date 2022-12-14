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
      Transaction.belongsTo(models.User)
      Transaction.belongsTo(models.Category)
    }
  };
  Transaction.init({
    description: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    softDelete: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transaction',
    timestamps: true,
    paranoid: true,
    deletedAt: 'softDelete',
  });
  return Transaction;
};