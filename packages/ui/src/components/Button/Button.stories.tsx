import { Story, Meta } from '@storybook/react';
import Button, { ButtonProps } from './Button';

export default {
  title: 'Button',
  component: Button,
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
      options: [undefined, 'small', 'medium', 'large'],
      control: { type: 'select' },
    },
    variant: {
      options: [undefined, 'solid', 'outlined', 'text'],
      control: { type: 'select' },
    },
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default',
};

export const Color = Template.bind({});
Color.args = {
  children: 'Color',
  color: 'primary',
};

export const Size = Template.bind({});
Size.args = {
  children: 'Medium',
  size: 'medium',
};

export const Variant = Template.bind({});
Variant.args = {
  children: 'Variant',
  variant: 'solid',
  color: 'primary',
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  children: 'Full width',
  fullWidth: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled',
  disabled: true,
};

export const Loading = Template.bind({});
Loading.args = {
  children: 'Loading',
  loading: true,
};

export const Link = Template.bind({});
Link.args = {
  children: 'Link',
  href: 'https://www.google.cl',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: 'Icon',
  leftIcon: '👉',
  rightIcon: '👈',
};
