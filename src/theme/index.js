import { createMuiTheme } from '@material-ui/core';

import overrides from './overrides';
import palette from './palette';
import typography from './typography';

const theme = createMuiTheme({
  palette,
  overrides,
  typography
});

export default theme;
