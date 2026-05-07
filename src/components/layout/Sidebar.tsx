import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { useTranslation } from 'react-i18next';

// 1. IMPORT the data instead of writing it here!
import { menuItems } from '../../config/menuConfig';

import './Sidebar.css';

const Sidebar = () => {
  const { t } = useTranslation();

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
              <span className="nav-label">{t(item.label)}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;