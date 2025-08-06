module.exports = app => {
    const detalle = require("../controllers/detalle.controller.js");
    var router = require("express").Router();
    // Create a new Client
    router.post("/create/", detalle.create);
    // Retrieve all Client
    router.get("/", detalle.findAll);
    // Retrieve all published Client
    router.get("/status", detalle.findAllStatus);
    // Retrieve a single Client with id
    router.get("/:id", detalle.findOne);
    // Update a Client with id
    router.put("/update/:id", detalle.update);
    // Delete a Client with id
    router.delete("/delete/:id", detalle.delete);
    // Delete all Cliente
    router.delete("/delete/", detalle.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/detail", router);
};