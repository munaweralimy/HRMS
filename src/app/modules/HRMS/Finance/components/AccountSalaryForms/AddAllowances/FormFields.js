const addAllowences = [
  {
    type: 'select',
    label: 'Allowence Type',
    name: 'allowance_type',
    twocol: true,
    options: [
      { label: 'Children Education Allowance', value: 'Children Education Allowance' },
      { label: 'Hostel Allowance', value: 'Hostel Allowance' },
      { label: 'Transport Allowance', value: 'Transport Allowance' },
      { label: 'Outstation Allowance', value: 'Outstation Allowance' },
      { label: 'Daily Allowance', value: 'Daily Allowance' },
      { label: 'Uniform Allowance', value: 'Uniform Allowance' },
      { label: 'Academic/ Research Allowance', value: 'Academic/ Research Allowance' },
    ],
  },
  {
    type: 'select',
    label: 'Allowece Ammount',
    name: 'allowence_ammount_type',
    twocol: false,
    colWidth: '0 1 133px',
    options: [{ value: 'RM', label: 'RM' }],
  },
  {
    type: 'input',
    label: '',
    name: 'amount',
    twocol: false,
    colWidth: '1 0 180px',
  },
  {
    type: 'date',
    label: 'Date Given',
    name: 'date_given',
    twocol: true,
  },
  {
    type: 'upload',
    label: 'Upload Document',
    name: 'document',
    placeholder: 'Upload',
    twocol: true,
  },
  {
    type: 'input',
    label: 'Description',
    name: 'description',
    twocol: true,
  },
];

export { addAllowences };
