import React, { useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';
import LoginForm from '../components/LoginForm/LoginForm';
import { Popup } from '../components/shared';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const close = () => {
    navigate('/');
  };

  useEffect(() => {
    checkUser();
    Hub.listen('auth', (data) => {
      const { payload } = data;
      if (payload.event === 'signOut') {
        setUser(null);
      }
    });
  }, []);

  const [user, setUser] = useState(null);
  async function checkUser() {
    try {
      const data = await Auth.currentAuthenticatedUser();
      console.log(data);
      const userInfo = { username: data.username, ...data.signInUserSession.idToken.payload };
      setUser(userInfo);
    } catch (err) {
      console.log('error: ', err);
    }
  }
  function signOut() {
    Auth.signOut().catch((err) => console.log('error signing out: ', err));
  }
  if (user) {
    return (
      <div>
        <h2>Profile</h2>
        <h3>Username: {user.username}</h3>
        <h4>Email: {user.email}</h4>
        <button onClick={signOut}>Sign Out</button>
      </div>
    );
  }
  return (
    <Popup close={close}>
      <LoginForm />
    </Popup>
  );
};

export default Profile;
