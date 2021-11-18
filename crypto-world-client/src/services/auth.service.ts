import constants from "../constants";
import { ISignInPayload, ISignUpPayload } from "../interfaces/auth.interface";
import history from "../config/history.config";
import axiosApi from "../config/axios.config";
import { routes } from "../routes";

export function signIn(payload: ISignInPayload) {
  const url = `${constants.BASE_URL}/user/login`;

  return axiosApi({ url: url, method: "post", data: payload })
    .then((res) => {
      return {
        data: res.data.data.token,
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

export function getToken() {
  return localStorage.getItem(constants.TOKEN);
}

export function setToken(token: string) {
  localStorage.setItem(constants.TOKEN, token);
}

export function removeToken() {
  const token = getToken();
  if (token) localStorage.removeItem(constants.TOKEN);
}

export function logout() {
  removeToken();
  history.push(routes.login.path);
}

export function signUp(payload: ISignUpPayload) {
  const url = `${constants.BASE_URL}/user/register`;
  return axiosApi({ url: url, method: "post", data: payload })
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

export function forgotPassword(email: string) {
  const url = `${constants.BASE_URL}/user/forgot-password`;
  return axiosApi({ url: url, method: "put", data: { email: email } })
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
export function resetPassword(password: string, token: string | string[] | null) {
  const url = `${constants.BASE_URL}/user/reset-password`;

  return axiosApi({
    url: url,
    method: "put",
    data: { newPassword: password },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
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
