//Utilizamos module.export para exportar objetos para que puedan ser utilizados en otras clases
module.exports = (sequelize, Sequelize) => {
// usamos el sequelize.defina para "definir" el nombre de la entity en la BD, en este caso "cliente"
// Usamos type.Sequelize para definir el tipo de datos de cada atributo de la entidad 
    const Detalle = sequelize.define("detalle", {
        id_pedido: {
      type: Sequelize.INTEGER
    },
    id_producto: {
      type: Sequelize.INTEGER
    },
    cantidad: {
      type: Sequelize.INTEGER
    },
    subtotal: {
      type: Sequelize.DECIMAL
    }
    });
    return Detalle;
};