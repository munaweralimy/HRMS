import { timelap } from '../../../../../../configs/constantData';
const formFields = [
  {
    name: 'clock_in_date',
    label: 'Clock in Date',
    placeholder: 'Clock in date',
    type: 'input',
    twocol: false,
    static: true,
    format: 'Do MMMM YYYY',
  },
  {
    name: 'clock_in_time',
    label: 'Clock in Time',
    placeholder: 'Clock in time',
    type: 'input',
    twocol: false,
    static: true,
  },

  {
    name: 'clock_out_date',
    label: 'Clock out Date',
    placeholder: 'Clock out date',
    req: true,
    type: 'date',
    reqMessage: 'date required',
    twocol: false,
    format: 'Do MMMM YYYY',
  },
  {
    subheader: 'Clock out Time',
    subheadlevel: '5',
    name: 'hour',
    label: '',
    min: 1,
    max: 12,
    req: true,
    type: 'input',
    twocol: false,
    colWidth: '0 0 80px',
    number: true,
    arrow: false,
  },
  {
    name: 'min',
    label: '',
    min: 1,
    max: 59,
    req: true,
    type: 'input',
    twocol: false,
    colWidth: '0 0 80px',
    number: true,
    arrow: false,
  },
  {
    type: 'select',
    name: 'time_type',
    label: '',
    placeholder: 'Select',
    options: timelap,
    req: true,
    twocol: false,
    colWidth: '1 0 auto',
  },
  {
    type: 'textarea',
    name: 'reason',
    label: 'Reason',
    placeholder: 'Please specify reason...',
    req: true,
    reqMessage: 'reason required',
    twocol: false,
  },
];

export { formFields };
