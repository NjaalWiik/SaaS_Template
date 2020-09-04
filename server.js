const express = require('express');
const connectDB = require('./config/db');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
routes.addRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

process.on('uncaughtException', error => {
  console.log('uncaughtException');
  console.log('error', error);
});
