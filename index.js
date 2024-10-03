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

// Connect to MongoDB and start the server
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB connected');
        app.listen(5000, () => {
            console.log(`Server running on port ${PORT}`);
        });
        scheduleAlerts();
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
    });

const PORT = process.env.PORT || 5000;

