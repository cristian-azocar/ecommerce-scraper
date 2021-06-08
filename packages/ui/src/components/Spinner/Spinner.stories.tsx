import { Story, Meta } from '@storybook/react';
import Spinner, { SpinnerProps } from './Spinner';

export default {
  title: 'Spinner',
  component: Spinner,
  argTypes: {
    color: {
      // TODO: move this "color" to a helper. Button stories use them too.
      options: ['primary', 'secondary', 'warning', 'info', 'success', 'danger'],
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
