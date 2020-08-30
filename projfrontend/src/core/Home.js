import React, { useState, useEffect } from "react";
import "../styles.css";
import "../_scss_mail.scss";

import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "../admin/helper/adminapicall";
import { loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";

export default function Home() {
  //   console.log("API IS", API);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const [productsInCart, setProductsInCart] = useState([]);
  // const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);

  const loadAllProduct = () => {
    getProducts().then((data) => {
      // console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    loadAllProduct();
    setProductsInCart(loadCart());
  }, [reload]);

  const getFinalPrice = () => {
    let amount = 0;
    productsInCart.map((p) => {
      amount += p.price;
    });
    return amount;
  };
  const getDiscount = () => {
    let amount = 0;
    return amount;
  };
  const getPriceAfterDiscount = () => {
    let amount = getFinalPrice() + getDiscount();
    return amount;
  };

  return (
    <div>
      <Base title="" description="">
        <header id="home" class="top-hero jumbotron-fluid p-b-3 bg-faded">
          <div class="container animated fadeInUp">
            <h1 class="display-3">Welcome to Yoyo Pizza</h1>
            <p class="lead m-t-1">Order Pizza online</p>
            <p class="lead m-t-1 m-b-2">Yummy pizza delivered fast & fresh.</p>
            <a
              href="#middle"
              type="button"
              class="btn btn-lg btn-danger m-t-1"
              data-toggle="modal"
              data-target="#signup_form_modal"
            >
              Order
            </a>
            <button
              type="button"
              class="js-scroll btn btn-lg  m-t-1"
              data-scroll-to="#speakers"
            >
              <Link to="/cart" className="nav-link text-white">
                Go to Cart
              </Link>
            </button>
          </div>
        </header>

        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-3.1.1.js"
        ></script>

        <script
          type="text /javascript"
          src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
        ></script>

        <div id="middle" className="row text-center">
          <h1 className="text-white">Our Menu</h1>
          <div className="row">
            <div className="col-9">
              <div className="row">
                {products.map((product, index) => {
                  return (
                    <div key={index} className="col-4 mb-4">
                      <Card
                        product={product}
                        setReload={setReload}
                        reload={reload}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-3 text-white">
              <div className="card text-white bg-dark border border-info my-3 mx-3">
                <div className="card-header">Total</div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-6">Items ({productsInCart.length})</div>
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
                    <div className="btn btn-block btn-success mt-2">
                      <Link to="/cart" className="nav-link text-white">
                        Go to Cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Base>
    </div>
  );
}
