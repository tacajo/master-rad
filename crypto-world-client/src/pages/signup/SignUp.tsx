import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { ISignUpPayload } from "../../interfaces/auth.interface";
import { css } from "aphrodite/no-important";
import { LoginStyle as style } from "./SignUpStyle";
import { GlobalStyle } from "../../assets/style/GlobalStyle";
import "react-datepicker/dist/react-datepicker.css";
import { signUp } from "../../services/auth.service";
import { routes } from "../../routes";

export default function SignUp() {
  const [state, setState] = useState<ISignUpPayload>({
    email: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: "",
    birthday: "",
    company: "",
    titleInTheCompany: "",
  });
  const { t } = useTranslation();
  const history = useHistory();
  const [message, setMessage] = useState("");

  function validateForm() {
    return state.email.length > 0 && state.password.length > 0;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setState({
      ...state,
      [e.currentTarget.name]: value,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload: ISignUpPayload = {
      email: state.email,
      password: state.password,
      repeatPassword: state.password,
      firstName: state.firstName,
      lastName: state.lastName,
      birthday: state.birthday,
      company: state.company,
      titleInTheCompany: state.titleInTheCompany,
    };

    if (state.repeatPassword !== state.password) {
      setMessage("Password and confirm password don't match.");
      return;
    }

    const response = await signUp(payload);

    if (response.error) {
      setMessage(response.message);
      return;
    }
    history.push(routes.login.path);
  }
  return (
    <div className={css(style.signUpWrapper)}>
      <form className={css(GlobalStyle.formLarge)} onSubmit={handleSubmit}>
        <h1 className={css(GlobalStyle.title)}>{t("signUp.title")}</h1>
        <div className={css(style.formBlockWrapper)}>
          <div className={css(style.formBlock)}>
            <input
              className={css(GlobalStyle.input)}
              type="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              required
              placeholder={t("signUp.form.email.placeholder")}
            />
            <input
              className={css(GlobalStyle.input)}
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              placeholder={t("signUp.form.password.placeholder")}
              required
            />
            <input
              className={css(GlobalStyle.input)}
              type="password"
              name="repeatPassword"
              value={state.repeatPassword}
              onChange={handleChange}
              placeholder={t("signUp.form.repeatPassword.placeholder")}
              required
            />
            <input
              className={css(GlobalStyle.input)}
              type="text"
              name="firstName"
              value={state.firstName}
              onChange={handleChange}
              placeholder={t("signUp.form.firstName.placeholder")}
            />
          </div>
          <div className={css(style.formBlock)}>
            <input
              className={css(GlobalStyle.input)}
              type="text"
              name="lastName"
              value={state.lastName}
              onChange={handleChange}
              placeholder={t("signUp.form.lastName.placeholder")}
            />
            <input
              className={css(GlobalStyle.input)}
              type="text"
              name="company"
              value={state.company}
              onChange={handleChange}
              placeholder={t("signUp.form.company.placeholder")}
            />
            <input
              className={css(GlobalStyle.input)}
              type="text"
              name="titleInTheCompany"
              value={state.titleInTheCompany}
              onChange={handleChange}
              placeholder={t("signUp.form.titleInTheCompany.placeholder")}
            />
            <label className={css(style.label)}>{t("signUp.form.birthday.label")}</label>
            <input
              className={css(GlobalStyle.input)}
              type="date"
              name="birthday"
              value={state.birthday}
              onChange={handleChange}
              placeholder={t("signUp.form.birthday.placeholder")}
            />
          </div>
        </div>
        <button className={css(GlobalStyle.button)} type="submit" disabled={!validateForm()}>
          {t("signUp.button")}
        </button>
        {message && <small className={css(style.message)}>{message}</small>}
      </form>
    </div>
  );
}
