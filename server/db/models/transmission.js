'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transmission extends Model {
    static associate({ Car }) {
      this.hasMany(Car, { foreignKey: 'transmissionId' });
    }
  }
  Transmission.init(
    {
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Transmission',
    },
  );
  return Transmission;
};
