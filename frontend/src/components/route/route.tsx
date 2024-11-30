import { createBrowserRouter } from "react-router-dom";
import Login from "../../pages/Authentication/Login";
import SignUp from "../../pages/Authentication/SignUp";


const router = createBrowserRouter([
    {
        path:'/',
        element:<SignUp/>
    },
    {
        path:'/login',
        element:<Login/>
    },
   
]);

export default router;