import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Drawer, message, Table } from 'antd';
import QuestionForm from '@/pages/LeetCode/components/QuestionForm/QuestionForm';
import { useRequest } from '@umijs/hooks';
import { leetCodeTableColumns } from '@/pages/LeetCode/configs /leetcodeTableConfig';
import { createQuestion, getAllQuestions } from '@/services/leetcode/leetcode';
import { ReloadOutlined } from '@ant-design/icons';

const LeetCodeList: React.FC = () => {
  const [isCreatingNewItem, setCreatingNewItem] = useState(false);

  const { data, loading, run } = useRequest<LeetCode.questionItem[]>(getAllQuestions);

  const { run: dispatchCreate } = useRequest(createQuestion, {
    manual: true,
    onSuccess: () => setCreatingNewItem(false),
    onError: (result) => message.error(result.message),
  });

  return (
    <PageContainer
      extra={[
        <Button key="1" type="primary" onClick={() => setCreatingNewItem(true)}>
          Add a problem
        </Button>,
        <Button type="text" shape="round" onClick={() => run()}>
          <ReloadOutlined />
        </Button>,
      ]}
    >
      <Table<LeetCode.questionItem>
        columns={leetCodeTableColumns}
        loading={loading}
        dataSource={data}
      />

      <Drawer
        width={700}
        title="New Question"
        visible={isCreatingNewItem}
        footer={null}
        onClose={() => setCreatingNewItem(false)}
        destroyOnClose={true}
      >
        <QuestionForm onSubmit={(v) => dispatchCreate(v)} />
      </Drawer>
    </PageContainer>
  );
};

export default LeetCodeList;
