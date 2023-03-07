import { db } from "../../firebase/config";
import { collection, deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Wrong from "../../pages/wrong";
import Loading from "../../pages/loading";
import { useTranslation } from "react-i18next";
import Modal from "comp/shared/Modal1/Modal";

const DeleteAlltaskbtn = ({ user }) => {
  const { t } = useTranslation();
  const [showform, setshowform] = useState(false);
  const [value, loading, error] = useCollection(collection(db, user.uid));
  const deleteAllDocs = () => {
    value.docs.map(async (item) => {
      await deleteDoc(doc(db, user.uid, item.data().Id.toString()));
    });
  };
  const closeModal = () => {
    setshowform(false)
  }
  if (error ) {
    return <Wrong/>;
  }

  if (loading ) {
    return <Loading />;
  }
  if(value && value.docs.length > 0)
  {
    return (
      <div>
        <button
          style={{ backgroundColor: "rgba(228, 43, 11, 0.792)" }}
          dir="auto"
          onClick={() => {
             setshowform(true)
          }}
          className="add-task-btn home-add-task-btn"
        >
          {t("delete-tasks")} <i className="fa fa-trash"></i>
        </button>
         {showform && 
         <Modal closeModal={closeModal} >
             <h1 style={{fontSize:"18px" , color:"#222"}}>{t("areyousure")}</h1>
          <div className="flex">
             <button className="delete-task" style={{marginRight:"20px" , backgroundColor:"teal"}}
              onClick = {(e) => {
              e.preventDefault()
                deleteAllDocs();
              }}
             >{t("Yes")}</button>
             <button className="delete-task"
             onClick={(e) => {
              e.preventDefault()
               closeModal()
             }}
             >{"No"}</button>
          </div>
        </Modal>
         }
      </div>
    );
  }
};

export default DeleteAlltaskbtn;
