import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { useTranslation } from "react-i18next";

function ADDTASK({curr , detailsfunc , addTaskfunc , tasklist , submitfunc , sending_data ,closeModal}) {
  const [taskplaceholder, settaskplaceholder] = useState("");
  const { t , i18n } = useTranslation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    settaskplaceholder((i18n.language === "en" ? "Details" :(i18n.language === "ar" ? "التفاصيل" : "détails")));
   });
  return (
   <div>
      <div>
        <input
          className="details"
          type="text"
          placeholder= {taskplaceholder}
          value={curr}
          onChange={(eo) => {
            detailsfunc(eo);
          }}
        />
        <button
        style={{padding:"7px 10px" , marginLeft:"5px"}}
          onClick={
            (eo) => {
              addTaskfunc(eo);
            }
          }
          className="add-task-btn"
        >
          {t("add")}
        </button>
        <ul className="sub_tasks">
          { tasklist &&
            tasklist.map((item) => {
              return(
                <li key={item} className="tasks">{item}</li>
              )
            })
          }
        </ul>
        </div>
        <button
        onClick={ async (eo) => {
          submitfunc(eo)
        }}

      className="add-task-btn">
        {sending_data ? <ReactLoading type={"spinningBubbles"} color={"white"} height={30} width={30} /> : (t("submit"))}
       </button>
  
   </div>
  )
}

export default ADDTASK;