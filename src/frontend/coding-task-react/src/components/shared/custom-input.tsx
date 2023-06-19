import { Form, Input } from 'antd';
import { FC } from 'react';

interface Types {
  placeholder: string;
  label: string;
  name: string;
}

const CustomInput: FC<Types> = ({ placeholder, label, name }) => {
  return (
    <>
      <Form.Item
        label={label}
        name={name}
        rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input placeholder={placeholder} />
      </Form.Item>
    </>
  );
};

export default CustomInput;
