const addAllowences = [
  {
    type: 'select',
    label: 'Allowence Type',
    name: 'allowance_type',
    twocol: true,
    options: [
      { label: 'Travel Allowance', value: 'Travel Allowance' },
      { label: 'Medical Allowance', value: 'Medical Allowance' },
    ],
  },
  {
    type: 'select',
    label: 'Allowece Ammount',
    name: 'allowence_ammount_type',
    twocol: true,
    options: [{ value: 'RM', label: 'RM' }],
  },
  {
    type: 'input',
    label: '',
    name: 'amount',
    twocol: true,
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
