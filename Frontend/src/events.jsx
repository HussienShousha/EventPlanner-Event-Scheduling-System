import React, { useEffect, useState } from "react";

export function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = { title, date, time, location, description };

    try {
      const response = await fetch("http://127.0.0.1:8000/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newEvent),
      });

      const data = await response.json();
      console.log("Response from backend:", data);

      if (data.error || !response.ok) {
        alert("Register failed: " + data.error);
        return;
      }

      alert("Event created successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong while creating event!");
    }
  };

  return (
    <div className="container">
      <h2>Hello {localStorage.getItem("email")}</h2>
      <hr />
      <h2>Create an event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export function ShowEvents() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [filterField, setFilterField] = useState("keyword"); 
  const [filterValue, setFilterValue] = useState("");

  const fetchEvents = async (queryField = null, queryValue = null) => {
    try {
      let url = "http://127.0.0.1:8000/events/view";
      if (queryField && queryValue) {
        url += `?${encodeURIComponent(queryField)}=${encodeURIComponent(queryValue)}`;
      }

      console.log('url :>> ', url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        mode: 'cors'
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        setEvents(data);
        setMessage("");
      } else if (data.message) {
        setEvents([]);
        setMessage(data.message);
      } else {
        setEvents([]);
        setMessage("No events currently");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
      setMessage("Error fetching events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSearch = () => {
    if (!filterValue.trim()) return; 
    fetchEvents(filterField, filterValue);
  };

  return (
    <div className="container">
      <h2>Your Events</h2>

      <div style={{ marginBottom: "1rem" }}>
        <select
          value={filterField}
          onChange={(e) => setFilterField(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        >
          <option value="keyword">Keyword</option>
          <option value="date">Date</option>
          <option value="role">Role</option>
        </select>

        <input
          type="text"
          placeholder="Enter search value"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      {events.length === 0 ? (
        <p>{message || "No events currently"}</p>
      ) : (
        <ul style={{ overflow: "scroll", height: "175px" }}>
          {events.map((event, index) => (
            <li key={index}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>Location: {event.location}</p>
              <p>
                {event.date} at {event.time}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ShowInvitations() {
  const [invitations, setInvitations] = useState([]);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("attendee");

  // Store selected status for each invitation by title
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/events/invitations/${role}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();

        if (Array.isArray(data)) {
          setInvitations(data);
          setMessage("");

          // Initialize status selections
          const statusMap = {};
          data.forEach((inv) => {
            statusMap[inv.event_title] = "Going";
          });
          setSelectedStatus(statusMap);
        } else if (data.message) {
          setInvitations([]);
          setMessage(data.message);
        } else {
          setInvitations([]);
          setMessage("No invitations currently");
        }
      } catch (error) {
        console.error("Error fetching invitations:", error);
        setInvitations([]);
        setMessage("Error fetching invitations");
      }
    };

    fetchInvitations();
  }, [role]);

  const handleSubmit = async (eventTitle) => {
    const status = selectedStatus[eventTitle];

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/events/invitation/${eventTitle}/${role}/${status}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (data.message) {
        alert(data.message);

        // Remove accepted invitation
        setInvitations((prev) =>
          prev.filter((inv) => inv.event_title !== eventTitle)
        );
      }
    } catch (error) {
      console.error("Error submitting invitation:", error);
      alert("Failed to update invitation status");
    }
  };

  return (
    <div className="container">
      <h2>Your Invitations</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="roleSelect">Select role: </label>
        <select
          id="roleSelect"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="attendee">Attendee</option>
          <option value="collaborator">Collaborator</option>
        </select>
      </div>

      {invitations.length === 0 ? (
        <p>{message || "No invitations currently"}</p>
      ) : (
        <ol>
          {invitations.map((inv, index) => (
            <li key={index} style={{ marginBottom: "1rem" }}>
              <div>
                <h3>{inv.event_title}</h3>
                <p>Status: {inv.status}</p>
              </div>

              {/* Status selector */}
              <select
                value={selectedStatus[inv.event_title]}
                onChange={(e) =>
                  setSelectedStatus((prev) => ({
                    ...prev,
                    [inv.event_title]: e.target.value,
                  }))
                }
                style={{ marginRight: "0.5rem" }}
              >
                <option value="Going">Going</option>
                <option value="Maybe">Maybe</option>
                <option value="Not Going">Not Going</option>
              </select>

              {/* Submit button */}
              <button
                onClick={() => handleSubmit(inv.event_title)}
                style={{
                  padding: "5px 10px",
                  cursor: "pointer",
                  borderRadius: "5px",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                }}
              >
                Submit
              </button>
              <hr />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export function InviteUser() {
  const [eventTitle, setEventTitle] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("attendee"); 
  const [message, setMessage] = useState("");

  const handleInvite = async () => {
    if (!email || !eventTitle) {
      setMessage("Please enter both event title and email");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/events/invite/${role}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ invited_email: email, event_title: eventTitle }),
      });

      const data = await response.json();

      if (data.message) {
        setMessage(data.message);
      } else {
        setMessage("Invitation sent successfully");
      }

      setEmail("");   
      setEventTitle(""); 
    } catch (error) {
      console.error("Error sending invitation:", error);
      setMessage("Error sending invitation");
    }
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Invite a User</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>Event Title:</label>
        <input
          type="text"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder="Enter event title"
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter user's email"
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        >
          <option value="attendee">Attendee</option>
          <option value="collaborator">Collaborator</option>
        </select>
      </div>

      <button
        onClick={handleInvite}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
          borderRadius: "5px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
        }}
      >
        Send Invitation
      </button>

      {message && <p style={{ marginTop: "15px", color: "blue" }}>{message}</p>}
    </div>
  );
}

export function ShowInvitedUser() {
  const [eventTitle, setEventTitle] = useState("");
  const [invitations, setInvitations] = useState([]);
  const [message, setMessage] = useState("");

  const fetchInvitedUsers = async () => {
    if (!eventTitle.trim()) {
      setMessage("Please enter an event title");
      setInvitations([]);
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/events/invited/${eventTitle}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          mode: "cors",
        }
      );

      const data = await response.json();

      const mergedUsers = [
        ...(data.invited_attendees || []).map((u) => ({
          email: u.email,
          status: u.status,
          role: "Invited Attendee",
        })),
        ...(data.invited_collaborators || []).map((u) => ({
          email: u.email,
          status: u.status,
          role: "Invited Collaborator",
        })),
        ...(data.actual_attendees || []).map((u) => ({
          email: u.email,
          status: "Going",
          role: "Actual Attendee",
        })),
        ...(data.actual_collaborators || []).map((u) => ({
          email: u.email,
          status: "Going",
          role: "Actual Collaborator",
        })),
      ];

      if (mergedUsers.length > 0) {
        setInvitations(mergedUsers);
        setMessage("");
      } else {
        setInvitations([]);
        setMessage("No invited users found for this event");
      }
    } catch (error) {
      console.error("Error fetching invited users:", error);
      setInvitations([]);
      setMessage("Failed to fetch invited users");
    }
  };

  return (
    <div className="container">
      <h2>Invited Users</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter event title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          style={{
            padding: "8px",
            marginRight: "10px",
            width: "250px",
          }}
        />

        <button
          onClick={fetchInvitedUsers}
          style={{
            padding: "8px 15px",
            cursor: "pointer",
            borderRadius: "5px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
          }}
        >
          Search
        </button>
      </div>

      {message && <p>{message}</p>}

      {invitations.length > 0 && (
        <ol>
          {invitations.map((inv, index) => (
            <li key={index}>
              <p>Email: {inv.email}</p>
              <p>Status: {inv.status}</p>
              <p>Role: {inv.role}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
