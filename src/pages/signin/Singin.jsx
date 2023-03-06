import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { auth } from "../../firebase/config";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Modal from "comp/shared/Modal1/Modal";
import Modal2 from "comp/shared/Modal1/modal2";
import { useTranslation } from "react-i18next";
const Signin = () => {
  const { t , i18n } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState(false);
  const [showform, setshowform] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [showresetMessage, setshowresetMessage] = useState(false);
  const closeModal = () => {
    setshowform(false);
  };

  return (
    <>
      <Helmet>
        <title>Signin</title>
      </Helmet>
      <Header />

      <main>
        {showform && (
          <Modal closeModal={closeModal}>
            <input
              onChange={(e) => {
                setResetEmail(e.target.value);
              }}
              type="Email"
              placeholder="Email"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setshowresetMessage(true);
                sendPasswordResetEmail(auth, resetEmail)
                  .then(() => {
                    // Password reset email sent!
                    // ..
                  })
                  // @ts-ignore
                  .catch((error) => {
                    // ..
                  });
              }}
            >
              reset password
            </button>
            {showresetMessage && (
              <h3 className="hidetext">
                please check your email to reset your password
              </h3>
            )}
          </Modal>
        )}
        <form>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            placeholder=" E-mail : "
            type="email"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            placeholder=" Password : "
            type="password"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              signInWithEmailAndPassword(auth, email, password)
                // @ts-ignore
                .then((userCredential) => {
                  // Signed in
                  updateProfile(auth.currentUser, {})
                    .then(() => {
                      // Profile updated!
                      // ...
                      navigate("/");
                    })
                    .catch((error) => {
                      // An error occurred
                      // ...
                      console.log(error.code);
                    });
                  navigate("/");
                  // ...
                })
                .catch((error) => {
                  const errorCode = error.code;
                  setError(true);
                  switch(errorCode)
                  {
                    case "auth/email-already-exists":
                           setErrorMessage(" This Email already exists")
                           break;
                    case "auth/user-not-found":
                           setErrorMessage("User not found")
                           break;
                    case "auth/wrong-password":
                           setErrorMessage("Wrong Password")
                           break;
                    case "auth/too-many-requests":
                           setErrorMessage("Too many requests! please try again later")
                           break;
                    default: 
                           setErrorMessage(errorCode)
                           break;       
                  }
                  console.log(ErrorMessage)
                  console.log(errorCode)
                });
            }}
          >
            {i18n.language === "en" ? "sign in" : t("signup")}
          </button>
          <p className="account">
            {t("no_account")} <Link to="/signup"> { t("signup")}</Link>
          </p>
          <p className="account forgot-pass">
            <button
              onClick={(eo) => {
                eo.preventDefault();
                setshowform(true);
              }}
            >
              {" "}
              {t("forgot_pass")}
            </button>
          </p>

        
        </form>
      </main>
      <Footer />
        
            <Modal2 showMessage={Error} setshowMessage={setError}  >
              <i className="fa-solid fa-circle-exclamation"></i>
              <p className="error">{ErrorMessage}</p>
              <i onClick={() => {
                setError(false)
              }} style={{color:"grey" , fontSize:"15px" , marginLeft:"15px"}} className="fa-solid fa-xmark"></i>
            </Modal2>
          
    </>
  );
};

export default Signin;
