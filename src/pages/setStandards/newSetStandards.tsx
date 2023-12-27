import { Table } from '@/components/reusable/table';
import { Button } from '@/components';
import { Dropdown } from '@/components';
import { Input } from '@/components';
import { Checkbox } from '@/components';
import { useState } from 'react';

const NewSetStandard = () => {
  type InitialStateType = {
    machineId: any;
    MachineName: string;
  };
  const initialState = {
    machineId: '',
    MachineName: '',
  };
  const [machineList, setMachineList] = useState<InitialStateType>(initialState);
  const mockData = [
    { MachineId: '1', MachineName: 'HONOR VTC-15' },
    { MachineId: '2', MachineName: 'HMC1000' },
    { MachineId: '3', MachineName: 'SL45 ' },
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
          <div className="flex justify-start gap-3 ml-3">
            <div className="flex gap-1">
              <Checkbox variant="primary" stroke="white" label="Honor Vtc-15" />
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
          <div className="flex gap-3 justify-center ">
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
          <div className="flex gap-3 justify-center ">
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
          <div className="flex justify-center gap-3 border-b-[1px] ml-12 border-[#A9A9A9] w-[70px]">
            <div>
              <Dropdown
                placeholder="Bar"
                className="w-[74px] border-transparent px-2 text-[14px] h-[25px] placeholder:text-[#BBBBBB]"
                options=""
                disabled
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
          <div className="flex gap-3 justify-center">
            <div className=" border-b-[1px] border-[#A9A9A9] w-[34px]">
              <Input type="string" name="Interval" mandatory={true} placeholder="8hr" />
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
          <div className="flex justify-center gap-3 border-b-[1px] ml-12 border-[#A9A9A9] w-[70px]">
            <div>
              <Dropdown
                placeholder="Max"
                className="w-[80px] border-transparent px-2 text-[14px] h-[25px] placeholder:text-[#BBBBBB]"
                options=""
                disabled
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
      width: '20%',
      dataIndex: 'Criticality',
      align: 'center',
      render: () => {
        return (
          <div className="flex justify-center gap-3 text-[16px]">
            <Checkbox variant="secondary" stroke="black" label="Breakdown" />
            <Checkbox variant="secondary" stroke="black" label="Defect" />
            <Checkbox variant="secondary" stroke="black" label="Unsafe" />
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
        <h2 className="text-[24px] text-[#444444] font-medium">New Set Standards</h2>
        <div className="flex justify-center flex-row gap-[20px] mt-5 mb-9">
          <div className="w-[12%]  h-[60px]">
            <Dropdown
              labelClassName="flex items-center justify-center text-[14px]"
              label="Machine Name"
              placeholder="Select Machine"
              className="w-[100%] border-[1px] h-[50px] px-3"
              options={mockData}
              optionLabel="MachineName"
              handleChange={(value: any) => {
                setMachineList((prev: any) => ({ ...prev, machineId: value?.machineId }));
              }}
              value={mockData?.find((machine: any) => machine.machineId === machineList.machineId)}
              mandatory={true}
            />
          </div>
        </div>

        <Table
          className="create-machine-line-table"
          columns={columns}
          dataSource={data}
          scroll={{ x: 'calc(1000px + 60%)' }}
        />
        <div className="flex gap-5 justify-center">
          <Button
            label="Cancel"
            type="button"
            className="py-3 px-8 rounded-2xl tracking-[0.32px] text-base leading-4 font-medium"
            variant="secondary"
          ></Button>
          <Button
            label="Create"
            type="submit"
            className="py-3 px-8 rounded-2xl tracking-[0.32px] text-base leading-4 font-medium"
          ></Button>
        </div>
      </div>
    </>
  );
};

export default NewSetStandard;
