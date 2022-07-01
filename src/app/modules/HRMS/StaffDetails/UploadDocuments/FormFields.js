import { timelap } from '../../../../../configs/constantData';
const formFields = [
  {
    type: 'select',
    name: 'type',
    label: 'Type',
    placeholder: 'Select',
    options: [
      { label: 'Contract', value: 'Contract' },
      { label: 'Others', value: 'Others' },
    ],
    req: true,
    twocol: false,
  },
  {
    type: 'upload',
    name: 'document',
    label: 'Upload Document',
    placeholder: 'Upload',
    twocol: false,
    req: true,
    reqmessage: 'Please upload document',
  },
];

export { formFields };
