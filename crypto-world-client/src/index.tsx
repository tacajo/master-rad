import React, { useCallback, useEffect, useState } from "react";
import "./assets/style/global.css"; // This file resets the browsers default style and sets the defult fonts
import ReactDOM from "react-dom";
import { Route, Switch, Router } from "react-router-dom";
import { GlobalStyle } from "./assets/style/GlobalStyle";
import { css } from "aphrodite/no-important";
import "./config/i18n.config";
import { routes } from "./routes";
import history from "./config/history.config";
import Header from "./components/header/Header";
import { ISignInPayload } from "./interfaces/auth.interface";
import { getToken, setToken, signIn } from "./services/auth.service";
import Login from "./pages/login/Login";
import { getUser } from "./services/user.service";
import { IUser } from "./interfaces/user.interface";
import { Provider, useDispatch } from "react-redux";
import store from "./store";
import { setBalance } from "./store/actions/userAction";
import "bootstrap/dist/css/bootstrap.min.css";
import Success from "./pages/success/Success";

const App = () => {
  // TODO: Implement ProtectedRoute
  const [isAuth, setIsAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<IUser>({
    email: "",
    firstName: "",
    lastName: "",
    birthday: "",
    company: "",
    titleInTheCompany: "",
    balance: 0,
  });
  const dispatch = useDispatch();

  const loadUser = useCallback(async () => {
    const result = await getUser();
    if (result.error) {
      setMessage(result.message);
      return;
    }
    setUser(result.data);
    console.log(user);
  }, [user]);

  useEffect(() => {
    if (getToken()) {
      //loadUser();
      setIsAuth(true);
    }
  }, [loadUser]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>, payload: ISignInPayload) {
    event.preventDefault();

    const userPayload: ISignInPayload = {
      email: payload.email,
      password: payload.password,
    };

    const response = await signIn(userPayload);

    if (response.error) {
      setMessage(response.message);
      return;
    }
    setToken(response.data);
    setIsAuth(true);
    loadUser();
    dispatch(setBalance(user.balance));
    history.push(routes.home.path);
  }

  function handleAuth() {
    setIsAuth(false);
  }
  return (
    <div className={css(GlobalStyle.authWrapper)}>
      <React.StrictMode>
        <Router history={history}>
          <Header handleAuth={handleAuth} isAuth={isAuth} user={user}></Header>
          <Switch>
            <Route
              exact
              path={routes.login.path}
              render={(props) => <Login onClick={handleSubmit} message={message} {...props} />}
            />
            <Route exact path={routes.home.path} component={routes.home.component} />
            <Route exact path={routes.profile.path} component={routes.profile.component} />
            <Route exact path={routes.signUp.path} component={routes.signUp.component} />
            <Route exact path={routes.forgotPassword.path} component={routes.forgotPassword.component} />
            <Route exact path={routes.resetPassword.path} component={routes.resetPassword.component} />
            <Route exact path={routes.cart.path} component={routes.cart.component} />
            <Route exact path={routes.success.path} render={(props) => <Success {...props} />} />
          </Switch>
        </Router>
      </React.StrictMode>
    </div>
  );
};

export default App;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
