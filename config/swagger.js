// config/swagger.js
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Basic swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My E-commerce Dashboard API",
    version: "1.0.0",
    description: "API documentation for the E-commerce Dashboard",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter your JWT token in the format **Bearer &lt;token>**",
      },
    },
  },
  // Apply this security globally to all endpoints
  security: [
    {
      bearerAuth: [],
    },
  ],
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
};

// Options for swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ["./routes/**/*.js"], // ← path to your route files with JSDoc comments
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerSpec),
};
