import { useSelector } from 'react-redux';
const _ = require('lodash');

const personalInfoFields = () => {
  //const countryList = useSelector((state) => state.global.countryData);
  const countryList = useSelector((state) => state.applicationForm.countryData);
  const religion = useSelector((state) => state.applicationForm.religionData);
  const race = useSelector((state) => state.applicationForm.raceData);
  const gender = useSelector((state) => state.applicationForm.genderData);
  const marrige_status = useSelector((state) => state.applicationForm.maritalData);
  console.log({ countryList });
  return [
    {
      type: 'upload',
      name: 'image',
      label: 'Profile Picture',
      placeholder: 'Please Upload',
      twocol: false,
    },
    {
      type: 'select',
      name: 'gender',
      label: 'Gender',
      placeholder: 'Please Select',
      twocol: true,
      options: _.map(gender, (e) => ({ label: e.name, value: e.name })),
    },
    {
      type: 'select',
      name: 'marital_status',
      label: 'Marital Status',
      placeholder: 'Please Select',
      twocol: true,
      options: _.map(marrige_status, (e) => ({ label: e.name, value: e.name })),
    },
    {
      type: 'select',
      name: 'nationality',
      label: 'Nationality',
      placeholder: 'Please Select',
      twocol: true,
      options: _.map(countryList, (e) => ({ label: e.name, value: e.name })),
    },
    {
      type: 'select',
      name: 'identification_type',
      label: 'Identification Type',
      placeholder: 'Please Select',
      twocol: true,
      options: [{}],
    },
    {
      type: 'input',
      name: 'identification_no',
      label: 'Identification No.',
      placeholder: '',
      twocol: true,
    },
    {
      type: 'date',
      name: 'date_of_birth',
      label: 'Date of Birth',
      placeholder: 'Please Select',
      twocol: true,
    },
    {
      type: 'select',
      name: 'race',
      label: 'Race',
      placeholder: 'Please Select',
      twocol: true,
      options: _.map(race, (e) => ({ label: e.name, value: e.name })),
    },
    {
      type: 'select',
      name: 'religious',
      label: 'Religion',
      placeholder: 'Please Select',
      twocol: true,
      options: _.map(religion, (e) => ({ label: e.name, value: e.name })),
    },
  ];
};

