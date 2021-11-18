import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { css } from "aphrodite/no-important";
import { LoginStyle as style } from "./LoginStyle";
import { GlobalStyle } from "../../assets/style/GlobalStyle";
import { useState } from "react";
import { ISignInPayload } from "../../interfaces/auth.interface";
import { ILoginProps } from "../../interfaces/props.interface";

export default function Login({ onClick, message }: ILoginProps) {
  const [state, setState] = useState<ISignInPayload>({
    email: "",
    password: "",
  });

  const { t } = useTranslation();
  function validateform() {
    return state.email.length > 0 && state.password.length > 0;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setState({
      ...state,
      [e.currentTarget.name]: value,
    });
  }

  return (
    <div className={css(style.loginWrapper)}>
      <form className={css(GlobalStyle.form)} onSubmit={(e) => onClick(e, state)}>
        <h1 className={css(GlobalStyle.title)}>{t("login.title")}</h1>
        <div>
          <input
            className={css(GlobalStyle.input)}
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            required
            placeholder={t("login.form.email.placeholder")}
          />
        </div>
        <div>
          <input
            className={css(GlobalStyle.input)}
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder={t("login.form.password.placeholder")}
            required
          />
        </div>
        <Link to="/forgot-password" className={css(style.link)}>
          {t("login.forgotPassword")}
        </Link>
        <button className={css(GlobalStyle.button)} type="submit" disabled={!validateform()}>
          {t("login.buttons.login")}
        </button>
        <div>
          <p>{t("login.message")}</p>
          <Link to="/signUp" className={css(style.link)}>
            {t("login.buttons.signUp")}
          </Link>
        </div>
        {message && <small className={css(style.message)}>{message}</small>}
      </form>
    </div>
  );
}
