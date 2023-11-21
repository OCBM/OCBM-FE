import { DeleteIcon, PencilIcon } from '@/assets/icons';
import { Button, Dropdown, FileUploader, Input } from '@/components';
import { FileUploadStatusType } from '@/components/reusable/fileuploader/types';
import { Table } from '@/components/reusable/table';
import { useState } from 'react';

function Sensor() {
  const [uploadStatus, setUploadStatus] = useState<FileUploadStatusType>('upload');

  const handleFile = () => {
    setUploadStatus('success');
  };

  const dataSource: any = [
    {
      sensorName: 'Sensor 1',
      description: 'Sensor1-desc',
      elementId: '123456',
      image: 'Image-1',
    },
    {
      sensorName: 'Sensor 2',
      description: 'Sensor2-desc',
      elementId: '123456',
      image: 'Image-2',
    },
  ];
  const columns = [
    {
      title: 'Sensor Name',
      dataIndex: 'sensorName',
      key: 'sensorName',
    },
    {
      title: 'Sensor Description',
      dataIndex: 'description',
      width: '20%',
      key: 'description',
    },
    {
      title: 'Sensor ID',
      dataIndex: 'elementId',
      width: '30%',
      key: 'elementId',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      width: '20%',
      key: 'image',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '10%',
      key: 'actions',
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
    <div>
      <h2 className="text-xl font-medium leading-5 text-[#444] mb-8">Add Sensor</h2>
      <div>
        <div className="flex justify-center gap-[16px] mb-6">
          <Input
            className="w-[270px] border-[1px] h-[46px] px-3 rounded-[50px] border-[#A9A9A9] p-[16px] text-[14px]"
            placeholder="Sensor Name*"
            type="text"
            value=""
            name="sensorName"
          />
          <Input
            className="w-[270px] border-[1px] h-[46px] px-3 rounded-[50px] border-[#A9A9A9] p-[16px] text-[14px]"
            placeholder="Sensor descriptions"
            type="text"
            value=""
            name="descriptions"
          />
          <Dropdown
            options={[]}
            className="w-[270px] border-[1px] h-[46px] px-3 rounded-[50px] border-[#A9A9A9] p-[16px] text-[14px]"
            placeholder="Select Element"
            handleChange={() => {}}
            value=""
            mandatory={true}
          />
        </div>
        <div>
          <FileUploader
            className="w-[560px] py-6"
            mastery
            fileFormat=".jpg, .png"
            handleFile={handleFile}
            uploadStatus={uploadStatus}
          />
        </div>
        <div className="flex justify-start flex-row w-full gap-4 mt-8 mb-8">
          <Button
            className="py-3 px-6 rounded-2xl tracking-[0.32px] text-base leading-4 font-GothamMedium"
            label="Clear"
            variant="secondary"
          />
          <Button
            className="py-3 px-6 rounded-2xl tracking-[0.32px] text-base leading-4 font-GothamMedium"
            label="Add"
            disabled
          />
        </div>
      </div>
      <div>
        <>
          <Table columns={columns} dataSource={dataSource} pagination={false} />
        </>
      </div>
    </div>
  );
}
export default Sensor;
