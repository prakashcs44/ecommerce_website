const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const User = require("../models/user.js");
const sendToken = require("../utils/sendToken.js");
const sendEmail = require("../utils/sendEmail.js");
const crypto  = require("crypto");
const cloudinary = require("cloudinary");
const Product = require("../models/product.js");
const Cart = require("../models/cart.js");


exports.registerUser = catchAsyncError(async (req,res,next)=>{
 
   const {name,email,password,avatar} = req.body;
  
   const userExists = await User.findOne({email});
  
   if(userExists){
      return next(new ErrorHandler("User with this email already exists"));
   }
   
   const mycloud = await cloudinary.v2.uploader.upload(avatar,{
      folder:"avatars",
      width:150,
      crop:"scale",
   });
   


   const user = await User.create({
    name,email,password,
    avatar:{
        public_id:mycloud.public_id,
        url:mycloud.secure_url,
    },
   });
   

   return sendToken(user,201,res);

});


exports.loginUser = catchAsyncError(async (req,res,next)=>{
   const {email,password} = req.body;
   if(!email||!password){
      return next(new ErrorHandler("Please enter email and password"));
   }

  const user = await User.findOne({email}).select("+password");
   if(!user){
      return next(new ErrorHandler("Invalid email or password"));
   }
   
   const isPasswordMatched = await user.comparePassword(password);

   if(!isPasswordMatched){
      return next(new ErrorHandler("Invalid email or password"),401);
   }
   
   return sendToken(user,200,res);


})

exports.logoutUser = catchAsyncError(async (req,res,next)=>{
   res.cookie("token",null,{
      httpOnly:true,
      expires:new Date(Date.now()),
      sameSite:"None",
      secure:true,

     
   });
   res.status(200).json({
      success:true,
      message:"Logged out successfully"
   })
});



exports.forgotPassword = catchAsyncError(async (req,res,next)=>{
     const {email} = req.body;
     const user = await User.findOne({email});
     if(!user){
      return next(new ErrorHandler("User not found",404));
     }
      const resetToken = user.getResetPasswordToken();
      await user.save({validateBeforeSave:false});

      const resetPasswordUrl = `${req.get("origin")}/password/reset/${resetToken}`;
      const resetPasswordMessage = `Your password reset token is :- \n\n ${resetPasswordUrl} \n \n if you have not requested this email
      then please ignore it`;

      try{
        await sendEmail({
           email:user.email,
           subject:"Password recovery",
           message:resetPasswordMessage
        });

        res.status(200).json({
         success:true,
         message:`Email sent to ${user.email} successfully`
        })
      }
      catch(err){
         user.resetPasswordToken = undefined;
         user.resetPasswordExpire = undefined;
         await user.save({validateBeforeSave:false});
         return next(new ErrorHandler(err.message),500);
      }
})



exports.resetPassword = catchAsyncError(async (req,res,next)=>{
   // creating token hash
   const resetPasswordToken = crypto
   .createHash("sha256")
   .update(req.params.token)
   .digest("hex");

 const user = await User.findOne({
   resetPasswordToken,
   resetPasswordExpire: { $gt: Date.now() },
 });

 if (!user) {
   return next(
     new ErrorHandler(
       "Reset Password Token is invalid or has been expired",
       400
     )
   );
 }

 if (req.body.password !== req.body.confirmPassword) {
   return next(new ErrorHandler("Password does not password", 400));
 }

 user.password = req.body.password;
 user.resetPasswordToken = undefined;
 user.resetPasswordExpire = undefined;

 await user.save();

 sendToken(user, 200, res);

})


exports.getUserDetails = catchAsyncError(async (req,res,next)=>{
  
 
   const user  = await User.findById(req.user._id);
   res.status(200).json({
      success:true,
      user
   });
})



