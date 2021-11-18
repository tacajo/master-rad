import { GlobalStyle } from "../../assets/style/GlobalStyle";
import { css } from "aphrodite/no-important";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { forgotPassword } from "../../services/auth.service";
import { routes } from "../../routes";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { t } = useTranslation();
  const history = useHistory();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await forgotPassword(email);

    if (response.error) {
      setMessage(response.message);
      return;
    }

    history.push(routes.login.path);
  }

  function validateform() {
    return email.length > 0;
  }

  return (
    <div className={css(GlobalStyle.formWrapper)}>
      <form className={css(GlobalStyle.form)} onSubmit={handleSubmit}>
        <h1 className={css(GlobalStyle.title)}>{t("forgotPassword.title")}</h1>
        <div>
          <input
            className={css(GlobalStyle.input)}
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            placeholder={t("forgotPassword.form.email.placeholder")}
          />
        </div>
        <button className={css(GlobalStyle.button)} type="submit" disabled={!validateform()}>
          {t("forgotPassword.button")}
        </button>
      </form>
      {message && <small className={css(GlobalStyle.message)}>{message}</small>}
    </div>
  );
}
