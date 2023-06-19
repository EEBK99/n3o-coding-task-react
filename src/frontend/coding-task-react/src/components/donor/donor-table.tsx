import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { LeftCircleFilled } from '@ant-design/icons';

import { Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import CustomTable from '../shared/custom-table';
import CustomSelect from '../shared/custom-select';
import CustomButton from '../shared/custom-button';

interface Types {
  handleGoBack?: () => void;
}
interface DataType {
  id: string;
  name: string | null;
  reference: { [key: string]: string } | null;
  price: { [key: string]: string } | null;
  status: { [key: string]: string };
  location: { [key: string]: string } | null;
  theme: { [key: string]: string } | null;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Donation Item Name',
    dataIndex: 'name',
    render: (_, { name }) => <>{name ?? 'N/A'}</>
  },
  {
    title: 'Reference',
    dataIndex: 'reference',
    key: 'reference',
    render: (_, { reference }) => <>{reference?.text ?? 'N/A'}</>
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (_, { price }) => <>{price?.text ?? 'N/A'}</>
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => {
      const color = status?.name === 'Active' ? 'green' : 'red';
      return (
        <Tag color={color} key={status?.name}>
          {status?.name?.toUpperCase()}
        </Tag>
      );
    }
  },
  {
    title: 'Location',
    key: 'location',
    dataIndex: 'location',
    render: (_, { location }) => <>{location?.name ?? 'N/A'}</>
  },
  {
    title: 'Theme',
    key: 'theme',
    dataIndex: 'theme',
    render: (_, { theme }) => <>{theme?.name ?? 'N/A'}</>
  }
];

const DonorTable: FC<Types> = ({ handleGoBack }) => {
  const [statusOptions, setStatusOptions] = useState([{}]);
  const [data, setData] = useState<DataType[]>([]);

  const handleFilterChange = (value: string) => {
    console.log('status', value);
  };

  useEffect(() => {
    axios
      .get('https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems/statuses')
      .then((res) => {
        setStatusOptions(res?.data);
      })
      .catch((err) => {
        // handle error response
        console.log('err status', err);
      });
  }, []);

  useEffect(() => {
    axios
      .get('https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems/all')
      .then((res) => {
        setData(res?.data);
      })
      .catch((err) => {
        // handle error response
        console.log('err all donations', err);
      });
  }, []);

  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'end'
          }}>
          <div
            style={{
              width: '250px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <CustomButton shape="default" icon={<LeftCircleFilled />} onClick={handleGoBack} />
            <CustomSelect
              placeholder="Select status"
              label={'Filter Status'}
              name={'status'}
              options={statusOptions}
              onChange={handleFilterChange}
              width="200px"
            />
          </div>
        </div>

        <CustomTable columns={columns} data={data} />
      </Space>
    </>
  );
};

export default DonorTable;
