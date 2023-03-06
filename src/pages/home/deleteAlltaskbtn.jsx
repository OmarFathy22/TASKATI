import { db } from "../../firebase/config";
import { collection, deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Wrong from "../../pages/wrong";
import Loading from "../../pages/loading";
import { useTranslation } from "react-i18next";

const DeleteAlltaskbtn = ({ user }) => {
  const { t } = useTranslation();
  const [value, loading, error] = useCollection(collection(db, user.uid));
  const deleteAllDocs = () => {
    value.docs.map(async (item) => {
      await deleteDoc(doc(db, user.uid, item.data().Id.toString()));
    });
  };
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
            deleteAllDocs();
          }}
          className="add-task-btn home-add-task-btn"
        >
          {t("delete-tasks")} <i className="fa fa-trash"></i>
        </button>
      </div>
    );
  }
};

export default DeleteAlltaskbtn;
