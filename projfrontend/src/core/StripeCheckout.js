import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    empty: "",
    address: "",
  });
  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  console.log("check front products", products);

  const getFinalPrice = () => {
    let amount = 0;
    products.map((p) => {
      amount += p.price;
    });
    return amount;
  };
  // const makePayment = (token) => {
  //   const body = {
  //     token,
  //     products,
  //   };
  //   const headers = {
  //     "Content-Type": "application/json",
  //   };
  //   return fetch(`${API}/stripepayment`, {
  //     method: "POST",
  //     headers,
  //     body: JSON.stringify(body),
  //   })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((err) => console.log(err));
  // };
  const makePayment = (token) => {
    console.log(token);
    console.log(products);

    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        //call further methods
        const { status } = response;
        console.log("STATUS_", status);
        cartEmpty();
      })
      .catch((error) => console.log(error));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51HIa8EJT2DHCVpNYkayDAUEp6kfMbzoocW0006CUulVJEyYn64MiNTkE17oaf7anaQcmIN138oDMFvx5ETuU4qZR00Ty2SRxPV"
        token={makePayment}
        currency="INR"
        amount={getFinalPrice() * 100}
        name="Buy pizzas.."
        description="Order will be received within 5 min.."
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe loaded {getFinalPrice()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
