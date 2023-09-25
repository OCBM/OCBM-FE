import { Meta, StoryObj } from '@storybook/react';
import FileUploader from '../components/fileuploader';

const meta = {
  title: 'Components/FileUploader',
  component: FileUploader,
  argTypes: {
    fileFormat: {
      options: ['.xlsx'],
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

export const Default: Story = {};
