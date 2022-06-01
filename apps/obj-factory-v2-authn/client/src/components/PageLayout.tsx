import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { useIsAuthenticated } from '@azure/msal-react';
import { SignInButton } from './SignInButton';
import { SignOutButton } from './SignOutButton';

export const PageLayout = (props) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <a className="navbar-brand" href="/">
          Authentication with Azure AD blueprint
        </a>
        {isAuthenticated ? <SignOutButton /> : <SignInButton />}
      </Navbar>
      <h5 className="row justify-content-md-center">
        <p>Welcome to Azure AD authentication blueprint</p>
      </h5>
      <br />
      <br />
      {props.children}
    </>
  );
};
