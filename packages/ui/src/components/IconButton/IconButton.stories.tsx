import { Story, Meta } from '@storybook/react';
import IconButton, { IconButtonProps } from './IconButton';

export default {
  title: 'IconButton',
  component: IconButton,
  argTypes: {
    color: {
      options: [
        undefined,
        'primary',
        'secondary',
        'warning',
        'info',
        'success',
        'danger',
      ],
      control: { type: 'select' },
    },
    size: {
      options: [undefined, 'sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    variant: {
      options: [undefined, 'outlined', 'solid', 'text'],
      control: { type: 'select' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    rounded: {
      control: { type: 'boolean' },
    },
  },
} as Meta;

export const Default: Story<IconButtonProps> = (args) => (
  <IconButton {...args} />
);
Default.args = {
  children: (
    <svg viewBox="0 0 24 24">
      <path d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z" />
    </svg>
  ),
};
