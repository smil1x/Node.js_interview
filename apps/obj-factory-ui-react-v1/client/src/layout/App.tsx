import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { SnackbarProvider } from 'notistack';

import Content from './content/Content';
import Header from './header/Header';

const theme = createTheme({
  palette: {
    primary: blue,
  },
});

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <SnackbarProvider preventDuplicate>
          <Header />
          <Content />
        </SnackbarProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
