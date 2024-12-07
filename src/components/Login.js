import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Login.css';

function Login() {
  const [isSignUp, setIsSignUp] = useState(false); // Default to Sign Up form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigation

  // Handle form submission for login or signup
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare the data object for sign-up or login
    const userData = { email, password };
  
    if (isSignUp) {
      userData.name = fullName; // Add name for signup
      userData.confirmPassword = confirmPassword; // Add confirmPassword for signup
    }
  
    try {
      const url = isSignUp
        ? 'http://localhost:5000/api/users/signup'
        : 'http://localhost:5000/api/users/login'; // Login URL
  
      // Send the POST request
      const response = await axios.post(url, userData);
      
      setMessage(response.data.message); // Success message
      
      if (!isSignUp) {
        // Save the token to localStorage on successful login
        localStorage.setItem('token', response.data.token);
        
        // Redirect to Avatar.js after successful login
        navigate('/avatar'); // Update this path based on your route configuration
      }
      
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setMessage('');
    }
  };

  // Toggle between Sign Up and Login form
  const toggleForm = () => {
    setIsSignUp(!isSignUp); // Toggle the form state
    setError('');
    setMessage('');
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input-field"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
            />
          )}
          <button type="submit" className="btn-submit">
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>

        {/* Show error or success message */}
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <p className="toggle-text">
          {isSignUp
            ? 'Already have an account? '
            : "Don't have an account? "}
          <span onClick={toggleForm} className="toggle-link">
            {isSignUp ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
