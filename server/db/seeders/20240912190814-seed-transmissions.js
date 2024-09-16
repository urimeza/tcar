'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Transmissions',
      [
        {
          type: 'Автоматическая',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { type: 'Ручная', createdAt: new Date(), updatedAt: new Date() },
        {
          type: 'Роботизированная',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'Нет',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Transmissions', null, {});
  },
};
