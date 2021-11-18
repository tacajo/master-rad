import { css } from "aphrodite/no-important";
import { useEffect, useState } from "react";
import { getUser } from "../../services/user.service";
import { ProfileStyle as style } from "./ProfileStyle";
import { GlobalStyle } from "../../assets/style/GlobalStyle";
import { useTranslation } from "react-i18next";
import userMapping from "../../utils/user";
import { IToken } from "../../interfaces/token.interface";
import { addToken, getActiveTokens } from "../../services/token.service";
import tokensMapping from "../../utils/token";
import { IUser } from "../../interfaces/user.interface";
import { useDispatch } from "react-redux";
import { setBalance } from "../../store/actions/userAction";

export default function Profile() {
  const [user, setUser] = useState<IUser>({
    email: "",
    firstName: "",
    lastName: "",
    birthday: "",
    company: "",
    titleInTheCompany: "",
    balance: 0,
  });
  const [formVisible, setFormVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(true);
  const [tokensVisible, setTokensVisible] = useState(false);
  const [token, setToken] = useState<IToken>({
    name: "",
    price: 0,
    ico: 0,
  });
  const [activeTokens, setActiveTokens] = useState<IToken[]>();
  const [message, setMessage] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getLoggedInUser() {
      const result = await getUser();
      console.log(result);
      setUser(userMapping(result.data));
    }
    getLoggedInUser();
  }, []);

  function showForm() {
    setFormVisible(true);
    setInfoVisible(false);
    setTokensVisible(false);
  }

  function showInfo() {
    setFormVisible(false);
    setInfoVisible(true);
    setTokensVisible(false);
  }

  function showTokens() {
    getAllActiveTokens();
    setFormVisible(false);
    setInfoVisible(false);
    setTokensVisible(true);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setToken({
      ...token,
      [e.currentTarget.name]: value,
    });
  }

  function validateform() {
    return token.name.length > 0 && token.price > 0 && token.ico > 0;
  }

  async function getAllActiveTokens() {
    const response = await getActiveTokens();
    setActiveTokens(tokensMapping(response.data));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload: IToken = {
      name: token.name,
      price: token.price,
      ico: token.ico,
    };

    const response = await addToken(payload);

    if (response.error) {
      setMessage(response.message);
      return;
    }
    setMessage(t("profile.messageAddButton"));
    payload.name = "";
    payload.price = 0;
    payload.ico = 0;
    setToken(payload);
    const result = await getUser();

    if (result.error) {
      setMessage(response.message);
      return;
    }
    setUser(userMapping(result.data));
    dispatch(setBalance(result.data.balance));
  }

  return (
    <div className={css(style.wrapper)}>
      <div className={css(style.leftPart)}>
        <div className="text-center text">
          <div className={css(style.nameWrapper)}>
            <p>
              {user?.firstName[0]}
              {user?.lastName[0]}
            </p>
          </div>
          <div>
            <div className={css(style.name)}>
              {user?.firstName} {user?.lastName}
            </div>
            <div className={css(style.text)}>{user?.email}</div>
          </div>
          <div>
            <button className={css(style.allInfoButton)} onClick={showInfo}>
              {t("profile.buttons.showInfo")}
            </button>
          </div>
          <div className="text-center">
            <button className={css(style.allInfoButton)} onClick={showTokens}>
              {t("profile.buttons.showTokens")}
            </button>
          </div>
          <div className={css(style.buttonSection)}>
            <button className={css(GlobalStyle.button)} onClick={showForm}>
              + {t("profile.buttons.addToken")}
            </button>
          </div>
        </div>
      </div>
      {infoVisible && (
        <div className={css(style.rightPart)}>
          <div className={css(GlobalStyle.title)}>{t("profile.formInfo.about")}</div>

          <div>
            <div className={css(style.label)}>{t("profile.formInfo.balance")}</div>
            <div className={css(style.field)}>{user?.balance}$</div>
          </div>
          <div>
            <div className={css(style.label)}>{t("profile.formInfo.company")}</div>
            <div className={css(style.field)}>{user?.company}</div>
          </div>
          <div>
            <div className={css(style.label)}>{t("profile.formInfo.titleInTheCompany")}</div>
            <div className={css(style.field)}>{user?.titleInTheCompany}</div>
          </div>
        </div>
      )}
      {formVisible && (
        <div className={css(style.rightPart)}>
          <form className={css(style.addTokenForm)} onSubmit={handleSubmit}>
            <div className={css(GlobalStyle.title)}>{t("profile.formAddToken.title")}</div>
            <input
              className={css(GlobalStyle.input)}
              type="text"
              name="name"
              value={token.name}
              onChange={handleChange}
              required
              placeholder={t("profile.formAddToken.name.placeholder")}
            />
            <label className={css(style.label)}>{t("profile.formAddToken.price.label")}</label>
            <input
              className={css(GlobalStyle.input)}
              type="number"
              name="price"
              value={token.price}
              onChange={handleChange}
              required
            />
            <label className={css(style.label)}>{t("profile.formAddToken.ico.label")}</label>
            <input
              className={css(GlobalStyle.input)}
              type="number"
              name="ico"
              value={token.ico}
              onChange={handleChange}
              required
            />
            <button className={css(GlobalStyle.button)} type="submit" disabled={!validateform()}>
              {t("profile.buttons.addToken")}
            </button>
            {message && <small className={css(style.message)}>{message}</small>}
          </form>
        </div>
      )}
      {tokensVisible && (
        <div className={css(style.rightPart)}>
          <div className={css(GlobalStyle.title)}>My tokens</div>
          <div>
            <table className={css(style.table)}>
              <tr className={css(style.tableHeader)}>
                <th> {t("profile.tokensTable.rows.name")}</th>
                <th> {t("profile.tokensTable.rows.price")}</th>
                <th> {t("profile.tokensTable.rows.ico")}</th>
              </tr>
              {activeTokens?.map((token: IToken) => (
                <tr>
                  <td className={css(style.tableFields)}>{token.name}</td>
                  <td className={css(style.tableFields)}>{token.price} $</td>
                  <td className={css(style.tableFields)}>{token.ico}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
