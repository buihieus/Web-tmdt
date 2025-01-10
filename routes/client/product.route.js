const express = require('express');
const router = express.Router();
const controller = require('../../controllers/client/product.controller');

// router.get('/', controller.index );

// router.get("/detail/:slugProduct", controller.detail);

// router.get("/:slugCategory", controller.category);

// Route để xem chi tiết sản phẩm
router.get("/detail/:id", controller.getProductDetail);

module.exports = router;//sử dụng trong file index.route