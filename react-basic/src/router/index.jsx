import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Memo from '../pages/Memo';
import Reducer from '../pages/Reducer';
import Callback from '../pages/Callback';
import ForwardRef from '../pages/ForwardRef';
import Imperative from '../pages/Imperative';
import Counter from '../ClassComponents/Counter';
import Zustand from '../pages/Zustand';


export const routes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/reducer',
        element: <Reducer />
    },
    {
        path: '/memo',
        element: <Memo />
    },
    {
        path: '/callback',
        element: <Callback />
    },
    {
        path: '/forwardRef',
        element: <ForwardRef />
    },
    {
        path: '/imperative',
        element: <Imperative/>
    },
    {
        path: '/counter',
        element: <Counter/>
    },
    {
        path: '/zustand',
        element: <Zustand />
    }
]


const router = createBrowserRouter(routes);


export default router;