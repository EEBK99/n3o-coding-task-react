import { FC, useEffect, useState } from 'react';
import { Form } from 'antd';
import * as yup from 'yup';

import CustomInput from '../shared/custom-input';
import CustomButton from '../shared/custom-button';
import CustomSelect from '../shared/custom-select';
import axios from 'axios';

const DonorForm: FC = () => {
  const [form] = Form.useForm();
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
    console.log('Success:', formData);
    const data = {
      name: formData?.name,
      location: formData?.location,
      theme: formData?.theme,
      price: {
        currencyCode: 'GBP',
        amount: formData?.price
      }
    };
    console.log('formData formatted:', data);

    axios
      .post('https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems', data)
      .then((res) => {
        console.log('res create donation : ', res);
      })
      .catch((err) => {
        console.log('err create donation : ', err);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    axios
      .get('https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems/locations')
      .then((res) => {
        console.log('res location options: ', res);
        setLocationOptions(res?.data);
      })
      .catch((err) => {
        console.log('err location options', err);
      });

    axios
      .get('https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems/themes')
      .then((res) => {
        console.log('res themes options: ', res);
        setThemeOptions(res?.data);
      })
      .catch((err) => {
        console.log('err themes options', err);
      });
  }, []);

  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 2 }}
        style={{ width: '100%' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <CustomInput placeholder="Enter name" label={'Name'} name={'name'} rules={[yupSync]} />
        <CustomSelect
          placeholder="Enter location"
          label={'Location'}
          name={'location'}
          rules={[yupSync]}
          options={locationOptions}
        />
        <CustomSelect
          placeholder="Enter theme"
          label={'Theme'}
          name={'theme'}
          rules={[yupSync]}
          options={themeOptions}
        />
        <CustomInput placeholder="Enter price" label={'Price'} name={'price'} rules={[yupSync]} />
        <CustomButton text={'Create'} isFormButton isBlock />
      </Form>
    </>
  );
};

export default DonorForm;
