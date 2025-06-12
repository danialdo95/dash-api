const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

class Customer extends Model {
    // You can define instance methods here if needed

    static async findByEmail(email) {
        return this.findOne({ where: { email } });
    }
}
// Define the Customer model        
Customer.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Customer',
    tableName: 'customers',
    timestamps: true // Adds createdAt and updatedAt fields
});

// Sync the model with the database
(async () => {
    try {
        await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate the table
        console.log('✅ Customer model synced with database');
    } catch (error) {
        console.error('❌ Error syncing Customer model:', error);
    }
})();
module.exports = Customer;