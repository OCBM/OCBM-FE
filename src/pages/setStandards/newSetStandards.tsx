import { Table } from '@/components/reusable/table';
import { Button } from '@/components';
import { Dropdown } from '@/components';
import { Input } from '@/components';
import { Checkbox } from '@/components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SETSTANDARDS_SERVICES } from '@/services/setStandardsServices';
import { toast } from 'react-toastify';
import { USER_SERVICES } from '@/services/userServices';

export type InitialSetstandardStateType = {
  machineId: any;
  triggerId: any;
  uomId: any;
  macAddress: string;
  minOperatingRange: number;
  maxOperatingRange: number;
  minThresholdValue: number;
  maxThresholdValue: number;
  uomName: string;
  interval: number;
  triggerName: string;
  criticality: any;
};

const NewSetStandard = () => {
  const initialState = {
    macAddress: '12sensor1234',
    minOperatingRange: 0,
    maxOperatingRange: 0,
    minThresholdValue: 0,
    maxThresholdValue: 0,
    uomName: '',
    interval: 0,
    triggerName: '',
    criticality: { breakDown: false, defect: false, unSafe: false },
    machineId: '',
    triggerId: '',
    uomId: '',
  };

  const navigate = useNavigate();
  const [machineList, setMachineList] = useState<any[]>([]);
  console.log(machineList, 'list');
  const [newSetstandards, setNewSetstandards] = useState<InitialSetstandardStateType>(initialState);

  const uomData = ['Bar', '°C'];
  const triggerData = ['MAX', 'MIN', 'Both'];

  const dropdownData = [
    {
      id: 1,
      name: 'ADMIN',
    },
    {
      id: 2,
      name: 'USER',
    },
  ];

  useEffect(() => {
    fetchSample(1, 1000);
  }, []);

  //NEED TO DELETE SAMPLE
  const fetchSample = async (page: 1, limit: 1000) => {
    const res = await USER_SERVICES.getAllUsers(page, limit);
    setMachineList(res.message);
  };

  const fetch = async (role: any) => {
    const res = await USER_SERVICES.getUserByRole(role);
    setMachineList(res.message);
  };

  //post setstandards data
  const createSetstandards = async () => {
    const body = {
      macAddress: newSetstandards.macAddress,
      minOperatingRange: newSetstandards.minOperatingRange,
      maxOperatingRange: newSetstandards.maxOperatingRange,
      minThresholdValue: newSetstandards.minThresholdValue,
      maxThresholdValue: newSetstandards.maxThresholdValue,
      uom: newSetstandards.uomName,
      interval: newSetstandards.interval,
      trigger: newSetstandards.triggerName,
      criticality: newSetstandards.criticality,
    };
    const create_setstandards = await SETSTANDARDS_SERVICES.addSetstandards(body);
    if (create_setstandards) {
      setNewSetstandards(initialState);
      toast.success('setstandard added successfully');
    }
  };

  //input value onchange
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setNewSetstandards((initialState: InitialSetstandardStateType) => ({
      ...initialState,
      [name]: parseInt(value),
    }));
  };

  // checkbox
  const handleCheckboxChange = (event: any, type: string) => {
    setNewSetstandards((initialState: InitialSetstandardStateType) => ({
      ...initialState,
      criticality: {
        ...initialState.criticality,
        [type]: event.target.checked,
      },
    }));
  };

  //disable button
  const disablingSetStandards = () => {
    return newSetstandards.macAddress &&
      newSetstandards.minOperatingRange &&
      newSetstandards.maxOperatingRange &&
      newSetstandards.minThresholdValue &&
      newSetstandards.maxThresholdValue &&
      newSetstandards.uomName &&
      newSetstandards.interval &&
      newSetstandards.triggerName
      ? false
      : true;
  };

  //machine dropdown data
  // const machineLine = machineList?.find((machine: any) => machine.userId === newSetstandards.machineId);
  // console.log(machineLine, 'machine');

  const columns: any = [
    {
      title: 'Machine Name',
      key: 'machinenName',
      dataIndex: 'machineName',
      width: '10%',
      align: 'center',
      render: (_: any, data: any) => {
        return (
          <div className="flex justify-start gap-3 ">
            <div className="flex gap-1">
              <Checkbox variant="primary" stroke="white" checked={data?.userId ? true : false} label={data?.name} />
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
      render: (_: any, data: any) => {
        return (
          <div className="flex justify-center gap-3 ">
            <h1>{data?.role}</h1>
          </div>
        );
      },
    },
    {
      title: 'Sensor Description',
      key: 'SensorDescription',
      dataIndex: 'SensorDescription',
      align: 'center',
      render: (_: any, data: any) => {
        return (
          <div className="flex justify-center gap-3">
            <h1>{data?.position}</h1>
          </div>
        );
      },
    },
    {
      title: 'Sensor ID',
      key: 'SensorID',
      dataIndex: 'SensorID',
      align: 'center',
      render: (_: any, data: any) => {
        return (
          <div className="flex justify-center gap-3">
            <h1>{data?.employeeId}</h1>
          </div>
        );
      },
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
              <Input placeholder="30" name="minOperatingRange" onChange={handleChange} />
            </div>
            <p>-</p>
            <div className=" border-b-[1px] border-[#A9A9A9] w-[30px]">
              <Input placeholder="40" name="maxOperatingRange" onChange={handleChange} />
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
          <div className="flex gap-3 justify-center">
            <div className=" border-b-[1px] border-[#A9A9A9] w-[30px]">
              <Input placeholder="30" name="minThresholdValue" onChange={handleChange} />
            </div>
            <p>-</p>
            <div className=" border-b-[1px] border-[#A9A9A9] w-[30px]">
              <Input placeholder="40" name="maxThresholdValue" onChange={handleChange} />
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
      render: (_: any, data: any) => {
        return (
          <div className="flex justify-center ml-12 border-b-[1px] border-[#A9A9A9] w-[80px]">
            <Dropdown
              placeholder="Bar"
              openClassName="top-5 w-[85px]"
              menuClassName="p-2"
              className="w-[74px] border-transparent px-2 text-[14px] h-[25px] placeholder:text-[#BBBBBB]"
              options={uomData}
              handleChange={(value: any) => {
                const machineData = [...machineList];
                const updateMachineId = machineData.findIndex((machine) => machine.userId === data.userId);
                machineData[updateMachineId]['uomName'] = value;
                setMachineList(machineData);
              }}
              value={machineList?.find((machine: any) => machine.userId === data.userId)?.uomName}
              mandatory={true}
            />
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
              <Input type="string" name="interval" placeholder="8hr" onChange={handleChange} />
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
      render: (_: any, data: any) => {
        return (
          <div className="flex gap-3 ml-8 border-b-[1px] border-[#A9A9A9] w-[80px]">
            <Dropdown
              placeholder="Max"
              openClassName="top-5 w-[80px]"
              menuClassName="p-2"
              className="w-[100%] border-transparent px-2 text-[14px] h-[25px] placeholder:text-[#BBBBBB]"
              options={triggerData}
              handleChange={(value: any) => {
                const machineData = [...machineList];
                const updateMachineId = machineData.findIndex((machine) => machine.userId === data.userId);
                machineData[updateMachineId]['trigger'] = value;
                setMachineList(machineData);
              }}
              value={machineList?.find((trigger: any) => trigger.userId === data.userId)?.trigger}
              mandatory={true}
            />
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
            <Checkbox
              variant="secondary"
              stroke="black"
              label="BreakDown"
              checked={newSetstandards.criticality.breakDown}
              onChange={(e) => handleCheckboxChange(e, 'breakDown')}
            />
            <Checkbox
              variant="secondary"
              stroke="black"
              label="Defect"
              checked={newSetstandards.criticality.defect}
              onChange={(e) => handleCheckboxChange(e, 'defect')}
            />
            <Checkbox
              variant="secondary"
              stroke="black"
              label="Unsafe"
              checked={newSetstandards.criticality.unSafe}
              onChange={(e) => handleCheckboxChange(e, 'unSafe')}
            />
          </div>
        );
      },
    },
  ];

  // const data: any = [];
  // for (let i = 0; i < 4; i++) {
  //   data.push({
  //     key: i,
  //     ElementName: 'Hydraulic System',
  //     SensorDescription: 'Oil Temp Out',
  //     SensorID: 'Honor-15_LS',
  //     UOM: 'Bar',
  //     Interval: '8hr',
  //     Trigger: 'Max',
  //     Criticality: '',
  //   });
  // }

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
              className="w-[100%] border-[1px] h-[50px] px-3 pl-4"
              options={dropdownData}
              optionLabel="name"
              handleChange={(value: any) => {
                fetch(value.name);
                setNewSetstandards((prev: any) => ({
                  ...prev,
                  machineId: value?.id,
                }));
              }}
              value={dropdownData?.find((machine: any) => machine.id === newSetstandards.machineId)}
              mandatory={true}
            />
          </div>
        </div>

        <Table
          className="create-machine-line-table"
          columns={columns}
          dataSource={machineList}
          scroll={{ x: 'calc(1000px + 60%)' }}
        />
        <div className="flex gap-5 justify-center">
          <Button
            label="Cancel"
            type="button"
            className="py-3 px-8 rounded-2xl tracking-[0.32px] text-base leading-4 font-medium"
            variant="secondary"
            onClick={() => {
              navigate(-1);
            }}
          ></Button>
          <Button
            label="Create"
            type="submit"
            className="py-3 px-8 rounded-2xl tracking-[0.32px] text-base leading-4 font-medium"
            disabled={disablingSetStandards()}
            onClick={createSetstandards}
          ></Button>
        </div>
      </div>
    </>
  );
};

export default NewSetStandard;
