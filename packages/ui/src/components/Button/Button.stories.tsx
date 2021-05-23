import { Story, Meta } from '@storybook/react';
import Button, { ButtonProps } from './Button';

export default {
  title: 'Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default',
};

export const Colors = (): JSX.Element => (
  <>
    <Button>Default</Button>
    <Button color="primary" variant="solid">
      Primary
    </Button>
    <Button color="secondary" variant="solid">
      Secondary
    </Button>
    <Button color="info" variant="solid">
      Info
    </Button>
    <Button color="success" variant="solid">
      Success
    </Button>
    <Button color="warning" variant="solid">
      Warning
    </Button>
    <Button color="danger" variant="solid">
      Danger
    </Button>
  </>
);

export const Sizes = (): JSX.Element => (
  <>
    <Button size="small">Small</Button>
    <Button size="medium">Medium</Button>
    <Button size="large">Large</Button>
  </>
);

export const Variants = (): JSX.Element => (
  <>
    <p>Solid</p>
    <Button variant="solid" color="primary">
      Primary
    </Button>
    <Button variant="solid" color="secondary">
      Secondary
    </Button>
    <Button variant="solid" color="warning">
      Warning
    </Button>
    <Button variant="solid" color="info">
      Info
    </Button>
    <Button variant="solid" color="success">
      Success
    </Button>
    <Button variant="solid" color="danger">
      Danger
    </Button>

    <p>Outlined</p>
    <Button variant="outlined" color="primary">
      Primary
    </Button>
    <Button variant="outlined" color="secondary">
      Secondary
    </Button>
    <Button variant="outlined" color="warning">
      Warning
    </Button>
    <Button variant="outlined" color="info">
      Info
    </Button>
    <Button variant="outlined" color="success">
      Success
    </Button>
    <Button variant="outlined" color="danger">
      Danger
    </Button>

    <p>Text</p>
    <Button variant="text" color="primary">
      Primary
    </Button>
    <Button variant="text" color="secondary">
      Secondary
    </Button>
    <Button variant="text" color="warning">
      Warning
    </Button>
    <Button variant="text" color="info">
      Info
    </Button>
    <Button variant="text" color="success">
      Success
    </Button>
    <Button variant="text" color="danger">
      Danger
    </Button>
  </>
);

export const States = (): JSX.Element => (
  <>
    <p>Disabled</p>
    <Button disabled>Disabled</Button>

    <p>Loading</p>
    <Button loading color="primary" variant="solid">
      Loading
    </Button>
  </>
);

export const Displays = (): JSX.Element => (
  <div style={{ width: 300 }}>
    <Button fullWidth size="small">
      Small
    </Button>
    <Button fullWidth size="medium">
      Medium
    </Button>
    <Button fullWidth size="large">
      Large
    </Button>
  </div>
);

export const Link = Template.bind({});
Link.args = {
  children: 'Link',
  href: 'https://www.google.cl',
};
