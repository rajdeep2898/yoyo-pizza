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
      <h3>test BT Price-{getFinalPrice()}</h3>
      {showbtDropIn()}
    </div>
  );
};
export default PaymentB;
