const Transaction = require('../Models/transaction.model');
const ErrorHandler = require('../Utlis/ErrorHandler');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


exports.createTransaction = async (req, res, next) => {
    try {
        const { amount,user } = req.body;

        // a new Stripe payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method_types: ['card'],
        });
        const confirmedPayment = await stripe.paymentIntents.confirm(paymentIntent.id, {
            payment_method: 'pm_card_visa',
          });

        //  a new transaction in the database
        const transaction = await Transaction.create({
            user: user,
            amount: amount,
            transactionId: paymentIntent.id,
        });

        res.status(200).json({
            success: true,
            transaction,
            confirmedPayment
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, err.statusCode));
    }
}



