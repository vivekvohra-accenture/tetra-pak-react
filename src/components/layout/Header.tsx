import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import { format } from 'date-fns';
import { FaBell, FaCaretDown } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  // 1. Local State for Clock and Dropdown
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // 2. Global State & Hooks
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 3. Live Clock Effect
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  // 4. Action Handlers
  const handleLogout = () => {
    dispatch(logout()); // Clears Redux AND localStorage based on your slice!
    navigate('/login');
  };

  const handlePreferences = () => {
    setIsDropdownOpen(false); // Close menu after clicking
    navigate('/home/preference');
  };

  // Format dates using date-fns
  const formattedDate = format(currentTime, "EEEE dd MMMM yyyy");
  const formattedTime = format(currentTime, "hh:mm:ss a");

  // Helper to grab initials (e.g., "TpAdmin User" -> "TU", or just "TP")
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    const splitName = name.split(' ');
    if (splitName.length > 1) {
      return (splitName[0][0] + splitName[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="app-header">
      {/* Left Side: Logo */}
      <div className="header-left">
        <h1 className="header-logo">Tetra Pak<sup className="header-sup">®</sup></h1>
      </div>

      {/* Right Side: Tools & Profile */}
      <div className="header-right">
        
        {/* Date & Time */}
        <div className="header-datetime">
          <span className="header-date">{formattedDate}</span>
          <span className="header-time">{formattedTime}</span>
        </div>

        <div className="header-divider"></div>

        {/* Notifications */}
        <div className="header-notifications">
          <FaBell className="icon-bell" />
          <span className="notification-dot"></span>
        </div>

        {/* User Profile Trigger */}
        <div 
          className="header-user-section" 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="logged-in-text">Logged in as:</span>
          {/* Fallback to 'Guest' if Redux state is missing */}
          <span className="user-name">{currentUser?.firstName || 'Guest'}</span>
          
          <div className="avatar-circle">
            {getInitials(currentUser?.firstName)}
          </div>
          
          <FaCaretDown className="icon-caret" />

          {/* Floating Dropdown Menu */}
          {isDropdownOpen && (
            <div className="user-dropdown">
              <button onClick={handlePreferences} className="dropdown-item">Preferences</button>
              <button onClick={handleLogout} className="dropdown-item">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;