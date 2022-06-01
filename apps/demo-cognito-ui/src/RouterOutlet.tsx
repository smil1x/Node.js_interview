import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Public from './pages/Public';
import Profile from './pages/Profile';
import UsersManagement from './pages/UsersManegment';
import CreateUser from './components/CreateUser/CreateUser';
import CreateGroup from './components/CreateGroup/CreateGroup';

const RouterOutlet = () => {
  return (
    <Routes>
      <Route path="/" element={<Public />} />
      <Route path="/users" element={<UsersManagement />} >
        <Route path="createuser" element={<CreateUser redirectUrl="/users" />} />
        <Route path="creategroup" element={<CreateGroup redirectUrl="/users" />} />
      </Route>
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Public />} />
    </Routes>
  );
};

export default RouterOutlet;
