
const db = require('../config/db.config.js');
const Product = db.Product;
const Sequelize = db.Sequelize;


exports.create = (req, res) => {
  let product = {};

  try {
    // Building product object from upoading request's body
    product.productName = req.body.productName;
    product.categoryId = req.body.categoryId;
    product.categoryName = req.body.categoryName;


    // Save to MySQL database
    Product.create(product).then(result => {
      // send uploading message to client
      res.status(200).json({
        message: "Upload Successfully a product with id = " + result.id,
        product: result,
      });
    });
  } catch (error) {
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


//upsert a Product 

exports.upsert = (req, res) => {

  console.log("req " + JSON.stringify(req.body));
  const id = req.body.productId;
  console.log("id " + id);

  Product.findOne({
    where: { id: id }
  })
    .then(data => {
      if (data) {
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
      } else {
        let product = {};

        try {
          // Building product object from upoading request's body
          product.productName = req.body.productName;
          product.categoryId = req.body.categoryId;
          product.categoryName = req.body.categoryName;


          // Save to MySQL database
          Product.create(product).then(result => {
            // send uploading message to client
            res.status(200).json({
              message: "Upload Successfully a product with id = " + result.id,
              product: result,
            });
          });
        } catch (error) {
          res.status(500).json({
            message: "Fail!",
            error: error.message
          });
        }
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};


// Update a Product by the id in the request
exports.update = (req, res) => {

  console.log("req " + JSON.stringify(req.body));
  const id = req.params.id;
  console.log("id " + id);

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

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: products } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, products, totalPages, currentPage };
};

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// Products Pagination  
exports.pagingOfProduct =  (req, res) => {

    console.log("before page = " + req.query.page);
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);


    Product.findAndCountAll({ limit, offset,where: {} })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });

  }



