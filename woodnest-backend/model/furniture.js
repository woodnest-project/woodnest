const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, default: "Premium handcrafted wooden furniture designed for comfort and elegance." },
    material: { type: String, default: "Sheesham Wood" },
    stock: { type: Number, default: 10 }
}, { timestamps: true });

module.exports = mongoose.model('Furniture', furnitureSchema);