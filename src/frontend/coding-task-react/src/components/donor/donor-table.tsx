import { FC, useEffect, useState } from 'react';
import axios from 'axios';

import { Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import CustomTable from '../shared/custom-table';

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

const DonorTable: FC = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    axios
      .get('https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems/all')
      .then((res) => {
        console.log('res: ', res);
        setData(res?.data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  return (
    <>
      <CustomTable columns={columns} data={data} />
    </>
  );
};

export default DonorTable;
