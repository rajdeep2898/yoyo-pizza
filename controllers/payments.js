var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "d995k9zyyy7bb32r",
  publicKey: "hy57qryrbp33kdrk",
  privateKey: "7477c2a69c0a12290a9e6fc533f7f5db",
});

exports.gettoken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
    //   var clientToken = response.clientToken;
  });
};

exports.processPayment = (req, res) => {
  var nonceFromTheClient = req.body.paymentMethodNonce;
  var amountFromTheClient = req.body.amount;

  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    function (err, result) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
};
