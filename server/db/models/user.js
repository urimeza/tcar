'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Role, Book, YourBook, Score, Like, Comment }) {
      this.belongsTo(Role, { foreignKey: 'roleId' });
      this.hasMany(Book, { foreignKey: 'creatorId' });
      this.hasMany(YourBook, { foreignKey: 'userId' });
      this.hasMany(Score, { foreignKey: 'userId' });
      this.hasMany(Like, { foreignKey: 'userId' });
      this.hasMany(Comment, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
