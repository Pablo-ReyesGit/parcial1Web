// usamos la función require para cargar el módulo db.config.js para traer los parámetros preconfigurados de la BD
const dbConfig = require("../config/db.config.js");

// Cargamos el módulo Sequelize "ORM" para el manejo de las entidades como objetos
const Sequelize = require("sequelize");

// Creamos una instancia de Sequelize con la configuración de conexión
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    ssl: {
      require: true, // 👈 corregido: antes decía "requere"
      rejectUnauthorized: false
    }
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// Creamos un objeto db para contener todos los modelos y la instancia sequelize
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


try {
  db.clientes = require("./cliente.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'clientes' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'clientes':", err.message);
}

try {
  db.productos = require("./producto.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'productos' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'productos':", err.message);
}

try {
  db.pedidos = require("./pedido.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'pedidos' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'pedidos':", err.message);
}

try {
  db.detalles = require("./detalle.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'detalles' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'detalles':", err.message);
}

try {
  db.peliculas = require("./pelicula.model.js")(sequelize, Sequelize);
  console.log("✅ Modelo 'pelicula' cargado correctamente.");
} catch (err) {
  console.error("❌ Error al cargar modelo 'pelicula':", err.message);
}

// Agrega más modelos si es necesario
// try {
//   db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
//   console.log("✅ Modelo 'tutorials' cargado correctamente.");
// } catch (err) {
//   console.error("❌ Error al cargar modelo 'tutorials':", err.message);
// }

// Exportamos el objeto db para que pueda ser accedido desde otras clases
module.exports = db;
