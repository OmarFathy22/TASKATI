import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/home";
import Profile from "./pages/Profile";
import { useContext } from "react";
import ThemeContext from "./context/ThemeContext";
import Signin from './pages/signin/Singin';
import Signup from './pages/Signup';
import Wrong from './pages/wrong';
import Edit from './pages/home/edit-task'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement:<Wrong/> ,
  },
  {
    path: "/signin",
    element: <Signin />,
  },

  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
  {
    path: "/edit/:Id",
    element: <Edit />,
  },

]);

function App() {

  const { theme } = useContext(ThemeContext);                            
  return (                                                                                     
  
    <div className={` ${theme}`}>                                                  
      <RouterProvider router={router} />                                               
    </div>
  );
}

export default App;
