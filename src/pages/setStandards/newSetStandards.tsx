import { Table } from '@/components/reusable/table';
import { Button } from '@/components';
import { Dropdown } from '@/components';
import { Input } from '@/components';
import { Checkbox } from '@/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SETSTANDARDS_SERVICES } from '@/services/setStandardsServices';
import { toast } from 'react-toastify';

export type InitialSetstandardStateType = {
  MachineId: any;
  triggerId: any;
  uomId: any;
  minOperatingRange: string;
  maxOperatingRange: string;
  minThresholdValue: string;
  maxThresholdValue: string;
  uomName: string;
  interval: string;
  triggerName: string;
  criticality: any;
};

const NewSetStandard = () => {
  const initialState = {
    minOperatingRange: '',
    maxOperatingRange: '',
    minThresholdValue: '',
    maxThresholdValue: '',
    uomName: '',
    interval: '',
    triggerName: '',
    criticality: { breakDown: false, defect: false, unSafe: false },
    MachineId: '',
    triggerId: '',
    uomId: '',
  };

  const navigate = useNavigate();
  const [machineList, setMachineList] = useState<InitialSetstandardStateType>(initialState);
  const [newSetstandards, setNewSetstandards] = useState<InitialSetstandardStateType>(initialState);
  console.log(newSetstandards, 'new');

  const uomData = [
    { uomId: '1', uomName: 'Bar' },
    { uomId: '2', uomName: 'Pie' },
    { uomId: '3', uomName: 'Line' },
  ];
  const triggerData = [
    { triggerId: '1', triggerName: 'Max' },
    { triggerId: '2', triggerName: 'Min' },
  ];
  const mockData = [
    { MachineId: '1', MachineName: 'HONOR VTC-15' },
    { MachineId: '2', MachineName: 'HMC1000' },
    { MachineId: '3', MachineName: 'SL45 ' },
  ];

  // useEffect(() => {
  //   async function test() {
  //     const res = await SETSTANDARDS_SERVICES.getAllSetstandards();
  //     console.log(res, 'response');
  //   }
  //   test();
  // }, []);

  const createSetstandards = async () => {
    const body = {
      minOperatingRange: newSetstandards.minOperatingRange,
      maxOperatingRange: newSetstandards.maxOperatingRange,
      minThresholdValue: newSetstandards.minThresholdValue,
      maxThresholdValue: newSetstandards.maxThresholdValue,
      uomName: newSetstandards.uomName,
      interval: newSetstandards.interval,
      triggerName: newSetstandards.triggerName,
      criticality: newSetstandards.criticality,
    };

    const res = await SETSTANDARDS_SERVICES.addSetdstandards(body);
    if (res.statusCode === 201) {
      setNewSetstandards(initialState);
      toast.success('setstandard added successfully');
    }
  };
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setNewSetstandards((initialState: InitialSetstandardStateType) => ({
      ...initialState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event: any, type: string) => {
    // setIsChecked({ ...isChecked, [type]: event.target.checked });
    setNewSetstandards((initialState: InitialSetstandardStateType) => ({
      ...initialState,
      criticality: {
        ...initialState.criticality,
        [type]: event.target.checked,
      },
    }));
  };

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
      render: () => {
        return (
          <div className="flex justify-center ml-12 gap-3 border-[#A9A9A9] w-[70px]">
            <div>
              <Dropdown
                placeholder="Bar"
                className="w-[74px] border-transparent px-2 text-[14px] h-[25px] placeholder:text-[#BBBBBB]"
                options={uomData}
                optionLabel="uomName"
                handleChange={(value: any) => {
                  setNewSetstandards((prev: any) => ({ ...prev, uomId: value?.uomId, uomName: value?.uomName }));
                }}
                value={uomData?.find((uom: any) => uom.uomId === newSetstandards.uomId)}
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
              <Input type="string" name="Interval" mandatory={true} placeholder="8hr" onChange={handleChange} />
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
          <div className="flex gap-3 ml-8 border-b-[1px] border-[#A9A9A9] w-[70px]">
            <div>
              <Dropdown
                placeholder="Max"
                className="w-[100%] border-transparent px-2 text-[14px] h-[25px] placeholder:text-[#BBBBBB]"
                options={triggerData}
                optionLabel="triggerName"
                handleChange={(value: any) => {
                  setNewSetstandards((prev: any) => ({
                    ...prev,
                    triggerId: value?.triggerId,
                    triggerName: value?.triggerName,
                  }));
                }}
                value={triggerData?.find((trigger: any) => trigger.triggerId === newSetstandards.triggerId)}
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
            <Checkbox
              variant="secondary"
              stroke="black"
              label="breakDown"
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

  const data: any = [];
  for (let i = 0; i < 1; i++) {
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
                setMachineList((prev: any) => ({ ...prev, MachineId: value?.MachineId }));
              }}
              value={mockData?.find((machine: any) => machine.MachineId === machineList.MachineId)}
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
            onClick={() => {
              navigate(-1);
            }}
          ></Button>
          <Button
            label="Create"
            type="submit"
            className="py-3 px-8 rounded-2xl tracking-[0.32px] text-base leading-4 font-medium"
            onClick={createSetstandards}
          ></Button>
        </div>
      </div>
    </>
  );
};

export default NewSetStandard;
