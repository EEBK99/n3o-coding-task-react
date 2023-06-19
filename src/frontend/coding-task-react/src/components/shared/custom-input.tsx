import { Form, Input } from 'antd';
import { FC } from 'react';

interface Types {
  placeholder: string;
  label: string;
  name: string;
  rules?: any;
}

const CustomInput: FC<Types> = ({ placeholder, label, name, rules }) => {
  return (
    <>
      <Form.Item label={label} name={name} rules={rules}>
        <Input placeholder={placeholder} />
      </Form.Item>
    </>
  );
};

export default CustomInput;
