import { DeleteIcon, PencilIcon, SearchIcon } from '@/assets/icons';
import { Table } from '@/components/reusable/table';
import { Button, Input } from '@/components';

const SetStandard = () => {

    const dataSource: any = [
        {
          machineName: 'HONOR VTC-15',
          elementName: 'Hydrulic system',
          sensorDescription: 'Oil Temp Outlet',
          sensorID: 'Honor-15_LS',
          operatingRange:"30   -   40",
          thresholdValue:"0 - 40",
          uom:"Bar",
          interval:'8hr',
          trigger:'Max',
          criticality:'Breakdown Defect',
        },
        {
            machineName: 'HONOR VTC-15',
            elementName: 'Hydrulic system',
            sensorDescription: 'Oil Temp Outlet',
            sensorID: 'Honor-15_LS',
            operatingRange:"30   -   40",
            thresholdValue:"0 - 40",
            uom:"Bar",
            interval:'8hr',
            trigger:'Max',
            criticality:'Breakdown Defect',
        },
        {
            machineName: 'HONOR VTC-15',
          elementName: 'Hydrulic system',
          sensorDescription: 'Oil Temp Outlet',
          sensorID: 'Honor-15_LS',
          operatingRange:"30   -   40",
          thresholdValue:"0 - 40",
          uom:"Bar",
          interval:'8hr',
          trigger:'Max',
          criticality:'Breakdown Defect',
          },
          {
            machineName: 'HONOR VTC-15',
            elementName: 'Hydrulic system',
            sensorDescription: 'Oil Temp Outlet',
            sensorID: 'Honor-15_LS',
            operatingRange:"30   -   40",
            thresholdValue:"0 - 40",
            uom:"Bar",
            interval:'8hr',
            trigger:'Max',
            criticality:'Breakdown Defect',
          },
          {
            machineName: 'HONOR VTC-15',
          elementName: 'Hydrulic system',
          sensorDescription: 'Oil Temp Outlet',
          sensorID: 'Honor-15_LS',
          operatingRange:"30   -   40",
          thresholdValue:"0 - 40",
          uom:"Bar",
          interval:'8hr',
          trigger:'Max',
          criticality:'Breakdown Defect',
          },
          {
            machineName: 'HONOR VTC-15',
            elementName: 'Hydrulic system',
            sensorDescription: 'Oil Temp Outlet',
            sensorID: 'Honor-15_LS',
            operatingRange:"30   -   40",
            thresholdValue:"0 - 40",
            uom:"Bar",
            interval:'8hr',
            trigger:'Max',
            criticality:'Breakdown Defect',
          },
          {
            machineName: 'HONOR VTC-15',
            elementName: 'Hydrulic system',
            sensorDescription: 'Oil Temp Outlet',
            sensorID: 'Honor-15_LS',
            operatingRange:"30   -   40",
            thresholdValue:"0 - 40",
            uom:"Bar",
            interval:'8hr',
            trigger:'Max',
            criticality:'Breakdown Defect',
          },
          {
            machineName: 'HONOR VTC-15',
            elementName: 'Hydrulic system',
            sensorDescription: 'Oil Temp Outlet',
            sensorID: 'Honor-15_LS',
            operatingRange:"30   -   40",
            thresholdValue:"0 - 40",
            uom:"Bar",
            interval:'8hr',
            trigger:'Max',
            criticality:'Breakdown Defect',
          },
          {
            machineName: 'HONOR VTC-15',
          elementName: 'Hydrulic system',
          sensorDescription: 'Oil Temp Outlet',
          sensorID: 'Honor-15_LS',
          operatingRange:"30   -   40",
          thresholdValue:"0 - 40",
          uom:"Bar",
          interval:'8hr',
          trigger:'Max',
          criticality:'Breakdown Defect',
          },
          {
            machineName: 'HONOR VTC-15',
          elementName: 'Hydrulic system',
          sensorDescription: 'Oil Temp Outlet',
          sensorID: 'Honor-15_LS',
          operatingRange:"30   -   40",
          thresholdValue:"0 - 40",
          uom:"Bar",
          interval:'8hr',
          trigger:'Max',
          criticality:'Breakdown Defect',
          },
          {
            machineName: 'HONOR VTC-15',
            elementName: 'Hydrulic system',
            sensorDescription: 'Oil Temp Outlet',
            sensorID: 'Honor-15_LS',
            operatingRange:"30   -   40",
            thresholdValue:"0 - 40",
            uom:"Bar",
            interval:'8hr',
            trigger:'Max',
            criticality:'Breakdown Defect',
          },
      ];

      const columns = [
        {
          title: 'Machine Name',
          dataIndex: 'machineName',
          key: 'machineName',
        },
        {
          title: 'Element Name',
          dataIndex: 'elementName',
          key: ' elementName',
        },
        {
          title: 'Sensor Description',
          dataIndex: 'sensorDescription',
          key: 'sensorDescription',
        },
        {
          title: 'Sensor ID',
          dataIndex: 'sensorID',
          key: 'sensorID',
        },
        {
          title: 'Operating Range',
          dataIndex: 'operatingRange',
          key: 'operatingRange',
        },
        {
            title: 'Threshold value',
            dataIndex: 'thresholdValue',
            key: 'thresholdValue',
          },
          {
            title: 'UOM',
            dataIndex: 'uom',
            key: 'uom',
          },
          {
            title: 'Interval',
            dataIndex: 'interval',
            key: 'interval',
          },
          {
            title: 'Trigger',
            dataIndex: 'trigger',
            key: 'trigger',
          },
          {
            title: 'Criticality',
            dataIndex: 'criticality',
            key: 'criticality',
          },
          {
            title: 'Actions',
            dataIndex: 'criticality',
            key: 'criticality',
          
          render: () => {
            return (



              <div className="flex justify-start gap-3">
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
    <div className=''>
    <div className='flex justify-between mb-7'>
<p className='w-64 h-6 font-semibold text-2xl'>CBM SET STANDARDS</p>
<Input className='border-2 w-[340px] h-12 flex gap-3 text-sm p-4' leftIcon={<SearchIcon />} placeholder='Search Sensor, Machine...'></Input>
<Button className='font-medium text-base w-52 h-10 flex justify-center items-center' label="+ Create Standards"/>
    </div>
      <Table columns={columns} dataSource={dataSource} scroll={{ x: 'calc(1500px + 50%)' }} />
      </div>
    </>
  );
};
export default SetStandard;
