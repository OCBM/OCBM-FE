import { FileUploadStatusType, FileUploaderPropsType } from './types';
import { FILE_FORMAT } from './constants';
import { UploadIcon, UploadSuccessIcon } from '@/assets/icons';

const FileUploader = (props: FileUploaderPropsType) => {
  const {
    handleFile,
    fileFormat = '.xlsx',
    uploadStatus = 'upload',
    mastery = false,
    className = '',
    fileName = '',
    image = '',
  } = props;

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

  const handleDrop = (event: any) => {
    event.preventDefault();
    if (event?.dataTransfer?.files[0].type === FILE_FORMAT.excel || FILE_FORMAT.image) {
      handleFile(event?.dataTransfer?.files);
      // setFileName(event?.dataTransfer?.files[0]?.name);
    }
  };

  const handleInputChange = (event: any) => {
    if (event?.target?.files[0].type === FILE_FORMAT.excel || FILE_FORMAT.image) {
      handleFile(event?.target?.files);
      // setFileName(event?.target?.files?.[0]?.name);
    }
  };

  return (
    <label
      className={`bg-[#F8F6FF] border border-dashed border-[#605BFF] flex gap-5 items-center justify-center py-[34px] rounded-md cursor-pointer ${className}`}
      htmlFor="uploadInput"
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
    >
      {image && (
        <div>
          <img src={image} alt="img" className="w-[70px] h-[70px] object-cover" />
        </div>
      )}

      <div className="flex flex-col justify-center items-center">
        <input className="hidden" type="file" accept={fileFormat} id="uploadInput" onChange={handleInputChange} />
        {!mastery && handleStatusIcon(uploadStatus)}
        {fileName ? (
          <p className="text-[#605BFF] text-lg font-medium leading-5 underline tracking-[0.36px] mt-4 mb-[10px]">
            {fileName}
          </p>
        ) : mastery ? (
          <p className="font-medium flex gap-2 items-center">
            <span className="text-base">Upload image</span>
            <span className="text-xs">Drag & drop files or</span>
            <span className="text-[#605BFF] underline">Browse</span>
          </p>
        ) : (
          <p className="text-[#0F0F0F] text-lg font-medium leading-5 mt-4 mb-[10px]">
            Drag & drop files or <span className="text-[#605BFF] text-lg font-medium leading-5 underline">Browse</span>
          </p>
        )}
        {!fileName && <p className="text-[#676767] text-xs font-normal leading-5">Supported formats: {fileFormat}</p>}
      </div>
    </label>
  );
};

export default FileUploader;
