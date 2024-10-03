// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const newsRoutes = require('./routes/news');
const { scheduleAlerts } = require('./controllers/newsController');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);

// backend/server.js

app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
  }));
  

// Connect to MongoDB and start the server



mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Connected to the MongoDB database");

    // start the server by listening on a port for incoming requests
    app.listen(5000, () => {
        console.log("Server is running on http://localhost:5000");
    });
})
.catch((err) => {
    console.log("Error connecting to the MongoDB database", err);
});