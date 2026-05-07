import { NavLink, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { useTranslation } from 'react-i18next';
import { menuItems } from '../../config/menuConfig';
import './SecondarySidebar.css';

const SecondarySidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const userRole = currentUser?.role || 'USER';

  // 1. Find which Primary section we are currently in (e.g., "/execute")
  // Using exact match so the secondary sidebar hides itself when a sub-item page loads
  const activeSection = menuItems.find(item => 
    item.path !== '/home' && location.pathname.replace(/\/$/, '') === item.path
  );

  // 2. If the active section doesn't have sub-items (like "Home"), render nothing!
  if (!activeSection || !activeSection.subItems || activeSection.subItems.length === 0) {
    return null;
  }

  // 3. Filter the sub-items based on RBAC security
  const authorizedSubMenu = activeSection.subItems.filter(subItem => 
    subItem.allowedRoles.includes(userRole)
  );

  return (
    <aside className="secondary-sidebar">
      <div className="secondary-sidebar-header">
        <h2>{t(activeSection.label)}</h2>
      </div>
      <nav className="secondary-nav">
        {authorizedSubMenu.map((subItem) => (
          <NavLink
            key={subItem.label}
            to={subItem.path}
            className={({ isActive }) => isActive ? "sub-nav-item active" : "sub-nav-item"}
          >
            {t(subItem.label)}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SecondarySidebar;