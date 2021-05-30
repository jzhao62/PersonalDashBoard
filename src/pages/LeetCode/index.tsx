import React, { useState } from 'react';

import { PageContainer } from '@ant-design/pro-layout';
import { Button, Drawer, Table } from 'antd';
import QuestionForm from '@/pages/LeetCode/components/QuestionForm';
import { useRequest } from '@umijs/hooks';
import { leetCodeTableColumns } from '@/pages/LeetCode/configs /leetcodeTableConfig';
import { getAllQuestions } from '@/services/leetcode/leetcode';

const LeetCodeList: React.FC = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const { data } = useRequest<LeetCode.question[]>(getAllQuestions);

  console.log(data);

  return (
    <PageContainer
      content="Already visited leetcode/lintcode"
      extra={[
        <Button key="1" type="primary" onClick={() => setIsDrawerVisible(true)}>
          Add a problem
        </Button>,
      ]}
    >
      <Table<LeetCode.question> columns={leetCodeTableColumns} dataSource={data} />

      <Drawer
        width={600}
        title="New Question"
        visible={isDrawerVisible}
        footer={null}
        onClose={() => setIsDrawerVisible(false)}
      >
        <QuestionForm />
      </Drawer>
    </PageContainer>
  );
};

export default LeetCodeList;
