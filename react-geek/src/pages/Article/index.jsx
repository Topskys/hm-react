import { Card, Table, Form, Radio, Breadcrumb, DatePicker, Select, Button, Space, Tag, Popconfirm } from 'antd'
import React from 'react'
import img404 from '@/assets/error.png'
import { Link,useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useChannel } from '@/hooks/useChannel';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { delArticle, getArticleList } from '@/apis/article';


export default function Article() {

  const navigate=useNavigate()

  // init state
  const [articles, setArticles] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [params, setParams] = React.useState({
    status: '',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page: 4,
  });
  const [errorImage, setErrorImage] = React.useState(img404);

  // 枚举渲染
  const STATUS = {
    1: <Tag color='warning'>待审核</Tag>,
    2: <Tag color='success'>审核通过</Tag>,
  }

  // 请求频道数据
  const { channelList } = useChannel();

  // 获取帅选数据
  const onFinish = (values) => {
    setParams({
      ...params,
      channel_id: values.channel_id,
      status: values.status,
      begin_pubdate: values.date[0].format('YYYY-MM-DD'),
      end_pubdate: values.date[1].format('YYYY-MM-DD'),
    });
    // useEffect会依赖帅选数据params变化而重新执行请求文章列表
  }

  // 请求文章列表数据
  React.useEffect(() => {
    async function getArticles() {
      const res = await getArticleList(params);
      setArticles(res.data.results);
      setCount(res.data.total_count);
    }
    getArticles();
  }, [params]);

  // 表格列配置
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      // 自定义渲染内容
      render: (cover) => {
        return (
          <img
            src={cover.images[0] || errorImage}
            alt=''
            style={{ width: 100, height: 60, objectFit: 'cover' }}
          />
        )
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (data) => STATUS[data.status]
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
    },
    {
      title: '操作',
      render: (item) => {
        return (
          <Space>
            <Button
              onClick={() => navigate(`/publish?id=${item.id}`)}
              type='primary'
              shape='circle'
              icon={<EditOutlined />}
            />
            <Popconfirm title="是否确认删除？"
              description="Are you sure to delete this task?"
              onConfirm={()=>onConfirm(item)}
              okText="Yes"
              cancelText="No"
            ><Button
                type='primary'
                danger
                shape='circle'
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  // 删除
  const onConfirm = async (data) => { 
    console.log(data);
    await delArticle(data.id);
    setParams({
      ...params
    })
  }

  // 当前页码变化时
  const onPageChange = (page) => {
    setParams({
      ...params,
      page: page
    })
  }

  // 当前页面显示大小变化时
  const onPageSizeChange = (current, size) => {
    setParams({
      ...params,
      per_page: size
    })
  }







  return (
    <div className='article'>
      <Card
        title={
          // 面包屑
          <Breadcrumb items={[{ title: <Link to={'/'}>首页</Link> }, { title: '文章列表' }]} />
        }
      >
        {/* 表单部分 */}
        <Form initialValues={{ status: -1, channel_id: 'lucy' }} onFinish={onFinish}>
          <Form.Item label='状态' name='status'>
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='频道' name='channel_id'>
            {/* <Channel /> */}
            <Select placeholder="" defaultValue="lucy" style={{ width: 120 }}>
              {channelList.map(item => (
                <Select.Option key={item.id}
                  value={item.id}
                >
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label='日期' name='date'>
            <DatePicker.RangePicker locale={locale} />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table
          dataSource={articles}
          rowKey='id'
          columns={columns}
          pagination={{
            position: ['bottomCenter'],
            total: count,
            current: params.page,
            pageSize: params.per_page,
            onChange: onPageChange,
            onShowSizeChange: onPageSizeChange,
          }}
        />
      </Card>
    </div>
  )
}
