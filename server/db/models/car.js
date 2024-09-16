'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate({ EngineType, Transmission }) {
      this.belongsTo(EngineType, { foreignKey: 'engineId' });
      this.belongsTo(Transmission, { foreignKey: 'transmissionId' });
    }
  }
  Car.init(
    {
      image: DataTypes.STRING,
      brand: DataTypes.STRING,
      model: DataTypes.STRING,
      transmissionId: DataTypes.INTEGER,
      engineId: DataTypes.INTEGER,
      color: DataTypes.STRING,
      price: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
      range: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Car',
    },
  );
  return Car;
};
