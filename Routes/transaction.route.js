const express = require('express');
const router = express.Router();

const { createTransaction, confirmTransaction } = require('../Controller/transaction.controller');


router.post('/checkout', createTransaction);
router.post('/confirm', confirmTransaction);

module.exports = router;