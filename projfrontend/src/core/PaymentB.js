import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { API } from "../backend";
import { getmeToken, processPaymemt } from "./helper/paymentBHelper";
import { createOrder } from "./helper/orderHelper";
import DropIn from "braintree-web-drop-in-react";

const PaymentB = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    empty: "",
    address: "",
    clientToken: null,
    instance: {},
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      console.log("INFORMATION", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 && userId ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button
              className="btn btn-block btn-outline-success"
              onClick={onPurchase}
            >
              Buy
            </button>
          </div>
        ) : (
          <div className="text-white">
            You are not logged in..
            <br />
            <Link className="btn btn-outline-success" to="/signin">
              Log in
            </Link>
          </div>
        )}
      </div>
    );
  };
  useEffect(() => {
    getToken(userId, token);
  }, []);
  const getFinalPrice = () => {
    let amount = 0;
    products.map((p) => {
      amount += p.price;
    });
    return amount;
  };

  // const getFinalPriceCart = () => {
  //   let amount = 0;
  //   productsInCart.map((p) => {
  //     amount += p.price;
  //   });
  //   return amount;
  // };
  const getDiscount = () => {
    let amount = 0;
    return amount;
  };
  const getPriceAfterDiscount = () => {
    let amount = getFinalPrice() + getDiscount();
    return amount;
  };

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getFinalPrice(),
      };
      processPaymemt(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("PAYMENT SUCCESS");
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };
          createOrder(userId, token, orderData);
          cartEmpty(() => {
            console.log("Chrshed?");
            setReload(!reload);
          });
        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT UN-SUCCESS");
        });
    });
  };

  return (
    <div>
      <div className="text-white">
        <div className="card text-white bg-dark border border-info my-3 mx-3">
          <div className="card-header">Total</div>
          <div className="card-body">
            <div className="row">
              <div className="col-6">Items ({products.length})</div>
              <div className="col-6">$ {getFinalPrice()}</div>
            </div>
            <div className="row">
              <div className="col-6">Discount</div>
              <div className="col-6">
                -$<span id="total_discount">0</span>
              </div>
            </div>
            <hr className="border border-white" />
            <div className="row">
              <div className="col-6">Order Total</div>
              <div className="col-6">${getPriceAfterDiscount()}</div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-white">Card No-4242 4242 4242 4242</p>
      {showbtDropIn()}
    </div>
  );
};
export default PaymentB;
