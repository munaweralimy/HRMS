const salaryInformation = [
  {
    type: 'select',
    name: 'currency_typeSalary',
    label: ' Ammount',
    placeholder: '',
    twocol: true,
    options: [{ value: 'RM', label: 'RM' }],
  },
  {
    type: 'input',
    name: 'salary_amount',
    label: '',
    placeholder: '',
    twocol: true,
  },
  {
    type: 'select',
    name: 'payment_method',
    label: 'Payment Method',
    placeholder: '',
    twocol: true,
    options: [{ value: 'Automatic Payment System (APS)', label: 'Automatic Payment System (APS)' }],
  },
  {
    type: 'select',
    name: 'payment_frequency',
    label: 'Payment Frequency',
    placeholder: '',
    twocol: true,
    options: [
      { value: 'Monthly', label: 'Monthly' },
      { value: 'Yearly', label: 'Yearly' },
    ],
  },
  {
    type: 'select',
    name: 'payment_type',
    label: 'Payment Type',
    placeholder: '',
    twocol: true,
    options: [
      { value: 'Recurring', label: 'Recurring' },
      { value: 'Once', label: 'Once' },
    ],
  },
  {
    type: 'date',
    name: 'effective_date',
    label: 'Effective Date',
    placeholder: 'Please Select',
    twocol: true,
  },
  {
    type: 'select',
    name: 'tax_currency_type',
    label: 'Tax Ammount',
    placeholder: '',
    twocol: true,
    options: [{ value: 'RM', label: 'RM' }],
  },
  {
    type: 'input',
    name: 'tax_amount',
    label: '',
    placeholder: '',
    twocol: true,
  },
];

export { salaryInformation };
