module.exports = app => {
    const pedido = require("../controllers/pedido.controller.js");
    var router = require("express").Router();
    // Create a new Client
    router.post("/create/", pedido.create);
    // Retrieve all Client
    router.get("/", pedido.findAll);
    // Retrieve all published Client
    router.get("/status", pedido.findAllStatus);
    // Retrieve a single Client with id
    router.get("/:id", pedido.findOne);
    // Update a Client with id
    router.put("/update/:id", pedido.update);
    // Delete a Client with id
    router.delete("/delete/:id", pedido.delete);
    // Delete all Cliente
    router.delete("/delete/", pedido.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/delivery", router);
};
