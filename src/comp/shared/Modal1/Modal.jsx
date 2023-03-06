import { Helmet } from "react-helmet-async";

const Modal = ({ closeModal, children }) => {
  return (
    <div className="parent-modal">
        <Helmet>
          <title>HOME Page</title>
          <style type="text/css">{`
            .parent-modal
            {
              z-index:100;
              display: flex;
              justify-content: center;
              align-items: center;
              position: fixed;
              top:0px;
              bottom: 0px;
              right:0px;
              left : 0px;
              background-color: #00000084; 
              

            }
            .form-modal
            {
              height: 410px;
              width: 400px;
              background-color: whitesmoke;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 10px;
              position: fixed;
              scale: 1;
              transform: translate(0,0);
              animation: modal 0.5s ;
              overflow-y: auto;
            }
            .close{
              position: absolute;
              top: 2%;
              right: 5%;
              font-size: 25px;
              cursor: pointer;
              color: #444;
            }
            .close:hover{
              color: darkred;
              font-size:26px;
            
            }
            .form-modal h3
            {
              padding-top: 30px;
              color: red;
              font-size: 20px;
              line-height: 30px;
            }
            .forgot-pass{
              font-size: 22px;
            }       
          
          
          
          `}</style>
        </Helmet>
      <form className="form-modal">
        <h2
          onClick={() => {
            closeModal();
          }}
          className="close"
        >
          X
        </h2>
        {children}
      </form>
    </div>
  );
};

export default Modal;
