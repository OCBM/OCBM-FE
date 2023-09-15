export type FileUploaderPropsType = {
  handleChange: (event: any) => void;
  fileFormat?: '.xlsx';
  multiple?: boolean;
  status?: FileUploadStatusType;
};

export type FileUploadStatusType = 'upload' | 'loading' | 'success' | 'warning' | 'error';
