import React, { useState } from 'react';

import { PageContainer } from '@ant-design/pro-layout';
import { Button, Modal, Space, Table, Tag } from 'antd';
import QuestionForm from '@/pages/LeetCode/QuestionForm';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: string[]) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: string, record: any) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'Serverless deployed v2',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const LeetCodeList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <PageContainer
      content="Already visited leetcode/lintcode"
      extra={[
        <Button key="1" type="primary" onClick={() => setIsModalVisible(true)}>
          Add a problem
        </Button>,
      ]}
    >
      <Table columns={columns} dataSource={data} />

      <Modal
        title="New Question"
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <QuestionForm />
      </Modal>
    </PageContainer>
  );
};

export default LeetCodeList;
