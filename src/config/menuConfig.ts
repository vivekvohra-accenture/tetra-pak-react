//this is centralzied place to define the menu structure and access control for the sidebar
import { 
  FaHome, FaListUl, FaClipboardCheck, FaChartLine, 
  FaSync, FaSlidersH, FaCog, FaBook 
} from 'react-icons/fa';

export interface SubMenuItem {
  label: string;
  path: string;
  allowedRoles: string[];
}

export interface MenuItem {
  label: string;
  path: string;
  icon: React.ElementType;
  allowedRoles: string[];
  subItems?: SubMenuItem[];//We add subitems for the second level menu
}

export const menuItems: MenuItem[] = [
  { label: 'Home', path: '/home', icon: FaHome, allowedRoles: ['ADMIN', 'USER'] },
  { 
    label: 'Plan', 
    path: '/home/plan', 
    icon: FaListUl, 
    allowedRoles: ['ADMIN'],
    //these are the sub-menu items for the "Plan" menu
    subItems: [
      { label: 'Sampling plan set export', path: '/home/plan/export', allowedRoles: ['ADMIN'] },
      { label: 'Sampling-test association', path: '/home/plan/association', allowedRoles: ['ADMIN'] }
    ]
  },
  { 
    label: 'Execute', 
    path: '/home/execute', 
    icon: FaClipboardCheck, 
    allowedRoles: ['ADMIN', 'USER'],
    //these are the sub-menu items for the "Execute" menu
    subItems: [
      { label: 'Manual sampling', path: '/home/execute/manual-sampling', allowedRoles: ['ADMIN', 'USER'] },
      { label: 'Product registration', path: '/home/execute/product-registration', allowedRoles: ['ADMIN', 'USER'] },
      { label: 'Quality checks', path: '/home/execute/quality-checks', allowedRoles: ['ADMIN', 'USER'] },
      { label: 'Quality batch approval', path: '/home/execute/batch-approval', allowedRoles: ['ADMIN'] },
      { label: 'Big Unsterility Cases', path: '/home/execute/unsterility-cases', allowedRoles: ['ADMIN', 'USER'] },
      { label: 'Claims register', path: '/home/execute/claims', allowedRoles: ['ADMIN'] },
      { label: 'Data enhancement', path: '/home/execute/data-enhancement', allowedRoles: ['ADMIN'] },
      { label: 'Warehouse inspections', path: '/home/execute/warehouse', allowedRoles: ['ADMIN', 'USER'] }
    ]
  },
  { 
    label: 'Monitor', 
    path: '/home/monitor', 
    icon: FaChartLine, 
    allowedRoles: ['ADMIN', 'USER'],
    subItems: [
      { label: 'Realtime Dashboard', path: '/home/monitor/dashboard', allowedRoles: ['ADMIN', 'USER'] }
    ]
  },
  { label: 'Analyse',
    path: '/home/analyse', 
    icon: FaSync, 
    allowedRoles: ['ADMIN'], // Kept as Admin-only based on your previous config
    subItems: [
      { label: 'Mechanical KPI', path: '/home/analyse/mechanical-kpi', allowedRoles: ['ADMIN'] },
      { label: 'Mechanical Report', path: '/home/analyse/mechanical-report', allowedRoles: ['ADMIN'] },
      { label: 'Quality KPI', path: '/home/analyse/quality-kpi', allowedRoles: ['ADMIN'] },
      { label: 'Quality Report', path: '/home/analyse/quality-report', allowedRoles: ['ADMIN'] },
      { label: 'Process data analysis', path: '/home/analyse/process-data', allowedRoles: ['ADMIN'] },
      { label: 'Timeline graph', path: '/home/analyse/timeline-graph', allowedRoles: ['ADMIN'] }
    ]
  },
  { 
    label: 'Configure', 
    path: '/home/configure', 
    icon: FaSlidersH, 
    allowedRoles: ['ADMIN'],
    subItems: [
      { label: 'Material model', path: '/home/configure/material-model', allowedRoles: ['ADMIN'] },
      { label: 'Line sampling plans', path: '/home/configure/line-sampling-plans', allowedRoles: ['ADMIN'] },
      { label: 'Line testing plans', path: '/home/configure/line-testing-plans', allowedRoles: ['ADMIN'] },
      { label: 'Acceptable ranges', path: '/home/configure/acceptable-ranges', allowedRoles: ['ADMIN'] }
    ]
  },
  { 
    label: 'Set-up', 
    path: '/home/set-up', 
    icon: FaCog, 
    allowedRoles: ['ADMIN'],
    subItems: [
      { label: 'Manual reason group', path: '/home/set-up/reasons', allowedRoles: ['ADMIN'] },
      { label: 'Test areas', path: '/home/set-up/test-areas', allowedRoles: ['ADMIN'] },
      { label: 'User administration', path: '/home/set-up/users', allowedRoles: ['ADMIN'] },
      { label: 'Georegistry', path: '/home/set-up/georegistry', allowedRoles: ['ADMIN'] },
      { label: 'Parameters settings', path: '/home/set-up/parameters', allowedRoles: ['ADMIN'] }
    ]
  },
  { label: 'Manual', path: '/home/manual', icon: FaBook, allowedRoles: ['ADMIN', 'USER'] },
];