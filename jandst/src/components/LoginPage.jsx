import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import './LoginPage.css';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!");
      window.location.href = "/dashboard";
      alert("Logged in successfully! Redirecting to Dashboard...");
    } catch (error) {
      console.error('Error logging in: ', error.message);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="form-container">
        {/* Logo */}
        <img src="public/planitlogo.png" alt="Logo" className="logo" />

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

        <div>
          <p>Don't have an account? <a href="/signup">Sign up here</a></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;