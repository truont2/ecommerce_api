const {connect, connection} = require('mongoose');

// default db connection port at 27017
// 'mongodb://localhost:27017/dbname'
// if no db created then it will create one for you automatically
const connectionString = 
    process.env.MONGODB_URI || 'mongodb://localhost:27017/testingDB';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;