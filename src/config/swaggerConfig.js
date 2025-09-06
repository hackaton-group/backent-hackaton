const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

const PORT = process.env.PORT || 8000;
const global_url = process.env.GLOBAL;
console.log("uidjfioje", global_url);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation Hackaton project",
      version: "1.0.0",
      description: "Documentation for the backend APIs",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Local server",
      },
      {
        url: global_url,
        description: "Render (Production) server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;