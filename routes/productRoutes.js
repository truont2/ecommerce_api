const router = require('express').Router();
const Product = require('../models/Product');
const {tokenAuth, verifyTokenAndAdmin, verifyTokenAndAuth} = require('../utils/jwtauthorization')

// CREATE
router.post('/', verifyTokenAndAdmin, async(req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(200).json(newProduct);
    }catch(err) {
        res.status(400).json(err);
    }
})

// get all products
router.get("/", async(req,res) => {
    // allows us to search by query parameters
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
        if(qNew) {
            // sort in descending order
            products = await Product.find().sort({createdAt: -1}).limit(5);
        } else if(qCategory) {
            // basically checks if the caterory query is in the array of categories, return the array
            // db.inventory.find( { quantity: { $in: [ 5, 15 ] } }, { _id: 0 } )
            // This query selects all documents in the inventory collection where the value of the quantity field is either 5 or 15.
            products = await Product.find({categories: {
                $in: [qCategory]
            }});
        } else {
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch(err) {
        res.status(500).json(err);
    }
})

// get single product
router.get('/find/:id', async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
})


// update product
router.put("/update/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, {
        new: true
      });
  
      return res.status(200).json(updatedProduct);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });


router.delete('/delete/:id', verifyTokenAndAdmin, async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been successfully deleted");
    } catch(err) {
        res.status(500).json(err);
    }
})


module.exports = router;