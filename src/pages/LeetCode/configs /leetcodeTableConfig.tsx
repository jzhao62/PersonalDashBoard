import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { Button, Divider, Space } from 'antd';

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
      return (
        <Space split={<Divider type="vertical" />}>
          <Button type="link"> Edit </Button>
          <Button type="link"> Delete </Button>
        </Space>
      );
    },
  },
];
