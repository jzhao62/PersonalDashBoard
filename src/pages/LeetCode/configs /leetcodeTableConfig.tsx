import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { Button, Divider, Drawer, message, Space, Tabs } from 'antd';
import type { ReactElement } from 'react';
import { useRequest } from '@umijs/hooks';
import { deleteQuestion, editQuestion } from '@/services/leetcode/leetcode';
import { useState } from 'react';
import QuestionForm from '@/pages/LeetCode/components/QuestionForm/QuestionForm';
import { EditFilled, LinkOutlined, ProfileFilled } from '@ant-design/icons';
import Paragraph from 'antd/es/typography/Paragraph';


const { TabPane } = Tabs;

const links = [
  {
    name: 'google',
    link: 'www.google.com',
  },
  {
    name: 'stackoverfllow',
    link: 'www.stackoverflow.com',
  },
];

interface IProp {
  questionItem: LeetCode.questionItem;
}
const ActionComponent = ({ questionItem }: IProp): ReactElement => {
  const [isEditing, setIsEditing] = useState(false);

  const { run: dispatchEdit } = useRequest(editQuestion, {
    manual: true,
    onSuccess: () => setIsEditing(false),
    onError: (result) => message.error(result.message),
  });

  const { run: dispatchDelete } = useRequest(deleteQuestion, {
    manual: true,
  });

  return (
    <>
      <Space split={<Divider type="vertical" />}>
        <Button type="link" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
        <Button type="link" onClick={() => dispatchDelete(questionItem.id)}>
          Delete
        </Button>
      </Space>

      <Drawer
        width={600}
        title="Editing Existing Question"
        visible={isEditing}
        footer={null}
        onClose={() => setIsEditing(false)}
        destroyOnClose={true}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab={<ProfileFilled />} key="1">
            <QuestionForm
              leetcodeQuestion={questionItem}
              onSubmit={(v, id) => dispatchEdit(v, id)}
            />
          </TabPane>
          <TabPane tab={<LinkOutlined />} key="2">
            {links.map((item) => (
              <div>
                <Space>
                  <Paragraph
                    editable={{
                      icon: <EditFilled />,
                      tooltip: 'click to Edit Description',
                      onChange: () => console.log('GG'),
                    }}
                  >
                    {item.name}
                  </Paragraph>
                </Space>
              </div>
            ))}
          </TabPane>
        </Tabs>
      </Drawer>
    </>
  );
};

export const leetCodeTableColumns: ColumnsType<LeetCode.questionItem> = [
  {
    key: 'item_title',
    title: 'Title',
    dataIndex: 'item_title',
  },
  {
    key: 'time_created',
    title: 'Created',
    dataIndex: 'time_created',
    render: (timestamp) => moment.unix(timestamp).format('MM-DD-YYYY'),
  },
  {
    key: 'last_visited',
    title: 'Modified',
    dataIndex: 'last_visited',
    render: (timestamp) => moment.unix(timestamp).format('MM-DD-YYYY'),
  },

  {
    title: 'Action',
    dataIndex: 'id',
    render: (id, row) => {
      return <ActionComponent questionItem={row} />;
    },
  },
];
