const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

class Order extends Model {
    // You can define instance methods here if needed

    static async findByOrderNumber(orderNumber) {
        return this.findOne({ where: { orderNumber } });
    }
}
// Define the Order model
Order.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'customers', // Name of the referenced model
            key: 'id'
        }
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
    }
}, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = Order;