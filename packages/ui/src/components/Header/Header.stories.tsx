import { Story, Meta } from '@storybook/react';
import Flex from '../Flex';
import Input from '../Input';
import Header, { HeaderProps } from './Header';

export default {
  title: 'Header',
  component: Header,
  argTypes: {
    position: {
      options: [undefined, 'absolute', 'fixed', 'relative', 'static', 'sticky'],
      control: { type: 'select' },
    },
  },
} as Meta;

const DummyText = Array(50)
  .fill(null)
  // eslint-disable-next-line react/no-array-index-key
  .map((_, index) => <p key={index}>Dummy text</p>);

export const Default: Story<HeaderProps> = (args) => <Header {...args} />;
Default.args = {
  children: 'Header',
};

export const Sticky: Story<HeaderProps> = (args) => (
  <>
    <Header {...args} />
    {DummyText}
  </>
);
Sticky.args = {
  position: 'sticky',
  children: (
    <Flex container alignItems="center" justifyContent="space-between">
      <Flex item>Logo</Flex>
      <Flex item>
        <Input placeholder="Search..." style={{ width: 500 }} />
      </Flex>
      <Flex item>Login</Flex>
    </Flex>
  ),
};
