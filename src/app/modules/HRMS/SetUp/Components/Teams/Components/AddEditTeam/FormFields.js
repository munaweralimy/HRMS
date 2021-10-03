import { useSelector } from 'react-redux';
const addNewTeamFields = () => {
  const employeeList = useSelector((state) => state.setup.employeeList);
  return [
    {
      label: 'Team Name',
      name: 'team_name',
      type: 'input',
      twocol: false,
      placeholder: 'Type team name',
      req: true,
      reqmessage: 'Team Name required',
    },
    {
      label: 'Company',
      name: 'company',
      type: 'select',
      twocol: false,
      placeholder: 'Select company',
      req: true,
      reqmessage: 'Company required',
      options: [
        { label: 'Limkokwing University Creative Technology', value: 'Limkokwing University Creative Technology' },
      ],
    },
    {
      label: 'Assign Team Leader',
      name: 'team_leader',
      type: 'select',
      twocol: false,
      placeholder: 'Select staff',
      req: true,
      reqmessage: 'Staff required',
      options: employeeList.map((value) => ({ label: value.employee_name, value: value.name })),
    },
  ];
};
export { addNewTeamFields };
