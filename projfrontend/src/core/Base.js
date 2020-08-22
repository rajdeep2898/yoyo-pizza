import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My Description",
  className = "bg-dark twxt-white p-4",
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jubotron bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark mt-auto pt-3">
        <div className="container-fluid bg-success text-white text-center">
          <h4>Developed by Rajdeep</h4>
          <button className="btn btn-warning btn-lg">Contact</button>
        </div>
        {/* <div className="container">
          <span className="text-muted">Last modified @2020</span>
        </div> */}
      </footer>
    </div>
  );
};
export default Base;
