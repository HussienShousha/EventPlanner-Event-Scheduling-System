import React, { useEffect, useState } from "react";

function GetAllUser() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/users/all")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h2>Users from Backend</h2>
      <ul>
        {users.map((user, i) => (
          <li key={i}>
            {user.full_name} - {user.email} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetAllUser;
