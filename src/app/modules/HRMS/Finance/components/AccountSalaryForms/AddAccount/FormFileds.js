const addAccount = [
  {
    type: 'input',
    label: 'Account No.',
    name: 'account_no',
    twocol: true,
  },
  {
    type: 'select',
    label: 'Account Type',
    name: 'account_type',
    twocol: true,
    options: [
      { value: 'EPF', label: 'EPF' },
      { value: 'SOCSO', label: 'SOCSO' },
      { value: 'Income Tax', label: 'Income Tax' },
      { value: 'Maybank', label: 'Maybank' },
    ],
  },
  {
    type: 'input',
    label: 'Branch',
    name: 'branch',
    twocol: false,
  },
];
export { addAccount };
