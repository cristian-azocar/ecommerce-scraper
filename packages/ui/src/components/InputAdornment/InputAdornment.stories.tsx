import { Story, Meta } from '@storybook/react';
import Input from '../Input/Input';
import InputGroup from '../InputGroup';
import InputAdornment, { InputAdornmentProps } from './InputAdornment';

export default {
  title: 'InputAdornment',
  component: InputAdornment,
  argTypes: {
    size: {
      options: [undefined, 'xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
  },
} as Meta;

export const Default: Story<InputAdornmentProps> = (args) => (
  <InputGroup>
    <Input placeholder="Text input" />
    <InputAdornment position="right" {...args}>
      <p>Holi</p>
    </InputAdornment>
  </InputGroup>
);
