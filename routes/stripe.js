const router = require('express').Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

// make payments
router.post('/payment', async (req, res) => {
    stripe.charges.create({
        // whenever you make a payment, stripe returns a returns a token id
        source: req.body.tokenId, 
        amount: req.body.amount,
        currency: "usd"
    }, (stripeErr, stripeRes) => {
        if(stripeErr) {
            res.status(500).json(stripeErr);
        } else {
            res.status(200).json(stripeRes);
        }
    });
})

module.exports = router;