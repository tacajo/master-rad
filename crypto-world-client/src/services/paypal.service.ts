import constants from "../constants";
import axiosApi from "../config/axios.config";

export function getActiveBillingPlans() {
  const url = `${constants.BASE_URL}/get-billing-plans`;

  return axiosApi({ url: url, method: "get" })
    .then((res) => {
      return {
        data: res.data,
        message: res.data.message,
        error: false,
      };
    })
    .catch((err) => {
      return {
        data: null,
        message: err.response.data.message,
        error: true,
      };
    });
}

export function completeSubscription(orderId: string, subscriptionId: string) {
  const url = `${constants.BASE_URL}/user/paypal-subscription-complete`;

  return axiosApi({ url: url, method: "post", data: { orderId, subscriptionId } })
    .then((res) => {
      return {
        data: res.data,
        message: res.data.message,
        error: false,
      };
    })
    .catch((err) => {
      return {
        data: null,
        message: err.response.data.message,
        error: true,
      };
    });
}
