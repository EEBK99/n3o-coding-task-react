import { Form, Select } from 'antd';
import { FC } from 'react';

interface Types {
  placeholder: string;
  label: string;
  name: string;
  rules?: any[];
  options?: any[];
  isForm?: boolean;
  onChange?: (value: string) => void;
  width?: string;
}

const { Option } = Select;

const CustomSelect: FC<Types> = ({
  placeholder,
  label,
  name,
  rules,
  options,
  isForm = false,
  onChange,
  width
}) => {
  return (
    <>
      {isForm ? (
        <Form.Item label={label} name={name} rules={rules}>
          <Select placeholder={placeholder} allowClear>
            {options?.map((option: { id: string; name: string }) => (
              <Option value={option?.id}>{option?.name}</Option>
            ))}
          </Select>
        </Form.Item>
      ) : (
        <Select style={{ width: width }} placeholder={placeholder} onChange={onChange} allowClear>
          {options?.map((option: { id: string; name: string }) => (
            <Option value={option?.id}>{option?.name}</Option>
          ))}
        </Select>
      )}
    </>
  );
};

export default CustomSelect;
