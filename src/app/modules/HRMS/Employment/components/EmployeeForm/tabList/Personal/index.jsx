import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Typography, Button, Form, message } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm, useFieldArray } from 'react-hook-form';
import { titleList } from '../../../../../../../../configs/constantData';
import { getCountry, getRace, getReligion, getMarital, getGender, getInstitution, getEducationType } from '../../../../../../Application/ducks/actions';
import { useSelector, useDispatch } from 'react-redux';
import ArrayForm from './ArrayForm';
import moment from 'moment';
import {getFileName, getSingleUpload} from '../../../../../../../../features/utility';
import { employApi } from '../../../../ducks/services';
import { relationList, positionList, degreeList, identificationList } from '../../../../../../../../configs/constantData';

const _ = require("lodash");
const { Title } = Typography;

export default (props) => {

  const { mode, data, updateApi, id, setLoad, setForm, formObj } = props;
  const dispatch = useDispatch();
  const { control, errors, setValue, handleSubmit } = useForm();
  const genderList = useSelector(state => state.global.genderData);
  const raceList = useSelector(state => state.global.raceData);
  const maritalList = useSelector(state => state.global.maritalData);
  const religionList = useSelector(state => state.global.religionData);
  const countryList = useSelector(state => state.global.countryData);
  const instituteList = useSelector(state => state.global.institutions);
  const educationList = useSelector(state => state.global.educationType);

  useEffect(() => {
    dispatch(getCountry());
    dispatch(getRace());
    dispatch(getReligion());
    dispatch(getMarital());
    dispatch(getGender());
    dispatch(getInstitution());
    dispatch(getEducationType());
  }, []);

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
    name: 'emergency_contact',
  });

  const { fields: fieldsCh, append: appendCh, remove: removeCh,
  } = useFieldArray({
    control,
    name: 'employee_children',
  });

  

  useEffect(() => {
    if (mode == 'edit' && data && Object.keys(data).length > 0) {
      setValue('salutation', data?.salutation ? {label: data?.salutation, value: data?.salutation}: '');
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
      
      if (data?.current_permanent_address && data?.current_permanent_address.length > 0) {
        if (data?.current_permanent_address[0]?.current_address == 1) {
          setValue('current_address_1', data?.current_permanent_address[0].current_address_1);
          setValue('current_state', data?.current_permanent_address[0].permanent_state);
          setValue('current_post_code', data?.current_permanent_address[0].current_post_code);
          setValue('current_country', data?.current_permanent_address[0]?.current_country ? {label: data?.current_permanent_address[0].current_country,value: data?.current_permanent_address[0].current_country} : '');
          setValue('current_city', data?.current_permanent_address[0].current_city);
        }
        if (data?.current_permanent_address[1]?.permanent_address == 1) {
          setValue('permanent_address_1', data?.current_permanent_address[1].current_address_1);
          setValue('permanent_state', data?.current_permanent_address[1].permanent_state);
          setValue('permanent_post_code', data?.current_permanent_address[1].current_post_code);
          setValue('permanent_country', data?.current_permanent_address[1]?.current_country ? {label: data?.current_permanent_address[1].current_country,value: data?.current_permanent_address[1].current_country} : '');
          setValue('permanent_city', data?.current_permanent_address[1].current_city);
        }
      }

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

      setValue('primary_phone_no', data?.primary_phone_no);
      setValue('secondary_phone_no', data?.secondary_phone_no);
      setValue('primary_email', data?.primary_email);
      setValue('secondary_email', data?.secondary_email);

      setValue('education', data?.education);
      setValue('external_work_history', data?.external_work_history);
      setValue('emergency_contact', data?.emergency_contact);
      setValue('employee_children', data?.employee_children);
    } 
  }, [data]);

  const initEd = {
    school_univ: '',
    fields: '',
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
      colWidth: '0 1 120px',
      options: titleList,
      placeholder: 'Select',
      req: true,
      reqmessage: 'required',
    },
    {
      type: 'input',
      label: 'Name as per IC/Passport',
      name: 'first_name',
      twocol: false,
      colWidth: '1 0 auto',
      placeholder: 'Please state',
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
      req: true,
      reqmessage: 'Please upload image'
    },
    {
      type: 'select',
      label: 'Gender',
      name: 'gender',
      twocol: true,
      options: genderList?.map(x => ({label: x.name, value: x.name})),
      req: true,
      placeholder: 'Please select',
      reqmessage: 'Required',
    },
    {
      type: 'select',
      label: 'Marital Status',
      name: 'marital_status',
      twocol: true,
      placeholder: 'Please select',
      options: maritalList?.map(x => ({label: x.name, value: x.name})),
      req: true,
      reqmessage: 'Required',
    },
    {
      type: 'select',
      label: 'Nationality',
      name: 'nationality',
      twocol: true,
      placeholder: 'Please select',
      options: countryList?.map(x => ({label: x.name, value: x.name})),
      req: true,
      reqmessage: 'Required',
    },
    {
      type: 'select',
      label: 'Identification Type',
      name: 'identification_type',
      twocol: true,
      placeholder: 'Please select',
      options: identificationList,
      req: false,
    },
    {
      type: 'input',
      label: 'Identification No.',
      name: 'identification_no',
      placeholder: 'Please state',
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
      placeholder: 'Please select',
      options: raceList?.map(x => ({label: x.name, value: x.name})),
      req: false,
    },
    {
      type: 'select',
      label: 'Religion',
      name: 'religious',
      placeholder: 'Please select',
      twocol: true,
      options: religionList?.map(x => ({label: x.name, value: x.name})),
      req: false,
    },
    {
      subheader: 'Contact Details',
      type: 'input',
      name: 'primary_phone_no',
      label: 'Phone No.',
      placeholder: 'Please state',
      req: true,
      number: true,
      twocol: true,
      reqmessage: 'Required',
    },
    {
      type: 'input',
      name: 'secondary_phone_no',
      label: 'Second Phone No.',
      placeholder: 'Please state',
      req: false,
      number: true,
      twocol: true,
    },
    {
        type: 'input',
        name: 'primary_email',
        label: 'Email',
        placeholder: 'Please state',
        req: true,
        twocol: true,
        reqmessage: 'Required',
    },
    {
      type: 'input',
      name: 'secondary_email',
      label: 'Second Email',
      placeholder: 'Please state',
      req: false,
      twocol: true,
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
      placeholder: 'Please select',
      options: genderList?.map(x => ({label: x.name, value: x.name})),
      req: true,
      reqmessage: 'required',
    },
    {
      type: 'select',
      label: 'Marital Status',
      name: 'spouse_martial_status',
      twocol: true,
      placeholder: 'Please select',
      options: maritalList?.map(x => ({label: x.name, value: x.name})),
      req: true,
      reqmessage: 'required',
    },
    {
      type: 'select',
      label: 'Nationality',
      name: 'spouse_nationality',
      twocol: true,
      placeholder: 'Please select',
      options: countryList?.map(x => ({label: x.name, value: x.name})),
      req: true,
      reqmessage: 'required',
    },
    {
      type: 'select',
      label: 'Identification Type',
      name: 'spouse_identification_type',
      twocol: true,
      placeholder: 'Please select',
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
      placeholder: 'Please select',
      options: raceList?.map(x => ({label: x.name, value: x.name})),
      req: false,
    },
    {
      type: 'select',
      label: 'Religion',
      name: 'spouse_religious',
      twocol: true,
      placeholder: 'Please select',
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
      name: 'emergency_contact',
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
          name: 'title',
          label: 'Title',
          options: titleList,
          req: false,
          placeholder: 'Please Select',
          twocol: false,
          colWidth: '0 1 150px'
        },    
        {
          type: 'input',
          name: 'relation_name',
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
            options: instituteList?.map(x => ({label: x.name, value: x.name})),
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
          format: 'YYYY',
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
          options: educationList.map(x => ({label: x.name, value: x.name})),
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

    setLoad(true);

    let profileImg = '';
    if (val.image) {
      if (val.image.fileList[0].uid != '-1') {
        let modifiedName = uniquiFileName(val.image?.file?.originFileObj.name)
        let res = await getSingleUpload(modifiedName, 'image',  val.image?.file?.originFileObj, 'Employee', id);
        profileImg = res?.file_url;
      } else {
        profileImg = val.image.fileList[0].url
      }
    }

    let educate = [];
    let children = [];
    let work = [];
    let emergency = [];

    if (val.external_work_history && val.external_work_history.length > 0) {
      val.external_work_history.map(x => {
        work.push({
          company_name: x.company_name,
          description: x.description,
          designation: x.designation.value,
          from_date: x.from_date,
          to_date: x.to_date

        })
      })
    }

    if (val.emergency_contact && val.emergency_contact.length > 0) {
      val.emergency_contact.map(x => {
        emergency.push({
          title: x.title.value,
          relation_name: x.relation_name,
          relation: x.relation.value,
          email: x.email,
          phone: x.phone
        })
      })
    }

    if (val.education && val.education.length > 0) {
      await Promise.all(val.education.map(async (x) => {
        let url = '';
        if (x.transcript) {
          if (x.transcript.fileList[0].uid != '-1') {
            let modifiedName = uniquiFileName(x.transcript?.file?.originFileObj.name)
            let res = await getSingleUpload(modifiedName, 'image',  x.transcript?.file?.originFileObj, 'Employee', id);
            url = res?.file_url
          } else {
            url = x.transcript.fileList[0].url;
          }
        }
        educate.push({
          cgpa: x.cgpa,
          country: x.country?.value,
          fields: x.fields.value,
          from_date: x.from_date,
          level: x.level?.value,
          school_univ: x.school_univ?.value,
          to_date: x.to_date,
          transcript: url ? url.replace('http://cms2dev.limkokwing.net', '') : '',
        })
      }));
    }

    if (val.employee_children && val.employee_children.length > 0) {
      val.employee_children.map(x => {
        children.push({
          salutation: x.salutation.value,
          dob: x.dob,
          email: x.email,
          full_name: x.full_name,
          gender: x.gender.value,
          occupation: x.occupation,
        })
      })
    }

    const body = {
      salutation: val.salutation?.value,
      first_name: val.first_name,
      image: profileImg ? profileImg.replace('http://cms2dev.limkokwing.net', "") : "",
      gender: val.gender ? val.gender.value : '',
      marital_status: val.marital_status?.value,
      nationality: val.nationality?.value,
      identification_type: val.identification_type?.value,
      identification_no: val.identification_no,
      date_of_birth: val.date_of_birth,
      race: val.race?.vallue,
      religious: val.religious?.value,
      primary_phone_no: val.primary_phone_no,
      secondary_phone_no: val.secondary_phone_no,
      primary_email: val.primary_email,
      secondary_email: val.secondary_email,

      current_permanent_address: [
        {
            current_address_1: val.current_address_1,
            current_city: val.current_city,
            current_post_code: val.current_post_code,
            current_country: val.current_country.value,
            permanent_state: val.current_state,
            current_address: 1
        },
        {
            current_address_1: val.permanent_address_1,
            current_city: val.permanent_city,
            current_post_code: val.permanent_post_code,
            current_country: val.permanent_country.value,
            permanent_state: val.permanent_state,
            permanent_address: 1
        }
      ],

      spouse_salutation: val.spouse_salutation?.value,
      spouse_name: val.spouse_name,
      spouse_gender: val.spouse_gender?.value,
      spouse_martial_status: val.spouse_martial_status?.value,
      spouse_nationality: val.spouse_nationality?.value,
      spouse_identification_type: val.spouse_identification_type?.value,
      spouse_identification_no: val.spouse_identification_no,
      spouse_dob: val.spouse_dob, 
      spouse_race: val.spouse_race?.value,
      spouse_religious: val.spouse_religious?.value,
      spouse_employee_name: val.spouse_employee_name,
      spouse_employee_email: val.spouse_employee_email?.value,
      spouse_phone_no: val.spouse_phone_no,
      spouse_income_tax_no: val.spouse_income_tax_no,

      emergency_details: emergency,
      employee_children: children,
      education: educate,
      external_work_history: work,
    }
    if (mode== 'edit') {
      employApi(body, id).then(res => {
        setLoad(false);
        updateApi();
        message.success('Detaila Successfully Saved')
      }).catch(e => {
        console.log(e);
        setLoad(false);
        message.error(e);
      })
    } else {
      setForm({
        ...formObj,
        personal: body
      })
    }
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