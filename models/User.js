const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

class User extends Model {
    // You can define instance methods here if needed

    static async findByUsername(username) {
        return this.findOne({ where: { username } });
    }
}


// Define the User model
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user'
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true // Adds createdAt and updatedAt fields
});




// Sync the model with the database
(async () => {
  try {
    await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate the table
    console.log('✅ User model synced with database');
  } catch (error) {
    console.error('❌ Error syncing User model:', error);
  }
})();
module.exports = User;
// This code defines a User model using Sequelize ORM for a PostgreSQL database.