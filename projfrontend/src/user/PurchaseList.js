import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getPurchaseList } from "./helper/userapicalls";
// import { getProducts, deleteProduct, getOrders } from "./helper/adminapicall";

const PurchaseList = () => {
  const [orders, setOrders] = useState([]);
  const { user, token } = isAuthenticated();

  const preload = () => {
    // console.log(1);
    getPurchaseList(user._id, token).then((data) => {
      console.log("order list", data);
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  //   const deleteThisProduct = (productId) => {
  //     deleteProduct(productId, user._id, token).then((data) => {
  //       if (data.error) {
  //         console.log(data.error);
  //       } else {
  //         preload();
  //       }
  //     });
  //   };

  return (
    <Base title="Welcome admin" description="See Purchases here">
      <h2 className="mb-4 text-white">All orders:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">User Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total {orders.length} Purchases
          </h2>
          <div className="card-group vgr-cards d-flex justify-content-center">
            {orders.map((order, index) => {
              return (
                <div key={index} className="row text-center mb-2 ">
                  <div
                    className="card shadow-lg mb-3 "
                    style={{ width: "50rem" }}
                  >
                    <div className="card-header">Order Id-{order._id}</div>
                    <div className="card-body">
                      <div className="row ">
                        <div className="col-sm-7">
                          <div className="card-block">
                            <table className="table table-striped">
                              <tr>
                                <td>
                                  <b>Order Details</b>
                                </td>
                                <td colspan="2">
                                  <b>Price</b>
                                </td>
                              </tr>
                              {order.products.map((product, index) => {
                                return (
                                  <tr>
                                    <td>
                                      <ul>
                                        <li>{product.name} </li>
                                      </ul>
                                    </td>
                                    <td>
                                      <b>{product.price} </b>
                                    </td>
                                  </tr>
                                );
                              })}
                            </table>
                            <p>Order Status-{order.status}</p>
                          </div>
                        </div>

                        <div className="col-md-5">
                          <div style={{ textAlign: "center" }}>
                            <h3>Order Total</h3>
                            <h3>
                              <span style={{ color: "green" }}>
                                Rs-{order.amount}
                              </span>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Base>
  );
};
export default PurchaseList;
