const router = require("express").Router();
const productController  = require("../controllers/product.js");
const {isUserAuthenticated,authorizeRoles} = require("../middleware/auth.js");

router.get("/",productController.getAllProducts);
router.post("/new",isUserAuthenticated,authorizeRoles("admin"),productController.createNewProduct);
router.get("/all",isUserAuthenticated,authorizeRoles("admin"),productController.getAdminProducts)
router.get("/all/:id",isUserAuthenticated,authorizeRoles("admin"),productController.getSingleProduct)



router.put("/review",isUserAuthenticated,productController.createProductReview);
router.get("/reviews/:id",isUserAuthenticated,productController.getProductReviews);
router.get("/delete-review",isUserAuthenticated,productController.deleteReview);
router.put("/:id",isUserAuthenticated,authorizeRoles("admin"),productController.updateProduct);
router.get("/:id",productController.getProductDetails);
router.delete("/:id",isUserAuthenticated,authorizeRoles("admin"),productController.deleteProduct)
module.exports  = router;