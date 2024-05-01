const mongoose = require("mongoose");



const cartSchema = new mongoose.Schema({
   user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
   },
   items:[
      {
          product:{
              type:mongoose.Schema.ObjectId,
              ref:"Product",
              required:true
          },
          quantity:{
            type:Number,
            required:true,
            default:1,
          }
      }
   ]
})


module.exports = mongoose.model("Cart",cartSchema);