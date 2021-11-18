import { GlobalStyle } from "../../assets/style/GlobalStyle";
import { css } from "aphrodite/no-important";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { resetPassword } from "../../services/auth.service";
import queryString from "query-string";
import { routes } from "../../routes";
import { IPassword } from "../../interfaces/user.interface";

export default function ResetPassword() {
  const [state, setState] = useState<IPassword>({
    password: "",
    repeatPassword: "",
  });
  const [message, setMessage] = useState("");
  const { t } = useTranslation();
  const { search } = useLocation();
  const history = useHistory();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setState({
      ...state,
      [e.currentTarget.name]: value,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.repeatPassword !== state.password) {
      setMessage("Password and confirm password don't match.");
      return;
    }

    const token = queryString.parse(search).token;
    const response = await resetPassword(state.password, token);

    if (response.error) {
      setMessage(response.message);
      return;
    }

    history.push(routes.login.path);
  }

  function validateform() {
    return state.password.length > 0 && state.repeatPassword.length > 0;
  }

  return (
    <div className={css(GlobalStyle.formWrapper)}>
      <form className={css(GlobalStyle.form)} onSubmit={handleSubmit}>
        <h1 className={css(GlobalStyle.title)}>{t("resetPassword.title")}</h1>
        <div>
          <input
            className={css(GlobalStyle.input)}
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            required
            placeholder={t("resetPassword.form.password.placeholder")}
          />
        </div>
        <div>
          <input
            className={css(GlobalStyle.input)}
            type="password"
            name="repeatPassword"
            value={state.repeatPassword}
            onChange={handleChange}
            required
            placeholder={t("resetPassword.form.repeatPassword.placeholder")}
          />
        </div>
        <button className={css(GlobalStyle.button)} type="submit" disabled={!validateform()}>
          {t("resetPassword.button")}
        </button>
        {message && <small className={css(GlobalStyle.message)}>{message}</small>}
      </form>
    </div>
  );
}
