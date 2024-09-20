const mongoose = require('mongoose');
const ImageScehma = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',  // Reference to the Category model
    required: true,
  }
}, { timestamps: true });





module.exports = ImageScehma;
