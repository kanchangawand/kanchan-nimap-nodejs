module.exports = (sequelize, Sequelize) => {
	const Product = sequelize.define('product', {	
	  id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  productName: {
			type: Sequelize.STRING
	  },
	  categoryId: {
		  type: Sequelize.INTEGER
  	},categoryName: {
        type: Sequelize.STRING
    }

	});
	
	return Product;
}