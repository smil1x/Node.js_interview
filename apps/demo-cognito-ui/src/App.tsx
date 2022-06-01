import '@aws-amplify/ui-react/styles.css';
import RouterOutlet from './RouterOutlet';
import './styles/index.scss';
import React from 'react';
import Layout from './layout/Layout';
import NavBar from './pages/NavBar/NavBar';
import { Hub } from 'aws-amplify';
import { authListener, setAmplifyConfig, setAWSConfig } from './AWS';

setAmplifyConfig();
setAWSConfig();
Hub.listen('auth', authListener);

const App = () => {
  return (
    <>
      <NavBar />
      <Layout>
        <RouterOutlet />
      </Layout>
    </>
  );
};
export default App;
