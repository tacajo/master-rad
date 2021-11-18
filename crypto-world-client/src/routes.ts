import Cart from "./pages/cart/Cart";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile-page/Profile";
import ResetPassword from "./pages/reset-password/ResetPassword";
import SignUp from "./pages/signup/SignUp";
import Success from "./pages/success/Success";

export const routes = {
  login: {
    name: "Login",
    path: "/",
    component: Login,
  },
  home: {
    name: "Home",
    path: "/home",
    component: Home,
  },
  profile: {
    name: "Profile",
    path: "/profile",
    component: Profile,
  },
  signUp: {
    name: "SignUp",
    path: "/signup",
    component: SignUp,
  },
  forgotPassword: {
    name: "ForgotPassword",
    path: "/forgot-password",
    component: ForgotPassword,
  },
  resetPassword: {
    name: "ResetPassword",
    path: "/reset-password",
    component: ResetPassword,
  },
  cart: {
    name: "Cart",
    path: "/cart",
    component: Cart,
  },
  success: {
    name: "Success",
    path: "/success",
    component: Success,
  },
};
