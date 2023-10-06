import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { FileUploader } from '@/components';
import { FileUploadStatusType } from '@/components/reusable/fileuploader/types';

const meta = {
  title: 'Components/FileUploader',
  component: FileUploader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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

export const UI: Story = {
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
};

export const Functionality: Story = {
  render: () => <FileUploaderWithHooks />,
};
