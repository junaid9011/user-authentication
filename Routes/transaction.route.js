const express = require('express');
const router = express.Router();

const { createTransaction } = require('../Controller/transaction.controller');


router.post('/checkout', createTransaction);

module.exports = router;