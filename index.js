const express = require("express");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const sequelize = require('./config/database');
const swagger = require('./config/swagger');

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth"); // Assuming you have an auth route file
const productRoutes = require("./routes/product"); // Assuming you have a products route file
const orderRoutes = require("./routes/order"); // Assuming you have an orders route file
const customerRoutes = require("./routes/customer"); // Assuming you have a customers route file


const app = express();
app.use(express.json()); // For parsing JSON


app.get("/", (req, res) => {
  res.send("Hello API!");
});

// Expose Swagger UI (no auth here, so you can grab a token first)
app.use('/api-docs', swagger.serve, swagger.setup);

app.use("/api/users", userRoutes); // Assuming you have a users route file
app.use("/api/auth", authRoutes); // Assuming you have an auth route file
app.use("api/orders", orderRoutes); // Assuming you have an orders route file
app.use("api/customers", customerRoutes); // Assuming you have a customers route file
app.use("api/products", productRoutes); // Assuming you have a products route file



const PORT = process.env.PORT || 3000;

// Test DB connection before starting
sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Sequelize connected to Postgres');
    // Optionally sync all models:
    // return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () =>    console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ Unable to connect to Postgres:', err);
    process.exit(1);
  });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
