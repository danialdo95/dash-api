const express = require("express");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const sequelize = require('./config/database');

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth"); // Assuming you have an auth route file



const app = express();
app.use(express.json()); // For parsing JSON

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dash API",
      version: "1.0.0",
      description: "A simple Express API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"], // Adjust this based on where your route files are
};

app.get("/", (req, res) => {
  res.send("Hello API!");
});

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/users", userRoutes); 

app.use("/api/auth", authRoutes); // Assuming you have an auth route file


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
