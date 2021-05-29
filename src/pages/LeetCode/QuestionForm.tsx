import type { ReactElement } from 'react';
import { Button, Form, Input } from 'antd';

interface IProp {
  title?: string;
  description?: string;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

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
      initialValues={{ title, description }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="title"
        name="title"
        rules={[{ required: true, message: 'input title' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="description"
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
