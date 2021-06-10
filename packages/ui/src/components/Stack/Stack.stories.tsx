import { Story, Meta } from '@storybook/react';
import Stack, { StackProps } from './Stack';

export default {
  title: 'Stack',
  component: Stack,
  argTypes: {
    direction: {
      options: [undefined, 'row', 'column'],
      control: { type: 'select' },
    },
  },
} as Meta;

export const Default: Story<StackProps> = (args) => <Stack {...args} />;
Default.args = {
  children: (
    <>
      <span>Element 1</span>
      <span>Element 2</span>
      <span>Element 3</span>
    </>
  ),
};
