import ViewStreamIcon from '@material-ui/icons/ViewStream';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import { ViewTypes } from './viewType';

export const DEFAULT_SELECT_ITEMS = [3, 6, 9];

export const DEFAULT_TOGGLE_ITEMS = [
  { component: <ViewStreamIcon color="primary" />, value: ViewTypes.LIST },
  { component: <ViewModuleIcon color="primary" />, value: ViewTypes.GRID },
];
