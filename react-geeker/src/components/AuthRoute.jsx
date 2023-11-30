import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";


/**
 * token控制页面跳转HOC高阶组件
 * @param {*} {children} slot 原本要显示的路由组件
 */
export function AuthRoute({ children }) {
    const token = getToken();
    if (token) {
        return <>{children}</>;
    } else {
        return <Navigate to={"/login"} replace />
    }
}