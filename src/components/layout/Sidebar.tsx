import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { 
  FaHome, 
  FaListUl, 
  FaClipboardCheck, 
  FaChartLine, 
  FaSync, 
  FaSlidersH, 
  FaCog, 
  FaBook 
} from 'react-icons/fa';
import './Sidebar.css';

// 1. Define the TypeScript interface for our menu items
interface MenuItem {
  label: string;
  path: string;
  icon: React.ElementType;
  allowedRoles: string[]; // E.g., ['ADMIN', 'USER']
}

// 2. The Data-Driven Menu Configuration
// This acts as the "Single Source of Truth" for sidebar navigation and security
const menuItems: MenuItem[] = [
  { label: 'Home', path: '/home', icon: FaHome, allowedRoles: ['ADMIN', 'USER'] },
  { label: 'Plan', path: '/home/plan', icon: FaListUl, allowedRoles: ['ADMIN'] },
  { label: 'Execute', path: '/home/execute', icon: FaClipboardCheck, allowedRoles: ['ADMIN', 'USER'] },
  { label: 'Monitor', path: '/home/monitor', icon: FaChartLine, allowedRoles: ['ADMIN', 'USER'] },
  { label: 'Analyse', path: '/home/analyse', icon: FaSync, allowedRoles: ['ADMIN'] },
  { label: 'Configure', path: '/home/configure', icon: FaSlidersH, allowedRoles: ['ADMIN'] },
  { label: 'Set-up', path: '/home/set-up', icon: FaCog, allowedRoles: ['ADMIN'] },
  { label: 'Manual', path: '/home/manual', icon: FaBook, allowedRoles: ['ADMIN', 'USER'] },
];

const Sidebar = () => {
  // Grab the current user's role from Redux (fallback to 'USER' for safety)
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const userRole = currentUser?.role || 'USER';

  // Filter the menu items based on the user's role
  const authorizedMenu = menuItems.filter((item) => 
    item.allowedRoles.includes(userRole)
  );

  return (
    <aside className="app-sidebar">
      <nav className="sidebar-nav">
        {authorizedMenu.map((item) => {
          const IconComponent = item.icon;
          
          return (
            /* 
              NavLink automatically applies the "active" class 
              when the URL matches the 'to' prop 
            */
            <NavLink 
              key={item.label} 
              to={item.path} 
              className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
            >
              <IconComponent className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;