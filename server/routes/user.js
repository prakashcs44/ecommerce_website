const router = require("express").Router();
const userController  = require("../controllers/user.js");
const { isUserAuthenticated,authorizeRoles } = require("../middleware/auth.js");


router.post("/register",userController.registerUser);
router.post("/login",userController.loginUser);


router.post("/password/forgot",userController.forgotPassword);
router.put("/password/reset/:token",userController.resetPassword);
router.put("/password/update",isUserAuthenticated,userController.updatePassword)

router.get("/logout",userController.logoutUser)
router.get("/me",isUserAuthenticated,userController.getUserDetails);
router.put("/me/update",isUserAuthenticated,userController.updateProfile);
router.get("/all",isUserAuthenticated,authorizeRoles("admin"),userController.getAllUsers);
router.get("/all/:id",isUserAuthenticated,authorizeRoles("admin"),userController.getSingleUser);
router.put("/update-role/:id",isUserAuthenticated,authorizeRoles("admin"),userController.updateUserRole);
router.post("/cart/add",isUserAuthenticated,userController.addItemToCart);
router.post("/cart/remove",isUserAuthenticated,userController.removeItemFromCart)
router.get("/cart",isUserAuthenticated,userController.getCardItems);
module.exports = router;