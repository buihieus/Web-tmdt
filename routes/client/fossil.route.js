// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const fossilController = require("../../controllers/client/fossil.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn mua hàng online
router.get('/', fossilController.fossil);

module.exports = router;
