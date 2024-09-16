'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EngineType extends Model {
    static associate({ Car }) {
      this.hasMany(Car, { foreignKey: 'engineId' });
    }
  }
  EngineType.init(
    {
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'EngineType',
    },
  );
  return EngineType;
};
