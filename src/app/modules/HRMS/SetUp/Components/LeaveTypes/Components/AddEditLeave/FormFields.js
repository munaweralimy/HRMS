import { useSelector, useDispatch } from 'react-redux';
import { leaveTypeSelect } from '../../../../ducks/actions';
import { ctypeListLeave } from '../../../../../../../../configs/constantData';
const leaveFields = () => {
  const dispatch = useDispatch();
  const disabled = useSelector((state) => state.setup.selectedLeave);
  const leaveList = useSelector((state) => state.setup.leaveList);
  const onSelectChange = (e) => {
    if (e.value === 'Manager') {
      let disableManager = { ...disabled, manager: true };
      dispatch(leaveTypeSelect(disableManager));
    } else if (e.value === 'Supervisor') {
      let disableManager = { ...disabled, supervisor: true };
      dispatch(leaveTypeSelect(disableManager));
    } else if (e.value === 'Team Lead') {
      let disableManager = { ...disabled, teamLead: true };
      dispatch(leaveTypeSelect(disableManager));
    }
  };

  return [
    {
      name: 'leave_type',
      label: 'Leave Type Name',
      req: true,
      placeholder: 'Type leave name',
      type: 'input',
      twocol: false,
      reqmessage: 'Please enter name',
      // options: leaveList.map((value) => ({ label: value.leave_type, value: value.leave_type })),
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
      options: ctypeListLeave,
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
        { label: 'Divorced', value: 'Divorced' },
        { label: 'Married', value: 'Married' },
        { label: 'Single', value: 'Single' },
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
          onChange: onSelectChange,
          subheader: 'Approver',
          name: 'approver_level',
          req: false,
          placeholder: 'Please Select',
          twocol: false,
          options: [
            { label: 'Individual', value: 'Individual' },
            { label: 'Manager', value: 'Manager', isDisabled: disabled.manager },
            { label: 'Team Lead', value: 'Team Lead', isDisabled: disabled.teamLead },
            { label: 'Supervisor', value: 'Supervisor', isDisabled: disabled.supervisor },
          ],
        },
      ],
    },
  ];
};
export { leaveFields };
