'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:*/
    await queryInterface.bulkInsert('Categories', [{
      name: 'Incomes',
      description:'categoria de ingresos',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Outcomes',
      description:'categoria de egresos',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     */
     await queryInterface.bulkDelete('Categories', null, {});
  }
};
