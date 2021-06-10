import { Story, Meta } from '@storybook/react';
import Link, { LinkProps } from './Link';

export default {
  title: 'Link',
  component: Link,
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
    external: {
      control: { type: 'boolean' },
    },
  },
} as Meta;

export const Default: Story<LinkProps> = (args) => <Link {...args} />;
Default.args = {
  children: 'Link',
  href: 'https://www.google.com',
};
