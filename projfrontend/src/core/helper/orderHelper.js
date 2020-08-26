const { API } = require("../../backend");

export const createOrder = (userId, token, orderData) => {
  console.log("CHECK FOR API FE", orderData);
  return fetch(`/api/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: orderData }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
