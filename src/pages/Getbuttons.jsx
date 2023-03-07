import { db } from "../firebase/config";
import { useTranslation } from "react-i18next";
import Moment from "react-moment";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
// @ts-ignore
import sound from "./audio/success.mp3";
import { useEffect, useState } from "react";
import { t } from "i18next";
function Getbuttons({ user, stringId, path }) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [seconds, setseconds] = useState(0); 
  const [start, setstart] = useState(false); 
  const [show_timer_box, setshow_timer_box] = useState(false); 
  useEffect(() => {
    // create a interval and get the id
     if(start)
     {
      const myInterval = setInterval(() => {
        if(start)
        {
          setseconds(seconds + 1)
        }
        else{
          clearInterval(myInterval)
        }
      }, 1000);
      // clear out the interval using the id when unmounting the component
      return () => clearInterval(myInterval);
     }
  
  }, [seconds , start]);
  
  const donefunc = async () => {
    await updateDoc(doc(db, user.uid, stringId.toString()), {
      completed: true,
    });
  };
  const deletebtn = async () => {
    await deleteDoc(doc(db, user.uid, stringId.toString()));
    navigate("/", { replace: true });
  };
  function play() {
    const audio = new Audio(sound);
    audio.play();
  }

  return (
    <div>
      <Moment locale={i18n.language} fromNow date={stringId} />
      <div className="flex parent_options" dir="ltr">
        <div></div>
        <div className="icons_parent">
          {!show_timer_box &&
          <i className="fa-solid fa-play timer" 
          onClick={
           () => {
            setstart(true) 
            setshow_timer_box (true)
           }
          }
         ></i>
          
          }
           <p className="start-timer pos-timer" >{t("start working")}</p>
          {show_timer_box && 
            <p className="timer-box start-timer" >
            {Math.floor(seconds/60/60)%60 < 10 ? "0" + Math.floor(seconds/60/60)%60 : Math.floor(seconds/60/60)%60}:
            {Math.floor(seconds/60)%60 < 10 ? "0" + Math.floor(seconds/60)%60 : Math.floor(seconds/60)%60}:
            {seconds % 60 < 10 ? "0" + seconds % 60 : seconds % 60}
          <i className="fa-solid fa-arrows-rotate repeat"
          onClick={
            () => {
             setseconds(0)
             setstart(false) 
             setshow_timer_box (false)
            }
           }
          ></i></p>
          
          }

        </div>
      
        <div className="task_options">
          <Link to={`edit/${path}`}>
              <i className="fa-solid fa-circle-info info" style={{color:"#888"}}></i>
              <p className="start-timer pos-info">{t("Edit Task")}</p>

          </Link>

          <i style={{color:"rgb(255 40 3 / 79%)"}}
            className="fa-solid fa-trash-can trash"
            onClick={() => {
              deletebtn();
            }}
          ></i>
            <p className="start-timer pos-trash">{t("Delete Task")}</p>


          <i style={{color:"rgb(3, 158, 143)"}}
            className="fa-solid fa-circle-check check-mark"
            onClick={() => {
              play();
              donefunc();
              setstart(false);

            }}
          ></i>
        <p className="start-timer pos-done">{t("Complete Task")}</p>
        </div>
      </div>
    </div>
  );
}

export default Getbuttons;
