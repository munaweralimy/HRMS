import { useSelector } from 'react-redux';
const departmentFields = () => {
  const employeeList = useSelector((state) => state.setup.employeeList);
  console.log({ employeeList });
  return [
    {
      name: 'department_name',
      label: 'Department Name',
      req: true,
      placeholder: 'Type department name',
      type: 'input',
      twocol: false,
      reqmessage: 'department name required',
    },
    {
      name: 'employee_name',
      label: 'Employee Name',
      req: true,
      placeholder: 'Select employee name',
      type: 'select',
      twocol: false,
      reqmessage: 'employee name required',
      options: employeeList.map((value) => ({
        label: value.employee_name,
        value: value.employee_name,
        id: value.name,
      })),
    },
    // {
    //   name: 'company',
    //   label: 'Company',
    //   req: true,
    //   placeholder: 'Select company',
    //   type: 'select',
    //   twocol: false,
    //   reqmessage: 'company required',
    //   options: [
    //     { label: 'Limkokwing University Creative Technology', value: 'Limkokwing University Creative Technology' },
    //   ],
    // },
  ];
};
export { departmentFields };
