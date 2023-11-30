import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/pages/Layout';
import Login from '@/pages/Login';
import { AuthRoute } from '@/components/AuthRoute';


const routes = [
    {
        path: "/",
        element: <AuthRoute><Layout /></AuthRoute>
    },
    {
        path: "/login",
        element: <Login />
    }
]


const router = createBrowserRouter(routes);


export default router;