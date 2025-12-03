const category = require("../models/category.model");

exports.findAll = (req, res) => {
  category.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error fetch category."
      });
    else 
      res.send(data);
    
  });
};


exports.create = (req, res) => {

    if (!req.body.cat_name || !req.body.is_deleted || !req.body.created_date || !req.body.updated_date) {
        res.status(400).send({ message: "cat_name, is_deleted, and category ID cannot be empty!" });
        return;
    }

    const newcategory = new category({
        cat_name: req.body.cat_name,
        is_deleted: req.body.is_deleted,
        created_date: req.body.created_date,
        updated_date: req.body.updated_date
    });


    category.create(newcategory, (error, data) => {
        if (error) {
            res.status(500).send({ message: error.message || "Some error occurred while creating the category." });
        } else {
            res.status(201).send(data);
        }
    });
};

exports.update = (req, res) => {

    if (!req.body) {
        res.status(400).send({ message: "Data to update cannot be empty!" });
        return;
    }

    category.updateById(req.params.id, req.body, (error, data) => {
        if (error) {
            if (error.kind === "not_found") {
                res.status(404).send({ message: `Product with id ${req.params.id} not found. `});
            } else {
                res.status(500).send({ message: `Error updating category with id ${req.params.id} `});
            }   
         } else {
            res.send(data);
         }
    });
};


exports.delete = (req, res) => {

    category.remove(req.params.id, (error, data) => {
        if (error) {
            if (error.kind === "not_found") {
                res.status(404).send({ message: `category with id ${req.params.id} not found. `});
            } else {
                res.status(500).send({ messae: `Could not delete category with id ${req.params.id} `});
            }
        } else {
            res.send({ message: "category was deleted successfully!" });
        }
    });
};