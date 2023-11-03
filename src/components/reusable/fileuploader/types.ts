export type FileUploaderPropsType = {
  handleFile: (event: any) => void;
  fileFormat?: '.xlsx' | '.jpg' | '.png' | string;
  uploadStatus?: FileUploadStatusType;
  className?: string;
  mastery?: boolean;
};

export type FileUploadStatusType = 'upload' | 'loading' | 'success' | 'warning' | 'error';
