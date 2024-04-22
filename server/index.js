const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const connectToDatabase = require("./db.js");
const productRoutes = require("./routes/product.js");
const userRoutes = require("./routes/user.js");
const orderRoutes = require("./routes/order.js");
const paymentRoutes = require("./routes/payment.js")
const erorMiddleware = require("./middleware/error.js");
const cors = require("cors");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(fileUpload())

app.use(cors({
    origin:"*",
    credentials:true,
}));




app.use("/api/product",productRoutes);
app.use("/api/user",userRoutes);
app.use("/api/order",orderRoutes);
app.use("/api/payment",paymentRoutes);

app.use(erorMiddleware);

app.get("/",(req,res)=>{
    res.json({message:"Welcome"});
})

process.on("uncaughtException",(err)=>{
    console.log(err);
    process.exit(1);
})


connectToDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });



const server = app.listen(process.env.PORT,()=>{
    console.log(`SERVER STARTED AT:${process.env.PORT}`)
})




process.on("unhandledRejection",(err)=>{
    console.log("ERR: ",err);
    server.close(()=>{
        process.exit(1);
    })
});


