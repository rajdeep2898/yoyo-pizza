const { API } = require("../../backend");

export const getmeToken = (userId, token) => {
  return fetch(`${API}/payment/gettoken/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify({ order: orderData }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const processPaymemt = (userId, token, paymentInfo) => {
  return fetch(`${API}/payment/braintree/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentInfo),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
