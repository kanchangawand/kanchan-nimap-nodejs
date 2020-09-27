
const db = require('../config/db.config.js');
const Category = db.Category;
const Sequelize = db.Sequelize;


exports.create = (req, res) => {
    let category = {};

    try{
        // Building Category object from upoading request's body
        category.categoryName = req.body.categoryName;
   
    
        // Save to MySQL database
        Category.create(category).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a category with id = " + result.id,
                category: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {

    Category.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    });
};




// Update a category by the id in the request
exports.update = (req, res) => {
  
    console.log("req "+ JSON.stringify(req.body));
    const id = req.params.id;
    console.log("id "+ id);

    Category.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Category was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Category with id=" + id
        });
      });
};

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

    Category.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Category was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Category with id=" + id
        });
      });
  
  
};