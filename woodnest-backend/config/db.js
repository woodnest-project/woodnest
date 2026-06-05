const mongoose = require('mongoose');

const Connection = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        if (connect) {
            console.log("DB Connected");
        }
    } catch (error) {
        console.error("Error While connecting DB", error);
    }
};

module.exports = Connection;