const express = require("express");
const router = express.Router();

const { gettoken, processPayment } = require("../controllers/payments");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, gettoken);
router.post(
  "/payment/braintree/:userId",
  isSignedIn,
  isAuthenticated,
  processPayment
);

module.exports = router;
