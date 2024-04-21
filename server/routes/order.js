const router = require("express").Router();
const orderController  = require("../controllers/order.js");
const {isUserAuthenticated,authorizeRoles} = require("../middleware/auth.js");



router.post("/new",isUserAuthenticated,orderController.newOrder);
router.get("/me",isUserAuthenticated,orderController.myOrders);
router.get("/all",isUserAuthenticated,authorizeRoles("admin"),orderController.getAllOrders);
router.delete("/:id",isUserAuthenticated,authorizeRoles("admin"),orderController.deleteOrder);
router.put("/:id",isUserAuthenticated,authorizeRoles("admin"),orderController.updateOrder);
router.get("/:id",isUserAuthenticated,orderController.getSingleOrder);
router.get("/all/:id",isUserAuthenticated,authorizeRoles("admin"),orderController.getSingleOrder)

module.exports = router;