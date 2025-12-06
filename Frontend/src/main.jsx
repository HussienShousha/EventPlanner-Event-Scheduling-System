import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./Register.jsx";
import Login from "./Login.jsx";
import {
  CreateEvent,
  ShowEvents,
  ShowInvitations,
  InviteUser,
  ShowInvitedUser
} from "./events.jsx";

import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/events" element={<ShowEvents />} />
        <Route path="/invitations" element={<ShowInvitations />} />
        <Route path="/invite" element={<InviteUser />} />
        <Route path="/invited-users" element={<ShowInvitedUser />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
