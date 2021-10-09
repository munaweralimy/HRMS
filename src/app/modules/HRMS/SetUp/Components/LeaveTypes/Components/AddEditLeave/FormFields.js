import { useSelector, useDispatch } from 'react-redux';
import { leaveTypeSelect } from '../../../../ducks/actions';
const leaveFields = () => {
  const dispatch = useDispatch();
  const disabled = useSelector((state) => state.setup.selectedLeave);
  const leaveList = useSelector((state) => state.setup.leaveList);
  //   const onSelectChange = (e) => {
  // a    if (e.value === 'Individual') {
  //       dispatch(leaveTypeSelect(true));
  //     }
  //   };

  return [
    {
      name: 'leave_type',
      label: 'Leave Type Name',
      req: true,
      placeholder: 'Type leave name',
      type: 'select',
      twocol: false,
      reqmessage: 'Please enter name',
      options: leaveList.map((value) => ({ label: value.leave_type, value: value.leave_type })),
    },
    {
      title: 'Avaliabale for the following',
      name: 'contract_type',
      label: 'Contract Type',
      req: true,
      placeholder: 'Select contract type',
      type: 'select',
      twocol: false,
      reqmessage: 'Please select type',
      options: [{ value: 'All', label: 'All' }],
    },
    {
      name: 'gender',
      label: 'Gender',
      req: true,
      placeholder: 'Select',
      type: 'select',
      twocol: false,
      colWidth: '0 1 230px',
      reqmessage: 'Gender required',
      options: [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'All', value: 'All' },
      ],
    },
    {
      name: 'marital_status',
      label: 'Marital Status',
      req: true,
      placeholder: 'Select',
      type: 'select',
      colWidth: '0 1 230px',
      twocol: false,
      reqmessage: 'Marital Status required',
      options: [
        { label: 'Married', value: 'Married' },
        { label: 'Unmarried', value: 'Unmarried' },
        { label: 'All', value: 'All' },
      ],
    },
    {
      type: 'array',
      name: 'approvers',
      title: 'Approver',
      twocol: false,
      child: [
        {
          type: 'select',
          subheader: 'Approver',
          name: 'approver_level',
          req: false,
          placeholder: 'Please Select',
          twocol: false,
          options: [
            { label: 'Individual', value: 'Individual' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Team Lead', value: 'Team Lead' },
            { label: 'Supervisor', value: 'Supervisor' },
          ],
        },
      ],
    },
  ];
};
export { leaveFields };
