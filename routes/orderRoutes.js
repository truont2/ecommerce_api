const router = require("express").Router();
const Order = require("../models/Order");
const {
  tokenAuth,
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
} = require("../utils/jwtauthorization");

// CREATE
router.post("/", verifyTokenAndAuth, async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(200).json(newOrder);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update product
router.put("/update/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const upodatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been successfully deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user Order
// user id
router.get("/find/:userId", verifyTokenAndAuth, async (req, res) => {
  try {
    const orders = await Order.findOne({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all orders
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const allOrders = await Order.find();
    res.status(200).json(allorders);
  } catch (err) {
    res.staus(500).json(err);
  }
});

// get monthly income
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  // get 3 previous months including current
  console.log("order income");
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
  try {
    const data = await Order.aggregate([
      // try to match condition: created at data is greater than last year date
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        // project: passes along the document with the reqeuested fields to the next state in the pipeline
        // only want month so pass that in
        // $month: return the month of a date
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      // Group: separates documents into groups according to a "group key. bundle up data into one object and return it
      // Sum: Calculates and returns the collective sum of numeric values. pass in 1 to say it will aggregate a value of one for each document in the group, thus yielding the total number of documents per group.
      // sum by sales
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
