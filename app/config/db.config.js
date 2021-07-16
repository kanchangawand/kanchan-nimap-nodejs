const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 


db.Category = require('../models/category.model.js')(sequelize, Sequelize);
db.Product = require('../models/product.model.js')(sequelize, Sequelize);

db.Product.belongsTo(db.Category);
module.exports = db;