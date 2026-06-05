const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true }
});

const Furniture = mongoose.model('furniture', furnitureSchema);
module.exports = Furniture;