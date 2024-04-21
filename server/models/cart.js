const mongoose = require("mongoose");



const cartSchema = new mongoose.Schema({
   user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
   },
   items:[
      {
          name:{
              type:String,
              required:true,
          },
          price:{
              type:Number,
              required:true,
          },
          quantity:{
              type:Number,
              required:true,
          },
          images:[
            {
                public_id: {
                  type: String,
                  required: true,
                },
                url: {
                  type: String,
                  required: true,
                },
              },
          ],
          product:{
              type:mongoose.Schema.ObjectId,
              ref:"Product",
              required:true
          }
      }
   ]
})


module.exports = mongoose.model("Cart",cartSchema);