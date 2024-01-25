import { Table } from '@/components/reusable/table';
import { Button } from '@/components';
import { Dropdown } from '@/components';
import { Input } from '@/components';
import { Checkbox } from '@/components';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { SETSTANDARDS_SERVICES } from '@/services/setStandardsServices';
import { toast } from 'react-toastify';
import { MACHINE_SERVICES } from '@/services/machineServices';

export type InitialSetstandardStateType = {
  machineId: any;
};

const NewSetStandard = () => {
  const initialState = {
    machineId: '',
  };

  const navigate = useNavigate();
  const { state } = useLocation();
  const [machineList, setMachineList] = useState<any[]>([]);
  const [newSetstandards, setNewSetstandards] = useState<InitialSetstandardStateType>(initialState);
  const [dropdownData, setdropdownData] = useState([]);

  const uomData = ['Bar', '°C'];
  const triggerData = ['MAX', 'MIN', 'BOTH'];

  useEffect(() => {
    if (state) {
      setMachineList([state.data]);
    } else {
      fetch();
    }
  }, []);

  //fetching machines using machine-id
  const fetch = async () => {
    const res = await MACHINE_SERVICES.getAllMachines(1, 1000);
    console.log(res.message);
    setdropdownData(res.message);
  };

  const fetchMachine = async (id: any) => {
    const res = await MACHINE_SERVICES.getAllMachinesByMachineId(id);
    console.log(res.message);
    setMachineList(res.message);
  };

  //post setstandards data
  const createSetstandards = async () => {
    if (state) {
      const [data] = machineList;
      const body = {
        macAddress: data.sensorId,
        minOperatingRange: data.minOperatingRange,
        maxOperatingRange: data.maxOperatingRange,
        minThresholdValue: data.minThresholdValue,
        maxThresholdValue: data.maxThresholdValue,
        uom: data.uom,
        interval: data.interval,
        trigger: data.trigger,
        criticality: {
          breakDown: data.criticality.breakDown,
          defect: data.criticality.defect,
          unSafe: data.criticality.unSafe,
        },
      };
      console.log(body);
      const update_setstandards = await SETSTANDARDS_SERVICES.updateSetdstandards(data.sensorId, body);
      if (update_setstandards) {
        toast.success('setstandard updated successfully');
        navigate(-1);
      }
    } else {
      const body = machineList
        .filter((data) => data.isChecked)
        .map((data) => {
          return {
            macAddress: data.sensorId,
            minOperatingRange: data.minOperatingRange,
            maxOperatingRange: data.maxOperatingRange,
            minThresholdValue: data.minThresholdValue,
            maxThresholdValue: data.maxThresholdValue,
            uom: data.uom,
            interval: data.interval,
            trigger: data.trigger,
            criticality: {
              breakDown: data.breakdown,
              defect: data.defect,
              unSafe: data.unSafe,
            },
          };
        });
      console.log(body, 'body');
      const create_setstandards = await SETSTANDARDS_SERVICES.addSetstandardsBulk({ data: body });
      if (create_setstandards) {
        toast.success('setstandard added successfully');
        navigate(-1);
      }
    }
  };

  //Input value onchange
  const handleInputChange = (event: any, type: string, data: any) => {
    const machineData = [...machineList];
    const updateMachineId = machineData.findIndex((machine) => machine.sensorId === data.sensorId);
    machineData[updateMachineId][type] = parseInt(event.target.value);
    setMachineList(machineData);
  };

  //Dropdown onChange
  const handleDropdownChange = (value: any, type: string, data: any) => {
    const machineData = [...machineList];
    const updateMachineId = machineData.findIndex((machine) => machine.sensorId === data.sensorId);
    machineData[updateMachineId][type] = value;
    setMachineList(machineData);
  };

  // Checkbox onChange
  const handleMachineChange = (event: any, type: string, data: any) => {
    const machineData = [...machineList];
    const updateMachineId = machineData.findIndex((machine) => machine.sensorId === data.sensorId);
    machineData[updateMachineId][type] = event.target.checked;
    setMachineList(machineData);
  };

  const handleCheckboxChange = (event: any, type: string, data: any) => {
    const machineData = [...machineList];
    const updateMachineId = machineData.findIndex((machine) => machine.sensorId === data.sensorId);
    if ('criticality' in machineData[updateMachineId]) {
      machineData[updateMachineId]['criticality'][type] = event.target.checked;
    } else {
      machineData[updateMachineId]['criticality'] = {};
      machineData[updateMachineId]['criticality'][type] = event.target.checked;
    }
    setMachineList(machineData);
  };

  //disable button
  const disablingSetStandards = () => {
    if (state) {
      const [data] = machineList;
      if (
        data?.sensorId &&
        data?.minOperatingRange &&
        data?.maxOperatingRange &&
        data?.minThresholdValue &&
        data?.maxThresholdValue &&
        data?.uom &&
        data?.interval &&
        data?.trigger
      ) {
      } else {
        return true;
      }
    } else {
      for (let i = 0; i < machineList.length; i++) {
        const machine = machineList[i];
        if (machine.isChecked) {
          if (
            machine.sensorId &&
            machine.minOperatingRange &&
            machine.maxOperatingRange &&
            machine.minThresholdValue &&
            machine.maxThresholdValue &&
            machine.uom &&
            machine.interval &&
            machine.trigger
          ) {
          } else {
            return true;
          }
        }
      }
    }
    return false;
  };

  const columns: any = [
    {
      title: 'Machine Name',
      key: 'machinenName',
      dataIndex: 'machineName',
      width: '10%',
      align: 'center',
      render: (_: any, data: any) => {
        return (
          <div className="flex justify-center gap-3 ">
            {!state ? (
              <div className="flex gap-1">
                <Checkbox
                  variant="primary"
                  stroke="white"
                  checked={data.isChecked}
                  onChange={(event) => handleMachineChange(event, 'isChecked', data)}
                  label={data?.machine}
                />
              </div>
            ) : (
              <div>{data?.machine}</div>
            )}
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
            <h1>{data?.element}</h1>
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
            <h1>{data?.sensorDescription}</h1>
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
            <h1>{data?.sensorId}</h1>
          </div>
        );
      },
    },
    {
      title: 'Operating Range',
      key: 'OperatingRange',
      dataIndex: 'OperatingRange',
      align: 'center',
      render: (_: any, data: any) => {
        return (
          <div className="flex gap-3 justify-center ">
            <div className=" border-b-[1px] border-[#A9A9A9] w-[30px]">
              <Input
                placeholder="30"
                name="minOperatingRange"
                value={data.minOperatingRange || ''}
                onChange={(event) => handleInputChange(event, 'minOperatingRange', data)}
              />
            </div>
            <p>-</p>
            <div className=" border-b-[1px] border-[#A9A9A9] w-[30px]">
              <Input
                placeholder="40"
                name="maxOperatingRange"
                value={data.maxOperatingRange || ''}
                onChange={(event) => handleInputChange(event, 'maxOperatingRange', data)}
              />
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
      render: (_: any, data: any) => {
        return (
          <div className="flex gap-3 justify-center">
            <div className=" border-b-[1px] border-[#A9A9A9] w-[30px]">
              <Input
                placeholder="30"
                name="minThresholdValue"
                value={data.minThresholdValue || ''}
                onChange={(event) => handleInputChange(event, 'minThresholdValue', data)}
              />
            </div>
            <p>-</p>
            <div className=" border-b-[1px] border-[#A9A9A9] w-[30px]">
              <Input
                placeholder="40"
                name="maxThresholdValue"
                value={data.maxThresholdValue || ''}
                onChange={(event) => handleInputChange(event, 'maxThresholdValue', data)}
              />
            </div>
          </div>
        );
      },
    },
    {
      title: 'uom',
      key: 'uom',
      dataIndex: 'uom',
      align: 'center',
      render: (_: any, data: any) => {
        return (
          <div className="flex justify-center ml-12 border-b-[1px] border-[#A9A9A9] w-[80px]">
            <Dropdown
              placeholder="Bar"
              openClassName="top-5 w-[85px]"
              menuClassName="py-1"
              className="w-[74px] border-transparent px-2 text-[14px] h-[25px] placeholder:text-[#BBBBBB]"
              options={uomData}
              handleChange={(value) => handleDropdownChange(value, 'uom', data)}
              value={machineList?.find((machine: any) => machine.sensorId === data.sensorId)?.uom}
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
      render: (_: any, data: any) => {
        return (
          <div className="flex gap-3 justify-center">
            <div className=" border-b-[1px] border-[#A9A9A9] w-[34px]">
              <Input
                type="string"
                name="interval"
                placeholder="8hr"
                value={data.interval || ''}
                onChange={(event) => handleInputChange(event, 'interval', data)}
              />
            </div>
          </div>
        );
      },
    },
    {
      title: 'Trigger',
      key: 'trigger',
      dataIndex: 'trigger',
      align: 'center',
      render: (_: any, data: any) => {
        return (
          <div className="flex gap-3 ml-8 border-b-[1px] border-[#A9A9A9] w-[80px]">
            <Dropdown
              placeholder="Max"
              openClassName="top-5 w-[80px]"
              className="w-[100%] border-transparent px-2 text-[14px] h-[25px] placeholder:text-[#BBBBBB]"
              options={triggerData}
              handleChange={(value) => handleDropdownChange(value, 'trigger', data)}
              value={machineList?.find((trigger: any) => trigger.sensorId === data.sensorId)?.trigger}
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
      render: (_: any, data: any) => {
        return (
          <div className="flex justify-center gap-3 text-[16px]">
            <Checkbox
              variant="secondary"
              stroke="black"
              label="BreakDown"
              checked={data?.breakdown || data?.criticality?.breakDown}
              onChange={(event) => handleCheckboxChange(event, 'breakDown', data)}
            />
            <Checkbox
              variant="secondary"
              stroke="black"
              label="Defect"
              checked={data?.defect || data?.criticality?.defect}
              onChange={(event) => handleCheckboxChange(event, 'defect', data)}
            />
            <Checkbox
              variant="secondary"
              stroke="black"
              label="Unsafe"
              checked={data?.unSafe || data?.criticality?.unSafe}
              onChange={(event) => handleCheckboxChange(event, 'unSafe', data)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="rounded-[16px] shadow-md p-5 relative">
        <h2 className="text-[24px] text-[#444444] font-medium">New Set Standards</h2>

        {!state ? (
          <div className="flex justify-center flex-row gap-[20px] mt-5 mb-9">
            <div className="w-[12%]  h-[60px]">
              <Dropdown
                labelClassName="flex items-center justify-center text-[14px]"
                label="Machine Name"
                placeholder="Select Machine"
                className="w-[100%] border-[1px] h-[50px] px-3 pl-4"
                options={dropdownData}
                optionLabel="machineName"
                handleChange={(value: any) => {
                  console.log(value, 'value');
                  fetchMachine(value?.machineId);
                  setNewSetstandards((prev: any) => ({
                    ...prev,
                    machineId: value?.machineId,
                  }));
                }}
                value={dropdownData?.find((machine: any) => machine.machineId === newSetstandards.machineId)}
                mandatory={true}
              />
            </div>
          </div>
        ) : (
          <>
            {' '}
            <div className="flex justify-center flex-row gap-[20px] mt-5 mb-9">
              <div className="w-[12%]  h-[60px]">
                <h1 className="text-[14px] text-[#492CE1] font-bold text-center ">
                  Machine Name<span className="text-[#D95117]">*</span>
                </h1>
                <p className="mt-2 text-center font-medium">{machineList.map((data) => data.machine)}</p>
              </div>
            </div>
          </>
        )}

        <Table
          className="create-machine-line-table"
          columns={columns}
          dataSource={machineList}
          scroll={{ x: 'calc(1000px + 60%)', y: 'calc(1000px + 50%' }}
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
            label={state ? 'Update' : 'Create'}
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
