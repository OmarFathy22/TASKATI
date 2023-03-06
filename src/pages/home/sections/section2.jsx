import { db } from '../../../firebase/config';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import Loading from 'react-loading';
import Moment from 'react-moment';
import 'moment/locale/ar'
import 'moment/locale/fr'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { useTranslation } from 'react-i18next';
function Section2({user , Id , checkboxfunc , trashbtn , showaddtask , setshowaddtask}) {
  const { t, i18n } = useTranslation();
  const [value, loading, error] = useDocument(doc(db, user.uid, Id));
  const [curr_input, setcurr_input] = useState("");
  const submit_data = async(eo) => {
      setcurr_input("")
      await updateDoc(doc(db, user.uid, Id), {
        details: arrayUnion(curr_input),
      });
  }
  if(error) return <h1>{error.message}</h1>
  if(loading) return <Loading/>
  if(user && value)
  {
    return (
      <section className='flex two'>
      <div className='flex created'>
          <p className='para' > <Moment locale = {i18n.language} fromNow date={value.data().Id} /></p>
        <div className='flex completed'>
            <div className="checkbox"><input
            onChange={async(eo) => {
              checkboxfunc(eo)
            }}
            checked = {value.data().completed}
            type="checkbox" /></div>
            <p>{t("task_comp")}</p>
        </div >
      </div>
      <ul className='parent-container flex'>
         {value.data().details.map((item) => {
          return(
            <li key={item} className="container flex">
            <p>{item}</p>
            <p 
             onClick={
              async() => {
                trashbtn(item)
              }
             }
            className="icon"><i className="fa fa-trash"></i></p>
          </li>
          )
         })}
           {showaddtask && 
           <li className="container flex add-more-task">
             <form style={{display:"block"}}>
             <input 
             onChange={
              (eo) => {
                eo.preventDefault()
               setcurr_input(eo.target.value) 
              }
             }
             
             type="text" value={curr_input} className = "input-width"></input>
             <button
             onClick={(eo) => {
              eo.preventDefault()
              submit_data(eo)
             }}
             className='add-task-btn ml'>add</button>
             <button
             onClick={
              (eo) => {
                eo.preventDefault()
               setshowaddtask(false) 
              }
             }
             className='add-task-btn ml'>cancel</button>
         </form>
           </li>
           }
      </ul>
      </section>
    )
  }
}

export default Section2;