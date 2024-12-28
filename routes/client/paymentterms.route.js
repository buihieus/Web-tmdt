const express = require('express');
const router = express.Router();
const paymenttermsController = require("../../controllers/client/paymentterms.controller");

router.get('/', paymenttermsController.paymentterms);

module.exports = router;
