import { Table } from '@/components/reusable/table';
import { Button } from '@/components';
import { Dropdown } from '@/components';
import { Input } from '@/components';
import { Checkbox } from 'antd';
import './newSetStandards.css';
const NewSetStandard = () => {
  const mockData = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const columns: any = [
    {
      title: 'Machine line',
      key: 'machineLine',
      dataIndex: 'machineLine',
      width: '10%',
      align: 'center',
      render: () => {
        return (
          <div className="flex justify-start gap-3">
            <div className="flex gap-1">
              <Checkbox className="checkbox1" />
              <span>Honor Vtc-15</span>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Element Name',
      key: 'ElementName',
      dataIndex: 'ElementName',
      align: 'center',
    },
    {
      title: 'Sensor Description',
      key: 'SensorDescription',
      dataIndex: 'SensorDescription',
      align: 'center',
    },
    {
      title: 'Sensor ID',
      key: 'SensorID',
      dataIndex: 'SensorID',
      align: 'center',
    },
    {
      title: 'Operating Range',
      key: 'OperatingRange',
      dataIndex: 'OperatingRange',
      align: 'center',
      render: () => {
        return (
          <div className="flex gap-3 ml-7 ">
            <div className=" border-b-[1px] border-[#A9A9A9] w-[30px]">
              <Input placeholder="30" />
            </div>
            <p>-</p>
            <div className=" border-b-[1px] border-[#A9A9A9] w-[30px]">
              <Input placeholder="40" />
            </div>
          </div>
        );
      },
    },
    {
      title: 'Threshold Value',
      key: 'ThresholdValue',
      dataIndex: 'ThresholdValue',
      align: 'center',
      render: () => {
        return (
          <div className="flex gap-3 ml-6 ">
            <div className=" border-b-[1px] border-[#A9A9A9] w-[30px]">
              <Input placeholder="30" />
            </div>
            <p>-</p>
            <div className=" border-b-[1px] border-[#A9A9A9] w-[30px]">
              <Input placeholder="40" />
            </div>
          </div>
        );
      },
    },
    {
      title: 'UOM',
      key: 'UOM',
      dataIndex: 'UOM',
      align: 'center',
      render: () => {
        return (
          <div className="flex justify-start gap-3 border-b-[1px] ml-4 border-[#A9A9A9] w-[70px]">
            <div>
              <Dropdown
                placeholder="Bar"
                className="w-[74px] border-transparent px-2 text-[14px] h-[25px] placeholder:text-[#BBBBBB]"
                options=""
                handleChange={() => {}}
                optionLabel="uom"
                value=""
                mandatory={true}
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
      align: 'center',
      render: () => {
        return (
          <div className="flex gap-3 ml-4">
            <div className=" border-b-[1px] border-[#A9A9A9] w-[34px]">
              <Input placeholder="8hr" />
            </div>
          </div>
        );
      },
    },
    {
      title: 'Trigger',
      key: 'Trigger',
      dataIndex: 'Trigger',
      align: 'center',
      render: () => {
        return (
          <div className="flex justify-start gap-3 ml-5 border-b-[1px] border-[#A9A9A9] w-[70px]">
            <div>
              <Dropdown
                placeholder="Max"
                className="w-[80px] border-transparent px-2 text-[14px] h-[25px] placeholder:text-[#BBBBBB]"
                options=""
                optionLabel="uom"
                handleChange={() => {}}
                value=""
                mandatory={true}
              />
            </div>
          </div>
        );
      },
    },

    {
      title: 'Criticality',
      key: 'Criticality',
      width: '16%',
      dataIndex: 'Criticality',
      align: 'center',
      render: () => {
        return (
          <div className="flex justify-center gap-3">
            <div className="flex gap-1">
              <Checkbox className="checkbox2" />
              <p>Breakdown</p>
            </div>
            <div className="flex gap-1">
              <Checkbox className="checkbox2" />
              <p>Defect</p>
            </div>
            <div className="flex gap-1">
              <Checkbox className="checkbox2" />
              <p>Unsafe</p>
            </div>
          </div>
        );
      },
    },
  ];

  const data: any = [];
  for (let i = 0; i < 3; i++) {
    data.push({
      key: i,
      machineLine: '',
      ElementName: 'Hydraulic System',
      SensorDescription: 'Oil Temp Out',
      SensorID: 'Honor-15_LS',
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
      <div className="rounded-[16px] shadow-md p-5 relative">
        <h2 className="font-GothamMedium text-[24px] text-[#444444]  ">New Set Standards</h2>
        <div className="flex flex-col justify-center w-[1200px] mb-2 text-center">
          <h3 className="text-[#492CE1] font-medium mb-1 ">
            Machine Name <span className="text-red-400">*</span>
          </h3>
          <Dropdown
            placeholder="Select Machine"
            className="w-[200px] border-[1px] border-solid border-[#000000] rounded-[50px] mb-2 ml-[41.5%] mt-2 px-5 text-[14px] h-[55px] placeholder:text-[#BBBBBB]"
            options={mockData}
            optionLabel="MachineName"
            handleChange={() => {}}
            value=""
            mandatory={true}
          />
        </div>
        <Table className="headerColor" columns={columns} dataSource={data} scroll={{ x: 'calc(1000px + 60%)' }} />
        <div className="flex gap-5 justify-center">
          <Button
            label="Cancel"
            className="py-3 px-8 rounded-2xl tracking-[0.32px] text-base leading-4 font-medium"
            variant="secondary"
          ></Button>
          <Button
            label="Create"
            className="py-3 px-8 rounded-2xl tracking-[0.32px] text-base leading-4 font-medium"
          ></Button>
        </div>
      </div>
    </>
  );
};

export default NewSetStandard;
