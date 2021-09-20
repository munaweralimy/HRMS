const addAsset = [
  {
    type: 'input',
    label: 'Asset No.',
    name: 'asset_no',
    placeholder: 'Enter Asset No',
    req: true,
    reqmessage: 'Asset Number required',
    twocol: false,
  },
  {
    type: 'date',
    label: 'Start Date',
    name: 'start_date',
    req: true,
    reqmessage: 'date required',
    twocol: true,
  },
  {
    type: 'date',
    label: 'End Date',
    name: 'end_date',
    req: true,
    reqmessage: 'date required',
    twocol: true,
  },
  {
    type: 'input',
    label: 'Description',
    name: 'description',
    placeholder: 'Description',
    req: true,
    reqmessage: 'Description required',
    twocol: false,
  },
];
export { addAsset };
