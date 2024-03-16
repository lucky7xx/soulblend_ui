"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to store the form data
    const formData = new FormData();
    formData.append("username", email); // Assuming email is used as the username
    formData.append("password", password);

    try {
      const response = await fetch("http://192.168.29.132:8000/auth/token", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        localStorage.setItem("accessToken", data.access_token);
        router.push("/carousel");
      } else {
        const errorData = await response.json();
        setError("Invalid email or password");
        console.error("Login error:", errorData);
      }
    } catch (error) {
      setError("An error occurred while logging in");
      console.error("Login error:", error);
    }
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

  const forgotPasswordStyle = {
    fontSize: "0.9rem",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Welcome Back!</h1>
        <form style={formStyle} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email "
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
            Login
          </button>
        </form>
        <p style={forgotPasswordStyle}>
          Forgot your password?{" "}
          <a href="#" style={{ color: "#007bff", textDecoration: "none" }}>
            Reset it here
          </a>
        </p>
      </div>
    </div>
  );
}
