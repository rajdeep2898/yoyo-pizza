import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import {
  getCategories,
  getProduct,
  updateProduct,
  getCategory,
  updateCategory,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

export default function UpdateCategory({ match }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      //   console.log("DATA", data);
      if (data.error) {
        //   setValues({ ...values, error: data.error });
        setError(data.error);
      } else {
        setName(data.name);
      }
    });
  };
  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">
          Home
        </Link>
      </div>
    );
  };

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    updateCategory(match.params.categoryId, user._id, token, {
      name: name,
    }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };
  const myCategoryForm = () => {
    return (
      <form action="">
        <div className="form-group">
          <p className="lead"> Enter the Category</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="Ex- Non-Veg"
          />
          <button onClick={onSubmit} className="btn btn-outline-info">
            Create Category
          </button>
        </div>
      </form>
    );
  };
  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        Category changed successfully.
      </div>
    );
  };
  return (
    <Base
      title="Update Category!"
      description="Update category for new Pizza"
      className="container bg-info p-4"
    >
      {goBack()}
      <div className="row">
        <div className="col-md-12  text-left">
          {/* {lodingMessage()} */}
          {successMessage()}
          {errorMessage()}
        </div>
      </div>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">{myCategoryForm()}</div>
      </div>
      {/* {performRedirect()} */}
    </Base>
  );
}
