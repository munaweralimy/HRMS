export const formFields = [
  {
    name: 'form_name',
    label: 'Type Form Name',
    req: true,
    placeholder: 'Type form name',
    type: 'input',
    twocol: false,
    reqmessage: 'Please enter name',
  },
  {
    title: 'Sender & Receiver',
    name: 'sender',
    label: 'Sender',
    req: true,
    placeholder: 'Select job position',
    type: 'select',
    twocol: false,
    reqmessage: 'Please select',
    options: [{ value: 'All', label: 'All' }],
  },
  {
    name: 'receiver',
    label: 'Receiver',
    req: true,
    placeholder: 'Select job position',
    type: 'select',
    twocol: false,
    reqmessage: 'Please select',
    options: [{ value: 'All', label: 'All' }],
  },
  {
    type: 'array',
    name: 'form_fields',
    title: 'Form Fields',
    subheader: 'The fields can be reordered by dragging and dropping the fields ato the desired order.',
    twocol: false,
    child: [
      {
        type: 'select',
        name: 'approver_select',
        req: false,
        placeholder: 'Please Select',
        twocol: false,
        colWidth: '1 0 200px',
        subheader: 'Field',
        options: [
          { label: 'Zain Kafeel', value: 'Zain Kafeel', id: 'HR-EMP-00004', doctp: 'HRMS Leave Type Approvers' },
          {
            label: 'Muhammad Waqas Baig',
            value: 'Muhammad Waqas Baig',
            id: 'HR-EMP-00005',
            doctp: 'HRMS Leave Type Approvers',
          },
          { label: 'sheeraz kaleem', value: 'sheeraz kaleem', id: 'HR-EMP-00001a', doctp: 'HRMS Leave Type Approvers' },
        ],
      },
    ],
  },
];