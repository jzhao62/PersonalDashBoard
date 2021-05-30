import type { ReactElement } from 'react';
import { Button, Form, Input, Select } from 'antd';

const { Option } = Select;
interface IProp {
  title?: string;
  description?: string;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const OPTIONS = ['t1', 't2', 't3'];

const QuestionForm = ({ title, description }: IProp): ReactElement => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ title, tags: ['t1', 't2', 't3'], description }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="Title" name="title" rules={[{ required: true, message: 'input title' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Tags" name="tags">
        <Select mode="tags" style={{ width: '100%' }} placeholder="tags" bordered={false}>
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
        <Input.TextArea />
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
