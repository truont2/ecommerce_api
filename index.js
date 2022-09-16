const express = require('express');
const dotenv = require("dotenv")
dotenv.config();
const mongoose = require('mongoose');
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", routes);


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB connection was successful"))
.catch((err) => {
    console.log(err)
})

app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
})