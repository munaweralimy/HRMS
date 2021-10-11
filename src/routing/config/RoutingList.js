import Finance from '../../app/modules/HRMS/Finance';
import Roles from './Roles';

const hrms = [Roles.ADMIN, Roles.HRMS];

const titles = {
  DASHBOARD: 'Dashboard',
  MARKETING: 'Marketing',
  REGISTRY: 'Registry',
  AQA: 'QualityAssurance',
  HRMS: 'HumanResource',
};

export default [
  {
    component: 'NotFound',
    path: '/404',
    title: titles.DASHBOARD,
    menu: '404',
    parent: false,
  },
  {
    component: 'Application',
    path: '/dashboard',
    title: titles.DASHBOARD,
    menu: 'Dashbaord',
    icon: 'DashboardIcon2',
    parent: true,
  },
  {
    component: 'Tasks',
    path: '/tasks',
    title: titles.HRMS,
    permission: hrms,
    menu: 'Tasks',
    key: 'tasks',
    icon: 'TaskIcon',
    parent: true,
  },
  {
    component: 'TaskDetail',
    path: '/tasks/:id',
    title: titles.HRMS,
    permission: hrms,
    menu: 'Tasks',
    key: 'tasks',
    parent: false,
  },
  {
    component: 'Advancement',
    path: '/advancement',
    title: titles.HRMS,
    permission: hrms,
    key: 'advancement',
    menu: 'Advancement',
    icon: 'AdvancementIcon',
    parent: true,
  },
  {
    component: 'AdvancementDetails',
    path: '/advancement/:id',
    title: titles.HRMS,
    permission: hrms,
    key: 'advancement',
    menu: 'Advancement',
    parent: false,
  },
  {
    component: 'Employment',
    path: '/employment',
    title: titles.HRMS,
    permission: hrms,
    key: 'employment',
    menu: 'Employment',
    icon: 'StaffIcon',
    parent: true,
  },
  {
    component: 'AddEmployment',
    path: '/employment/add',
    title: titles.HRMS,
    permission: hrms,
    key: 'employment',
    menu: 'Employment',
    parent: false,
  },
  {
    component: 'EmploymentDetails',
    path: '/employment/:id',
    title: titles.HRMS,
    permission: hrms,
    key: 'employment',
    menu: 'Employment',
    parent: false,
  },
  {
    component: 'TeamDetails',
    path: '/employment/team/:id',
    title: titles.HRMS,
    permission: hrms,
    key: 'employment',
    menu: 'Employment',
    parent: false,
  },
  {
    component: 'Finance',
    path: '/finance',
    title: titles.HRMS,
    permission: hrms,
    key: 'Finance',
    menu: 'Finance',
    icon: 'FacultyIcon',
    parent: true,
  },
  {
    component: 'FinanceDetails',
    path: '/finance/:id',
    title: titles.HRMS,
    permission: hrms,
    key: 'finance',
    menu: 'Finance',
    parent: false,
  },
  {
    component: 'Leaves',
    path: '/leaves',
    title: titles.HRMS,
    permission: hrms,
    key: 'leaves',
    menu: 'Leaves',
    icon: 'CalendarIcon',
    parent: true,
  },
  {
    component: 'LeavesDetail',
    path: '/leaves/:id',
    title: titles.HRMS,
    permission: hrms,
    menu: 'Leaves',
    key: 'leaves',
    parent: false,
  },
  {
    component: 'Attendance',
    path: '/attendance',
    title: titles.HRMS,
    permission: hrms,
    key: 'attendance',
    menu: 'Attendance',
    icon: 'ClockIcon',
    parent: true,
  },
  {
    component: 'EmpAttendanceDetail',
    path: '/attendance/:id',
    title: titles.HRMS,
    permission: hrms,
    menu: 'Attendance',
    key: 'attendance',
    parent: false,
  },
  {
    component: 'Policy',
    path: '/policy',
    title: titles.HRMS,
    permission: hrms,
    key: 'policy',
    menu: 'Policy',
    icon: 'PolicyIcon',
    parent: true,
  },
  {
    component: 'Reports',
    path: '/reports',
    title: titles.HRMS,
    permission: hrms,
    key: 'reports',
    menu: 'Reports',
    icon: 'ReportsIcon',
    parent: true,
  },
  {
    component: 'AddReports',
    path: '/reports/addnew',
    title: titles.HRMS,
    permission: hrms,
    key: 'reports',
    menu: 'Reports',
    parent: false,
  },
  {
    component: 'Requests',
    path: '/requests',
    title: titles.HRMS,
    permission: hrms,
    key: 'requests',
    menu: 'Requests',
    icon: 'RequestIcon',
    parent: true,
  },
  {
    component: 'AddRequest',
    path: '/requests/addnew',
    title: titles.HRMS,
    permission: hrms,
    key: 'requests',
    menu: 'Requests',
    parent: false,
  },
  {
    component: 'RequestDetails',
    path: '/requests/:id',
    title: titles.HRMS,
    permission: hrms,
    key: 'requests',
    menu: 'Requests',
    parent: false,
  },
  
  {
    component: 'SetUp',
    path: '/setup',
    title: titles.HRMS,
    permission: hrms,
    key: 'setup',
    menu: 'Setup',
    icon: 'SetupIcon',
    parent: true,
  },
  {
    component: 'Profile',
    path: '/myprofile',
    title: titles.HRMS,
    permission: hrms,
    key: 'myprofile',
    menu: 'My Profile',
    icon: 'SetupIcon',
    parent: true,
  },
];
