export type FileUploaderPropsType = {
  handleFile: (event: any) => void;
  fileFormat?: '.xlsx' | '.jpg' | '.png' | string;
  uploadStatus?: FileUploadStatusType;
  className?: string;
  mastery?: boolean;
  fileName?: string;
  image?: string;
};

export type FileUploadStatusType = 'upload' | 'loading' | 'success' | 'warning' | 'error';
