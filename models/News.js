const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  source: { type: String },
  url: { type: String },
  publishedAt: { type: Date },
});

module.exports = mongoose.model('News', newsSchema);


