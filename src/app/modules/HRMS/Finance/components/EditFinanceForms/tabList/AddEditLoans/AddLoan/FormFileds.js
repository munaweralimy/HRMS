const addLoan = [
  {
    type: 'select',
    label: 'Loan Type',
    name: 'loan_type',
    twocol: true,
  },
  {
    type: 'select',
    label: 'Loan Ammount',
    name: 'loan_ammount_type',
    twocol: true,
  },
  {
    type: 'input',
    label: '',
    name: 'loan_ammount',
    twocol: true,
  },
  {
    type: 'date',
    label: 'Loan Start Date',
    name: 'from_date',
    twocol: true,
  },
  {
    type: 'select',
    label: 'Monthly Deduction from Salary',
    name: 'monthly_deduction',
    twocol: true,
  },
  {
    type: 'input',
    label: '',
    name: 'deduct_ammount',
    twocol: true,
  },
  {
    type: 'input',
    label: 'Description',
    name: 'description',
    twocol: false,
  },
];
export { addLoan };
