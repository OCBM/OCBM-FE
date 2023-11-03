import { Button, Dropdown, FileUploader, Input } from '@/components';
import { FileUploadStatusType } from '@/components/reusable/fileuploader/types';
import { Table } from '@/components/reusable/table';
import { useState } from 'react';

const Shop = () => {
  const [uploadStatus, setUploadStatus] = useState<FileUploadStatusType>('upload');

  const handleFile = (event: any) => {
    console.log(event[0], 'e');
    setUploadStatus('success');
  };

  return (
    <div>
      <p className="text-xl font-medium leading-5 py-[10px] mb-8">Add Shop</p>
      <div className="flex items-center justify-between mb-6">
        <Input placeholder="Shop Name" className="w-[270px] border border-solid border-[#A9A9A9] rounded-[50px] p-4" />
        <Input
          placeholder="Shop Descriptions"
          className="w-[270px] border border-solid border-[#A9A9A9] rounded-[50px] p-4"
        />
        <Dropdown
          placeholder="Select Plant"
          className="w-[270px] border border-solid border-[#A9A9A9] rounded-[50px] py-4 px-5"
          options={[]}
        />
      </div>
      {/* We can add shop images using uploader */}
      <FileUploader
        className="w-[560px] py-6"
        mastery
        fileFormat=".jpg, .png"
        handleFile={handleFile}
        uploadStatus={uploadStatus}
      />
      <div className="flex gap-4 mt-8 mb-8">
        <Button
          variant="secondary"
          className="py-3 px-6 rounded-2xl tracking-[0.32px] font-medium text-base"
          label="Clear"
        />
        <Button
          variant="primary"
          className="py-3 px-6 rounded-2xl tracking-[0.32px] font-medium text-base"
          label="Add"
        />
      </div>
      <Table />
    </div>
  );
};

export default Shop;
