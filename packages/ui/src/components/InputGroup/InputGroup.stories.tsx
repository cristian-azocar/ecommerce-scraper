import { Story, Meta } from '@storybook/react';
import Input from '../Input/Input';
import InputGroup, { InputGroupProps } from './InputGroup';

export default {
  title: 'InputGroup',
  component: InputGroup,
  argTypes: {
    size: {
      options: [undefined, 'xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
  },
} as Meta;

export const Default: Story<InputGroupProps> = (args) => (
  <InputGroup {...args}>
    <Input placeholder="Text input" />
  </InputGroup>
);
