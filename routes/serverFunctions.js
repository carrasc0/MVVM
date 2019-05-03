const db = require('../models/serverDB');
const utils = require('../utils/utils');
const multer = require('multer');
const fs = require('fs');
const fc = {};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/user/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({
    storage: storage
}).single('image');




module.exports = fc;