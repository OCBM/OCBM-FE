import { Table as AntdTable } from 'antd';
import { TableProps } from 'antd/lib/table';

type customPros = {
  key?: string;
  employee_name?: string;
  Position?: string;
  action?: any;
  dataSource?: any[];
};

export function Table(props: TableProps<customPros>) {
  return (
    <div>
      <AntdTable {...props} />
    </div>
  );
}
