import React, { useState } from "react";

function Register() {
  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = { email, password, full_name };

    try {
      const response = await fetch("api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      console.log("Response from backend:", data);

      if (data.error || !response.ok) {
        alert("Register failed: " + data.error);
        return;
      }

      localStorage.setItem("email", email);
      localStorage.setItem("token", data.access_token);

      alert("Register successful!");

      window.location.href = "/login";
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong while Registering!");
    }
  };

  return (
    <div className="container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full name"
          value={full_name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p className="links">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Register;
