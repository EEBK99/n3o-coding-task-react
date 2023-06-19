import { FC } from 'react';
import { Table } from 'antd';

interface Types {
  columns: any;
  data: any[];
  loading?: boolean;
}

const CustomTable: FC<Types> = ({ columns, data, loading = false }) => {
  return <Table columns={columns} dataSource={data} loading={loading} />;
};

export default CustomTable;
