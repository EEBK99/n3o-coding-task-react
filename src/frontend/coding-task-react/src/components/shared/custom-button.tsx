import { Button, Form } from 'antd';
import { FC } from 'react';

interface PropTypes {
  text?: string;
  isBlock?: boolean;
  isForm?: boolean;
  onClick?: (event: any) => void;
  shape?: 'circle' | 'default' | 'round' | undefined;
  icon?: JSX.Element;
}

const CustomButton: FC<PropTypes> = ({ text, isBlock, isForm = false, onClick, shape, icon }) => {
  return (
    <>
      {isForm ? (
        <Form.Item>
          <Button type="primary" block={isBlock} style={{ background: '#000' }} htmlType="submit">
            {text}
          </Button>
        </Form.Item>
      ) : (
        <Button
          type="primary"
          block={isBlock}
          style={{ background: '#000' }}
          htmlType="button"
          onClick={onClick}
          shape={shape}
          icon={icon}>
          {text}
        </Button>
      )}
    </>
  );
};

export default CustomButton;
