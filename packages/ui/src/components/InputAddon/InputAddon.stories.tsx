import { Story, Meta } from '@storybook/react';
import Input from '../Input/Input';
import InputGroup from '../InputGroup';
import InputAddon, { InputAddonProps } from './InputAddon';

export default {
  title: 'InputAddon',
  component: InputAddon,
} as Meta;

export const Default: Story<InputAddonProps> = () => (
  <InputGroup>
    <InputAddon>
      <p>$</p>
    </InputAddon>
    <Input placeholder="Text input" />
  </InputGroup>
);

export const Right: Story<InputAddonProps> = () => (
  <InputGroup>
    <Input placeholder="Text input" />
    <InputAddon position="right">
      <p>@example.com</p>
    </InputAddon>
  </InputGroup>
);

export const BothSides: Story<InputAddonProps> = () => (
  <InputGroup>
    <InputAddon position="left">
      <p>https://</p>
    </InputAddon>
    <Input placeholder="Text input" />
    <InputAddon position="right">
      <p>.com</p>
    </InputAddon>
  </InputGroup>
);