exports.updatePassword = catchAsyncError(async (req,res,next)=>{
   const user = await User.findById(req.user._id).select("+password");
   const {oldPassword,newPassword,confirmPassword} = req.body;
   if(newPassword!==confirmPassword) {
      return next(new ErrorHandler("Password does not match"),400);
   }

   const isMatched = await user.comparePassword(oldPassword);

   if(!isMatched){
      return next(new ErrorHandler("old password is incorrect"),400);
   }


   user.password = newPassword;
   await user.save();


   sendToken(user,200,res);
})

exports.updateProfile = catchAsyncError(async (req,res,next)=>{
  
   const {name,email,avatar} = req.body;
    const newUserData = {email,name};
    if (avatar&&avatar!=="null"&&avatar !== "") {
      const user = await User.findById(req.user._id);
  
      const imageId = user.avatar.public_id;
  
      await cloudinary.v2.uploader.destroy(imageId);
  
      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
  
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }



   const user = await User.findByIdAndUpdate(req.user._id,newUserData,{
      new:true,
      runValidators:true,
      useFindAndModify:true
   })

   res.status(200).json({
      success:true,
      user
   });

})




exports.getAllUsers = catchAsyncError(async (req,res,next)=>{
   const users = await User.find();

   res.status(200).json({
      success:true,
      users
   })
})


exports.getSingleUser = catchAsyncError(async (req,res,next)=>{
   const user = await User.findById(req.params.id);

   if(!user){
      return next(new ErrorHandler(`User with ${req.params.id} id not found`));
   }

   res.status(200).json({
      success:true,
      user
   })
})


exports.updateUserRole = catchAsyncError(async (req,res,next)=>{
   const {id} = req.params;
   const {role} = req.body;
  
   const newUserData = {role};
   const user = await User.findByIdAndUpdate(id,newUserData,{
      new:true,
      runValidators:true,
      useFindAndModify:true
   })

   res.status(200).json({
      success:true,
      user
   });

})



exports.deleteUser = catchAsyncError(async (req,res,next)=>{
   const {id} = req.params;

   const user = await User.findById(id);
  
   if(!user){
      return next(new ErrorHandler(`User with ${id} id not found`));
   }

   await user.remove();
   res.status(200).json({
      success:true,
      message:"User deleted successfully"
   })
})


exports.addItemToCart = catchAsyncError(async (req,res,next)=>{
   const { productId, quantity } = req.body;
   
   
    const user = await User.findById(req.user._id);
    if (!user) {
        return next(new ErrorHandler("User not found",404));
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler("Product not found",404));
    }

    let cart = await Cart.findOne({user:req.user._id});

    if(!cart){
      cart = await Cart.create({
         user:req.user._id,
         items:[],
      })
    }
    
    const itemAlreadyAdded =   cart.items.find(item=>item.product==productId);
    if(itemAlreadyAdded){
       return next(new ErrorHandler("Item already added to cart"));
    }


    const newCartItem = {
       product: productId,
       quantity: quantity,
       };
    
    cart.items.push(newCartItem);
    await cart.save();
    await cart.populate("items.product");
    console.log(cart.items);
    
    res.status(200).json({ success: true, cart: cart.items });


})

exports.getCardItems = catchAsyncError(async (req,res,next)=>{
   const cart  = await Cart.findOne({user:req.user._id});
   if(cart){
      await cart.populate("items.product");
   }
   res.status(200).json({
      success:true,
       cart:cart?.items||[],
   })

})

exports.removeItemFromCart = catchAsyncError(async (req,res,next)=>{
  
    const { productId } = req.body;


    const user = await User.findById(req.user._id);
    if (!user) {
        return next(new ErrorHandler("User not found",404));
    }

    
   
    const cart =await  Cart.findOne({user:req.user._id});
     //error can happend here
    const newCart = cart.items.filter((cart)=>cart.product!=productId);
    cart.items = newCart;
    
   
    await cart.save();

    
    
    
    res.status(200).json({ success: true, cart: cart.items });

})