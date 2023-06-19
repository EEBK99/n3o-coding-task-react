import { FC } from 'react';
import { Table } from 'antd';

interface Types {
  columns: any;
  data: any[];
}

const CustomTable: FC<Types> = ({ columns, data }) => {
  return <Table columns={columns} dataSource={data} />;
};

export default CustomTable;
