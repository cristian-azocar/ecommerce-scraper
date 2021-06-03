import { Story, Meta } from '@storybook/react';
import Badge, { BadgeProps } from './Badge';

export default {
  title: 'Badge',
  component: Badge,
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
      options: [undefined, 'xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
  },
} as Meta;

export const Default: Story<BadgeProps> = (args) => <Badge {...args} />;
Default.args = {
  children: 'Badge',
};
