('use strict');

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'Alberto',
        email: 'a@mail.ru',
        password: await bcrypt.hash('123', 10),
      },
      {
        username: 'Roberto',
        email: 'roberto@example.com',
        password: await bcrypt.hash('123', 10),
      },
      {
        username: 'АндейКреатор',
        email: 'andreas@example.com',
        password: await bcrypt.hash('123', 10),
      },
      {
        username: 'Admin2',
        email: 'admin2@example.com',
        password: await bcrypt.hash('123', 10),
      },
      {
        username: 'Admin3',
        email: 'admin3@example.com',
        password: await bcrypt.hash('123', 10),
      },
      {
        username: 'AlexPremium',
        email: 'admin4@example.com',
        password: await bcrypt.hash('123', 10),
      },
      {
        username: 'AnthonyPremium',
        email: 'admin6@example.com',
        password: await bcrypt.hash('123', 10),
      },
      {
        username: 'JohnDoe',
        email: 'john.doe@example.com',
        password: await bcrypt.hash('123', 10),
      },
      {
        username: 'JaneSmith',
        email: 'jane.smith@example.com',
        password: await bcrypt.hash('123', 10),
      },
      {
        username: 'MichaelJohnson',
        email: 'michael.johnson@example.com',
        password: await bcrypt.hash('123', 10),
      },
      {
        username: 'EmilyDavis',
        email: 'emily.davis@example.com',
        password: await bcrypt.hash('123', 10),
      },
    ]);
  },
};
