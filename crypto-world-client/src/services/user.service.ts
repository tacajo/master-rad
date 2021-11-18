import constants from "../constants";
import axiosApi from "../config/axios.config";

export function getUser() {
  const url = `${constants.BASE_URL}/user`;
  return axiosApi({ url: url, method: "get" })
    .then((res) => {
      return {
        data: res.data.data,
        message: "Success",
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
