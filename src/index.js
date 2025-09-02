const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
// const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
connectDB();

// const swaggerOptions = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Auth API",
//       version: "1.0.0",
//       description: "Sardor shops beckent API documentation",
//     },
//     basePath: "/api",
//     servers: [
//       {
//         description: "Local Server",
//         url: "http://localhost:8000", 
//       },
//       {
//         description: "Production Server",
//         url: "https://sardor-s-shop-beckent-2.onrender.com/"
//     }
//     ],
//   },
//   apis:  [path.join(__dirname, "./routes/*.js")], 
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(/* swaggerDocs */));

//routesList
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT == null ? 8000 : process.env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📄 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
