import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Typography, Button, Form, message } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm, useFieldArray } from 'react-hook-form';
import { titleList } from '../../../../../../../../configs/constantData';
import { getCountry, getRace, getReligion, getMarital, getGender } from '../../../../../../Application/ducks/actions';
import { useSelector, useDispatch } from 'react-redux';
import ArrayForm from './ArrayForm';
import moment from 'moment';
import {getFileName} from '../../../../../../../../features/utility';

const _ = require("lodash");
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
      setValue('salutation', data?.salutation);
      setValue('first_name', data?.first_name);
      setValue('image', data?.image ? {fileList: [{uid: '-1', name: getFileName(data?.image), status: 'done', url: `http://cms2dev.limkokwing.net${data?.image}`}]} : '');
      setValue('gender', data?.gender ? {label: data?.gender, value: data?.gender} : '');
      setValue('marital_status', data?.marital_status ? {label: data?.marital_status, value: data?.marital_status} : '');
      setValue('nationality', data?.nationality ? {label: data?.nationality, value: data?.nationality} : '');
      setValue('identification_type', data?.identification_type ? {label: data?.identification_type, value: data?.identification_type} : '');
      setValue('identification_no', data?.identification_no);
      setValue('date_of_birth', data?.date_of_birth ? moment(data?.date_of_birth, 'YYYY MM DD') : '');
      setValue('race', data?.race ? {label: data?.race, value: data?.race} : '');
      setValue('religious', data?.religious ? {label: data?.religious, value: data?.religious} : '');
      
      setValue('current_address_1', data?.current_address_1);
      setValue('current_state', data?.current_state);
      setValue('current_post_code', data?.current_post_code);
      setValue('current_country', data?.current_country ? {label: data?.current_country,value: data?.current_country} : '');
      setValue('current_city', data?.current_city);

      setValue('permanent_address_1', data?.permanent_address_1);
      setValue('permanent_state', data?.permanent_state);
      setValue('permanent_post_code', data?.permanent_post_code);
      setValue('permanent_country', data?.permanent_country ? {label: data?.permanent_country,value: data?.permanent_country} : '');
      setValue('permanent_city', data?.permanent_city);

      setValue('spouse_salutation', data?.spouse_salutation ? {label: data?.spouse_salutation, value: data?.spouse_salutation} : '');
      setValue('spouse_name', data?.spouse_name);
      setValue('spouse_gender', data?.spouse_gender ? {label: data?.spouse_gender, value: data?.spouse_gender} : '');
      setValue('spouse_martial_status', data?.spouse_martial_status ? {label: data?.spouse_martial_status, value: data?.spouse_martial_status} : '');
      setValue('spouse_nationality', data?.spouse_nationality ? {label: data?.spouse_nationality, value: data?.spouse_nationality} : '');
      setValue('spouse_identification_type', data?.spouse_identification_type ? {label: data?.spouse_identification_type, value: data?.spouse_identification_type} : '');
      setValue('spouse_identification_no', data?.spouse_identification_no);
      setValue('spouse_dob', data?.spouse_dob ? moment(data?.spouse_dob, 'YYYY MM DD') : '');
      setValue('spouse_race', data?.spouse_race ? {label: data?.spouse_race, value: data?.spouse_race} : '');
      setValue('spouse_religious', data?.spouse_religious ? {label: data?.spouse_religious, value: data?.spouse_religious} : '');
      setValue('spouse_employee_name', data?.spouse_employee_name);
      setValue('spouse_employee_email', data?.spouse_employee_email);
      setValue('spouse_phone_no', data?.spouse_phone_no);
      setValue('spouse_income_tax_no', data?.spouse_income_tax_no);

      setValue('phone_nos', data?.phone_nos);
      setValue('emails', data?.emails);
      setValue('education', data?.education);
      setValue('external_work_history', data?.external_work_history);
      setValue('emergency_details', data?.emergency_details);
      setValue('employee_children', data?.employee_children);
    } 
  }, [data]);

  const initE = { email: '' }
  const initP = { phone: '' }
  const initEd = {
    school_univ: [],
    fields: [],
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

// Current Address

    {
      subheader: 'Current Address',
      subheadlevel: 5,
      name: 'current_address_1',
      label: 'Address',
      req: false,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
      reqmessage: 'Address required',
    },
    {
      name: 'current_state',
      label: 'State',
      req: false,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
      reqmessage: 'State required',
    },
    {
      name: 'current_post_code',
      label: 'Postcode',
      req: false,
      number: true,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
      reqmessage: 'Postcode required',
    },
    {
      name: 'current_country',
      label: 'Country',
      req: false,
      placeholder: 'Please select',
      type: 'select',
      twocol: true,
      reqmessage: 'Please select',
      options: _.map(countryList, e => ({label: e.name, value: e.name}))
    },
    {
      name: 'current_city',
      label: 'City',
      req: false,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
      reqmessage: 'City required',
    },
    {
      name: 'same_address',
      label: '',
      req: false,
      placeholder: '',
      type: 'checkbox',
      class: 'graycheckbox',
      twocol: true,
      reqmessage: '',
      options: [{label: 'Same as permanent address', value: 1}]
    },
    {
      subheader: 'Permanent Address',
      subheadlevel: 5,
      name: 'permanent_address_1',
      label: 'Address',
      req: false,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
      reqmessage: 'Address required',
    },
    {
      name: 'permanent_state',
      label: 'State',
      req: false,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
      reqmessage: 'State required',
    },
    {
      name: 'permanent_post_code',
      label: 'Postcode',
      req: false,
      number: true,
      placeholder: 'Please state',
      type: 'input',
      twocol: true,
      reqmessage: 'Postcode required',
    },
    {
      name: 'permanent_country',
      label: 'Country',
      req: false,
      placeholder: 'Please select',
      type: 'select',
      twocol: true,
      reqmessage: 'Please select',
      options: _.map(countryList, e => ({label: e.name, value: e.name}))
    },
    {
      name: 'permanent_city',
      label: 'City',
      req: false,
      placeholder: 'Please state',
      type: 'input',
      twocol: false,
      colWidth: '1 0 100%',
      reqmessage: 'City required',
    },

// Spouse Details

    {
      subheader: 'Spouse Details',
      type: 'select',
      name: 'spouse_salutation',
      label: 'Title',
      options: titleList,
      req: false,
      placeholder: 'Select',
      twocol: false,
      colWidth: '0 1 150px'
    },
    {
      type: 'input',
      name: 'spouse_name',
      label: 'Name as per IC/Passport',
      req: false,
      placeholder: 'Please state',
      twocol: false,
      colWidth: '1 0 60%'
    },

    {
      type: 'select',
      label: 'Gender',
      name: 'spouse_gender',
      twocol: true,
      options: genderList?.map(x => ({label: x.name, value: x.name})),
      req: true,
      reqmessage: 'required',
    },
    {
      type: 'select',
      label: 'Marital Status',
      name: 'spouse_martial_status',
      twocol: true,
      options: maritalList?.map(x => ({label: x.name, value: x.name})),
      req: true,
      reqmessage: 'required',
    },
    {
      type: 'select',
      label: 'Nationality',
      name: 'spouse_nationality',
      twocol: true,
      options: countryList?.map(x => ({label: x.name, value: x.name})),
      req: true,
      reqmessage: 'required',
    },
    {
      type: 'select',
      label: 'Identification Type',
      name: 'spouse_identification_type',
      twocol: true,
      options: identificationList,
      req: false,
    },
    {
      type: 'input',
      label: 'Identification No.',
      name: 'spouse_identification_no',
      twocol: true,
      placeholder: 'Please state',
      req: false,
    },
    {
      type: 'date',
      label: 'Date of Birth',
      name: 'spouse_dob',
      twocol: true,
      req: true,
      reqmessage: 'Required',
    },
    {
      type: 'select',
      label: 'Race',
      name: 'spouse_race',
      twocol: true,
      options: raceList?.map(x => ({label: x.name, value: x.name})),
      req: false,
    },
    {
      type: 'select',
      label: 'Religion',
      name: 'spouse_religious',
      twocol: true,
      options: religionList?.map(x => ({label: x.name, value: x.name})),
      req: false,
    },
    {
      type: 'input',
      label: 'Employer Name',
      name: 'spouse_employee_name',
      twocol: true,
      placeholder: 'Please state',
      req: false,
    },
    {
      type: 'input',
      label: 'Employer Email',
      name: 'spouse_employee_email',
      twocol: true,
      placeholder: 'Please state',
      req: false,
    },
    {
      type: 'input',
      label: 'Phone no.',
      name: 'spouse_phone_no',
      twocol: true,
      placeholder: 'Please state',
      req: false,
    },
    {
      type: 'input',
      label: 'Income Tax No.',
      name: 'spouse_income_tax_no',
      twocol: true,
      number: true,
      placeholder: 'Please state',
      req: false,
    },
    {
      type: 'switch',
      label: 'Emergency contact',
      name: 'spouse_emergency_contact',
      twocol: false,
      colWidth: '1 0 100%',
      req: false,
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
          colWidth: '1 0 auto'
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
            multiple: true,
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
          multiple: true,
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

  const FormComp = () => (
    <Row gutter={[24, 30]} align="bottom">
        <Col span={24}><Title level={4} className="mb-0 c-default">Personal Information</Title></Col>
        {personalFields.map((item, idx) => (
          <Fragment key={idx}>
            {item?.subheader && 
            <Col span={24}><Title level={item?.subheadlevel ? item?.subheadlevel : 4} className='mb-0 c-default'>{item.subheader}</Title></Col>}
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
            : <FormGroup item={item} control={control} errors={errors} />
            }
          </Fragment>
        ))}
        {mode=='edit' &&
        <Col span={24}>
            <Row gutter={20} justify='end'>
              <Col><Button type='primary' htmlType='submit' size='large' className='green-btn'>Save Changes</Button></Col>
            </Row>
          </Col>}
      </Row>
  )

  return (
    <>
    {mode == 'edit' ?
    <Form layout='vertical' onFinish={handleSubmit(onFinish)}>
      {FormComp()}
    </Form>
    :
    FormComp()}
    </>
  );
};