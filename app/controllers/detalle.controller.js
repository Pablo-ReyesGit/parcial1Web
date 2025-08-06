// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../models");
if (!db.detalles || !db.Sequelize) {
  console.error("❌ Error: El modelo 'clientes' o Sequelize no se cargó correctamente.");
}
const Detalle = db.detalles;
const Op = db.Sequelize.Op;

// Create and Save a new Client
exports.create = (req, res) => {
    // Validamos que dentro del  request no venga vacio el nombre, de lo contrario returna error
    if (!req.body.id_pedido) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Client, definiendo una variable con la estructura del reques para luego solo ser enviada como parametro mas adelante. 
    const detalle = {
        id_pedido: req.body.id_pedido,
        id_producto: req.body.id_producto,
        cantidad: req.body.cantidad, 
        // utilizando ? nos ayuda a indicar que el paramatro puede ser opcional dado que si no viene, le podemos asignar un valor default
        status: req.body.status ? req.body.status : false
    };

    // Save a new Client into the database
    Detalle.create(detalle)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Detail."
            });
        });
};

// Retrieve all Client from the database.
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Detalle.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Details."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Detalle.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Detail with id=" + id
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Detalle.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Detail was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Detail with id=${id}. Maybe Detail was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Detail with id=" + id
            });
        });
};

// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    // utilizamos el metodo destroy para eliminar el objeto mandamos la condicionante where id = parametro que recibimos 
    Detalle.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Detail was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Detail with id=${id}. El Detalle no fue encontado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Detail with id=" + id
            });
        });
};

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
    Detalle.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Details were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Details."
            });
        });
};

// find all active Client, basado en el atributo status vamos a buscar que solo los clientes activos
exports.findAllStatus = (req, res) => {
    Detalle.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Detail."
            });
        }); 
};
