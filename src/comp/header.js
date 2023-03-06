import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import "../theme.css";
// LEVEL2
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config.jsx";
import Loading from "../pages/loading";
import Wrong from "../pages/wrong";
import { useTranslation } from "react-i18next";
import { useAuthState } from "react-firebase-hooks/auth";


const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const { theme, toggleTheme } = useContext(ThemeContext);
  if (loading) return <Loading />;
  else if (error) return <Wrong />;
  else {
    return (
      <div className="myheader">
        <header className="hide-when-mobile ali">
          {user && (
            <h1>
              {" "}
              <Link lang="ar" dir="ar" className="logo" to="/">
                {t("taskat")}
              </Link>
            </h1>
          )}
          {!user && <h1>{t("taskat")}</h1>}
          <i
            onClick={() => {
              toggleTheme(theme === "Light" ? "Dark" : "Light");
            }}
            className="fa-solid fa-moon"
          ></i>
          <i
            onClick={() => {
              toggleTheme(theme === "Light" ? "Dark" : "Light");
            }}
            className="fa-solid fa-sun"
          ></i>

          <ul className="flex">
            {user && (
              <li className="main-list lang">
                <p>
                  {t("lang")} <i className="fa-solid fa-caret-down drop"></i>
                </p>
                <ul className="languages">
                  <li
                    className="lang-li"
                    onClick={() => {
                      i18n.changeLanguage("ar");
                      
                      
                    }}
                  >
                    <p>العربية</p>
                    {i18n.language === "ar" && (
                      <p>
                        <i className="fa-solid fa-check"></i>
                      </p>
                    )}
                  </li>
                  <li
                    className="lang-li"
                    onClick={() => {
                      i18n.changeLanguage("en");

                    }}
                  >
                    <p>english</p>
                    {i18n.language === "en" && (
                      <p>
                        <i className="fa-solid fa-check"></i>
                      </p>
                    )}
                  </li>
                  <li
                    className="last-lang lang-li"
                    onClick={() => {
                      i18n.changeLanguage("fr");

                    }}
                  >
                    <p>français</p>
                    {i18n.language === "fr" && (
                      <p>
                        <i className="fa-solid fa-check"></i>
                      </p>
                    )}
                  </li>
                </ul>
              </li>
            )}
            {user && (
              <li className="main-list">
                <Link
                  onClick={() => {
                    signOut(auth)
                      .then(() => {
                        // Sign-out successful.
                        navigate("/signin");
                      })
                      .catch((error) => {
                        // An error happened.
                      });
                  }}
                  className="main-link"
                  to={""}
                >
                  {t("signout")}
                </Link>
              </li>
            )}
            {!user && (
              <li className="main-list">
                <NavLink className="main-link" to="/signin">
                  {t("have-account")}
                </NavLink>
              </li>
            )}

            {!user && (
              <li className="main-list">
                <NavLink className="main-link" to="/signup">
                {i18n.language === "ar" ? t("no_account"):t("signup")}
                </NavLink>
              </li>
            )}

            {user && (
              <li className="main-list">
                <NavLink className="main-link" to="/Profile">
                  {t("account")}
                </NavLink>
              </li>
            )}
          </ul>
        </header>
      </div>
    );
  }
};
export default Header;
