import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { css } from "aphrodite/no-important";
import UserIcon from "../../assets/images/user-icon.png";
import { HeaderStyle as style } from "./HeaderStyle";
import { getToken, logout } from "../../services/auth.service";
import { routes } from "../../routes";
import { IHeaderProps } from "../../interfaces/props.interface";
import { useDispatch, useSelector } from "react-redux";
import { setBalance } from "../../store/actions/userAction";
import { RootState } from "../../types/store";
import logo from "../../assets/images/round-logo.png";

export default function Header({ handleAuth, isAuth, user }: IHeaderProps) {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const balance = useSelector((state: RootState) => state.userReducer.balance);

  useEffect(() => {
    if (getToken()) dispatch(setBalance(user.balance));
  }, [user, dispatch]);

  function changeVisibility() {
    setVisible(!visible);
  }

  function logoutButton() {
    logout();
    changeVisibility();
    handleAuth();
  }

  return (
    <div className={css(style.headerContainer)}>
      <div className={css(style.headerContainerBlock)}>
        <span className={css(style.logo)}>
          <img src={logo} width="200"></img>
        </span>
        {isAuth && (
          <div className={css(style.navigation)}>
            <Link to={routes.home.path} className={css(style.item)}>
              Home
            </Link>
          </div>
        )}
        {isAuth && (
          <div className={css(style.navigation)}>
            <Link to={routes.profile.path} className={css(style.item)}>
              {t("navigation.profile")}
            </Link>
          </div>
        )}
      </div>
      <div className={css(style.headerContainerBlock)}>
        {isAuth && (
          <div className={css(style.navigation)}>
            <Link to={routes.cart.path} className={css(style.item)}>
              My cart
            </Link>
          </div>
        )}
        {/* {isAuth && <span className={css(style.balance)}>{balance}$</span>} */}
        <div className={css(style.dropdown)}>
          <button className={css(style.button)} onClick={changeVisibility}>
            <img src={UserIcon} alt="nortik brand" className={css(style.icon)} />
          </button>
        </div>
        {visible && isAuth && (
          <div className={css(style.dropdownShow)}>
            <Link className={css(style.dropdownLink)} to={routes.profile.path}>
              {t("navigation.profile")}
            </Link>
            <Link className={css(style.logoutButton)} to={routes.login.path} onClick={logoutButton}>
              {t("navigation.logout")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
