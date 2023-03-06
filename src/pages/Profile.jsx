import Header from "../comp/header";
import Footer from "../comp/Footer";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config.jsx";
import Moment from "react-moment";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "firebase/auth";
import Loading from "./loading.jsx";
import Error from "./wrong";
import "./profile.css";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { i18n } = useTranslation();

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
  });
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if (error) {
    return (
      <>
        <Error />
      </>
    );
  }
  if (user) {
    if (!user.emailVerified) {
      navigate("/");
    } else {
      return (
        <>
          <Helmet>
            <title>Profile Page</title>
            {/* <style type="text/css">{` `}</style> */}
          </Helmet>
          <Header />
          <main>
            <div className="Data">
              <h1>
                <span>Name :</span> {user.displayName}
              </h1>
              <h1>
                <span>Email :</span> {user.email}
              </h1>
              <h1>
                <span>last Sign in :</span>{" "}
                <Moment
                  locale={i18n.language}
                  fromNow
                  ago
                  date={user.metadata.lastSignInTime}
                />
              </h1>
              <h1>
                <span>created from :</span>{" "}
                <Moment
                  locale={i18n.language}
                  fromNow
                  ago
                  date={user.metadata.creationTime}
                />
              </h1>
              <p
                onClick={() => {
                  deleteUser(user)
                    .then(() => {
                      // User deleted.
                      console.log("deleted");
                    })
                    .catch((error) => {
                      // An error ocurred
                      // ...
                    });
                }}
                className="account delete"
              >
                {" "}
                <button className="delete-task" >Delete account</button>
              </p>
            </div>
          </main>
          <Footer />
        </>
      );
    }
  }
};

export default Profile;
