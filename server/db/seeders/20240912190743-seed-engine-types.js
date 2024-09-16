'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('EngineTypes', [
      { type: 'Бензиновый', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Дизельный', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Электрический', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EngineTypes', null, {});
  }
};
