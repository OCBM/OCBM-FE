import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import FileUploader from '../components/fileuploader';
import { FileUploadStatusType } from 'components/fileuploader/types';

const meta = {
  title: 'Components/FileUploader',
  component: FileUploader,
  argTypes: {
    fileFormat: {
      options: ['.xlsx', '.png', '.pdf', '.jpg', 'jpeg'],
      control: { type: 'radio' },
    },
    uploadStatus: {
      options: ['upload', 'loading', 'success', 'warning', 'error'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof FileUploader>;

export default meta;

type Story = StoryObj<typeof FileUploader>;

const FileUploaderWithHooks = () => {
  const [uploadStatus, setUploadStatus] = useState<FileUploadStatusType>('upload');

  const handleFile = () => {
    setUploadStatus('success');
  };
  return <FileUploader fileFormat=".xlsx" uploadStatus={uploadStatus} handleFile={handleFile} />;
};

export const UI: Story = {};

export const Functionality: Story = {
  render: () => <FileUploaderWithHooks />,
};
