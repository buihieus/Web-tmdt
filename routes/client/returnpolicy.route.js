const express = require('express');
const router = express.Router();
const returnpolicyController = require("../../controllers/client/returnpolicy.controller");

router.get('/', returnpolicyController.returnpolicy);

module.exports = router;
