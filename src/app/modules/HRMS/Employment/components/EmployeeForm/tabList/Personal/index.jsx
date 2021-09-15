import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Typography, Button, Form, message } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm, useFieldArray } from 'react-hook-form';
import { titleList } from '../../../../../../../../configs/constantData';
import { getCountry, getRace, getReligion, getMarital, getGender } from '../../../../../../Application/ducks/actions';
import { useSelector, useDispatch } from 'react-redux';
import ArrayForm from './ArrayForm';

const { Title } = Typography;
const identificationList = [
  {label: 'MyKad / MyPR', value: 'MyKad / MyPR'}
]
const instituteList = [
  {label: 'MyKad / MyPR', value: 'MyKad / MyPR'}
]
const educationList = [
  {label: 'MyKad / MyPR', value: 'MyKad / MyPR'}
]
const degreeList = [
  {label: 'MyKad / MyPR', value: 'MyKad / MyPR'}
]
const positionList = [
  {label: 'MyKad / MyPR', value: 'MyKad / MyPR'}
]
const relationList = [
  {label: 'MyKad / MyPR', value: 'MyKad / MyPR'}
]
 

export default (props) => {

  const { mode, data, updateApi, id, setLoad } = props;
  const dispatch = useDispatch();
  const { control, errors, setValue, handleSubmit } = useForm();
  const genderList = useSelector(state => state.global.genderData);
  const raceList = useSelector(state => state.global.raceData);
  const maritalList = useSelector(state => state.global.maritalData);
  const religionList = useSelector(state => state.global.religionData);
  const countryList = useSelector(state => state.global.countryData);

  useEffect(() => {
    dispatch(getCountry());
    dispatch(getRace());
    dispatch(getReligion());
    dispatch(getMarital());
    dispatch(getGender());
  }, []);

  const { fields: fieldsP, append: appendP, remove: removeP,
  } = useFieldArray({
    control,
    name: 'phone_nos',
  });

  const { fields: fieldsE, append: appendE, remove: removeE,
  } = useFieldArray({
    control,
    name: 'emails',
  });

  const { fields: fieldsEd, append: appendEd, remove: removeEd,
  } = useFieldArray({
    control,
    name: 'education',
  });

  const { fields: fieldsWx, append: appendWx, remove: removeWx,
  } = useFieldArray({
    control,
    name: 'external_work_history',
  });

  const { fields: fieldsEm, append: appendEm, remove: removeEm,
  } = useFieldArray({
    control,
    name: 'emergency_details',
  });

  const { fields: fieldsCh, append: appendCh, remove: removeCh,
  } = useFieldArray({
    control,
    name: 'employee_children',
  });

  

  useEffect(() => {
    if (mode == 'edit' && data && Object.keys(data).length > 0) {
    } 
  }, [data]);

  const initE = { email: '' }
  const initP = { phone: '' }
  const initEd = {
    school_univ: "",
    fields: "",
    year_of_passing: "",
    from_date: "",
    to_date: "",
    cgpa: "",
    level: "",
    country: "",
    transcript: ""
  }
  const initWx = {
    company_name: "",
    designation: "",
    from_date: "",
    to_date: "",
    description: ""
  }
  const initEm = {
    salutation: "",
    contact_person: "",
    relation: "",
    email: "",
    phone_number: ""
  }

  const initCh = {
      salutation: "",
      full_name: "",
      gender: "",
      dob: "",
      email: "",
      occupation: ""
  }

  const personalFields = [
    {
      type: 'select',
      label: 'Title',
      name: 'salutation',
      twocol: false,
      colWidth: '0 1 150px',
      options: titleList,
      req: true,
      reqmessage: 'required',
    },
    {
      type: 'input',
      label: 'Name as per IC/Passport',
      name: 'first_name',
      twocol: false,
      colWidth: '1 0 auto',
      req: true,
      reqmessage: 'Please enter name',
    },
    {
      type: 'upload',
      name: 'image',
      label: 'Profile Picture',
      placeholder: 'Upload',
      twocol: false,
      colWidth: '1 0 100%',
      req: false,
    },
    {
      type: 'select',
      label: 'Gender',
      name: 'gender',
      twocol: true,
      options: genderList?.map(x => ({label: x.name, value: x.name})),
      req: true,
      reqmessage: 'required',
    },
    {
      type: 'select',
      label: 'Marital Status',
      name: 'marital_status',
      twocol: true,
      options: maritalList?.map(x => ({label: x.name, value: x.name})),
      req: true,
      reqmessage: 'required',
    },
    {
      type: 'select',
      label: 'Nationality',
      name: 'nationality',
      twocol: true,
      options: countryList?.map(x => ({label: x.name, value: x.name})),
      req: true,
      reqmessage: 'required',
    },
    {
      type: 'select',
      label: 'Identification Type',
      name: 'identification_type',
      twocol: true,
      options: identificationList,
      req: false,
    },
    {
      type: 'input',
      label: 'Identification No.',
      name: 'identification_no',
      twocol: true,
      req: false,
    },
    {
      type: 'date',
      label: 'Date of Birth',
      name: 'date_of_birth',
      twocol: true,
      req: true,
      reqmessage: 'Required',
    },
    {
      type: 'select',
      label: 'Race',
      name: 'race',
      twocol: true,
      options: raceList?.map(x => ({label: x.name, value: x.name})),
      req: false,
    },
    {
      type: 'select',
      label: 'Religion',
      name: 'religious',
      twocol: true,
      options: religionList?.map(x => ({label: x.name, value: x.name})),
      req: false,
    },
    {
      subheader: 'Contact Details',
      type: 'array',
      name: 'phone_nos',
      twocol: true,
      field: fieldsP,
      remov: removeP,
      adding: () => appendP(initP),
      appendText:'+ Add phone no.',
      single: true,
      child : [
          {
              type: 'input',
              name: 'phone',
              label: 'Phone No.',
              req: false,
              number: true,
              colWidth: '1 0 100%',
              twocol: false,
          },
      ]
    },
    {
      type: 'array',
      name: 'emails',
      twocol: true,
      field: fieldsE,
      remov: removeE,
      adding: () => appendE(initE),
      appendText:'+ Add email',
      single: true,
      child : [
          {
              type: 'input',
              name: 'email',
              label: 'Email',
              req: false,
              colWidth: '1 0 100%',
              twocol: false,
          },
      ]
    },

// Childrens details

    {
      type: 'array',
      name: 'employee_children',
      subheader: 'Children Details',
      twocol: false,
      field: fieldsCh,
      remov: removeCh,
      adding: () => appendCh(initCh),
      appendText:'+ Add children',
      single: false,
      child : [
        {
          subheader: 'Child',
          type: 'select',
          name: 'salutation',
          label: 'Title',
          options: titleList,
          req: false,
          placeholder: 'Please Select',
          twocol: false,
          colWidth: '0 1 150px'
        },    
        {
          type: 'input',
          name: 'full_name',
          label: 'Name as per IC/Passport',
          req: false,
          placeholder: 'Please state',
          twocol: false,
          colWidth: '1 0 60%'
        },
        
        {
          type: 'select',
          name: 'gender',
          label: 'Gender',
          placeholder: 'Please Select',
          options: genderList.map(x => ({label: x.name, value: x.name})),
          req: false,
          twocol: true,
        },
        {
          type: 'date',
          name: 'dob',
          label: 'Date of Birth',
          req: false,
          format: 'Do MMMM YYYY',
          twocol: true,
        },
        {
          type: 'input',
          name: 'email',
          label: 'Email',
          req: false,
          placeholder: 'Please state',
          twocol: true,
        },
        {
          type: 'input',
          name: 'occupation',
          label: 'Occupation',
          req: false,
          placeholder: 'Please state',
          twocol: true,
        },
      ]
    },

// Emergency details
    {
      type: 'array',
      name: 'emergency_details',
      subheader: 'Emergency Details',
      twocol: false,
      field: fieldsEm,
      remov: removeEm,
      adding: () => appendEm(initEm),
      appendText:'+ Add other emergency details',
      single: false,
      child : [
        {
          subheader: 'Emergency Contact',
          type: 'select',
          name: 'salutation',
          label: 'Title',
          options: titleList,
          req: false,
          placeholder: 'Please Select',
          twocol: false,
          colWidth: '0 1 150px'
        },    
        {
          type: 'input',
          name: 'contact_person',
          label: 'Name as per IC/Passport',
          req: false,
          placeholder: 'Please state',
          twocol: false,
          colWidth: '0 1 60%'
        },
        
        {
          type: 'select',
          name: 'relation',
          label: 'Relationship',
          placeholder: 'Please Select',
          options: relationList,
          req: false,
          twocol: false,
          colWidth: '1 0 100%'
        },
        {
          type: 'input',
          name: 'email',
          label: 'Email',
          req: false,
          placeholder: 'Please state',
          twocol: true,
        },
        {
          type: 'input',
          name: 'phone_number',
          label: 'Phone',
          req: false,
          placeholder: 'Please state',
          twocol: true,
        },
      ]
    },
    
// Education details
    {
      type: 'array',
      name: 'education',
      twocol: false,
      subheader: 'Education Level',
      field: fieldsEd,
      remov: removeEd,
      adding: () => appendEd(initEd),
      appendText:'+ Add other educaiton level',
      single: false,
      child : [
        {
            subheader: 'Education Level',
            type: 'select',
            name: 'school_univ',
            label: 'Institution',
            req: false,
            options: instituteList,
            colWidth: '1 0 100%',
            placeholder: 'Please Select',
            twocol: false,
        },
        {
          type: 'select',
          name: 'fields',
          label: 'Field',
          options: degreeList,
          req: false,
          colWidth: '1 0 100%',
          placeholder: 'Please Select',
          twocol: false,
        },
        {
          type: 'date',
          name: 'year_of_passing',
          label: 'Graduation Year',
          dateType: 'year',
          req: false,
          colWidth: '1 0 100%',
          twocol: false,
        },
        {
          type: 'date',
          name: 'from_date',
          label: 'From Date',
          req: false,
          twocol: true,
        },
        {
          type: 'date',
          name: 'to_date',
          label: 'To Date',
          req: false,
          twocol: true,
        },
        {
          type: 'input',
          name: 'cgpa',
          label: 'CGPA',
          req: false,
          placeholder: 'Please state',
          twocol: true,
        },
        {
          type: 'select',
          name: 'level',
          label: 'Education Type',
          options: educationList,
          req: false,
          placeholder: 'Please Select',
          twocol: true,
        },
        {
          type: 'select',
          name: 'country',
          label: 'Country of Graduation',
          options: countryList?.map(x => ({label: x.name, value: x.name})),
          req: false,
          placeholder: 'Please Select',
          twocol: true,
        },
        {
          name: 'transcript',
          label: 'Attach Transcript',
          req: false,
          placeholder: 'Upload',
          type: 'upload',
          twocol: true,
          reqmessage: 'required',
        },
      ]
    },
// Work Experience details
    {
      type: 'array',
      name: 'external_work_history',
      twocol: false,
      subheader: 'Work Experience',
      field: fieldsWx,
      remov: removeWx,
      adding: () => appendWx(initWx),
      appendText:'+ Add other work experience',
      single: false,
      child : [
        {
            subheader: 'Work Experience',
            type: 'input',
            name: 'company_name',
            label: 'Employer',
            req: false,
            placeholder: 'Please state',
            twocol: true,
        },
        {
          type: 'select',
          name: 'designation',
          label: 'Position',
          options: positionList,
          req: false,
          placeholder: 'Please Select',
          twocol: true,
        },
        {
          type: 'date',
          name: 'from_date',
          label: 'From Date',
          req: false,
          twocol: true,
        },
        {
          type: 'date',
          name: 'to_date',
          label: 'To Date',
          req: false,
          twocol: true,
        },
        {
          type: 'textarea',
          name: 'description',
          label: 'Description',
          req: false,
          placeholder: 'Please state',
          twocol: false,
          colWidth: '1 0 100%'
        },
      ]
    },

  ];
  
  const onFinish = async (val) => {
    console.log('val', val);
  }

  return (
    <Form layout='vertical' onFinish={handleSubmit(onFinish)}>
    <Row gutter={[24, 30]} align="bottom">
      <Col span={24}><Title level={4} className="mb-0 c-default">Personal Information</Title></Col>
      {personalFields.map((item, idx) => (
        <Fragment key={idx}>
          {item?.subheader && 
          <Col span={24}><Title level={4} className='mb-0 c-default'>{item.subheader}</Title></Col>}
          {item.type == 'array' ?
            <Col span={item.twocol ? 12 : 24}>
              <Row gutter={[20, 30]}>
                <Col span={24}>
                  <ArrayForm fields={item.field} remove={item.remov} item={item} control={control} errors={errors} />
                </Col>
                <Col span={24}>
                  <Button htmlType="button" type="dashed" size="large" className="w-100" onClick={item.adding}>
                    {item.appendText}
                  </Button>
                </Col>
              </Row>
            </Col>
          : <FormGroup static={true} item={item} control={control} errors={errors} />
          }
        </Fragment>
      ))}
    </Row>
    </Form>
  );
};