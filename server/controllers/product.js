const Product = require("../models/product.js");
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const ApiFeatures = require("../utils/apiFeatures.js");
const cloudinary = require("cloudinary");

exports.createNewProduct = catchAsyncError(async (req,res)=>{

    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
     
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
    req.body.user = req.user.id;
  
    const product = await Product.create(req.body);
  
    res.status(201).json({
      success: true,
      product,
    });
});




exports.getAllProducts = catchAsyncError(async (req,res)=>{
    const resultPerPage = 2;
    const allProducts = await Product.find();
    const apiFeature = new ApiFeatures(allProducts, req.query)
      .search()
      .filter();
  
    let products =  apiFeature.products;

  
    let productsCount = products.length;
  
    apiFeature.pagination(resultPerPage);

    products =  apiFeature.products;
  
     
  
    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      
    });
 });



 exports.getAdminProducts  = catchAsyncError(async (req,res,next)=>{
  const products = await Product.find();

  res.status(200).json({success:true,products});
 })


 
exports.updateProduct = catchAsyncError( async (req,res,next)=>{
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  
  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });

})


exports.deleteProduct = catchAsyncError(async (req,res,next)=>{
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if(!product) {
        return next(new ErrorHandler("Product not found",404));
    }
    
    await Product.deleteOne({ _id: productId });

    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })

}
)



exports.getProductDetails = catchAsyncError( async (req,res,next)=>{
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if(!product) {
        return next(new ErrorHandler("Product not found",404));
    }

    return res.status(200).json({
        success:true,
        product
    });
});



exports.createProductReview = catchAsyncError(async (req,res,next)=>{
    const {rating,comment,productId} = req.body;
    
    const {user} = req;
    const review = {
        user:user._id,
        name:user.name,
        rating:Number(rating),
        comment,
    }

    const product =await  Product.findById(productId);
    
    const isReviewed = product.reviews.find(rev=>rev.user.toString()===user._id.toString());
   


    if(isReviewed){
      product.reviews.forEach(rev=>{
        if(rev.user.toString()===user._id.toString()){
            rev.rating = rating;
            rev.comment = comment;
        }
      })

      

    }



    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    

  product.rating = product.reviews.reduce((sum,rev)=>sum+rev.rating,0)/product.numOfReviews;


  await product.save({
    validateBeforeSave:false,

  });

  res.status(200).json({
    success:true
  });

});


exports.getProductReviews = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product){
        return next(new ErrorHandler(`Product with id:${id} not found`),404);
    }

   res.status(200).json({
       success:true,
       reviews:product.reviews,
   });

});



exports.deleteReview = catchAsyncError(async (req,res,next)=>{
     const {reviewId,productId} = req.query;
     const product = await Product.findById(productId);

    if(!product){
        return next(new ErrorHandler(`Product with id:${id} not found`),404);
    }
   
    const reviews = product.reviews.filter(rev=>rev._id.toString()!==reviewId);
    

    const newRating = reviews.reduce((sum,rev)=>sum+rev.rating,0)/reviews.length;

    product.reviews = reviews;
    product.rating  =  newRating;
    product.numOfReviews = reviews.length;
    await product.save();


   res.status(200).json({
       success:true,
   });

});


exports.getSingleProduct = catchAsyncError(async (req,res,next)=>{
  const product = await Product.findById(req.params.id);
  
  if(!product){
     return next(new ErrorHandler(`Product with ${req.params.id} id not found`));
  }

  res.status(200).json({
     success:true,
     product
  })
})
