// Importamos los módulos principales
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Configuración de CORS
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// Parseo de solicitudes JSON y x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importamos los modelos (Sequelize)
const db = require("./app/models");

// Sincronización con la base de datos
db.sequelize.sync()
  .then(() => {
    console.log("✅ Conexión exitosa con la base de datos.");
  })
  .catch(err => {
    console.error("❌ Error al conectar con la base de datos:", err.message);
    process.exit(1); // Detiene el servidor si hay fallo
  });

/*
// Si deseas borrar y volver a crear las tablas al reiniciar:
// ⚠️ Usar solo en desarrollo/test
db.sequelize.sync({ force: true }).then(() => {
  console.log("⚠️ Todas las tablas han sido eliminadas y re-sincronizadas.");
});
*/

// Ruta simple de prueba
app.get("/", (req, res) => {
  res.json({ message: "UMG Web Application" });
});

// Carga de rutas
    try {
      require("./app/routes/cliente.routes.js")(app);
      console.log("✅ cliente.routes.js cargado correctamente");
    } catch (err) {
      console.error("❌ Error al cargar cliente.routes.js:", err.message);
    }

try {
  require("./app/routes/producto.routes.js")(app);
  console.log("✅ producto.routes.js cargado correctamente");
} catch (err) {
  console.error("❌ Error al cargar producto.routes.js:", err.message);
}

try {
  require("./app/routes/pedido.routes.js")(app);
  console.log("✅ pedido.routes.js cargado correctamente");
} catch (err) {
  console.error("❌ Error al cargar pedido.routes.js:", err.message);
}

try {
  require("./app/routes/detalle.routes.js")(app);
  console.log("✅ detalle.routes.js cargado correctamente");
} catch (err) {
  console.error("❌ Error al cargar detalle.routes.js:", err.message);
}

try {
  require("./app/routes/pelicula.routes.js")(app);
  console.log("✅ pelicula.routes.js cargado correctamente");
} catch (err) {
  console.error("❌ Error al cargar pelicula.routes.js:", err.message);
}

// Configuración del puerto
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado correctamente en el puerto ${PORT}.`);
});
