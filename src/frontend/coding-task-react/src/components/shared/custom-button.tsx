import { Button, Form } from 'antd';
import { FC } from 'react';

interface PropTypes {
  text: string;
  isBlock?: boolean;
  isFormButton?: boolean;
}

const CustomButton: FC<PropTypes> = ({ text, isBlock, isFormButton }) => {
  return (
    <>
      {isFormButton ? (
        <Form.Item>
          <Button type="primary" block={isBlock} style={{ background: '#000' }} htmlType="submit">
            {text}
          </Button>
        </Form.Item>
      ) : (
        <Button type="primary" block={isBlock} style={{ background: '#000' }}>
          {text}
        </Button>
      )}
    </>
  );
};

export default CustomButton;
