import type { ReactElement } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { createQuestion } from '@/services/leetcode/leetcode';
import { useRequest } from '@@/plugin-request/request';

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

interface IProp {
  leetcodeQuestion?: LeetCode.questionPayload;
}

const OPTIONS: string[] = [];

const QuestionForm = ({ leetcodeQuestion = undefined }: IProp): ReactElement => {
  const { data, run } = useRequest(createQuestion, {
    manual: true,
    onSuccess: (result, params) => {
      console.log(data, result, params);
    },
  });

  const onFinish = (values: any) => {
    run({
      title: values.title,
      detail: {
        description: values.description,
        tags: values.tags,
        difficulty: values.difficulty,
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        title: leetcodeQuestion?.title,
        tags: leetcodeQuestion?.detail.tags,
        description: leetcodeQuestion?.detail.description,
        difficulty: leetcodeQuestion?.detail.difficulty,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="Title" name="title" rules={[{ required: true, message: 'input title' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Tags" name="tags">
        <Select mode="tags" style={{ width: '100%' }}>
          {OPTIONS.map((option, idx) => (
            <Option key={idx} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'input description' }]}
      >
        <Input.TextArea rows={10} />
      </Form.Item>

      <Form.Item label="Difficulty" name="difficulty">
        <Select style={{ width: 120 }} bordered={true}>
          <Option value="Easy">Easy</Option>
          <Option value="Medium">Medium</Option>
          <Option value="Hard">Hard</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default QuestionForm;
