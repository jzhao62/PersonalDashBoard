import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ReactElement } from 'react';
import { useRef, useState } from 'react';

interface IProps {
  value?: string[];
  onChange?: (currPatterns: string[]) => void;
  canModify?: boolean;
  tagLength?: number;
}

export const EditableTagGroup = ({
  value = [],
  onChange,
  canModify,
  tagLength = 5,
}: IProps): ReactElement => {
  const [tags, setCurrentTags] = useState(value);
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const saveInputRef = useRef(null);
  const saveEditInputRef = useRef(null);

  const handleClose = (removedTag: string): void => {
    const newTags = [...tags.filter((tag) => tag !== removedTag)];
    setCurrentTags([...newTags]);
    if (onChange) onChange(newTags);
  };

  const showInput = (): void => {
    setInputVisible(true);
  };

  const handleInputChange = (e: any): void => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = (): void => {
    let newTags = [...tags];
    if (inputValue && tags.indexOf(inputValue) === -1) {
      newTags = [...newTags, inputValue];
      setCurrentTags(newTags);
    }
    setInputVisible(false);
    setInputValue('');
    if (onChange) onChange(newTags);
  };

  const handleEditInputChange = (e: any): void => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = (): void => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setCurrentTags([...newTags]);
    setEditInputIndex(-1);
    setEditInputValue('');
    if (onChange) onChange(newTags);
  };

  return (
    <>
      {tags &&
        tags.map((tag, index) => {
          if (editInputIndex === index && canModify) {
            return (
              <Input
                ref={saveEditInputRef}
                key={tag}
                size="small"
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            );
          }
          const isLongTag = tag.length > tagLength;
          const tagElem = (
            <Tag key={tag} closable={canModify} onClose={() => handleClose(tag)}>
              <span
                onDoubleClick={(e) => {
                  if (index !== 0) {
                    setEditInputIndex(index);
                    setEditInputValue(tag);
                    e.preventDefault();
                  }
                }}
              >
                {isLongTag ? `${tag.slice(0, 5)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
      {!inputVisible && canModify && (
        <Tag onClick={showInput}>
          <PlusOutlined />
        </Tag>
      )}
      {inputVisible && canModify && (
        <Input
          ref={saveInputRef}
          type="text"
          size="small"
          style={{ width: '78px' }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
    </>
  );
};

export default EditableTagGroup;
