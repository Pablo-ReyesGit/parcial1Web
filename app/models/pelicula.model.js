//Utilizamos module.export para exportar objetos para que puedan ser utilizados en otras clases
module.exports = (sequelize, Sequelize) => {
// usamos el sequelize.defina para "definir" el nombre de la entity en la BD, en este caso "cliente"
// Usamos type.Sequelize para definir el tipo de datos de cada atributo de la entidad 
    const Pelicula = sequelize.define("pelicula", {
        Nombre: {
            type: Sequelize.STRING
        },
        Sinopsis: {
            type: Sequelize.STRING
        },
        Actores: {
            type: Sequelize.STRING
        },
        Duracion: {
            type: Sequelize.INTEGER
        },  
        Tipo: {
            type: Sequelize.STRING
        }
        ,  
        Categoria: {
            type: Sequelize.STRING
        }
        ,  
        AnioLanzamiento: {
            type: Sequelize.INTEGER
        }
    });
    return Pelicula;
};