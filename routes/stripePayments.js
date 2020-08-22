const express = require("express");
const router = express.Router();

const { makepayment } = require("../controllers/stripePayments");

router.post("/stripepayment", makepayment);

module.exports = router;
