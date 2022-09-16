const express = require('express');
const dotenv = require("dotenv")
const routes = require("./routes");
const cors = require("cors");
dotenv.config();
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", routes);

// connect to the database
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server for running on port ${PORT}!`);
    });
  });
