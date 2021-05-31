import { Story, Meta } from '@storybook/react';
import Typography, { TypographyProps } from './Typography';

export default {
  title: 'Typography',
  component: Typography,
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
        'text-primary',
      ],
      control: { type: 'select' },
    },
    as: {
      options: ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: { type: 'select' },
    },
    align: {
      options: ['left', 'right', 'center', 'justify', 'initial', 'inherit'],
      control: { type: 'select' },
    },
    weight: {
      options: [
        'thin',
        'light',
        'normal',
        'medium',
        'semibold',
        'bold',
        'extrabold',
        'black',
      ],
      control: { type: 'select' },
    },
    variant: {
      options: ['body', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: { type: 'select' },
    },
  },
} as Meta;

export const Default: Story<TypographyProps> = (args) => (
  <Typography {...args}>Hello World</Typography>
);
