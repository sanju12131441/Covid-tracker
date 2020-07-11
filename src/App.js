import React from 'react';
import Layout from './components/layout/layout';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { BrowserRouter,withRouter,Redirect } from 'react-router-dom';

function App(props) {
  if (props.location.pathname === '/') {
    return <Redirect to='/overview' />
  }
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

export default withRouter(App);
