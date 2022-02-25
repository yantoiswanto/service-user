'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Refresh_token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    Refresh_token.belongsTo(models.Users, { foreignKey: 'user_id' });
    }
  }
  Refresh_token.init({
    token: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Refresh_token',
    tableName: 'Refresh_tokens',
    underscored: true,
  });
  return Refresh_token;
};