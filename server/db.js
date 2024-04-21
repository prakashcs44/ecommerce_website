const mongoose = require("mongoose");


const connectToDb = ()=>{
    mongoose.connect(process.env.MONGODB_URI)
    .then((data)=>{
        console.log("DATABASE CONNECTED")
    })
}


module.exports = connectToDb;
 