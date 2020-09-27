
const db = require('../config/db.config.js');
const Product = db.Product;
const Sequelize = db.Sequelize;


exports.create = (req, res) => {
    let product = {};

    try{
        // Building product object from upoading request's body
        product.productName = req.body.productName;
        product.categoryId = req.body.categoryId;
        product.categoryName = req.body.categoryName;
   
    
        // Save to MySQL database
        Product.create(product).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a product with id = " + result.id,
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

    Product.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};




// Update a Product by the id in the request
exports.update = (req, res) => {
  
    console.log("req "+ JSON.stringify(req.body));
    const id = req.params.id;
    console.log("id "+ id);

    Product.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Product was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Product with id=" + id
        });
      });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

    Product.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Product was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Product with id=" + id
        });
      });
  
  
};

// Products Pagination  
exports.pagingOfProduct = async (req, res) => {
    try{
        console.log("before page = " + req.query.page);   
      let page = parseInt(req.query.page);
      let limit = parseInt(req.query.limit);

      console.log("after integer page = " + req.query.page);   
    
      const offset = page ? page * limit : 0;
  
      console.log("offset = " + offset);    
  
      let result = {};
  
  
    
          result = await Product.findAndCountAll({
            attributes: ['id', 'productName', 'categoryId', 'categoryName'],
            limit: limit, 
            offset:offset 
          });

          
          const totalPages = Math.ceil(result.count / limit);
          const response = {
            "totalPages": totalPages,
            "pageNumber": page,
            "pageSize": result.rows.length,
            "products": result.rows
          };

          res.send(response);
    }catch(error) {
        res.status(500).send({
          message: "Error -> Can NOT complete a paging request!",
          error: error.message,
        });
      } 
 }