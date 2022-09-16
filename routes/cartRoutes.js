const router = require('express').Router();
const Cart = require('../models/Cart');
const {tokenAuth, verifyTokenAndAdmin, verifyTokenAndAuth} = require('../utils/jwtauthorization')

// CREATE
router.post('/', verifyTokenAndAuth, async(req, res) => {
    try {
        const newCart = await Cart.create(req.body);
        res.status(200).json(newCart);
    }catch(err) {
        res.status(400).json(err);
    }
})

// update product
router.put("/update/:userId", verifyTokenAndAuth, async (req, res) => {
    try {
      const upodatedCart = await Cart.findByIdAndUpdate(req.params.userId, {
        $set: req.body
      }, {
        new: true
      });
  
      return res.status(200).json(updatedCart);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });


router.delete('/delete/:id', verifyTokenAndAuth, async(req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been successfully deleted");
    } catch(err) {
        res.status(500).json(err);
    }
})

// get user cart
// user id
router.get("/find/:userId", verifyTokenAndAuth, async (req, res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
      } catch (err) {
        res.status(500).json(err);
      }
  });

// get all carts
router.get('/', verifyTokenAndAdmin, async(req, res) => {
    try {
        const allCarts = await Cart.find();
        res.status(200).json(allCarts);
    } catch(err) {
        res.staus(500).json(err);
    }
})

module.exports = router;