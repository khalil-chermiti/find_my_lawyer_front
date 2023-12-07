const PAYMENT_API = "http://localhost:3000/payment/checkout";

interface IPaymentAPIResponse {
  payment_url: string;
}

const paymentAPI = async (token: string) => {
  const response = await fetch(PAYMENT_API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return (await response.json()) as IPaymentAPIResponse;
};

export default paymentAPI;
