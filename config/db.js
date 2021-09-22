const mongoose =  require("mongoose");
require("dotenv").config();

const connectDB = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser : true,useUnifiedTopology : true
    });
    const connection = mongoose.connection;

    
    connection.once('open', () => {
        console.log('Database connected')
    }).on('error', function (err) {
        console.log(`Error is here ${err}`);
    });
}

module.exports = connectDB;

