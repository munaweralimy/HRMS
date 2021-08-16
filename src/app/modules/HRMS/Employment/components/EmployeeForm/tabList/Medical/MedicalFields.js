const insuranceDetails = [
  {
    type: 'select',
    label: 'Insurance Type',
    name: 'insurance_type',
    twocol: true,
    options: [{}],
  },
  {
    type: 'input',
    label: 'Insurance No.',
    name: 'insurance_no',
    twocol: true,
  },
  {
    type: 'date',
    label: 'Expiration Date',
    name: 'expiration_date',
    twocol: true,
  },
  {
    type: 'upload',
    label: 'Upload Document',
    name: 'upload_document',
    twocol: true,
  },
  {
    type: 'textarea',
    label: 'Description',
    name: 'description',
    twocol: false,
  },
];

const medicalRecord = [
  {
    type: 'input',
    label: 'Blood Type',
    name: 'blood_type',
    twocol: true,
  },
  {
    type: 'input',
    label: 'Height(cm)',
    name: 'height',
    twocol: true,
  },
  {
    type: 'input',
    label: 'Weight(kg)',
    name: 'weight',
    twocol: true,
  },
  {
    type: 'textarea',
    label: 'Additional Notes',
    name: 'additional_notes',
    twocol: false,
  },
];

export { insuranceDetails, medicalRecord };
