const express = require('express');
const multer = require('multer');
const { 
    addFurniture, 
    getFurniture, 
    deleteFurniture 
} = require('../controller/furniture-controller');
const { createOrder, getOrders } = require('../controller/order-controller');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ storage: storage });

router.post('/add', upload.single('image'), addFurniture);
router.get('/all', getFurniture);
router.post('/delete', deleteFurniture);

router.post('/orders/create', createOrder);
router.get('/orders', getOrders);

module.exports = router;