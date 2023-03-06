import "./edit-task.css";
import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import Wrong from "pages/wrong";
import Loading from "pages/loading";
import { useNavigate, useParams } from "react-router-dom";
import {  useState } from "react";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import 'moment/locale/ar'
import 'moment/locale/fr'

const EditTask = () => {

  const [user, loading, error] = useAuthState(auth);
  const { Id } = useParams();
  const [showaddtask, setshowaddtask] = useState(false);
  const [showdata, setshowdata] = useState(false);
  const navigate = useNavigate();

   /*==========================================
  =            section 1                        =
  ===========================================*/
  const changeTitle = async (eo) => {
    await updateDoc(doc(db, user.uid, Id), {
      title: eo.target.value,
    })
  }
   /*==========================================
  =            section 2                        =
  ===========================================*/
  const checkboxfunc = async(eo) => {
    await updateDoc(doc(db, user.uid, Id), {
      completed:eo.target.checked
    })
  }
  const trashbtn = async(eo) => {
    await updateDoc(doc(db, user.uid, Id), {
      details: arrayRemove(eo),
   }); 
  }
/*==========================================
  =            section 3                        =
  ===========================================*/
  const addbtn = (eo) => {
    setshowaddtask(true)
  }
  const deletebtn = async(eo) => {
    setshowdata(true)
    await deleteDoc(doc(db, user.uid, Id)); 
    navigate('/' ,{replace:true})
  }

   
   /*==========================================
  =           design section                   =
  ===========================================*/
  
  if (error) return <Wrong />;
  if (loading) return <Loading />;
  if (user) {
    return (
      <div>
       {showdata ? (<Loading/>) : (  <div>
        <Header />
        <main className="Editing">
          <Section1 user={user} Id={Id} changeTitle={changeTitle}  />
          <Section2 user={user} Id={Id} checkboxfunc={checkboxfunc} trashbtn={trashbtn} showaddtask={showaddtask} setshowaddtask={setshowaddtask} />
          <Section3 user={user} Id={Id} addbtn={addbtn} deletebtn={deletebtn} setshowdata={setshowdata} />
        </main>
        <Footer />
      </div>)}
      </div>
    );
  }
};
export default EditTask;
