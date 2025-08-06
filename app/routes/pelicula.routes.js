module.exports = app => {
    const pelicula = require("../controllers/pelicula.controller.js");
    var router = require("express").Router();
    // Create a new Client
    router.post("/create/", pelicula.create);
    // Retrieve all Client
    router.get("/", pelicula.findAll);
    // Retrieve all published Client
    router.get("/status", pelicula.findAllStatus);
    // Retrieve a single Client with id
    router.get("/:id", pelicula.findOne);
    // Update a Client with id
    router.put("/update/:id", pelicula.update);
    // Delete a Client with id
    router.delete("/delete/:id", pelicula.delete);
    // Delete all Cliente
    router.delete("/delete/", pelicula.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/peliculas", router);
};