const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const newsRoutes = require('./routes/news');
const { scheduleAlerts } = require('./controllers/newsController');

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Process allowed origins from environment and trim any accidental spaces
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim());

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);

// Connect to MongoDB and start the server
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB connected');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port: ${process.env.PORT || 5000}`);
        });
        scheduleAlerts();
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
    });
