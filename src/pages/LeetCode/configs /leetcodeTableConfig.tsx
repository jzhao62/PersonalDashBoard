import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { Button, Divider, Drawer, message, Space } from 'antd';
import type { ReactElement } from 'react';
import { useRequest } from '@umijs/hooks';
import { deleteQuestion, editQuestion } from '@/services/leetcode/leetcode';
import { useState } from 'react';
import QuestionForm from '@/pages/LeetCode/components/QuestionForm/QuestionForm';

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
        <QuestionForm leetcodeQuestion={questionItem} onSubmit={(v, id) => dispatchEdit(v, id)} />
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
