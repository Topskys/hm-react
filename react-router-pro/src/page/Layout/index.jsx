import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <h1>Layout</h1>
            <p>This is the layout</p>

            {/* 跳转路由 */}
            <Link to="/">Board</Link> | <Link to="/about">About</Link>

            {/* 配置二级路由的出口 */}
            <Outlet />
        </div>
    )
}

export default Layout;