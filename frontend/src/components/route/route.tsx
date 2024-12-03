import { createBrowserRouter } from "react-router-dom";
import Login from "../../pages/Authentication/Login";
import SignUp from "../../pages/Authentication/SignUp";
import Tasks from "../../pages/tasks/Tasks";
import Track from "../../pages/track/Track";
import Category from "../../pages/Category/Category";


const router = createBrowserRouter([
    {
        path:'/',
        element:<SignUp/>
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/tasks',
        element:<Tasks/>
    },
    {
        path:'/track',
        element:<Track/>
    },
    {
        path:'/category',
        element:<Category/>
    },
   
]);

export default router;