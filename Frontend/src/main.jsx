import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Register from './Register.jsx';
import Login from './Login.jsx';
import AllUsers from './GetAllUsers.jsx';

// Register page
const registerRoot = document.getElementById('register');
if (registerRoot) {
  createRoot(registerRoot).render(
    <StrictMode>
      <Register />
    </StrictMode>
  );
}

// Login page
const loginRoot = document.getElementById('login');
if (loginRoot) {
  createRoot(loginRoot).render(
    <StrictMode>
      <Login />
    </StrictMode>
  );
}

// All users page
const allUsersRoot = document.getElementById('allUsers');
if (allUsersRoot) {
  createRoot(allUsersRoot).render(
    <StrictMode>
      <AllUsers />
    </StrictMode>
  );
}
