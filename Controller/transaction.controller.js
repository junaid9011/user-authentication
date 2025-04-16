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

        //  a new transaction in the database
        const transaction = await Transaction.create({
            user: user,
            amount: amount,
            transactionId: paymentIntent.id,
        });

        res.status(200).json({
            success: true,
            transaction,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, err.statusCode));
    }
}

exports.confirmTransaction = async (req, res, next) => {
    const { paymentIntentId, clientSecret } = req.body;
    try {
        const transaction = await Transaction.findOne({ transactionId: paymentIntentId });
          if (!transaction) {
              return next(new ErrorHandler('Transaction not found', 404));
          }
        const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
            payment_method: 'pm_card_visa',  // Use a test payment method ID, such as 'pm_card_visa'
          });
        transaction.status = paymentIntent.status;
        await transaction.save();

        res.json({ paymentIntent, transaction });
    } catch (error) {
        console.error('Error confirming payment intent:', error);
        res.status(500).send({ error: error.message });


    }
}


