const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const swaggerDocs = require('./config/swaggerConfig');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
connectDB();



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//routesList
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT == null ? 8000 : process.env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📄 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
