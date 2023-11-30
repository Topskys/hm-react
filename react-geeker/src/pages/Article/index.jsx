import { Card, Table,Form,Radio,Breadcrumb ,DatePicker,Select} from 'antd'
import React from 'react'
import img404 from '@/assets/error.png'
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useChannel } from '@/hooks/useChannel';
import locale from 'antd/es/date-picker/locale/zh_CN';


export default function Article() {

  const columns = []
  const data = []

  // 请求频道数据
  const { channelList } = useChannel();

  return (
    <div className='article'>
      <Card
        title={
          // 面包屑
          <Breadcrumb items={[{ title: <Link to={'/'}>首页</Link> }, { title: '文章列表' }]} /> 
        }
      >
        {/* 表单部分 */}
        <Form initialValues={{ status: null }} onFinish={onFinish}>
          <Form.Item label='状态' name='status'>
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='频道' name='channel_id'>
            {/* <Channel /> */}
            <Select placeholder=""></Select>
          </Form.Item>
          <Form.Item label='日期' name='date'>
            <DatePicker.RangePicker />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              筛选
            </Button>
          </Form.Item>
        </Form>
        {/* 搜索结果 */}
        <h3>根据筛选条件共查询到 {articles.total_count} 条结果：</h3>
        {/* 表格 */}
        <Table
          dataSource={articles.results}
          rowKey='id'
          columns={columns}
          pagination={{
            position: ['bottomCenter', 'topCenter'],
            total: articles.total_count,
            current: articles.page,
            pageSize: articles.per_page,
            onChange: onPageChange,
          }}
        />
      </Card>
    </div>
  )
}
