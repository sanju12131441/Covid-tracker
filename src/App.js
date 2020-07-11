import React from 'react';
import Layout from './components/layout/layout';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { BrowserRouter } from 'react-router-dom';



function App() {
  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Layout companyName='Born' userName='Brendan W.' />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
