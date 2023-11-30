import React from 'react';
import './index.scss';
import logo from '@/assets/logo.png';
import { Form, Input, Button, Card } from 'antd';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '@/store/modules/user';
import { useNavigate } from 'react-router-dom';


export default function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 提交登录
    const onFinish = async (values) => {
        // 1.触发异步action fetchLogin
        await dispatch(fetchLogin(values));
        // 2. 跳转首页
        navigate('/');
        // 3. 提示
        message.success('登录成功');
    };

    return (
        <div className="login">
            <Card className="login-container">
                <img src={logo} alt="" className="login-logo" />
                <Form validateTrigger="onBlur" onFinish={onFinish}>
                    {/* 13800000002 */}
                    <Form.Item
                        name="mobile"
                        rules={[
                            { required: true, message: '请输入手机号' },
                            { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
                        ]}
                    >
                        <Input size="large" placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[{ required: true, message: '请输入验证码' }]}
                    >
                        <Input size="large" placeholder="请输入验证码" />
                    </Form.Item>
                    <Form.Item>
                        <Button size="large" type='primary' htmlType='submit' style={{ width: '100%' }}>登 录</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
