import { Button } from 'antd';
import { FC } from 'react';

interface PropTypes {
  text: string;
}

const CustomButton: FC<PropTypes> = ({ text }) => {
  return (
    <Button type="primary" block style={{ background: '#000' }}>
      {text}
    </Button>
  );
};

export default CustomButton;
