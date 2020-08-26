import { API } from "../../backend";

//Get all Products
export const getProducts = () => {
  return fetch(`/products`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
