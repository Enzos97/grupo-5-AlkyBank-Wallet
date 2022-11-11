'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //En esta Seccion obtengo los id de Roles para el usuario
    const Roles = await queryInterface.sequelize.query(
      'SELECT id FROM Roles'
    )
    const RolesFilas = Roles[0];

    //Genero los 10 usuarios estandar y 10 usuarios admin
    const generaUsuario = (()=>{
      let usuarios = []
      for(let i = 0; i<10; i++){
        usuarios.push({
          firstName: `usuario${i}`,
          lastName: 'Administrador',
          email: `maildeusuario${i}`,
          password: '12345678',
          roleId: RolesFilas[0].id, 
          // Esta asignacion la hago con respecto al seeder de roles, 
          // deberia coincidir con el Admin, podriamos usar un SELECT para asegurar
          createdAt: new Date(),
          updatedAt: new Date()
        })
        usuarios.push({
          firstName: `usuario${i}`,
          lastName: 'Estandar',
          email: `maildeusuario${i}`,
          password: '12345678',
          roleId: RolesFilas[1].id,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
      return usuarios
    })

    return queryInterface.bulkInsert('Users', generaUsuario())
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users',null,{});
  }
};
