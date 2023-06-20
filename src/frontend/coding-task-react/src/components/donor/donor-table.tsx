import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { LeftCircleFilled } from '@ant-design/icons';
import { WarningFilled } from '@ant-design/icons';
import { Space, Tag, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import CustomTable from '../shared/custom-table';
import CustomSelect from '../shared/custom-select';
import CustomButton from '../shared/custom-button';

interface Types {
  handleGoBack?: () => void;
}

type NotificationType = 'success' | 'info' | 'warning' | 'error';

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
  const [api, contextHolder] = notification.useNotification();

  const [statusOptions, setStatusOptions] = useState([{}]);
  const [data, setData] = useState<DataType[]>([]);
  const [statusValue, setStatusValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [triggerTable, setTriggerTable] = useState(false);

  const handleFilterChange = (value: string) => {
    setStatusValue(value);
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
    setLoading(true);
    axios
      .get('https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems/all')
      .then((res) => {
        if (statusValue) {
          const filteredData = res?.data?.filter(
            (item: { status: { id: string } }) => item?.status?.id === statusValue
          );
          setData(filteredData);
          setLoading(false);
        } else {
          setData(res?.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        openNotificationWithIcon('error', 'Error', err?.message);
      });
  }, [statusValue, triggerTable]);

  const handleResetClick = () => {
    axios
      .post('https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems/reset')
      .then((res) => {
        if (res) {
          openNotificationWithIcon('success', 'Success', 'Data reset successfully');
          setTriggerTable(!triggerTable);
        }
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

  return (
    <>
      {contextHolder}
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
              width: '350px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <CustomButton shape="default" icon={<LeftCircleFilled />} onClick={handleGoBack} />
            <CustomSelect
              placeholder="Filter Status"
              name={'status'}
              options={statusOptions}
              onChange={handleFilterChange}
              width="200px"
            />
            <CustomButton
              shape="default"
              icon={<WarningFilled />}
              onClick={handleResetClick}
              text="Reset"
            />
          </div>
        </div>

        <CustomTable columns={columns} data={data} loading={loading} />
      </Space>
    </>
  );
};

export default DonorTable;
