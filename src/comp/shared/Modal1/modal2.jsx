import React from "react";
import { Helmet } from "react-helmet-async";

function Modal2({ showMessage ,setshowMessage  ,  children }) {

  return (
  <div>
      <Helmet>
      <style >{`
            .saved-data {
              z-index:100;
              background-color: white;
              border-radius: 3px;
              text-align: center;
              padding: 8px 5px;
              justify-content: space-around;
              position: fixed;
              top: 150px;
              transition: all 1s;
            }
            .saved-data p {
              font-size: 15px;
              color: red;
              line-height: 0px;
            }     
          
            .saved-data .fa-circle-check {
              color: teal;
              font-size: 20px;
              margin-right: 5px;
            }
            .saved-data  .fa-circle-exclamation
            {
              color: red;
              font-size: 20px;
              margin-right: 5px;

            }
            
          
          
          
          `}</style>
    </Helmet>
      <div
        style={{ right: showMessage ? "10px" : "-100vw" }}
        className="saved-data flex"
      >
       {children}
      </div>
  </div>
  );
}

export default Modal2;
