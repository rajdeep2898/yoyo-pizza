import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "../admin/helper/adminapicall";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";
import PaymentB from "./PaymentB";

export default function Cart() {
  //   console.log("API IS", API);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>Load all Products</h2>
        {products.map((product, index) => {
          return (
            // <div key={index} className="col-4 mb-4">
            <Card
              key={index}
              product={product}
              addToCart={false}
              removeFromCart={true}
              setReload={setReload}
              reload={reload}
            />
            // </div>
          );
        })}
      </div>
    );
    //   getProducts().then((data) => {
    //       if (data.error) {
    //           setError(data.error);
    //       } else {
    //           setProducts(data);
    //       }
    //   });
  };
  const loadCheckout = () => {
    return (
      <div>
        <h2>For checkout</h2>
      </div>
    );
    //   getProducts().then((data) => {
    //       if (data.error) {
    //           setError(data.error);
    //       } else {
    //           setProducts(data);
    //       }
    //   });
  };
  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);
  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3 className="text-white">No Pizzas in cart</h3>
          )}
        </div>
        <div className="col-6">
          {/* <StripeCheckout products={products} setReload={setReload} /> */}
          {products.length > 0 ? (
            <PaymentB products={products} setReload={setReload} />
          ) : (
            <h3 className="text-white">Get Pizzas in cart</h3>
          )}
          {/* <PaymentB products={products} setReload={setReload} /> */}
        </div>

        {/* <h1 className="text-white">All of Pizzas</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product} />
              </div>
            );
          })}
        </div> */}
      </div>
    </Base>
  );
}
