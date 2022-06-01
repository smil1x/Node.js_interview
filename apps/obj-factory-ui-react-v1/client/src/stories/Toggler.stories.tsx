import ViewStreamIcon from '@material-ui/icons/ViewStream';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import { ViewTypesToggler } from '../shared/toggler/Toggler';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ViewTypes } from '../constants/viewType';

export default {
  title: 'ViewTypesToggler',
  component: ViewTypesToggler,
  argTypes: {
    onChange: { action: 'clicked' },
  },
} as ComponentMeta<typeof ViewTypesToggler>;

const Template: ComponentStory<typeof ViewTypesToggler> = (args) => <ViewTypesToggler {...args} />;

export const Default = Template.bind({});

Default.args = {
  items: [
    { component: <ViewStreamIcon color="primary" />, value: ViewTypes.LIST },
    { component: <ViewModuleIcon color="primary" />, value: ViewTypes.GRID },
  ],
};
