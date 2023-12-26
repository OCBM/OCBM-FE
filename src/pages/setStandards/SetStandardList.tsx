import { DeleteIcon, PencilIcon, SearchIcon } from '@/assets/icons';
import { Table } from '@/components/reusable/table';
import { Button, Input } from '@/components';
import { DATA_SOURCE } from './constants';
import { useNavigate } from 'react-router-dom';
import { SITEMAP } from '@/utils/sitemap';

const SetStandardList = () => {
  const navigate = useNavigate();

  const columns: any = [
    {
      title: 'Machine Name',
      dataIndex: 'machineName',
      key: 'machineName',
      align: 'center',
    },
    {
      title: 'Element Name',
      dataIndex: 'elementName',
      key: ' elementName',
      align: 'center',
    },
    {
      title: 'Sensor Description',
      dataIndex: 'sensorDescription',
      key: 'sensorDescription',
      align: 'center',
    },
    {
      title: 'Sensor ID',
      dataIndex: 'sensorID',
      key: 'sensorID',
      align: 'center',
    },
    {
      title: 'Operating Range',
      dataIndex: 'operatingRange',
      key: 'operatingRange',
      className: 'operatingRange',
      align: 'center',
    },
    {
      title: 'Threshold value',
      dataIndex: 'thresholdValue',
      key: 'thresholdValue',
      className: 'thresholdValue',
      align: 'center',
    },
    {
      title: 'UOM',
      dataIndex: 'uom',
      key: 'uom',
      align: 'center',
    },
    {
      title: 'Interval',
      dataIndex: 'interval',
      key: 'interval',
      align: 'center',
    },
    {
      title: 'Trigger',
      dataIndex: 'trigger',
      key: 'trigger',
      align: 'center',
    },
    {
      title: 'Criticality',
      dataIndex: 'criticality',
      key: 'criticality',
      align: 'center',
    },
    {
      title: 'Actions',
      dataIndex: 'criticality',
      key: 'criticality',
      align: 'center',

      render: () => {
        return (
          <div className="flex justify-center gap-3">
            <div className="cursor-pointer">
              <PencilIcon className="w-[20px] h-[20px]" />
            </div>
            <div className="cursor-pointer">
              <DeleteIcon className="w-[20px] h-[20px]" />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex justify-between mb-7">
        <p className="font-semibold text-2xl leading-6">CBM SET STANDARDS</p>
        <Input
          className="border-2 w-[340px] h-12 flex gap-3 text-sm p-4"
          leftIcon={<SearchIcon />}
          placeholder="Search Sensor, Machine..."
        />
        <Button
          className="font-medium text-base w-52 h-10 leading-4 flex justify-center items-center"
          label="+ Create Standards"
          type="button"
          variant="primary"
          onClick={() => navigate(SITEMAP.setStandards.NewSetStandards)}
        />
      </div>

      <Table className="set-table" columns={columns} dataSource={DATA_SOURCE} scroll={{ x: 'calc(1500px + 50%)' }} />
    </>
  );
};
export default SetStandardList;
