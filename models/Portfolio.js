let mongoose = require('mongoose');

let PortfolioSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Portfolio', PortfolioSchema, 'portfolios');