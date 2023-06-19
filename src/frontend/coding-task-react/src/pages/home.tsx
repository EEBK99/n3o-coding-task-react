import { FC, useState } from 'react';
import { Space } from 'antd';
import { DatabaseFilled, PlusSquareFilled } from '@ant-design/icons';

import CustomButton from '../components/shared/custom-button';
import DonorTable from '../components/donor/donor-table';
import DonorForm from '../components/donor/donor-form';

const Home: FC = () => {
  const [viewForm, setViewForm] = useState(false);
  const [viewTable, setViewTable] = useState(false);

  const handleCreateClick = () => {
    setViewForm(true);
  };

  const handleViewClick = () => {
    setViewTable(true);
  };

  const handleGoBack = () => {
    setViewForm(false);
    setViewTable(false);
  };

  return (
    <>
      <section className="heading">
        <h1>Donor Portal</h1>
        {viewForm || viewTable ? null : <p>Please choose from an option below</p>}
      </section>

      {viewForm || viewTable ? null : (
        <Space direction="vertical" style={{ width: '100%' }}>
          <CustomButton
            text={'Create New Donor'}
            isBlock
            onClick={handleCreateClick}
            icon={<PlusSquareFilled />}
          />
          <CustomButton
            text={'View Donor List'}
            isBlock
            onClick={handleViewClick}
            icon={<DatabaseFilled />}
          />
        </Space>
      )}

      {viewForm ? (
        <div style={{ marginTop: '5rem', marginBottom: '5rem' }}>
          <DonorForm handleGoBack={handleGoBack} />
        </div>
      ) : null}

      {viewTable ? <DonorTable handleGoBack={handleGoBack} /> : null}
    </>
  );
};

export default Home;
