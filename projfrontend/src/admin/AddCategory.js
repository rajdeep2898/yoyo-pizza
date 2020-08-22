import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
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
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
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
        Category added successfully.
      </div>
    );
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

  return (
    <Base
      title="Create Category"
      description="Add category for new Pizza"
      className="container bg-info p-4"
    >
      <div className="row">
        <div className="col-md-12  text-left">
          {successMessage()}
          {errorMessage()}
        </div>
      </div>
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {goBack()}
          {myCategoryForm()}
        </div>
      </div>
    </Base>
  );
};
export default AddCategory;
