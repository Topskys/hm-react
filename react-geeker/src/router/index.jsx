import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/pages/Layout';
import Login from '@/pages/Login';
import { AuthRoute } from '@/components/AuthRoute';
import Home from '@/pages/Home';
import Article from '@/pages/Article';
import Publish from '@/pages/Publish';


const routes = [
    {
        path: "/",
        element: <AuthRoute><Layout /></AuthRoute>,
        children: [
            {
                // path: "home",
                index: true,
                element: <Home/>
            },
            {
                path: "article",
                element: <Article/>
            },
            {
                path: "publish",
                element: <Publish/>
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    }
]


const router = createBrowserRouter(routes);


export default router;