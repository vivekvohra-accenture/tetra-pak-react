import { Outlet } from 'react-router-dom';
import Header from './Header';
import './DashboardLayout.css';
import Sidebar from './Sidebar';
const DashboardLayout = () => {
  return (
    <div className="dashboard-wrapper">
      {/* The Header is fixed at the top */}
      <Header />
      
      <div className="dashboard-body">
        <Sidebar />
        
        <main className="dashboard-content">
            {/* Outlet is the placeholder where all the child component of the path(using dashboardLayout) will be injected */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;