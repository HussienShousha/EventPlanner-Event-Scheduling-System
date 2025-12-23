import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userCredentials = { email, password };

    try {
      const response = await fetch("api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userCredentials),
      });

      const data = await response.json();
      console.log("Response from backend:", data);

      if (data.error || !response.ok) {
        alert("Login failed: " + data.error);
        return;
      }

      localStorage.setItem("email", email);
      localStorage.setItem("token", data.access_token);

      alert("Login successful!");

      window.location.href = "/events";
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong while logging in!");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p className="links">
        Don't have an account? <a href="/">Register</a>
      </p>
    </div>
  );
}

export default Login;
