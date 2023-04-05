import Modal from 'comp/shared/Modal1/Modal';
import ADDTASK from './sections/addtaskModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
function HomeModal({closeModal ,addtitlefunc ,detailsfunc ,addTaskfunc,submitfunc , tasklist , tasksTitle , curr , sending_data }) {
  const [taskplaceholder, settaskplaceholder] = useState("");
  const { i18n } = useTranslation();
  useEffect(() => {
    settaskplaceholder((i18n.language === "en" ? "Add Title" :(i18n.language === "ar" ? "أضف عنوان" : "ajouter un titre")));
   },[i18n]);
  return (
    <Modal closeModal={closeModal} >
    <div className="add-task" style={{ textAlign: "left" }}>
      <input 
      maxLength={20}
      onChange={
        (eo) => {
          addtitlefunc(eo);
        }
      }
      
      type="text" placeholder={taskplaceholder} />
      
      <ADDTASK curr={curr} detailsfunc={detailsfunc} addTaskfunc={addTaskfunc} tasklist={tasklist} submitfunc={submitfunc} sending_data={sending_data} closeModal={closeModal}/>
    </div>
  </Modal>
  )
}

export default HomeModal;