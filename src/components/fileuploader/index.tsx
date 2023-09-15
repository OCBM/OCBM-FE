import React, { ForwardedRef, useState } from 'react';
import { UploadIcon, UploadSuccessIcon } from '@/assets/icons';
import { FileUploadStatusType, FileUploaderPropsType } from './types';

const FileUploader = React.forwardRef(
  (props: FileUploaderPropsType, ref: ForwardedRef<HTMLInputElement>) => {
    const { handleChange, acceptFormat = '', multiple = false, status = 'upload' } = props;

    const [fileName, setFileName] = useState('');

    const handleStatusIcon = (status: FileUploadStatusType) => {
      switch (status) {
        case 'loading':
          break;
        case 'success':
          return <UploadSuccessIcon />;
        case 'warning':
          break;
        case 'error':
          break;
        default:
          return <UploadIcon />;
      }
    };

    return (
      <label
        className="bg-[#F8F6FF] border border-dashed border-[#434347] flex flex-col items-center justify-center py-[34px] px-[200px] rounded-md cursor-pointer"
        htmlFor="uploadInput"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          handleChange(event?.dataTransfer?.files);
          setFileName(event?.dataTransfer?.files[0]?.name);
        }}
      >
        <input
          ref={ref}
          className="hidden"
          type="file"
          name="file"
          accept={acceptFormat}
          id="uploadInput"
          multiple={multiple}
          onChange={(event) => {
            handleChange(event?.target?.files);
            setFileName(event?.target?.files?.[0]?.name || '');
          }}
        />
        {handleStatusIcon(status)}
        {fileName ? (
          <p className="text-[#605BFF] text-lg font-medium leading-5 underline tracking-[0.36px] mt-4 mb-[10px]">
            {fileName}
          </p>
        ) : (
          <p className="text-[#0F0F0F] text-lg font-medium leading-5 mt-4 mb-[10px]">
            Drag & drop files or{' '}
            <span className="text-[#605BFF] text-lg font-medium leading-5 underline">Browse</span>
          </p>
        )}

        <p className="text-[#676767] text-xs font-normal leading-5">
          Supported formats: {acceptFormat}
        </p>
      </label>
    );
  },
);

export default FileUploader;
