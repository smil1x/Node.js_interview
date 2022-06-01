import { SelectComponent as Select } from '../shared/select/Select';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Select',
  component: Select,
  argTypes: {
    onChange: { action: 'clicked' },
    value: {
      options: [3, 6, 9],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Default = Template.bind({});

Default.args = {
  label: 'per page',
  items: [3, 6, 9],
  value: 3,
};
