import React from 'react';
import { Breadcrumb, Card, Form, Button, Select, Input } from 'antd';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import './index.scss';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { createArticle, getChannel } from '@/apis/article';
import { message } from 'antd';


export default function Publish() {

  const [channelList, setChannelList] = useState([]);

  // 请求频道数据
  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannel()
      setChannelList(res.data.channels)
    };
    getChannelList();
  }, []);

  // 收集数据提交表单
  const onFinish = async (values) => {
    // 整理请求数据
    const { title, content, channel_id } = values;
    const reqData = {
      title,
      content,
      cover: {
        type: 0,
        images: []
      },
      channel_id,
    }
    // 发送请求
    const res = await createArticle(reqData);
    message.success(res.message);
  }


  return (
    <div className="publish">
      <Card title={
        <Breadcrumb items={[{ title: <Link to={'/'}>首页</Link> }, { title: '发布文章' }]} />
      }>
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} initialValues={{ type: 1 }} validateTrigger='onBlur' onFinish={onFinish}>
          <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入文章标题' }]}>
            <Input placeholder='请输入' style={{ width: 400 }} />
          </Form.Item>
          <Form.Item label="频道" name="channel_id" rules={[{ required: true, message: "请选择文章频道" }]}>
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="内容" name="content" rules={[{
            required: true,
            message: "请输入文章内容"
          }]}>
            <ReactQuill theme='snow' placeholder='请输入文章内容' className='publish-quill' />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size='large' type='primary' htmlType='submit'>发布文章</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
