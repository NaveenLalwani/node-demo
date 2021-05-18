'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Purchase.init({
    userId: DataTypes.INTEGER,
    item_name: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Purchase',
  });
  Purchase.associate = function(models) {
    Purchase.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
  };
  return Purchase;
};