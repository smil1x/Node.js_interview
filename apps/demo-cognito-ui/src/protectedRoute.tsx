import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import Spinner from './components/Spinner/Spinner';

const protectedRoute =
  (Comp: any, redirect = '/profile') =>
  (props: any) => {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);

    async function checkAuthState() {
      try {
        await Auth.currentAuthenticatedUser();
        setIsAuthorized(true);
      } catch {
        setIsAuthorized(false);
        navigate(redirect);
      }
    }
    useEffect(() => {
      checkAuthState();
    });
    return <>{isAuthorized ? <Comp {...props} /> : <Spinner />}</>;
  };

export default protectedRoute;
