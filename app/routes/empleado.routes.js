module.exports = app => {
    const empleado = require("../controllers/detalle.controller.js");
    var router = require("express").Router();
    // Create a new Client
    router.post("/create/", empleado.create);
    // Retrieve all Client
    router.get("/", empleado.findAll);
    // Retrieve all published Client
    router.get("/status", empleado.findAllStatus);
    // Retrieve a single Client with id
    router.get("/:id", empleado.findOne);
    // Update a Client with id
    router.put("/update/:id", empleado.update);
    // Delete a Client with id
    router.delete("/delete/:id", empleado.delete);
    // Delete all Cliente
    router.delete("/delete/", empleado.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/employee", router);
};