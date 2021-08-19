import Finance from '../../app/modules/HRMS/Finance';
import Roles from './Roles';

const marketing = [Roles.ADMIN, Roles.MARKETING];
const aqa = [Roles.ADMIN, Roles.AQA];
const registry = [Roles.ADMIN, Roles.REGISTRY];
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
    icon: 'ApplicationsIcon',
    parent: true,
  },
  {
    component: 'TaskDetail',
    path: '/tasks/:id',
    title: titles.HRMS,
    permission: hrms,
    menu: 'Tasks',
    key: 'tasks',
    icon: 'ApplicationsIcon',
    parent: false,
  },
  {
    component: 'Advancement',
    path: '/advancement',
    title: titles.HRMS,
    permission: hrms,
    key: 'advancement',
    menu: 'Advancement',
    icon: 'ApplicationsIcon',
    parent: true,
  },
  {
    component: 'Employment',
    path: '/employment',
    title: titles.HRMS,
    permission: hrms,
    key: 'employment',
    menu: 'Employment',
    icon: 'ApplicationsIcon',
    parent: true,
  },
  {
    component: 'AddEmployment',
    path: '/employment/addnew',
    title: titles.HRMS,
    permission: hrms,
    key: 'employment',
    menu: 'Employment',
    icon: 'ApplicationsIcon',
    parent: false,
  },
  {
    component: 'EditEmployment',
    path: '/employment/:id',
    title: titles.HRMS,
    permission: hrms,
    key: 'employment',
    menu: 'Employment',
    icon: 'ApplicationsIcon',
    parent: false,
  },
  {
    component: 'TeamDetails',
    path: '/employment/teamdetails',
    title: titles.HRMS,
    permission: hrms,
    key: 'employment',
    menu: 'Employment',
    icon: 'ApplicationsIcon',
    parent: false,
  },
  {
    component: 'Finance',
    path: '/finance',
    title: titles.HRMS,
    permission: hrms,
    key: 'Finance',
    menu: 'Finance',
    icon: 'ApplicationsIcon',
    parent: true,
  },
  {
    component: 'EditFinance',
    path: '/finance/:id',
    title: titles.HRMS,
    permission: hrms,
    key: 'finance',
    menu: 'Finance',
    icon: 'ApplicationIcon',
    parent: false,
  },
  {
    component: 'Attendance',
    path: '/attendance',
    title: titles.HRMS,
    permission: hrms,
    key: 'attendance',
    menu: 'Attendance',
    icon: 'ApplicationsIcon',
    parent: true,
  },
  {
    component: 'TaskDetail',
    path: '/attendance/:id',
    title: titles.HRMS,
    permission: hrms,
    menu: 'Attendance',
    key: 'attendance',
    icon: 'ApplicationsIcon',
    parent: false,
  },
  {
    component: 'Policy',
    path: '/policy',
    title: titles.HRMS,
    permission: hrms,
    key: 'policy',
    menu: 'Policy',
    icon: 'ApplicationsIcon',
    parent: true,
  },
  {
    component: 'SetUp',
    path: '/setup',
    title: titles.HRMS,
    permission: hrms,
    key: 'setup',
    menu: 'Setup',
    icon: 'ApplicationsIcon',
    parent: true,
  },
];
