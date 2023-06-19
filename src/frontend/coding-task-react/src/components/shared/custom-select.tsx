import { Form, Input, Select } from 'antd';
import { FC } from 'react';

interface Types {
  placeholder: string;
  label: string;
  name: string;
  rules?: any[];
  options?: any[];
}

const { Option } = Select;

const CustomSelect: FC<Types> = ({ placeholder, label, name, rules, options }) => {
  return (
    <>
      <Form.Item label={label} name={name} rules={rules}>
        <Select placeholder={placeholder} allowClear>
          {options?.map((option: { id: string; name: string }) => (
            <Option value={option?.id}>{option?.name}</Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default CustomSelect;
