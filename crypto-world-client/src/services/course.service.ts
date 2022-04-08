import axiosApi from "../config/axios.config";
import constants from "../constants";
import { ICourse } from "../interfaces/course.interface";

export function getAllCourses() {
  const url = `${constants.BASE_URL}/course/all`;
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

export function getCoursesFromCart() {
  const url = `${constants.BASE_URL}/course/cart`;
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

export function pay(courses: ICourse[]) {
  const url = `${constants.BASE_URL}/subscription`;
  return axiosApi({ url: url, data: courses, method: "post" })
    .then((res) => {
      window.location = res.data.forwardLink;
      return {
        res,
      };
    })
    .catch((err) => {
      return {
        err,
      };
    });
}

export function successfulPayment(paymentId: string, token: string, PayerID: string) {
  const url = `${constants.BASE_URL}/success`;
  if (paymentId && token && paymentId)
    return axiosApi({
      url: url,
      method: "get",
      params: { paymentId, token, PayerID },
    })
      .then((res) => {
        return {
          res,
        };
      })
      .catch((err) => {
        return {
          err,
        };
      });
}

export function addToCart(course_id: String) {
  const url = `${constants.BASE_URL}/course/cart`;
  return axiosApi({ url: url, method: "post", data: { course_id: course_id } })
    .then((res) => {
      return {
        res,
      };
    })
    .catch((err) => {
      return {
        err,
      };
    });
}
