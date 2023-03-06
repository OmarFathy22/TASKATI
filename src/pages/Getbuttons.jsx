import { db } from "../firebase/config";
import { useTranslation } from "react-i18next";
import Moment from "react-moment";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
// @ts-ignore
import sound from "./audio/success.mp3"
function Getbuttons({ user, stringId, path }) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const donefunc = async () => {
    await updateDoc(doc(db, user.uid, stringId.toString()), {
      completed: true,
    });
  };
  const deletebtn = async () => {
    await deleteDoc(doc(db, user.uid, stringId.toString()));
    navigate("/", { replace: true });
  };
  function play()
 {
   const audio = new Audio(sound)
   audio.play();
 }

  return (
    <div className="flex parent_options" dir="ltr">
      <Moment locale={i18n.language} fromNow date={stringId} />
      <div className="task_options">
        <Link to={`edit/${path}`}>
          <button className="info">
            <i className="fa-solid fa-info"></i>
          </button>
        </Link>
        <button
          className="remove-task"
          onClick={() => {
            deletebtn();
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <button
          className="done"
          onClick={() => {
            donefunc();
            play();
            
          }}
        >
          <i className="fa-solid fa-check"></i>
        </button>
      </div>
    </div>
  );
}

export default Getbuttons;
