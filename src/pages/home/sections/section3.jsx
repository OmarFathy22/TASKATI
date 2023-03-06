import { useTranslation } from "react-i18next";


function Section3({user , Id ,addbtn,deletebtn , setshowdata  }) {
  const { t } = useTranslation();

  if(user)
  {
    return (
      <section className='three'>
    
      <button dir="auto"
      onClick={
        () => {
          deletebtn()
        }
      }
      
      className="delete-task">{t("delete-task")} <i className="fa fa-trash"></i></button>
      
      <button dir="auto"
      onClick={
        () => {
          addbtn()
        }
      }
      className="add-task">{t("add_task")} <i className="fa-solid fa-plus"></i> </button>
      </section>
    
    )
  }
}

export default Section3;