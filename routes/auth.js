const { User } = require('../models');
const router = require('express').Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// register
router.post('/register', async(req, res) =>{
    // async because will return a promise
    const user_password = await bcrypt.hash(
        req.body.password,3);

    const newUser = new User({
        username: req.body.username, 
        email: req.body.email, 
        password: user_password,
    })

    User.create(newUser)
      .then((dbUserData) => res.status(200).json(dbUserData))
      .catch((err) => res.status(500).json(err));
})

// login
router.post('/login', async(req, res) =>{
    // async because will return a promise
    const currentUser = await User.findOne({username: req.body.username});

    if (!currentUser) {
        console.log(currentUser);
        return res.status(400).json({message: "Invalid username/password. Please try again."});
    }

    const validPassword = bcrypt.compare(req.body.password, currentUser.password);

    if (!validPassword) {
        return res.status(400).json({message: "Invalid username/password. Please try again."});
    }

    // get everyting but password
    const {password, ...others} = currentUser._doc;

    const userToken = jwt.sign(
        {
            id: currentUser.id,
            isAdmin:currentUser.isAdmin,
            user_name: currentUser.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        })

    console.log(userToken);
    return res.status(200).json({userToken, ...others})
})

module.exports = router; 
