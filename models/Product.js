const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

class Product extends Model {
    // You can define instance methods here if needed

    static async findByName(name) {
        return this.findOne({ where: { name } });
    }
}
// Define the Product model
Product.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true // Adds createdAt and updatedAt fields
});

// Sync the model with the database
(async () => {
    try {
        await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate the table
        console.log('✅ Product model synced with database');
    } catch (error) {
        console.error('❌ Error syncing Product model:', error);
    }
})();
module.exports = Product;