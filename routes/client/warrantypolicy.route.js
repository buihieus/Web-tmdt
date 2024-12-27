const express = require('express');
const router = express.Router();
const warrantypolicyController = require("../../controllers/client/warrantypolicy.controller");

router.get('/', warrantypolicyController.warrantypolicy);

module.exports = router;
