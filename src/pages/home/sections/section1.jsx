import { useDocument } from "react-firebase-hooks/firestore";
 import { doc } from "firebase/firestore";
import Loading from 'pages/loading';
import React, { useEffect, useRef, useState } from 'react';
import { db } from "../../../firebase/config";
function Section1({user , Id ,changeTitle }) {
const [value, loading, error] = useDocument(doc(db, user.uid, Id));
const input_element = useRef(null);
  useEffect(() => {
  }, [value]);
  if(error) return <h1>{error.message}</h1>
  if(loading) return <Loading/>
  if(user && value)
  {
    return (
      <section className='one'>
      <input 
      style={{overflow:"auto"}}
      ref={input_element}
       onChange={
        (eo) => {
         changeTitle(eo); 
        }
       }
      type="text" id = 'edit-title' placeholder="add title" defaultValue={value.data().title} className = {"title " } />
      <label
        onClick={
          () => {
           input_element.current.focus(); 
          }
        }
      htmlFor=""><i className="fas fa-edit"></i></label>
    </section>
    )
  }
}

export default Section1;