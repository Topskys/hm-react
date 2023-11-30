import './index.scss'
import React, { Component } from 'react'
import { Layout, Menu, Button, Popconfirm, message } from 'antd'
import {
    PieChartOutlined,
    UnorderedListOutlined,
    EditOutlined,
    LogoutOutlined,
    HolderOutlined,
    DiffOutlined,
} from '@ant-design/icons'
import { removeToken } from '@/utils'
import { Route, Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import { clearUserInfo, fetchUserInfo } from '@/store/modules/user'
// import Loading from '@/components/Loading'


const { Header, Content, Sider } = Layout;

const items = [
    {
        label: '首页',
        key: '/',
        icon: <HolderOutlined />
    },
    {
        label: '文章管理',
        key: '/article',
        icon: <DiffOutlined />
    },
    {
        label: '创建文章',
        key: '/publish',
        icon: <EditOutlined />
    },
]


export default function GeekLayout() {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // 点击菜单路由跳转事件
    const onMenuClick = (route) => {
        const path = route.key;
        navigate(path);
    }

    // 菜单路由高亮
    const selectedKey = location.pathname;

    useEffect(() => {
        dispatch(fetchUserInfo())
    }, [dispatch]);

    // 获取redux store的数据 
    const name = useSelector((state) => state.user.userInfo.name);

    // 确认退出
    const onConfirm=()=>{
        dispatch(clearUserInfo())
        navigate('/login')
    }

    return (
        <Layout >
            <Header className='header'>
                <div className="logo">
                    <div className="user-info">
                        <span className="user-name">{name}</span>
                        <span className="user-logout">
                            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
                                <LogoutOutlined />退出
                            </Popconfirm>
                        </span>
                    </div>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className='site-layout-background'>
                    <Menu
                        onClick={onMenuClick}
                        mode='inline' theme='dark' selectedKeys={selectedKey} items={items} style={{ height: '100%', borderRight: 0 }}></Menu>
                </Sider>
                {/* 右侧高度：calc(屏幕高度 - 头部高度 ) */}
                <Layout style={{ padding: '20px', height: 'calc(100vh - 64px)', overflow: 'auto' }}>
                    <Content className='site-layout-background'>
                        {/* 展示二级路由组件 */}
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}
