const express = require('express');
const multer = require('multer');
const { addFurniture, getFurniture, deleteFurniture } = require('../controller/furniture-controller');
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

module.exports = router;