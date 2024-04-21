const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/payment.js");
const router = express.Router();
const {isUserAuthenticated } = require("../middleware/auth");

router.post("/process",isUserAuthenticated, processPayment);

router.get("/stripeapikey",isUserAuthenticated, sendStripeApiKey);

module.exports = router;