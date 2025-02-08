import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
  
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: uid.toUpperCase(), password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
  
      // Store UID in localStorage
      localStorage.setItem("uid", data.uid);
  
      // Navigate to Dashboard
      navigate("/Dashboard");
  
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <div>
      <nav className="navbar">
        <div>
          <img src="/Logo.png" alt="logo" />
        </div>
        <div>
          <ul className="nav-container">
            <li>About</li>
            <li>Timeline</li>
            <li>Guidelines</li>
            <li>
              <button className="Login" onClick={() => setShowModal(true)}>
                Login
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Modal Overlay */}
      {showModal && (
        <div className="overlay">
          <div className="modal">
            <div className="loginoverlay">
              <div>
                <h1>Dynamic Hackathon</h1>
                <div className="overlaylogin">
                  <h2>Sign in</h2>
                  {error && <p className="error">{error}</p>}
                  <form onSubmit={handleLogin}>
                    <input
                      type="text"
                      placeholder="UID"
                      value={uid}
                      onChange={(e) => setUid(e.target.value)}
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button type="submit" className="submit-btn">
                      Sign in
                    </button>
                    <p>
                      For New User <a href="/">Register Now</a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <button className="close-btn" onClick={() => setShowModal(false)}>
            x
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
