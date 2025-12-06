import React from "react";
import { Link } from "react-router-dom";

export function NavMenu() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "15px",
        padding: "10px",
        backgroundColor: "#f2f2f2",
        marginBottom: "20px",
        borderRadius: "5px",
      }}
    >
      <Link to="/events/create">Create Event</Link>
      <Link to="/events">Show Events</Link>
      <Link to="/invitations">Show Invitations</Link>
      <Link to="/invite">Invite User</Link>
      <Link to="/invited-users">Show Invited Users</Link>
      <Link to="/login">Logout</Link>
    </nav>
  );
}
