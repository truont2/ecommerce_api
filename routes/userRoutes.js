const router = require("express").Router();
const {
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("../utils/jwtauthorization");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// get all users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
      const query = req.query.new;
      const allUsers = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(400).json(error);
    }
  });

//GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        // try to match condition: created at data is greater than last year date
        { $match: { createdAt: { $gte: lastYear } } },
        {
            // project: passes along the document with the reqeuested fields to the next state in the pipeline
            // only want month so pass that in 
            // $month: return the month of a date
          $project: {
            month: { $month: "$createdAt" },
          },  
        },
        // Group: separates documents into groups according to a "group key. bundle up data into one object and return it
        // Sum: Calculates and returns the collective sum of numeric values. pass in 1 to say it will aggregate a value of one for each document in the group, thus yielding the total number of documents per group.
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Update
router.put("/update/:id", verifyTokenAndAuth, async (req, res) => {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 3);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/delete/:id", verifyTokenAndAuth, async (req, res) => {
  // grabbing a user actually then deleteding it.
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 3);
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User was sucessfully deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get a single user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err.message);
  }
});


module.exports = router;
