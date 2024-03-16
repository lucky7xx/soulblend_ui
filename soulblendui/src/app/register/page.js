"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      password: password,
      role: "user",
    };

    try {
      const response = await fetch("http://192.168.29.132:8000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        router.push("/login"); // Redirect to login page after successful registration
      } else {
        const errorData = await response.json();
        if (errorData.detail === "Username or email already exists") {
          setError("Username or email already exists");
        } else {
          setError("Registration failed");
        }
        console.error("Registration error:", errorData);
      }
    } catch (error) {
      setError("An error occurred while registering");
      console.error("Registration error:", error);
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "40px",
    maxWidth: "400px",
    width: "100%",
  };

  const titleStyle = {
    color: "#333",
    fontSize: "2rem",
    marginBottom: "20px",
    textAlign: "center",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const inputStyle = {
    padding: "12px",
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "5px",
    outline: "none",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
    padding: "12px",
    transition: "background-color 0.3s ease",
    width: "100%",
  };

  const errorStyle = {
    color: "red",
    textAlign: "center",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Register</h1>
        <form style={formStyle} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Register
          </button>
          <button onClick={handleLogin} style={buttonStyle}>
            Login
          </button>
          {error && <p style={errorStyle}>{error}</p>}{" "}
          {/* Display error message if error state is not null */}
        </form>
      </div>
    </div>
  );
}
