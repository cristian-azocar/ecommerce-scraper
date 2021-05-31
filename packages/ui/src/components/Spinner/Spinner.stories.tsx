import { Story, Meta } from '@storybook/react';
import Spinner, { SpinnerProps } from './Spinner';

export default {
  title: 'Spinner',
  component: Spinner,
  argTypes: {
    color: {
      options: [
        'primary',
        'secondary',
        'warning',
        'info',
        'success',
        'danger',
        'black',
        'white',
      ],
      control: { type: 'select' },
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
  },
} as Meta;

const Template: Story<SpinnerProps> = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
