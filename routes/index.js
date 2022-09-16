const router = require('express').Router();
const userRoutes = require('./userRoutes');
const authRoutes = require('./auth');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');
const cartRoutes = require('./cartRoutes');
const checkoutRoutes = require('./stripe');

router.use('/checkout', checkoutRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes)
router.use('/products', productRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);


module.exports = router;