import './index.scss'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { TabBar } from "antd-mobile";
import { getBillList } from "@/store/modules/billStore";
import { BillOutline, AddCircleOutline, CalculatorOutline } from "antd-mobile-icons";
import { useNavigate } from 'react-router-dom';




const Layout = () => {

    const dispatch = useDispatch();
    const navigate=useNavigate();

    // 触发异步请求方法
    useEffect(() => {
        dispatch(getBillList);
    }, [dispatch]);


    const tabs = [
        {
            key: '/month', // path
            title: '月度账单',
            icon: <BillOutline />,
        },
        {
            key: '/new',
            title: '记账',
            icon: <AddCircleOutline />,
        },
        {
            key: '/year',
            title: '年度账单',
            icon: <CalculatorOutline />,
        },
    ]

    const switchRoute = (path) => {
        // history.push(path); // old method
        navigate(path);
    }

    return (
        <div className="layout">
            <div className="container">
                {/* 配置二级路由的出口 */}
                <Outlet />
            </div>
            <div className="footer">
                <TabBar onChange={switchRoute}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            </div>
        </div>
    )
}

export default Layout;