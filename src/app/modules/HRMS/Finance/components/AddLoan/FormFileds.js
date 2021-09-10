const addLoan = [
  {
    type: 'select',
    label: 'Loan Type',
    name: 'loan_type',
    twocol: true,
    options: [
      { value: 'General Loan', label: 'General Loan' },
      { value: 'Student Loan', label: 'Student Loan' },
    ],
  },
  {
    type: 'select',
    label: 'Loan Ammount',
    name: 'loan_ammount_type',
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
    label: 'Loan Start Date',
    name: 'loan_start_date',
    twocol: true,
  },
  {
    type: 'select',
    label: 'Monthly Deduction from Salary',
    name: 'monthly_deduction',
    twocol: true,
    options: [{ value: 'RM', label: 'RM' }],
  },
  {
    type: 'input',
    label: '',
    name: 'deduct_ammount',
    twocol: true,
  },
];
export { addLoan };
