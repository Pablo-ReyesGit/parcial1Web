// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../models");

const Pedido = db.pedidos;
const Op = db.Sequelize?.Op || require("sequelize").Op; // ✅ Fallback si Sequelize no fue inyectado

if (!Pedido || !Op) {
  console.error("❌ Error: Pedido o Sequelize.Op no están disponibles");
}

// Create and Save a new Client
exports.create = (req, res) => {
    // Validamos que dentro del  request no venga vacio el nombre, de lo contrario returna error
    if (!req.body.id_cliente) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Client, definiendo una variable con la estructura del reques para luego solo ser enviada como parametro mas adelante. 
    const pedido = {
        id_cliente: req.body.id_cliente,
        fecha: req.body.fecha,
        total: req.body.total, 
        // utilizando ? nos ayuda a indicar que el paramatro puede ser opcional dado que si no viene, le podemos asignar un valor default
        status: req.body.status ? req.body.status : false
    };

    // Save a new Client into the database
    Pedido.create(pedido)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Deliver."
            });
        });
};

// Retrieve all Client from the database.
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Pedido.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving clients."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Pedido.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Cliente with id=" + id
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Pedido.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Deliver was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Deliver with id=${id}. Maybe Deliver was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Deliver with id=" + id
            });
        });
};

// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    // utilizamos el metodo destroy para eliminar el objeto mandamos la condicionante where id = parametro que recibimos 
    Pedido.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Deliver was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Deliver with id=${id}. El pedido no fue encontado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Deliver with id=" + id
            });
        });
};

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
    Pedido.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Delivers were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Deliver."
            });
        });
};

// find all active Client, basado en el atributo status vamos a buscar que solo los clientes activos
exports.findAllStatus = (req, res) => {
    Pedido.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Delivers."
            });
        }); 
};