const Furniture = require('../model/furniture');

const addFurniture = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json("Please upload an image file");
        }

        const newFurniture = new Furniture({
            title: req.body.title,
            price: req.body.price,
            category: req.body.category,
            image: file.filename,
            description: req.body.description || "Premium handcrafted wooden furniture designed for comfort and elegance.",
            material: req.body.material || "Sheesham Wood",
            stock: req.body.stock || 10
        });

        await newFurniture.save();
        res.status(201).json("Data Inserted");
    } catch (error) {
        console.log("Error while inserting data", error);
        res.status(500).json({ error: error.message });
    }
};

const getFurniture = async (req, res) => {
    try {
        const items = await Furniture.find({});
        res.status(200).json(items);
    } catch (error) {
        console.error("Error while getting data", error);
        res.status(500).json({ error: error.message });
    }
};

const deleteFurniture = async (req, res) => {
    try {
        await Furniture.deleteOne({ _id: req.body.id });
        res.status(201).json("Data Deleted");
    } catch (error) {
        console.log("Error while deleting data", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addFurniture,
    getFurniture,
    deleteFurniture
};