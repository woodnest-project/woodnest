const Order = require('../model/order');
const Furniture = require('../model/furniture');

const createOrder = async (req, res) => {
    try {
        const { orderId, date, address, items, totalAmount } = req.body;

        if (!orderId || !address || !items || items.length === 0 || !totalAmount) {
            return res.status(400).json("Missing required order parameters");
        }

        const newOrder = new Order({
            orderId,
            date,
            address,
            items,
            totalAmount
        });
        await newOrder.save();

        for (let item of items) {
            await Furniture.findByIdAndUpdate(
                item.productId,
                { $inc: { stock: -item.quantity } }
            );
        }

        res.status(201).json("Order Placed Successfully!");
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createOrder,
    getOrders
};
