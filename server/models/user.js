const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt  = require("jsonwebtoken");
const crypto = require("crypto");
const cloudinary = require("cloudinary");


const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Please Enter your name"],
    maxLength:[30,"Name should not have more than 30 characters"],
    minLength:[3,"Name should not have less than 3 characters"]
  },
  email:{
     type:String,
     required:[true,"Please enter your email"],
     unique:true,
     validate:[validator.isEmail,"Please enter a valid email"]
  },
  password:{
    type:String,
    required:[true,"Please enter your password"],
    minLength:[8,"Password should be greater than 8 characters"],
    select:false,

  },
 avatar:{
    public_id:{
        type: String,
        
    },
    url:{
        type: String,
       
    }

 },
 role:{
    type:String,
    enum:["user","admin"],
    default:"user",
   
 },
 resetPasswordToken:String,
 resetPasswordExpire:Date,
 

},{timestamps:true});


userSchema.pre("save",async function(next){
   if(!this.isModified("password")){
      return next();
   }
   this.password =  await bcrypt.hash(this.password,10)

});


userSchema.pre('remove', async function(next) {
   try{
      const imageId = this.avatar?.public_id;
      if (imageId) {
          await cloudinary.uploader.destroy(imageId);
      }
      return next();
   }
   catch(err){
      return next(err);
   }
  
});



userSchema.methods.getJWTToken = function(){
   const payload = {
      id:this._id,
   }

   return jwt.sign(payload,process.env.JWT_SECRET,{
      expiresIn:process.env.JWT_EXPIRE,
   });

}

userSchema.methods.comparePassword =  async function(password){
    return await bcrypt.compare(password,this.password);
}



userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.
    createHash("sha256").
    update(resetToken).
    digest("hex");
    
    this.resetPasswordExpire = Date.now()+15*60*1000;
    return resetToken;
}


module.exports = mongoose.model("User",userSchema);