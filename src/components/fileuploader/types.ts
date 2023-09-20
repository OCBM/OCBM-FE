export type FileUploaderPropsType = {
  handleFile: (event: any) => void;
  fileFormat?: '.xlsx';
  uploadStatus?: FileUploadStatusType;
};

export type FileUploadStatusType = 'upload' | 'loading' | 'success' | 'warning' | 'error';
