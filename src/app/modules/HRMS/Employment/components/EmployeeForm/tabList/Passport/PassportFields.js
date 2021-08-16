const passportInformation = [
  {
    type: 'input',
    label: 'Passport No.',
    name: 'passport_number',
    twocol: true,
  },
  {
    type: 'select',
    label: 'Passport Status',
    name: 'passport_status',
    twocol: true,
    options: [{}],
  },
  {
    type: 'date',
    label: 'Issued Daate',
    name: 'date_of_issue',
    twocol: true,
  },
  {
    type: 'date',
    label: 'Expiration Date',
    name: 'valid_upto',
    twocol: true,
  },
  {
    type: 'input',
    label: 'Employment Pass No.',
    name: 'employment_pass_no',
    twocol: true,
  },
  {
    type: 'date',
    label: 'Expiration Date',
    name: 'emp_pass_expiration_date',
    twocol: true,
  },
];

export { passportInformation };
