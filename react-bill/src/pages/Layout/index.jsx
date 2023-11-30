import { getBillList } from "@/store/modules/billStore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {

    const dispatch = useDispatch();

    // 触发异步请求方法
    useEffect(() => {
        dispatch(getBillList);
    }, [dispatch]);

    return (
        <div>
            {/* 配置二级路由的出口 */}
            <Outlet />
        </div>
    )
}

export default Layout;