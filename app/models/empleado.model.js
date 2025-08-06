//Utilizamos module.export para exportar objetos para que puedan ser utilizados en otras clases
module.exports = (sequelize, Sequelize) => {
// usamos el sequelize.defina para "definir" el nombre de la entity en la BD, en este caso "cliente"
// Usamos type.Sequelize para definir el tipo de datos de cada atributo de la entidad 
    const Empleado = sequelize.define("empleado", {
        nombre: {
      type: Sequelize.STRING
    },
    apellido: {
      type: Sequelize.STRING
    },
    nit: {
      type: Sequelize.STRING
    },
    salario: {
      type: Sequelize.DECIMAL
    },
    status: {
      type: Sequelize.INTEGER
    },
    id_area: {
      type: Sequelize.INTEGER
    },
    });
    return Empleado;
};