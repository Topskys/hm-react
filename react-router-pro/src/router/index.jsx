import { createBrowserRouter ,createHashRouter} from "react-router-dom";
import Login from "../page/Login";
import Article from "../page/Article";
import Layout from "../page/Layout";
import Board from "../page/Board";
import About from "../page/About";
import NotFound from "../page/NotFound";


const routes = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/article',
        element: <Article />,
    },
    {
        path: '/article/:id/:name',
        element: <Article />,
    },
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                // path: '/board',
                index: true, // 注释掉path且index设为true，则该页面是二级默认路由
                element: <Board />,
            },
            {
                path: '/about',
                element: <About />,
            },
        ]
    },

    // 404 NotFound 必须放在最后
    {
        path: '*',
        element: <NotFound />,
    }
];


// const router = createBrowserRouter(routes); // history 
const router = createHashRouter(routes); // hash


export default router;