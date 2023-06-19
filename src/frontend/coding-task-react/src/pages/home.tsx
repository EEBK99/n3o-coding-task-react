import {  Space } from 'antd';
import { FC } from 'react';
import CustomButton from '../components/shared/custom-button';

const Home: FC = () => {
  return (
    <>
      <section className="heading">
        <h1>Donor Portal</h1>
        <p>Please choose from an option below</p>
      </section>

      <Space direction="vertical" style={{ width: '100%' }}>
        <CustomButton text={'Create New Donor'} />
        <CustomButton text={'View Donor List'} />
      </Space>
    </>
  );
};

export default Home;
