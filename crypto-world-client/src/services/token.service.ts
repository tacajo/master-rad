import constants from "../constants";
import axiosApi from "../config/axios.config";
import { IToken } from "../interfaces/token.interface";

export function addToken(token: IToken) {
  const url = `${constants.BASE_URL}/token`;
  return axiosApi({ url: url, method: "post", data: token })
    .then((res) => {
      return {
        data: null,
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

export function getActiveTokens() {
  const url = `${constants.BASE_URL}/token/active`;
  return axiosApi({ url: url, method: "get" })
    .then((res) => {
      return {
        data: res.data.data,
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
