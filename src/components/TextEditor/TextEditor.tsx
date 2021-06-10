// TextEditor.tsx
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import style from './index.less';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

hljs.configure({
  languages: ['javascript', 'ruby', 'python', 'rust'],
});

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'code-block'],
    ['clean'],
  ],
  syntax: {
    highlight: (text: string) => hljs.highlightAuto(text).value,
  },
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'code-block'
];

interface OnChangeHandler {
  (e: any): void;
}

type Props = {
  value?: string;
  placeholder: string;
  onChange?: OnChangeHandler;
};

const TextEditor: React.FC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <div className={style.textEditor}>
      <ReactQuill
        theme="snow"
        value={value || ''}
        modules={modules}
        formats={formats}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextEditor;
