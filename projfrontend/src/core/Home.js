import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "../admin/helper/adminapicall";

export default function Home() {
  //   console.log("API IS", API);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const loadAllProduct = () => {
    getProducts().then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    loadAllProduct();
  }, []);
  return (
    <Base title="Home Page" description="Welcome to YOYO Pizza">
      <div className="row text-center">
        <h1 className="text-white">All of Pizzas</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
