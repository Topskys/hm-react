import React from 'react';
import { Space, Breadcrumb, Card, Form, Button, Select, Input, Upload, message, Radio } from 'antd';
import { Link, useSearchParams,useNavigate } from 'react-router-dom';
import './index.scss';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';
import { createArticle, getArticleById, updateArticle } from '@/apis/article';
import { PlusOutlined } from '@ant-design/icons';
import { useChannel } from '@/hooks/useChannel';


export default function Publish() {

  const navigate= useNavigate();
  const [searchParams] = useSearchParams(); // ?id=xx
  const articleId = searchParams.get('id');
  const [imageList, setImageList] = useState([]);
  const [imageType, setImageType] = useState(0);

  // 请求频道数据
  const { channelList } = useChannel();

  // 收集数据提交表单
  const onFinish = async (values) => {
    if (imageList.length !== imageType) {
      return message.warning("封面类型和图片数量不匹配");
    }
    // 整理请求数据
    const { title, content, channel_id } = values;
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,
        images: imageList.map(item => {
          if (item.response) {
            return item.response.data.url
          } else {
            return item.url
          }
        }),
      },
      channel_id,
    }
    // 发送请求
    let res=''
    if(articleId){
      res = await updateArticle({...reqData,id:articleId});
      navigate("/article")
    }
    res = await createArticle(reqData);
    message.success(res.message);
  }

  // 上传封面图片的回调
  const onUploadChange = (value) => {
    setImageList(value.fileList);
  }

  // 切换封面类型
  const onTypeChange = (e) => {
    const type = e.target.value;
    setImageType(type);
  }


  // 修改回填数据
  const [form] = Form.useForm(); // 表单实例
  useEffect(() => {
    async function getArticleDetail() {
      const { data } = await getArticleById(articleId);
      const { cover } = data
      form.setFieldsValue({
        ...data,
        type: cover.type,
      }); // 因数据结构问题，无法直接回填type {cover:{type:3}} --> {type:3}
      setImageType(cover.type);
      setImageList(cover.images.map(item => ({ url: item })));
    }
    articleId && getArticleDetail();
  }, [articleId, form]);


  return (
    <div className="publish">
      <Card title={
        <Breadcrumb items={[{ title: <Link to={'/'}>首页</Link> }, { title: articleId ? '编辑文章' : '发布文章' }]} />
      }>
        <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} initialValues={{ type: 0 }} validateTrigger='onBlur' onFinish={onFinish}>
          <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入文章标题' }]}>
            <Input placeholder='请输入' style={{ width: 400 }} />
          </Form.Item>
          <Form.Item label="频道" name="channel_id" rules={[{ required: true, message: "请选择文章频道" }]}>
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="封面" >
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && <Upload listType="picture-card" showUploadList multiple maxCount={imageType} name='image' action='http://geek.itheima.net/v1_0/upload' onChange={onUploadChange} fileList={imageList}>
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>}
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
