import { useSelector } from 'react-redux';
const rolesFields = () => {
  const leaveList = useSelector((state) => state.setup.leaveList);
  return [
    {
      label: '',
      name: 'name',
      type: 'input',
      twocol: false,
      req: false,
      reqmessage: '',
      hidden: true,
    },
    {
      label: 'User Role Name',
      name: 'role_name',
      type: 'input',
      twocol: false,
      placeholder: 'Type role name',
      req: true,
      reqmessage: 'Role Name required',
    },
    {
      subheading: 'User Role Access',
      name: 'all',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'All', value: 1 }],
    },
    {
      name: 'advacement',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Advancement-Company', value: 1 }],
    },
    {
      name: 'advancement_teams',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Advancement Teams', value: 1 }],
    },
    {
      name: 'reports',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Reports', value: 1 }],
    },
    {
      name: 'task_company',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Task Company', value: 1 }],
    },
    {
      name: 'task_teams',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Task Team', value: 1 }],
    },
    {
      name: 'task_individual',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Task Individual', value: 1 }],
    },
    {
      name: 'employement',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Employement', value: 1 }],
    },
    {
      name: 'finance',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Finance', value: 1 }],
    },
    {
      name: 'attendance_company',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Attendance-Company', value: 1 }],
    },
    {
      name: 'attendance_teams',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Attendance-Teams', value: 1 }],
    },
    {
      name: 'attendance_individual',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Attendance-Individual', value: 1 }],
    },
    {
      name: 'requests',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Requests', value: 1 }],
    },
    {
      name: 'request_team',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Requests Team', value: 1 }],
    },
    {
      name: 'requests_individual',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Requests Individual', value: 1 }],
    },
    {
      name: 'leaves_company',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Leaves-Company', value: 1 }],
    },
    {
      name: 'leaves_teams',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Leaves-Teams', value: 1 }],
    },
    {
      name: 'leave_individual',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Leave-Individual', value: 1 }],
    },
    {
      name: 'policy',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Policy', value: 1 }],
    },
    {
      name: 'policy_individual',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      twocol: true,
      reqmessage: '',
      options: [{ label: 'Policy Individual', value: 1 }],
    },

    {
      name: 'setup',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      colWidth: '0 1 375px',
      reqmessage: '',
      options: [{ label: 'Setup', value: 1 }],
    },
  ];
};
const totalRoles = [
  'Advancement-Company',
  'Advancement Team',
  'Reports',
  'Task Company',
  'Task Team',
  'Task Individual',
  'Employment',
  'Finance',
  'Attendance-Company',
  'Attendance-Individual',
  'Requests',
  'Requests Team',
  'Requests Individual',
  'Leaves-Company',
  'Leaves-Team',
  'Leaves-Individual',
  'Policy',
  'Policy Individual',
  'Setup',
];
export { rolesFields, totalRoles };
