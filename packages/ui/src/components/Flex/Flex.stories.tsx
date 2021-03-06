import React from 'react';
import { Story, Meta } from '@storybook/react';
import Flex, { FlexProps } from './Flex';

const Box = ({ children }: React.ComponentPropsWithoutRef<'div'>) => (
  <div
    style={{
      backgroundColor: '#00d1b2',
      color: '#fff',
      fontWeight: 600,
      textAlign: 'center',
    }}
  >
    {children}
  </div>
);

export default {
  title: 'Flex',
  component: Flex,
  argTypes: {
    autoGrow: {
      control: { type: 'boolean' },
    },
    direction: {
      options: ['column-reverse', 'column', 'row-reverse', 'row'],
      control: { type: 'select' },
    },
    justifyContent: {
      options: [
        'flex-start',
        'center',
        'flex-end',
        'space-between',
        'space-around',
        'space-evenly',
      ],
      control: { type: 'select' },
    },
    alignItems: {
      options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
      control: { type: 'select' },
    },
    spacing: {
      control: { type: 'number' },
    },
  },
} as Meta;

export const Default: Story<FlexProps> = (args) => (
  <Flex container {...args}>
    <Flex item>
      <Box>Col 1</Box>
    </Flex>
    <Flex item>
      <Box>Col 2</Box>
    </Flex>
    <Flex item>
      <Box>Col 3</Box>
    </Flex>
  </Flex>
);

export const Fluid: Story<FlexProps> = (args) => (
  <Flex container {...args}>
    <Flex item xs={12}>
      <Box>xs=12</Box>
    </Flex>

    <Flex item xs={6}>
      <Box>xs=6</Box>
    </Flex>
    <Flex item xs={6}>
      <Box>xs=6</Box>
    </Flex>

    <Flex item xs={4}>
      <Box>xs=4</Box>
    </Flex>
    <Flex item xs={4}>
      <Box>xs=4</Box>
    </Flex>
    <Flex item xs={4}>
      <Box>xs=4</Box>
    </Flex>

    <Flex item xs={3}>
      <Box>xs=3</Box>
    </Flex>
    <Flex item xs={3}>
      <Box>xs=3</Box>
    </Flex>
    <Flex item xs={3}>
      <Box>xs=3</Box>
    </Flex>
    <Flex item xs={3}>
      <Box>xs=3</Box>
    </Flex>
  </Flex>
);
Fluid.args = {
  spacing: 2,
};

export const Responsive: Story<FlexProps> = (args) => (
  <Flex container {...args}>
    <Flex item xs={12} sm={12} md={6} lg={4}>
      <Box>Col 1</Box>
    </Flex>
    <Flex item xs={12} sm={6} md={6} lg={4}>
      <Box>Col 2</Box>
    </Flex>
    <Flex item xs={12} sm={6} md={12} lg={4}>
      <Box>Col 3</Box>
    </Flex>
  </Flex>
);
Responsive.args = {
  spacing: 2,
};

export const AutoGrow: Story<FlexProps> = (args) => (
  <Flex container {...args}>
    <Flex item>
      <Box>Col 1</Box>
    </Flex>
    <Flex item xs={6}>
      <Box>Col 2 (xs=6)</Box>
    </Flex>
    <Flex item>
      <Box>Col 3</Box>
    </Flex>
  </Flex>
);
AutoGrow.args = {
  autoGrow: true,
  spacing: 2,
};

export const SingleGrow: Story<FlexProps> = (args) => (
  <Flex container spacing={2} {...args}>
    <Flex item>
      <Box>Col 1</Box>
    </Flex>
    <Flex item grow>
      <Box>Col 2</Box>
    </Flex>
    <Flex item>
      <Box>Col 3</Box>
    </Flex>
  </Flex>
);