const contactDetails = () => {
  const countryList = useSelector((state) => state.applicationForm.countryData);
  const religion = useSelector((state) => state.applicationForm.religionData);
  const race = useSelector((state) => state.applicationForm.raceData);
  const gender = useSelector((state) => state.applicationForm.genderData);
  const marrige_status = useSelector((state) => state.applicationForm.maritalData);
  return [
    {
      type: 'input',
      label: 'Phone No.',
      name: 'primary_phone_no',
      placeholder: '',
      twocol: true,
    },
    {
      type: 'input',
      label: 'Email',
      name: 'primary_email',
      placeholder: '',
      twocol: true,
      email: true,
    },
    {
      type: 'input',
      label: 'Second Phone No.',
      name: 'secondary_phone_no',
      placeholder: '',
      twocol: true,
    },
    {
      type: 'input',
      label: 'Second Email',
      name: 'secondary_email',
      placeholder: '',
      twocol: true,
      email: true,
    },
    {
      subheader: 'Current Address',
      name: 'current_address',
      label: 'Address',
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
    },
    {
      name: 'current_state',
      label: 'State',
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
    },
    {
      name: 'current_post_code',
      label: 'Postcode',
      number: true,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
    },
    {
      name: 'current_country',
      label: 'Country',
      placeholder: 'Please select',
      type: 'select',
      twocol: true,
      options: _.map(countryList, (e) => ({ label: e.name, value: e.name })),
    },
    {
      name: 'current_city',
      label: 'City',
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
    },
    {
      name: 'same_address',
      label: '',
      placeholder: '',
      type: 'checkbox',
      class: 'graycheckbox',
      twocol: true,
      options: [{ label: 'Same as permanent address', value: 1 }],
    },
    {
      subheader: 'Permanent Address',
      name: 'permanent_address_1',
      label: 'Address',
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
    },
    {
      name: 'permanent_state',
      label: 'State',
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
    },
    {
      name: 'permanent_post_code',
      label: 'Postcode',
      number: true,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
    },
    {
      name: 'permanent_country',
      label: 'Country',
      placeholder: 'Please select',
      type: 'select',
      twocol: true,
      options: _.map(countryList, (e) => ({ label: e.name, value: e.name })),
    },
    {
      name: 'permanent_city',
      label: 'City',
      placeholder: 'Please state',
      type: 'input',
      twocol: false,
    },
  ];
};
const spouseDetails = () => {
  const countryList = useSelector((state) => state.applicationForm.countryData);
  const religion = useSelector((state) => state.applicationForm.religionData);
  const race = useSelector((state) => state.applicationForm.raceData);
  const gender = useSelector((state) => state.applicationForm.genderData);
  const marrige_status = useSelector((state) => state.applicationForm.maritalData);
  return [
    {
      type: 'select',
      name: 'spouse_gender',
      label: 'Gender',
      placeholder: 'Please Select',
      twocol: true,
      options: _.map(countryList, (e) => ({ label: e.name, value: e.name })),
    },
    {
      type: 'select',
      name: 'spouse_martial_status',
      label: 'Marital Status',
      placeholder: 'Please Select',
      twocol: true,
      options: _.map(marrige_status, (e) => ({ label: e.name, value: e.name })),
    },
    {
      type: 'select',
      name: 'spouse_nationality',
      label: 'Nationality',
      placeholder: 'Please Select',
      twocol: true,
      options: [{}],
    },
    {
      type: 'select',
      name: 'spouse_identification_type',
      label: 'Identification Type',
      placeholder: 'Please Select',
      twocol: true,
      options: [{}],
    },
    {
      type: 'input',
      name: 'spouse_identification_no',
      label: 'Identification No.',
      placeholder: '',
      twocol: true,
    },
    {
      type: 'date',
      name: 'spouse_dob',
      label: 'Date of Birth',
      placeholder: 'Please Select',
      twocol: true,
    },
    {
      type: 'select',
      name: 'spouse_race',
      label: 'Race',
      placeholder: 'Please Select',
      twocol: true,
      options: _.map(race, (e) => ({ label: e.name, value: e.name })),
    },
    {
      type: 'select',
      name: 'spouse_religious',
      label: 'Religion',
      placeholder: 'Please Select',
      twocol: true,
      options: _.map(religion, (e) => ({ label: e.name, value: e.name })),
    },
    {
      type: 'input',
      name: 'spouse_employee_name',
      label: 'Employer Name',
      placeholder: '',
      twocol: true,
    },
    {
      type: 'input',
      name: 'spouse_employee_email',
      label: 'Employer Email',
      placeholder: '',
      email: true,
      twocol: true,
    },
    {
      type: 'input',
      name: 'spouse_phone_no',
      label: 'Phone No.',
      placeholder: '000-000 0000',
      twocol: true,
    },
    {
      type: 'input',
      name: 'spouse_income_tax_no',
      label: 'Icome Tax No.',
      placeholder: '0000000000',
      twocol: true,
    },
    {
      name: 'emergency_contact',
      label: 'Emergency Contact',
      placeholder: '',
      type: 'switch',
      twocol: false,
    },
  ];
};
const childrenDetail = () => {
  const countryList = useSelector((state) => state.applicationForm.countryData);
  const religion = useSelector((state) => state.applicationForm.religionData);
  const race = useSelector((state) => state.applicationForm.raceData);
  const gender = useSelector((state) => state.applicationForm.genderData);
  const marrige_status = useSelector((state) => state.applicationForm.maritalData);
  return [
    {
      type: 'array',
      name: 'employee_children',
      twocol: false,
      child: [
        {
          subheader: 'Child',
          name: 'salutation',
          label: 'Title',
          type: 'select',
          placeholder: 'Please select',
          twocol: true,
          // options: educationList,
        },
        {
          name: 'full_name',
          label: 'Name as per IC/Passport',
          placeholder: 'Please select',
          type: 'input',
          twocol: true,
          // options: _.map(countryList, (e) => ({ label: e.name, value: e.name })),
        },
        {
          name: 'gender',
          label: 'Gender',
          type: 'select',
          placeholder: 'Please select',
          twocol: true,
          options: _.map(gender, (e) => ({ label: e.name, value: e.name })),
        },
        {
          name: 'dob',
          label: 'Date of Birth',
          placeholder: '',
          type: 'date',
          twocol: true,
        },
        {
          name: 'email',
          label: 'Email',
          placeholder: 'Please select',
          type: 'input',
          twocol: true,
          // options: _.map(countryList, (e) => ({ label: e.name, value: e.name })),
        },
        {
          name: 'occupation',
          label: 'Occupation',
          placeholder: 'Please select',
          type: 'input',
          twocol: true,
          // options: _.map(countryList, (e) => ({ label: e.name, value: e.name })),
        },
      ],
    },
  ];
};
const emergencyDetail = () => {
  const countryList = useSelector((state) => state.applicationForm.countryData);
  const religion = useSelector((state) => state.applicationForm.religionData);
  const race = useSelector((state) => state.applicationForm.raceData);
  const gender = useSelector((state) => state.applicationForm.genderData);
  const marrige_status = useSelector((state) => state.applicationForm.maritalData);
  return [
    // {
    //   name: 'title',
    //   label: 'Title',
    //   type: 'select',
    //   placeholder: 'Please select',
    //   twocol: true,
    //   // options: educationList,
    // },
    // {
    //   name: 'name_as_per',
    //   label: 'Name as per IC/Passport',
    //   placeholder: 'Please select',
    //   type: 'input',
    //   twocol: true,
    // },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      placeholder: 'Please select',
      twocol: true,
      options: _.map(gender, (e) => ({ label: e.name, value: e.name })),
    },
    {
      name: 'dob',
      label: 'Date of Birth',
      placeholder: '',
      type: 'date',
      twocol: true,
    },
    {
      name: 'email',
      label: 'Email',
      placeholder: 'Please select',
      type: 'input',
      twocol: true,
      options: _.map(countryList, (e) => ({ label: e.name, value: e.name })),
    },
    {
      name: 'phone_no',
      label: 'Phone No.',
      placeholder: 'Please select',
      type: 'input',
      twocol: true,
      options: _.map(countryList, (e) => ({ label: e.name, value: e.name })),
    },
  ];
};
const educationLevel = () => {
  const countryList = useSelector((state) => state.applicationForm.countryData);
  const religion = useSelector((state) => state.applicationForm.religionData);
  const race = useSelector((state) => state.applicationForm.raceData);
  const gender = useSelector((state) => state.applicationForm.genderData);
  const marrige_status = useSelector((state) => state.applicationForm.maritalData);
  return [
    {
      type: 'array',
      name: 'education',
      twocol: false,
      child: [
        {
          subheader: 'Eduvation Level',
          name: 'school_univ',
          label: 'Institutation',
          type: 'select',
          placeholder: 'Please select',
          twocol: false,
          options: [{}],
        },
        {
          name: 'fields',
          label: 'Field',
          type: 'select',
          placeholder: 'Please select',
          twocol: false,
          options: [{}],
        },
        {
          name: 'year_of_passing',
          label: 'Graduation Year.',
          placeholder: '',
          type: 'date',
          twocol: false,
        },
        {
          name: 'from_date',
          label: 'From Date',
          placeholder: '',
          type: 'date',
          twocol: true,
        },
        {
          name: 'to_date',
          label: 'To Date',
          placeholder: '',
          type: 'date',
          twocol: true,
        },
        {
          name: 'cgpa',
          label: 'CGPA',
          placeholder: 'Please select',
          type: 'input',
          twocol: true,
          options: [{}],
        },
        {
          name: 'level',
          label: 'Education Type',
          type: 'select',
          placeholder: 'Please select',
          twocol: true,
          options: [{}],
        },
        {
          name: 'country',
          label: 'Country of Graduation',
          type: 'select',
          placeholder: 'Please select',
          twocol: true,
          options: [{}],
        },
        {
          type: 'upload',
          name: 'attach_transcript',
          label: 'Attach Transcript',
          placeholder: 'Please Upload',
          twocol: true,
        },
      ],
    },
  ];
};

