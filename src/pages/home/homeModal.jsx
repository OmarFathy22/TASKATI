import Modal from 'comp/shared/Modal1/Modal';
import ADDTASK from './sections/addtaskModal';

function HomeModal({closeModal ,addtitlefunc ,detailsfunc ,addTaskfunc,submitfunc , tasklist , tasksTitle , curr , sending_data }) {
  return (
    <Modal closeModal={closeModal} >
    <div className="add-task" style={{ textAlign: "left" }}>
      <input 
      onChange={
        (eo) => {
          addtitlefunc(eo);
        }
      }
      
      type="text" placeholder="Add title" value={tasksTitle} />
      
      <ADDTASK curr={curr} detailsfunc={detailsfunc} addTaskfunc={addTaskfunc} tasklist={tasklist} submitfunc={submitfunc} sending_data={sending_data} closeModal={closeModal}/>
    </div>
  </Modal>
  )
}

export default HomeModal;