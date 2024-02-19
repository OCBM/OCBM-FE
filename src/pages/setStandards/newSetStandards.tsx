import { Table } from '@/components/reusable/table';
import { Button } from '@/components';
import { Dropdown } from '@/components';
import { Input } from '@/components';
import { Checkbox } from '@/components';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
// import { SETSTANDARDS_SERVICES } from '@/services/setStandardsServices';
// import { toast } from 'react-toastify';
import { MACHINE_SERVICES } from '@/services/machineServices';
import { useAppSelector } from '@/hooks/redux';
import { SENSOR_SERVICES } from '@/services/sensorServices';
import { SETSTANDARDS_SERVICES } from '@/services/setStandardsServices';
import { toast } from 'react-toastify';

export type InitialSetstandardStateType = {
  machineId: any;
};

const NewSetStandard = () => {
  const initialState = {
    machineId: '',
  };
  const { currentPlant } = useAppSelector((state) => state.plantRegistration);
  const [loading, setLoading] = useState(false);
  const [macAddressWithSchemaTwo, setMacAddressWithSchemaTwo] = useState<string[]>([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [machineList, setMachineList] = useState<any[]>([]);
  console.log(machineList);
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
  }, [currentPlant]);

  //fetching machines using machine-id
  const fetch = async () => {
    if (currentPlant) {
      const res = await MACHINE_SERVICES.getAllMachinesByPlantId(currentPlant, 1, 1000);
      setdropdownData(res.message);
    }
  };

  const fetchMachine = async (id: any) => {
    const res = await MACHINE_SERVICES.getAllMachinesByMachineId(id);
    setMachineList(res.message);
  };
  useEffect(() => {
    const fetchSensorData = async () => {
      setLoading(true);
      const machineMacAddresses = machineList.map((machine) => machine.sensorId);
      const res = await SENSOR_SERVICES.getAllSensorsByMacaddress(machineMacAddresses);
      const finalData = res && res.filter((el: any) => el.schemaType === 'SCHEMA_TWO').map((el: any) => el.macAddress);
      setMacAddressWithSchemaTwo(finalData);
      setLoading(false);
    };

    fetchSensorData();
  }, [machineList]);
  console.log('first_data', macAddressWithSchemaTwo);
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
        secondaryMinOperatingRange: data.secondaryMinOperatingRange,
        secondaryMaxOperatingRange: data.secondaryMaxOperatingRange,
        secondaryMinThresholdValue: data.secondaryMinThresholdValue,
        secondaryMaxThresholdValue: data.secondaryMaxThresholdValue,
        secondaryUom: data.secondaryUom,
        interval: data?.interval || 0,
        trigger: data.trigger,
        criticality: {
          breakDown: data.criticality.breakDown || false,
          defect: data.criticality.defect || false,
          unSafe: data.criticality.unSafe || false,
        },
      };
      console.log(body, 'body1');
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
            secondaryMinOperatingRange: data.secondaryMinOperatingRange,
            secondaryMaxOperatingRange: data.secondaryMaxOperatingRange,
            secondaryMinThresholdValue: data.secondaryMinThresholdValue,
            secondaryMaxThresholdValue: data.secondaryMaxThresholdValue,
            secondaryUom: data.secondaryUom,
            interval: data.interval,
            trigger: data.trigger,
            criticality: {
              breakDown: data.criticality.breakDown || false,
              defect: data.criticality.defect || false,
              unSafe: data.criticality.unSafe || false,
            },
          };
        });

      console.log(body, 'body2');

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
  const handleIntervalInputChange = (event: any, type: string, data: any) => {
    const machineData = [...machineList];
    const updateMachineId = machineData.findIndex((machine) => machine.sensorId === data.sensorId);
    machineData[updateMachineId][type] = parseInt(event.target.value || 0);

    if (machineData[updateMachineId][type] >= 0 && machineData[updateMachineId][type] <= 480) {
      setMachineList(machineData);
    }
  };

  //Dropdown onChange
  const handleDropdownChange = (value: any, type: string, data: any) => {
    const machineData = [...machineList];
    const updateMachineId = machineData.findIndex((machine) => machine.sensorId === data.sensorId);
    machineData[updateMachineId][type] = value;
    setMachineList(machineData);
  };

  console.log('first', machineList);

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
      console.log('first_DATATAA', data);
      if (
        data?.sensorId &&
        data?.minOperatingRange &&
        data?.maxOperatingRange &&
        data?.minThresholdValue &&
        data?.maxThresholdValue &&
        data?.uom &&
        data?.secondaryMinOperatingRange &&
        data?.secondaryMaxOperatingRange &&
        data?.secondaryMinThresholdValue &&
        data?.secondaryMaxThresholdValue &&
        data?.secondaryUom &&
        data?.interval &&
        data?.trigger
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      for (let i = 0; i < machineList.length; i++) {
        const machine = machineList[i];
        console.log('first_DATATAA', machine);
        if (machine.isChecked) {
          if (
            machine.sensorId &&
            machine.minOperatingRange &&
            machine.maxOperatingRange &&
            machine.minThresholdValue &&
            machine.maxThresholdValue &&
            machine.uom &&
            machine.secondaryMinOperatingRange &&
            machine.secondaryMaxOperatingRange &&
            machine.secondaryMinThresholdValue &&
            machine.secondaryMaxThresholdValue &&
            machine.secondaryUom &&
            machine.interval &&
            machine.trigger
          ) {
            return false;
          } else {
            return true;
          }
        }
      }
    }
    return false;
  };

  console.log('first', machineList);

  // fields disabling for schema1 and schema2
  const disablingFields = (macAddress: string) => {
    if (macAddressWithSchemaTwo.includes(macAddress)) {
      return true;
    } else {
      return false;
    }
  };

  const columns: any = [
    {
      title: 'Machine Number',
      key: 'machineNumber',
      dataIndex: 'machineNumber',
      width: 130,
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
                  label={data?.machineNumber}
                />
              </div>
            ) : (
              <div>{data?.machineNumber}</div>
            )}
          </div>
        );
      },
    },
    {
      title: 'Element Name',
      key: 'element',
      dataIndex: 'element',
      width: 130,
      align: 'center',
    },
    {
      title: 'Sensor Label',
      key: 'sensorLabel',
      dataIndex: 'sensorLabel',
      width: 130,
      align: 'center',
    },
    {
      title: 'Sensor Description',
      key: 'sensorDescription',
      dataIndex: 'sensorDescription',
      width: 130,
      align: 'center',
    },
    {
      title: 'Primary Operating Range',
      key: 'OperatingRange',
      dataIndex: 'OperatingRange',
      width: 160,
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
      title: 'Secondary Operating Range',
      key: 'OperatingRange',
      dataIndex: 'OperatingRange',
      width: 160,
      align: 'center',
      render: (_: any, data: any) => {
        return disablingFields(data.sensorId) ? (
          <div className="flex gap-3 justify-center ">
            <div className="border-b-[1px] border-[#A9A9A9] w-[30px]">
              <Input
                placeholder="30"
                name="secondaryMinOperatingRange"
                value={data.secondaryMinOperatingRange || ''}
                onChange={(event) => handleInputChange(event, 'secondaryMinOperatingRange', data)}
              />
            </div>
            <p>-</p>
            <div className="border-b-[1px] border-[#A9A9A9] w-[30px]">
              <Input
                placeholder="40"
                name="secondaryMaxOperatingRange"
                value={data.secondaryMaxOperatingRange || ''}
                onChange={(event) => handleInputChange(event, 'secondaryMaxOperatingRange', data)}
              />
            </div>
          </div>
        ) : (
          <span>-</span>
        );
      },
    },
    {
      title: 'Primary Threshold Range',
      key: 'ThresholdRange',
      dataIndex: 'ThresholdRange',
      width: 160,
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
      title: 'Secondary Threshold Range',
      key: 'ThresholdRange',
      dataIndex: 'ThresholdRange',
      width: 160,
      align: 'center',
      render: (_: any, data: any) => {
        return disablingFields(data.sensorId) ? (
          <>
            <div className="flex gap-3 justify-center">
              <div className="border-b-[1px] border-[#A9A9A9] w-[30px]">
                <Input
                  placeholder="30"
                  name="minThresholdValue"
                  value={data.secondaryMinThresholdValue || ''}
                  onChange={(event) => handleInputChange(event, 'secondaryMinThresholdValue', data)}
                />
              </div>
              <p>-</p>
              <div className="border-b-[1px] border-[#A9A9A9] w-[30px]">
                <Input
                  placeholder="40"
                  name="maxThresholdValue"
                  value={data.secondaryMaxThresholdValue || ''}
                  onChange={(event) => handleInputChange(event, 'secondaryMaxThresholdValue', data)}
                />
              </div>
            </div>
          </>
        ) : (
          <span>-</span>
        );
      },
    },
    {
      title: 'Primary UOM',
      key: 'uom',
      dataIndex: 'uom',
      width: 150,
      align: 'center',
      render: (_: any, data: any) => {
        return (
          <div className="flex justify-center ml-16 border-b-[1px] border-[#A9A9A9] w-[80px]">
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
      title: 'Secondary UOM',
      key: 'secondaryUom',
      dataIndex: 'secondaryUom',
      width: 150,
      align: 'center',
      render: (_: any, data: any) => {
        return disablingFields(data.sensorId) ? (
          <div className="flex justify-center ml-16 border-b-[1px] border-[#A9A9A9] w-[80px]">
            <Dropdown
              placeholder="Bar"
              openClassName="top-5 w-[85px]"
              menuClassName="py-1"
              className="w-[74px] border-transparent px-2 text-[14px] h-[25px] placeholder:text-[#BBBBBB]"
              options={uomData}
              handleChange={(value) => handleDropdownChange(value, 'secondaryUom', data)}
              value={machineList?.find((machine: any) => machine.sensorId === data.sensorId)?.secondaryUom}
              mandatory={true}
            />
          </div>
        ) : (
          <span>-</span>
        );
      },
    },
    {
      title: 'Interval (minutes)',
      key: 'Interval',
      dataIndex: 'Interval',
      width: 130,
      align: 'center',
      render: (_: any, data: any) => {
        return (
          <div className="flex gap-3 justify-center">
            <div className=" border-b-[1px] border-[#A9A9A9] w-[34px]">
              <Input
                type="string"
                name="interval"
                placeholder="Min"
                value={data.interval || ''}
                onChange={(event) => handleIntervalInputChange(event, 'interval', data)}
              />
            </div>
          </div>
        );
      },
    },
    {
      title: 'Trigger (Threshold Value)',
      key: 'trigger',
      dataIndex: 'trigger',
      width: 180,
      align: 'center',
      render: (_: any, data: any) => {
        return (
          <div className="flex gap-3 ml-20 border-b-[1px] border-[#A9A9A9] w-[80px]">
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
      width: 250,
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
    {
      title: 'Sensor ID',
      key: 'SensorID',
      dataIndex: 'SensorID',
      width: 220,
      align: 'center',
      render: (_: any, data: any) => {
        return (
          <div className="flex justify-center gap-3">
            <h1>{data?.sensorId}</h1>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="rounded-[16px] shadow-md p-5 relative">
        <h2 className="text-[24px] text-[#444444] font-medium">New Set PM Standards</h2>

        {!state ? (
          <div className="flex justify-center flex-row gap-[20px] mt-5 mb-9">
            <div className=" h-[60px]">
              <Dropdown
                labelClassName="flex items-center justify-center text-[14px]"
                label="Machine Name"
                placeholder="Select Machine"
                className="w-[100%] border-[1px] h-[50px] px-3 pl-4"
                options={dropdownData}
                optionLabel="machineName"
                handleChange={(value: any) => {
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
          loading={loading}
          scroll={{ x: 'calc(2100px + 95%)', y: 'calc(1000px + 50%' }}
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
