import { Story, Meta } from '@storybook/react';
import Checkbox, { CheckboxProps } from './Checkbox';

export default {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    size: {
      options: [undefined, 'xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
  },
} as Meta;

export const Default: Story<CheckboxProps> = (args) => <Checkbox {...args} />;
Default.args = {
  children: 'Checkbox',
  inputProps: { disabled: false },
};
