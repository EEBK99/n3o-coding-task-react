import { FC } from 'react';
import { Space } from 'antd';

import CustomButton from '../components/shared/custom-button';
import DonorTable from '../components/donor/donor-table';
import DonorForm from '../components/donor/donor-form';

const Home: FC = () => {
  return (
    <>
      <section className="heading">
        <h1>Donor Portal</h1>
        <p>Please choose from an option below</p>
      </section>

      <Space direction="vertical" style={{ width: '100%' }}>
        <CustomButton text={'Create New Donor'} isBlock />
        <CustomButton text={'View Donor List'} isBlock />
      </Space>

      <div style={{ marginTop: '5rem', marginBottom: '5rem' }}>
        <DonorForm />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <CustomButton text={'Back'} />
      </div>

      <DonorTable />
    </>
  );
};

export default Home;
