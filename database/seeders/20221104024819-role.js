'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here. */
    await queryInterface.bulkInsert('Roles', [{
      name: 'ADMIN',
      description: 'Rol para Administrador',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'USER',
      description: 'Rol para Usuarios',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'DEVELOPER',
      description: 'Rol para developer',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     */    
    await queryInterface.bulkDelete('Roles', null, {});
    
  }
};

