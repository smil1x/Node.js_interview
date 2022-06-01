import React from 'react';
import protectedRoute from '../protectedRoute';

const Protected = () => (
  <div className="container">
    <h1>Protected route</h1>
  </div>
);

export default protectedRoute(Protected);
