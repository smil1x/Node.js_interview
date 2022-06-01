import { CardComponent as Card } from '../shared/card/Card';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Card',
  component: Card,
  argTypes: { onDeleteObject: { action: 'clicked' } },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'Default Card',
  description: 'description',
  isDeleting: false,
  redirectUrl: `/objects/fe64b229-daeb-4cd5-ab3b-65c15a0c3cb0`,
};
