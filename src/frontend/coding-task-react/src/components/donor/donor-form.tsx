import { FC, useEffect, useState } from 'react';
import { Form, Space, notification } from 'antd';
import * as yup from 'yup';
import { LeftCircleFilled } from '@ant-design/icons';

import CustomInput from '../shared/custom-input';
import CustomButton from '../shared/custom-button';
import CustomSelect from '../shared/custom-select';
import axios from 'axios';

interface Types {
  handleGoBack?: () => void;
}

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const DonorForm: FC<Types> = ({ handleGoBack }) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const [locationOptions, setLocationOptions] = useState([{}]);
  const [themeOptions, setThemeOptions] = useState([{}]);

  const schema = yup.object().shape({
    name: yup.string().required('This field is required').min(1).max(200),
    location: yup.string().required('This field is required'),
    theme: yup.string().required('This field is required'),
    price: yup
      .string()
      .matches(
        /^(?=.*[1-9])\d*(\.\d{1,2})?$/,
        'Please enter a positive number or decimal greater than 0 with up to two decimal points'
      )
      .nullable()
  });

  const yupSync = {
    async validator({ field }: any, value: any) {
      await schema.validateSyncAt(field, { [field]: value });
    }
  };

  const onFinish = (formData: any) => {
    const data = {
      name: formData?.name,
      location: formData?.location,
      theme: formData?.theme,
      price: {
        currencyCode: 'GBP',
        amount: formData?.price
      }
    };

    axios
      .post('https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems', data)
      .then((res) => {
        form.resetFields();
        openNotificationWithIcon(
          'success',
          'Success',
          'The new donation item created successfully'
        );
      })
      .catch((err) => {
        openNotificationWithIcon('error', 'Error', err?.message);
      });
  };

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    api[type]({
      message: message,
      description: description
    });
  };

  useEffect(() => {
    axios
      .get('https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems/locations')
      .then((res) => {
        setLocationOptions(res?.data);
      })
      .catch((err) => {
        openNotificationWithIcon('error', 'Error', err?.message);
      });

    axios
      .get('https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems/themes')
      .then((res) => {
        setThemeOptions(res?.data);
      })
      .catch((err) => {
        openNotificationWithIcon('error', 'Error', err?.message);
      });
  }, []);

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 }
  };

  const tailLayout = {
    wrapperCol: { offset: 6, span: 12 }
  };

  return (
    <>
      {contextHolder}
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
          <CustomButton shape="default" icon={<LeftCircleFilled />} onClick={handleGoBack} />
        </div>
        <Form
          form={form}
          name="basic"
          {...layout}
          style={{ width: '100%' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off">
          <CustomInput placeholder="Enter name" label={'Name'} name={'name'} rules={[yupSync]} />
          <CustomSelect
            placeholder="Enter location"
            label={'Location'}
            name={'location'}
            rules={[yupSync]}
            options={locationOptions}
            isForm
          />
          <CustomSelect
            placeholder="Enter theme"
            label={'Theme'}
            name={'theme'}
            rules={[yupSync]}
            options={themeOptions}
            isForm
          />
          <CustomInput placeholder="Enter price" label={'Price'} name={'price'} rules={[yupSync]} />
          <CustomButton text={'Create'} isForm isBlock layout={tailLayout} />
        </Form>
      </Space>
    </>
  );
};

export default DonorForm;
