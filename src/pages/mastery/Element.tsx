import { DeleteIcon, PencilIcon } from '@/assets/icons';
import { Button, Dropdown, FileUploader, Input } from '@/components';
import { FileUploadStatusType } from '@/components/reusable/fileuploader/types';
import { Table } from '@/components/reusable/table';
import { useState } from 'react';

function Element() {
  // const [newElement, setNewElement] = useState();
  const [uploadStatus, setUploadStatus] = useState<FileUploadStatusType>('upload');

  const handleFile = (event: any) => {
    console.log(event[0], 'event');
    setUploadStatus('success');
    // setNewPlant((prev: any) => ({ ...prev, image: event[0] }));
  };

  const datasource = [
    {
      elementName: 'Chennai',
      description: 'chennai elements',
      elementId: '123456',
    },
    {
      elementName: 'Chennai',
      description: 'chennai elements',
      elementId: '123456',
    },
  ];
  const columns = [
    {
      title: 'Element Name',
      dataIndex: 'elementName',
      key: 'elementName',
    },
    {
      title: 'Element Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Element ID',
      dataIndex: 'elementId',
      key: 'id',
    },
    // {
    //   title: 'Image',
    //   dataIndex: 'image',
    //   key: 'image',
    // },
    {
      title: 'Actions',
      dataIndex: 'actions',
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
      <h2 className="text-[20px] text-grey-light font-medium mb-6">Add Element</h2>

      <div>
        <div className="flex justify-center gap-[16px] mb-8">
          <Input
            className="w-full border-[1px] h-[46px] mt-2 px-3 rounded-[50px] border-[#A9A9A9] p-[16px]"
            placeholder="Element Name*"
            type="text"
            // value={newElement.plantName}
            name="elementName"
          />
          <Input
            className="w-full border-[1px] h-[46px] mt-2 px-3 rounded-[50px] border-[#A9A9A9] p-[16px]"
            placeholder="Element descriptions*"
            type="text"
            // value={newElement.plantName}
            name="descriptions"
          />
          <Dropdown
            className="w-full border-[1px] h-[46px] mt-2 px-3 rounded-[50px] border-[#A9A9A9] p-[16px]"
            placeholder="Select Machine"
            handleChange={() => {
              // setUser((prev: any) => ({ ...prev, organization: value }));
              // getPlants(value);
            }}
            // value={user.organization}
            // options={}
            mandatory={true}
          />
        </div>
        <div className="mb-6">
          <FileUploader
            className="w-[560px] py-6"
            mastery
            fileFormat=".jpg, .png"
            handleFile={handleFile}
            uploadStatus={uploadStatus}
          />
        </div>
        <div className="flex justify-start flex-row w-full gap-[20px] mt-5 mb-9">
          <Button className="py-2 px-6 rounded-[16px]" label="Clear" variant="secondary" />
          <Button className="py-2 px-6 rounded-[16px]" label="Add" disabled />
        </div>
      </div>
      <div>
        <Table columns={columns} dataSource={datasource} pagination={false} />
      </div>
    </div>
  );
}
export default Element;
