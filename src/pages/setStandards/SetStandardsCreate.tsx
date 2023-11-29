import { Table } from '@/components/reusable/table';
import { Button } from '@/components';
import { Dropdown } from '@/components';
import { Input } from '@/components';
import { Checkbox } from 'antd';

const SetStandardsCreate = () => {
  //   interface DataType {
  //     key: React.Key;
  //     machineLine: string;
  //     ElementName: string;
  //     SensorDescription: string;
  //     SensorID: string;
  //     OperatingRange: number;
  //     ThresholdValue: number;
  //     UOM: string;
  //     Interval: string;
  //     Trigger: string;
  //     Criticality: string;
  //   }

  const columns = [
    {
      title: 'Machine line',
      key: 'machineLine',
      dataIndex: 'machineLine',
      width: '10%',
      render: () => {
        return (
          <div className="flex justify-start gap-3">
            <div className="flex gap-1">
              <Checkbox className="accent-black-700" />
              <p>HONOR VTC-15</p>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Element Name',
      key: 'ElementName',
      dataIndex: 'ElementName',
    },
    {
      title: 'Sensor Description',
      key: 'SensorDescription',
      dataIndex: 'SensorDescription',
    },
    {
      title: 'Sensor ID',
      key: 'SensorID',
      dataIndex: 'SensorID',
    },
    {
      title: 'Operating Range',
      key: 'OperatingRange',
      dataIndex: 'OperatingRange',
      render: () => {
        return (
          <div className="flex gap-3 ml-4 ">
            <div className=" border-b-2 border-[#A9A9A9] w-[30px]">
              <Input />
            </div>
            <p>-</p>
            <div className=" border-b-2 border-[#A9A9A9] w-[30px]">
              <Input />
            </div>
          </div>
        );
      },
    },
    {
      title: 'Threshold Value',
      key: 'ThresholdValue',
      dataIndex: 'ThresholdValue',
      render: () => {
        return (
          <div className="flex gap-3 ml-4 ">
            <div className=" border-b-2 border-[#A9A9A9] w-[30px]">
              <Input />
            </div>
            <p>-</p>
            <div className=" border-b-2 border-[#A9A9A9] w-[30px]">
              <Input />
            </div>
          </div>
        );
      },
    },
    {
      title: 'UOM',
      key: 'UOM',
      dataIndex: 'UOM',
      render: () => {
        return (
          <div className="flex justify-start gap-3 border-b-2 ml-5 border-[#A9A9A9] w-[70px]">
            <div>
              <Dropdown
                placeholder="Bar"
                className="w-[70px] border-transparent py-4 px-2 text-[14px]  h-[46px] placeholder:text-[#BBBBBB]"
                options=""
                optionLabel="uom"
                mandatory={false}
              />
            </div>
          </div>
        );
      },
    },
    {
      title: 'Interval',
      key: 'Interval',
      dataIndex: 'Interval',
      render: () => {
        return (
          <div className="flex gap-3 ml-4 ">
            <div className=" border-b-2 border-[#A9A9A9] w-[30px]">
              <Input placeholder="" />
            </div>
          </div>
        );
      },
    },
    {
      title: 'Trigger',
      key: 'Trigger',
      dataIndex: 'Trigger',

      render: () => {
        return (
          <div className="flex justify-start gap-3 ml-5 border-b-2 border-[#A9A9A9] w-[70px]">
            <div>
              <Dropdown
                placeholder="Max"
                className="w-[90px] border-transparent py-4 px-2 text-[14px]  h-[46px] placeholder:text-[#BBBBBB]"
                options=""
                optionLabel="uom"
                mandatory={false}
              />
            </div>
          </div>
        );
      },
    },

    {
      title: 'Criticality',
      key: 'Criticality',
      width: '18%',
      dataIndex: 'Criticality',
      render: () => {
        return (
          <div className="flex justify-start gap-3">
            <div className="flex gap-1">
              <Checkbox />
              <p>breakdown</p>
            </div>
            <div className="flex gap-1">
              <Checkbox />
              <p>Defect</p>
            </div>
            <div className="flex gap-1">
              <Checkbox />
              <p>Unsafe</p>
            </div>
          </div>
        );
      },
    },
  ];

  const data: any = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      key: i,
      machineLine: '',
      ElementName: 'Hydraulic System',
      SensorDescription: 'Oil Temp Out',
      SensorID: 'HONOR-15_LS',
      OperatingRange: 30,
      ThresholdValue: 40,
      UOM: 'Bar',
      Interval: '8hr',
      Trigger: 'Max',
      Criticality: '',
    });
  }

  return (
    <>
      <div className="rounded-lg shadow-md p-5 relative">
        <h2 className="font-GothamMedium text-2xl font-medium mb-4">New Set Standards</h2>
        <div className="flex flex-col justify-center w-[1200px] mb-4 text-center">
          <h3 className="text-[#492CE1] font-bold mb-2">
            Machine Name <span className="text-red-400">*</span>
          </h3>
          <Dropdown
            placeholder="Select Machine"
            className="w-[230px] border-[1px] border-solid border-[#000000] rounded-[50px] mb-3 ml-[40%] mt-2 py-4 px-5 text-[14px] leading-[14px] h-[60px] placeholder:text-[#BBBBBB]"
            options=""
            optionLabel="MachineName"
            mandatory={true}
          />
        </div>
        <Table columns={columns} dataSource={data} scroll={{ x: 'calc(1000px + 50%)' }} />
        <div className="flex gap-4 justify-center">
          <Button
            label="Cancel"
            className="py-3 px-6 rounded-2xl tracking-[0.32px] text-base leading-4 font-medium"
            variant="secondary"
          ></Button>
          <Button
            label="Create"
            className="py-3 px-6 rounded-2xl tracking-[0.32px] text-base leading-4 font-medium"
          ></Button>
        </div>
      </div>
    </>
  );
};

export default SetStandardsCreate;
