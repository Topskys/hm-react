import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/pages/Layout';
import Login from '@/pages/Login';


const routes = [
    {
        path:"/",
        element:<Layout/>
    },
    {
        path:"/login",
        element:<Login/>
    }
]


const router = createBrowserRouter(routes);


export default router;