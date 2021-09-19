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
      { value: 'List of Banks in Malaysia', label: 'List of Banks in Malaysia' },
      { value: 'CIMB Bank', label: 'CIMB Bank' },
      { value: 'Public Bank Berhad', label: 'Public Bank Berhad' },
      { value: 'RHB Bank', label: 'RHB Bank' },
      { value: 'Hong Leong Bank', label: 'Hong Leong Bank' },
      { value: 'AmBank', label: 'AmBank' },
      { value: 'UOB Malaysia', label: 'UOB Malaysia' },
      { value: 'Bank Rakyat', label: 'Bank Rakyat' },
      { value: 'OCBC Bank Malaysia', label: 'OCBC Bank Malaysia' },
      { value: 'HSBC Bank Malaysia', label: 'HSBC Bank Malaysia' },
      { value: 'Bank Islam Malaysia', label: 'Bank Islam Malaysia' },
      { value: 'Affin Bank', label: 'Affin Bank' },
      { value: 'Alliance Bank Malaysia Berhad', label: 'Alliance Bank Malaysia Berhad' },
      { value: 'Standard Chartered Bank Malaysia', label: 'Standard Chartered Bank Malaysia' },
      { value: 'Maybank', label: 'Maybank' },
      { value: 'Citibank Malaysia', label: 'Citibank Malaysia' },
      { value: 'Bank Simpanan Nasional (BSN)', label: 'Bank Simpanan Nasional (BSN)' },
      { value: 'Bank Muamalat Malaysia Berhad', label: 'Bank Muamalat Malaysia Berhad' },
      { value: 'Agrobank', label: 'Agrobank' },
      { value: 'Al-Rajhi Malaysia', label: 'Al-Rajhi Malaysia' },
      { value: 'Co-op Bank Pertama', label: 'Co-op Bank Pertama' },
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
