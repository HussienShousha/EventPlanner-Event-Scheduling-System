import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Register from './Register.jsx';
import Login from './Login.jsx';
import {CreateEvent, ShowEvents, ShowInvitations, InviteUser, ShowInvitedUser} from './events.jsx';
import './styles.css';

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

// Events page
const eventsRoot = document.getElementById('CreateEvents');
if (eventsRoot) {
  createRoot(eventsRoot).render(
    <StrictMode>
      <CreateEvent />
    </StrictMode>
  );
}

const showEventsRoot = document.getElementById('ShowEvents');
if (showEventsRoot) {
  createRoot(showEventsRoot).render(
    <StrictMode>
      <ShowEvents />
    </StrictMode>
  );
}

const showInvitationsRoot = document.getElementById('ShowInvitations');
if (showInvitationsRoot) {
  createRoot(showInvitationsRoot).render(
    <StrictMode>
      <ShowInvitations />
    </StrictMode>
  );
}

const inviteUserRoot = document.getElementById('InviteUser');
if (inviteUserRoot) {
  createRoot(inviteUserRoot).render(
    <StrictMode>
      <InviteUser />
    </StrictMode>
  );
}

const showInvitedUserRoot = document.getElementById('ShowInvitedUser');
if (showInvitedUserRoot) {
  createRoot(showInvitedUserRoot).render(
    <StrictMode>
      <ShowInvitedUser />
    </StrictMode>
  );
}