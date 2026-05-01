import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { loginSuccess } from '../features/auth/authSlice'; 
import { useLazyGetUserByEmailQuery } from '../features/api/apiSlice';
import { generateMockToken } from '../utils/mockJwt';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [triggerGetUser] = useLazyGetUserByEmailQuery();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const users = await triggerGetUser(email).unwrap();
      if (users && users.length > 0) {
        const user = users[0];
        if (user.password === password) {
          const sessionUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobile: user.mobile,
            role: user.role
          };
          const token = generateMockToken(sessionUser);
          dispatch(loginSuccess({ user: sessionUser, token }));
          navigate('/home');
        } else {
          alert('Incorrect password');
        }
      } else {
        alert('User not found');
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed');
    }
  };

  const handleDemoLogin = async (role: 'ADMIN' | 'USER') => {
    const demoEmail = role === 'ADMIN' ? 'admin@test.com' : 'vivek@test.com';
    const demoPassword = role === 'ADMIN' ? 'admin123' : 'user123';
    
    try {
      const users = await triggerGetUser(demoEmail).unwrap();
      if (users && users.length > 0) {
        const user = users[0];
        if (user.password === demoPassword) {
          const sessionUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobile: user.mobile,
            role: user.role
          };
          const token = generateMockToken(sessionUser);
          dispatch(loginSuccess({ user: sessionUser, token }));
          navigate('/home');
        }
      }
    } catch (err) {
      console.error('Demo login failed', err);
    }
  };

  return (
    <div className="page-container">
      {/* Left Side: Background Image Area */}
      <div className="image-section">
        {/* We apply scaleX(-1) again to the overlay so the text doesn't appear backwards! */}
        <div className="image-overlay">
          <h1 className="overlay-title">Digital Manufacturing Platform</h1>
          <p className="overlay-subtitle">Streamlining quality checks and factory floor operations.</p>
        </div>
      </div>

      {/* Right Side: Login Form Area */}
      <div className="form-section">
        <div className="form-container">
          
          <div className="header">
            <h2 className="logo">Tetra Pak<sup className="sup">®</sup></h2>
            <p className="welcome-text">Welcome back. Please sign in to your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label className="input-label">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-input" 
                placeholder="Enter your email"
                required 
              />
            </div>
            <div className="input-group">
              <label className="input-label">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-input" 
                placeholder="••••••••"
                required 
              />
            </div>
            <button type="submit" className="primary-button">Sign In</button>
          </form>

          <div className="demo-section">
            <div className="divider">
              <span className="divider-text">Reviewer Demo Mode</span>
            </div>
            <div className="demo-buttons">
              <button 
                onClick={() => handleDemoLogin('ADMIN')} 
                type="button"
                className="demo-button btn-admin"
              >
                Login as TpAdmin (Admin)
              </button>
              <button 
                onClick={() => handleDemoLogin('USER')} 
                type="button"
                className="demo-button btn-operator"
              >
                Login as TpUser (Operator)
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;