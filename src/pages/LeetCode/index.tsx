import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Drawer, Table } from 'antd';
import QuestionForm from '@/pages/LeetCode/components/QuestionForm/QuestionForm';
import { useRequest } from '@umijs/hooks';
import { leetCodeTableColumns } from '@/pages/LeetCode/configs /leetcodeTableConfig';
import { createQuestion, editQuestion, getAllQuestions } from '@/services/leetcode/leetcode';
import { ReloadOutlined } from '@ant-design/icons';

const LeetCodeList: React.FC = () => {
  const [isCreatingNewItem, setCreatingNewItem] = useState(false);
  const [questionModified, setQuestionModified] = useState<LeetCode.questionItem | null>(null);

  const { data, loading, run } = useRequest<LeetCode.questionItem[]>(getAllQuestions);

  const { run: dispatchCreate } = useRequest(createQuestion, { manual: true });

  const { run: dispatchEdit } = useRequest(editQuestion, { manual: true });

  console.log(questionModified);

  return (
    <PageContainer
      content="Completed leetcode/lintcode"
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
        onRow={(record: LeetCode.questionItem) => {
          return {
            onClick: () => {
              setQuestionModified(record);
            },
          };
        }}
      />

      <Drawer
        width={600}
        title="New Question"
        visible={isCreatingNewItem}
        footer={null}
        onClose={() => setCreatingNewItem(false)}
        destroyOnClose={true}
      >
        <QuestionForm onSubmit={(v) => dispatchCreate(v)} />
      </Drawer>

      <Drawer
        width={600}
        title="Editing Existing Question"
        visible={questionModified !== null}
        footer={null}
        onClose={() => setQuestionModified(null)}
        destroyOnClose={true}
      >
        {questionModified && (
          <QuestionForm
            leetcodeQuestion={questionModified}
            onSubmit={(v, id) => dispatchEdit(v, id)}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default LeetCodeList;
