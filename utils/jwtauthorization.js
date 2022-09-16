const jwt = require('jsonwebtoken');
require('dotenv').config();

// middleware just verifies and checks the token
const tokenAuth = function (req,res,next){
    const token = req.headers?.authorization?.split(" ").pop();
    if(!token){
        return res.status(403).json({msg:"invalid token!"})
    }
    jwt.verify(token, process.env.JWT_SECRET, (err,data)=>{
        if(err){
            return res.status(403).json({msg:"invalid token!"})
        }
        req.user=data;
        // console.log(req.user, "plzzzzzzzzzzzzz")
        next()
    })
}

const verifyTokenAndAuth = (req, res, next) => {
    tokenAuth(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };

  const verifyTokenAndAdmin = (req, res, next) => {
    tokenAuth(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };

module.exports = {tokenAuth, verifyTokenAndAuth, verifyTokenAndAdmin}