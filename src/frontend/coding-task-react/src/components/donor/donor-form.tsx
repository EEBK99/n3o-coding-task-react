import { FC } from 'react';
import { Form } from 'antd';

import CustomInput from '../shared/custom-input';
import CustomButton from '../shared/custom-button';

const DonorForm: FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 2 }}
        style={{ width: '100%' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <CustomInput placeholder="Enter name" label={'Name'} name={'name'} />
        <CustomInput placeholder="Enter location" label={'Location'} name={'location'} />
        <CustomInput placeholder="Enter theme" label={'Theme'} name={'theme'} />
        <CustomInput placeholder="Enter price" label={'Price'} name={'price'} />
        <CustomButton text={'Create'} isFormButton isBlock />
      </Form>
    </>
  );
};

export default DonorForm;
