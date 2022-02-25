'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Users', [{
      name: 'Yanto',
      role:"admin",
      email:"yanto.iswanto@gmail.com",
      password: await bcrypt.hashSync('12345678', 10),
      created_at: new Date(),
      updated_at: new Date()
      },
      {
        name: 'Iswanto',
        role:"user",
        email:"iswanto@gmail.com",
        password: await bcrypt.hashSync('12345678', 10),
        created_at: new Date(),
        updated_at: new Date()
        }
      ]);
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Users', null, {});
    
  }
};
