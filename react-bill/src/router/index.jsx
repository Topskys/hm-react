import { createBrowserRouter, createHashRouter } from "react-router-dom";
import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import New from "@/pages/New";
import Month from "@/pages/Month";
import Year from "@/pages/Year";
import NotFound from "@/pages/NotFound";


const routes = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/',
        element: <Layout />,
        children: [

            {
                // path: '/month',
                index: true, // 注释掉path且index设为true，则该页面是二级默认路由
                element: <Month />,
            },
            {
                path: '/year',
                element: <Year />,
            },
        ]
    },
    {
        path: '/new',
        element: <New />,
    },

    // 404 NotFound 必须放在最后
    {
        path: '*',
        element: <NotFound />,
    }
];


const router = createBrowserRouter(routes); // history 
// const router = createHashRouter(routes); // hash


export default router;