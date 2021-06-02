import { Story, Meta } from '@storybook/react';
import Card, { CardProps } from './Card';

export default {
  title: 'Card',
  component: Card,
} as Meta;

export const Default: Story<CardProps> = (args) => (
  <Card {...args}>
    <Card.Image
      alt="A cute doggo"
      src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=320:*"
    />
    <Card.Content>A really cute doggo</Card.Content>
  </Card>
);
Default.args = {
  style: { maxWidth: 320 },
};
