import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    return (
        <div>
            <h1>Login</h1>

            {/* 声明式导航 */}
            <Link to="/article">Link to Article</Link>
            {/* 编程式导航 */}
            <button onClick={() =>  navigate("/article")}>navigate</button>
            
            {/* 路由传参 */}
            <Link to="/article/123/topsky">Link useParams</Link>
            <button onClick={() =>  navigate("/article/12345/topsky")}>useParams</button>
            <button onClick={() =>  navigate("/article?id=1&name=topsky")}>useSearchParams</button>

        </div>
    )
}

export default Login;