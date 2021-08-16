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
    component: 'Policy',
    path: '/policy',
    title: titles.HRMS,
    permission: hrms,
    key: 'policy',
    menu: 'Policy',
    icon: 'ApplicationsIcon',
    parent: true,
  },
  
];