const workExperience = () => {
  const countryList = useSelector((state) => state.applicationForm.countryData);
  const religion = useSelector((state) => state.applicationForm.religionData);
  const race = useSelector((state) => state.applicationForm.raceData);
  const gender = useSelector((state) => state.applicationForm.genderData);
  const marrige_status = useSelector((state) => state.applicationForm.maritalData);
  return [
    {
      type: 'array',
      name: 'external_work_history',
      twocol: false,
      child: [
        {
          subheader: 'Work Experience',
          name: 'company_name',
          label: 'Employer',
          type: 'input',
          placeholder: 'Please select',
          twocol: true,
        },
        {
          name: 'position',
          label: 'designation',
          type: 'select',
          placeholder: 'Please select',
          twocol: true,
          // options: educationList,
        },

        {
          name: 'from_date',
          label: 'From Date',
          placeholder: '',
          type: 'date',
          twocol: true,
        },
        {
          name: 'to_date',
          label: 'To Date',
          placeholder: '',
          type: 'date',
          twocol: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'input',
          placeholder: 'Please select',
          twocol: false,
          // options: educationList,
        },
      ],
    },
  ];
};

export {
  personalInfoFields,
  contactDetails,
  spouseDetails,
  childrenDetail,
  emergencyDetail,
  educationLevel,
  workExperience,
};
