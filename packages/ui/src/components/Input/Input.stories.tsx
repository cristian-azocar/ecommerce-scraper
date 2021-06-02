import { Story, Meta } from '@storybook/react';
import Input, { InputProps } from './Input';

export default {
  title: 'Input',
  component: Input,
  argTypes: {
    size: {
      options: [undefined, 'xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    isInvalid: {
      control: { type: 'boolean' },
    },
    leftElement: {
      control: { type: 'text' },
    },
  },
} as Meta;

export const Default: Story<InputProps> = (args) => <Input {...args} />;
Default.args = {
  placeholder: 'Text input',
  disabled: false,
};
