export type FileUploaderPropsType = {
  handleChange: (event: any) => void;
  acceptFormat: string;
  multiple?: boolean;
  status?: FileUploadStatusType;
};

export type FileUploadStatusType = 'upload' | 'loading' | 'success' | 'warning' | 'error';
