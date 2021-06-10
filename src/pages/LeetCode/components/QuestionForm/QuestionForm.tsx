import type { ReactElement } from 'react';
import { Button, Divider, Form, Input, message, Select, Tabs } from 'antd';
import EditableTagGroup from '@/components/EditableTagGroup';
import styles from './index.less';
import TextEditor from '@/components/TextEditor/TextEditor';

const { Option } = Select;
const { TabPane } = Tabs;

interface IProp {
  leetcodeQuestion?: LeetCode.questionItem | null;
  onSubmit?: (payload: LeetCode.itemPayload, id?: string) => void;
}

const OPTIONS: string[] = [];

const QuestionForm = ({ leetcodeQuestion = null, onSubmit }: IProp): ReactElement => {
  const onFinish = (values: any) => {
    if (onSubmit) {
      const payload: LeetCode.itemPayload = {
        title: values.title,
        detail: {
          description: values.description,
          tags: values.tags,
          difficulty: values.difficulty,
          url_sources: values.url_sources,
        },
      };

      onSubmit(payload, leetcodeQuestion?.id);
    }
  };

  const onFinishFailed = () => {
    message.error('Error Creating Item');
  };

  return (
    <Form
      layout="vertical"
      name="basic"
      initialValues={{
        title: leetcodeQuestion?.item_title,
        tags: leetcodeQuestion?.detail.tags,
        description: leetcodeQuestion?.detail.description,
        difficulty: leetcodeQuestion?.detail.difficulty,
        url_sources: leetcodeQuestion?.detail.url_sources,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Attributes" key="1">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'input title' }]}
          >
            <Input className={styles.inputWrapper} />
          </Form.Item>

          <Form.Item label="Tags" name="tags">
            <Select mode="tags" style={{ width: '100%' }} className={styles.inputWrapper}>
              {OPTIONS.map((option, idx) => (
                <Option key={idx} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Difficulty" name="difficulty">
            <Select style={{ width: 120 }} className={styles.inputWrapper}>
              <Option value="Easy">Easy</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Hard">Hard</Option>
            </Select>
          </Form.Item>

          <Form.Item label="url_sources" name="url_sources">
            <EditableTagGroup canModify />
          </Form.Item>
          <Form.Item>
            <Divider />
          </Form.Item>
        </TabPane>
        <TabPane tab="Details" key="2">
          <Form.Item
            name="description"
          >
            <TextEditor placeholder="input your text here" />
          </Form.Item>
        </TabPane>
      </Tabs>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default QuestionForm;
