import { React, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { setDoc, doc } from 'firebase/firestore';
import './SignUpPage.css';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fName || !lName) {
      alert('Please provide both first and last name.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'Users', user.uid), {
        email: user.email,
        firstName: fName,
        lastName: lName,
      });

      alert('Registered successfully! Redirecting to Dashboard...');
      navigate('/dashboard');
    } catch (error) {
      console.error("Error signing up: ", error);
      alert("Failed to create account. Please try again.");
    }
  };

  return (
    
    <div className="signup-page">
      <div className="signup-container">
        {/* Logo */}
        <img src="public/planitlogo.png" alt="Logo" className="logo" />
        
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
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
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;