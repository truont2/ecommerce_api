const {connect, connection} = require('mongoose');

// default db connection port at 27017
// 'mongodb://localhost:27017/dbname'
// if no db created then it will create one for you automatically

connect(process.env.MONGO_URL)
.then(() => console.log("DB connection was successful"))
.catch((err) => {
    console.log(err)
})

module.exports = connection;