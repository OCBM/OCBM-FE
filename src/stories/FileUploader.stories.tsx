import { Meta, StoryObj } from '@storybook/react';
import FileUploader from '../components/fileuploader';

const meta = {
  title: 'Components/FileUploader',
  component: FileUploader,
} satisfies Meta<typeof FileUploader>;

export default meta;

type Story = StoryObj<typeof FileUploader>;

export const Primary: Story = {
  args: {
    fileFormat: '.xlsx',
    uploadStatus: 'upload',
  },
};
