let express = require('express');
let router = express.Router();
 
const categories = require('../controllers/category.js');
const products = require('../controllers/product.js');



router.post('/api/categories/create', categories.create);
router.get('/api/categories/getAllCategories', categories.findAll);
router.put('/api/categories/updateCategory/:id', categories.update);
router.delete('/api/categories/deleteCategory/:id', categories.delete);


router.post('/api/products/create', products.upsert);
router.get('/api/products/getAllProducts', products.findAll);
router.put('/api/products/updateProduct/:id', products.update);
router.delete('/api/products/deleteProduct/:id', products.delete);
router.get('/api/products/pagination', products.pagingOfProduct);
router.get('/api/products/findbyId/:id', products.findbyId);
router.delete('/api/products/deleteProduct', products.deleteAll);

//localhost:6001/api/products/pagination?page=0&size=6


module.exports = router;