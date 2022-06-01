import { Form } from '../shared/form/Form';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { objectValidationSchema } from '../utils';

export default {
  title: 'Form',
  component: Form,
  argTypes: { onSubmit: { action: 'clicked' } },
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const Default = Template.bind({});

Default.args = {
  initialValues: { name: '', description: '' },
  isLoading: false,
  validationSchema: objectValidationSchema,
};
