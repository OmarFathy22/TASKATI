import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Loading from "../loading";
import Erroe404 from "../wrong";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./home.css";
import { useEffect, useState } from "react";
import HomeModal from "./homeModal";
import GetData from "./GetData";
import { useTranslation } from "react-i18next";
import Modal2 from "comp/shared/Modal1/modal2";
import DeleteAlltaskbtn from "./deleteAlltaskbtn";
const Home = () => {
  const { t, i18n } = useTranslation();
  const [user, loading, error] = useAuthState(auth);
  const [curr, setcurr] = useState("");
  const [tasklist, settaslist] = useState([]);
  const [tasksTitle, settasksTitle] = useState("Title");
  const [showform, setshowform] = useState(false);
  const [sending_data, setsendingdata] = useState(false);
  const [showMessage, setshowMessage] = useState(false);
  const [order, setorder] = useState("desc");
  const [inActive, setinActive] = useState(true);
  const [getAllTasks, setgetAllTasks] = useState(true);
  const [TorF, setTorF] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    settasksTitle(
      i18n.language === "en"
        ? "Title"
        : i18n.language === "ar"
        ? "العنوان"
        : "le titre"
    );
  }, [i18n.language]);

  /*==========================================
  =            Modal Functions            =
  ===========================================*/

  const addtitlefunc = (e) => {
    settasksTitle(e.target.value);
  };
  const detailsfunc = (e) => {
    setcurr(e.target.value);
  };
  const addTaskfunc = (e) => {
    e.preventDefault();
    if (curr !== "" && !tasklist.includes(curr)) {
      tasklist.push(curr);
    }
    setcurr("");
  };
  const submitfunc = async (eo) => {
    eo.preventDefault();
    setsendingdata(true);
    const subtaskId = new Date().getTime();
    await setDoc(doc(db, user.uid, subtaskId.toString()), {
      title: tasksTitle,
      details: tasklist,
      Id: subtaskId,
      completed: false,
    });
    setTimeout(() => {
      setshowMessage(false);
    }, 4000);
    setshowMessage(true);
    setsendingdata(false);
    setshowform(false);
    settaslist([]);
    setcurr("");
  };

  const closeModal = () => {
    settasksTitle(
      i18n.language === "en"
        ? "Title"
        : i18n.language === "ar"
        ? "العنوان"
        : "le titre"
    );
    setshowform(false);
    settaslist([]);
  };

  //////////////////////////////////////////////

  /*==========================================
  =             Functions for this page            =
  ===========================================*/

  const newestbtn = () => {
    setinActive(true);
    setorder("desc");
  };
  const oldestbtn = () => {
    setinActive(false);
    setorder("asc");
  };

  const sendAgain = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Email verification sent!");
      // ...
    });
  };

  if (error) {
    return <Erroe404 />;
  }

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME</title>
          <style type="text/css">{`.Light main h1 span{color: #222}   `}</style>
        </Helmet>

        <Header />

        <main>
          <h1 style={{ fontSize: "28px" }}>
            {" "}
            <span>{t("welcome-to")}🔥</span>{" "}
          </h1>
          <p className="pls" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
            {t("please")}{" "}
            <Link
              style={{
                fontSize: "30px",
                color: "teal",
                borderBottom: "3px solid teal",
              }}
              to="/signin"
            >
              {i18n.language === "ar" ? t("signup") : t("have-account")}
            </Link>{" "}
            {t("to-continue")}...{" "}
          </p>
        </main>

        <Footer />
      </>
    );
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" />
          </Helmet>

          <Header />

          <main>
            <p dir={i18n.language === "ar" ? "rtl" : "ltr"}>
              {t("welcome")}: {user.displayName}{" "}
              <span>
                <i
                  style={{ color: "red", fontSize: "24px" }}
                  className="fa-solid fa-heart"
                ></i>
              </span>
            </p>

            <p dir={i18n.language === "ar" ? "rtl" : "ltr"}>
              {t("verifying_message")} ✋{" "}
            </p>
            <button
              onClick={() => {
                sendAgain();
              }}
              className="delete-task send-email"
            >
              {t("send_email")}
            </button>
          </main>

          <Footer />
        </>
      );
    }

    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
          </Helmet>

          <Header />

          <main className="home">
            <section className="parent-of-btns flex mtt">
              {getAllTasks && (
                <>
                  <button
                    className={"orderbtn " + (inActive ? "inActive" : "")}
                    onClick={() => {
                      newestbtn();
                    }}
                  >
                    {t("order_first")}
                  </button>

                  <button
                    className={"orderbtn " + (inActive ? "" : "inActive")}
                    onClick={() => {
                      oldestbtn();
                    }}
                  >
                    {t("order_last")}
                  </button>
                </>
              )}
              <select
                id="browsers"
                onChange={(eo) => {
                  eo.target.value === "alltasks"
                    ? setgetAllTasks(true)
                    : setgetAllTasks(false);
                  eo.target.value === "completed"
                    ? setTorF(true)
                    : setTorF(false);
                }}
              >
                <option value="alltasks"> {t("allTasks")} </option>
                <option value="completed"> {t("task_comp")}</option>
                <option value="not completed"> {t("task_not_comp")}</option>
              </select>
            </section>

            {/* Add new task BTN */}

            <section>
              <button
                dir="auto"
                onClick={() => {
                  setshowform(true);
                }}
                className="add-task-btn home-add-task-btn"
              >
                {t("addbtn")} <i className="fa-solid fa-plus"></i>
              </button>
              <DeleteAlltaskbtn user={user} />
              <Modal2 showMessage={showMessage} setshowMessage={setshowMessage}>
                <i className="fa-solid fa-circle-check"></i>
                <p style={{ color: "teal" }} className="para">
                  Data Saved Correctly
                </p>
              </Modal2>
            </section>

            {/* SHOW all tasks */}
            <GetData
              user={user}
              order={order}
              getAllTasks={getAllTasks}
              TorF={TorF}
            />
            {showform && (
              <HomeModal
                closeModal={closeModal}
                addtitlefunc={addtitlefunc}
                detailsfunc={detailsfunc}
                addTaskfunc={addTaskfunc}
                submitfunc={submitfunc}
                tasklist={tasklist}
                tasksTitle={tasksTitle}
                curr={curr}
                sending_data={sending_data}
              />
            )}
          </main>

          <Footer />
        </>
      );
    }
  }
};
export default Home;
