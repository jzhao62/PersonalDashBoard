import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';

export const leetCodeTableColumns: ColumnsType<LeetCode.question> = [
  {
    key: 'item_title',
    title: 'item_title',
    dataIndex: 'item_title',
  },
  {
    key: 'time_created',
    title: 'time_created',
    dataIndex: 'time_created',
    render: (timestamp) => moment.unix(timestamp).format('MM-DD-YYYY'),
  },
  {
    key: 'last_visited',
    title: 'last_visited',
    dataIndex: 'last_visited',
    render: (timestamp) => moment.unix(timestamp).format('MM-DD-YYYY'),
  },
];
