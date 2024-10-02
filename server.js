const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const alertRoutes = require('./routes/alerts');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use('/api/alerts', alertRoutes);

mongoose.connect(process.env.MONGO_URI)

.then(() => {
    console.log("Connected to the MongoDB database");

    // start the server by listening on a port for incoming requests
    app.listen(PORT, () => {
        console.log("Server is running on http://localhost:5000");
    });
})
.catch((err) => {
    console.log("Error connecting to the MongoDB database", err);
});

