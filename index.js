const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");

const app = express();
connectDB();

app.use(express.static('public'));
app.use(express.json());

// ROUTE INITIALIZE
app.use("/api",userRoutes);

// INITIALIZE ROUTE
app.listen(process.env.APP_PORT, ()=>{
    console.log(`Running app on ${process.env.APP_PORT}`);
})



