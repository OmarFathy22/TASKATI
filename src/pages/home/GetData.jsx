import { db } from "../../firebase/config";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import logo from "../../images/check-image.svg";
import Wrong from "../wrong";
import Loading from "pages/loading";
import "moment/locale/ar";
import "moment/locale/fr";
import { useTranslation } from "react-i18next";
import Getbuttons from "../Getbuttons";
function GetData({ user, order, getAllTasks, TorF }) {
  const { t } = useTranslation();
  const [value, loading, error] = useCollection(
    getAllTasks === true
      ? query(collection(db, user.uid), orderBy("Id", order))
      : query(collection(db, user.uid), where("completed", "==", TorF))
  );

  if (error) {
    return (
      <>
        <Wrong />
      </>
    );
  }
  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  if (value) {
    return (
      <div>
        {value.docs.length === 0 ? (
          !TorF ? (
            <h1 dir="auto"> {t("congrats")} 🤍</h1>
          ) : (
            <h1 dir="auto">{t("completed_tasks")} 😭</h1>
          )
        ) : (
          <section className="flex all-tasks">
            {value.docs.map((item) => (
              <article key={item.data().Id} dir="auto" className="one-task">
                {/* ============================== edit here =================================== */}
                <div className="data_parent">
                  <div>
                    <h2 style={{ textOverflow: "ellipsis", overflow:"hidden", width :"80%" , height:"30%" , margin:"10px auto"}}> {item.data().title}</h2>
                    {item.data().completed === true && (
                      <img
                        className="completed-icon"
                        src={logo}
                        alt="completed-icon"
                      />
                    )}
                    {/* <i className="fas fa-edit"></i> */}
                    <ul>
                      {item.data().details.map((items, index) => {
                        if (index < 2) return <li key={items}>{items}</li>;
                        else return false;
                      })}
                    </ul>
                    <Getbuttons
                      user={user}
                      stringId={item.data().Id}
                      path={item.data().Id}
                    />
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    );
  }
}

export default GetData;
