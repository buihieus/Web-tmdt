// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const calvinkleinController = require("../../controllers/client/calvinklein.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn mua hàng online
router.get('/', calvinkleinController.calvinklein);

module.exports = router;
