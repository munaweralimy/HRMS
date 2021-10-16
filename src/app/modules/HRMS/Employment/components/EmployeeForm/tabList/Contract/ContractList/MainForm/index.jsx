import React, { useState, useEffect } from 'react';
import ListFormComp from '../../../../../../../../../molecules/HRMS/ListFormComp';
import { useFieldArray } from 'react-hook-form';
import { etypeList, ctypeList, staffCategory, positionList, workType, timelap, alternateSat } from '../../../../../../../../../../configs/constantData';
import { useSelector } from 'react-redux';
import axios from '../../../../../../../../../../services/axiosInterceptor';
import { apiMethod } from '../../../../../../../../../../configs/constants';
import moment from 'moment';
import Activations from '../Activations';

  const custom = [
    {
      day: "Monday",
      work_hour_type: "Full Day",
      time_hour: 1,
      time_min: 0,
      time_type: "",
      work_hours: 8,
    },
    {
      day: "Tuesday",
      work_hour_type: "Full Day",
      time_hour: 1,
      time_min: 0,
      time_type: "",
      work_hours: 8,
    },
    {
      day: "Wednesday",
      work_hour_type: "Full Day",
      time_hour: 1,
      time_min: 0,
      time_type: "",
      work_hours: 8,
    },
    {
      day: "Thursday",
      work_hour_type: "Full Day",
      time_hour: 1,
      time_min: 0,
      time_type: "",
      work_hours: 8,
    },
    {
      day: "Friday",
      work_hour_type: "Full Day",
      time_hour: 1,
      time_min: 0,
      time_type: "",
      work_hours: 8,
    },
    {
      day: "Saturday",
      work_hour_type: "Half Day",
      time_hour: 1,
      time_min: 0,
      time_type: "",
      work_hours: 4,
    },
    {
      day: "Sunday",
      work_hour_type: "Rest Day",
      time_hour: 1,
      time_min: 0,
      time_type: "",
      work_hours: 0,
    },
  ]

  const init = {
    day: '',
    time_hour: 0,
    time_min: 0,
    time_type: '',
    work_hour_type: '',
    work_hours: 0,
  }

export default (props) => {

    const { control, errors, setValue, reset, mode, setVisible, recordData, setRecord, setFormVisible, refresh, id } = props;
    const [noEdit, setNoedit] = useState(true);
    const [templateList, setTemplateList] = useState([]);
    
    const jobList = useSelector(state => state.global.jobslist);
    const companyList = useSelector(state => state.global.companies);
    const teamList = useSelector(state => state.global.teams);
    const roleList = useSelector(state => state.global.roles);
    const staffList = useSelector(state => state.global.staff);
    const templates = useSelector(state => state.employment.tempData);

    useEffect(() => {
      if(templates) {
        let tmp = [];
        templates.map(x => {
          tmp.push({label: x.template_name, value: x.name})
        });
        tmp.push({label: 'Custom Template', value: 'Custom Template'})
        setTemplateList(tmp);
      }
    }, [templates]);

    useEffect(() => {
      if (recordData && recordData[16]?.value == 0) {
        onWHChnage(recordData[13]?.value);
      }
    }, [refresh]);

    const { fields, append, remove} = useFieldArray({
      control: control,
      name: 'work_hour_template_detail',
      defaultValue: init
    });

    useEffect(() => {
      if (recordData && recordData[16]?.value == 1) {
        setValue('work_hour_template', {label: 'Custom Template', value: 'Custom Template'});
        setValue('work_hour_template_detail', recordData[17].value);
      }
    }, [recordData]);

    
    const onWHChnage = async (e) => {
      if(e.label == "Custom Template") {
        setNoedit(false);
        setValue('work_hour_template_detail', custom)
      } else {
        if (noEdit == false) {
          setNoedit(true);
        }
        try {
          const res = await axios.get(`${apiMethod}/hrms.api.get_work_hours_temp_data?tempid=${e.label}`);
          let temp = [];
          remove();
          res?.data?.message.map((x, i) => {
            temp.push({
              id: i,
              day: x.day,
              time_hour: x.start_time ? moment(x.start_time, 'hh:mm:ss').hour() : 0,
              time_min: x.start_time ? moment(x.start_time, 'hh:mm:ss').minute() : 0,
              time_type: x.time_type,
              work_hour_type: x.work_hour_type,
              work_hours: x.work_hours,
            })
          })
          setValue('work_hour_template_detail', temp);
        }catch(e) {
          console.log(e)
        }
      }
    }

    const contractDetails = [
      {
        name: 'default_contract',
        label: '',
        req: false,
        placeholder: '',
        type: 'checkbox',
        class: 'graycheckbox',
        twocol: false,
        colWidth: '1 0 100%',
        reqmessage: '',
        options: [{label: 'Default Contract', value: 1}],
      },
      {
        type: 'select',
        name: 'contract_type',
        label: 'Contract Type',
        placeholder: 'Please Select',
        twocol: true,
        req: true,
        reqmessage: 'Please select',
        options: ctypeList,
      },
      {
        type: 'select',
        name: 'employement_type',
        label: 'Employment Type',
        placeholder: 'Please Select',
        req: true,
        reqmessage: 'Please select',
        twocol: true,
        options: etypeList,
      },
      {
        type: 'date',
        name: 'start_date',
        label: 'From Date',
        twocol: true,
        req: true,
        reqmessage: 'Please state'
      },
      {
        type: 'date',
        name: 'end_date',
        label: 'To Date',
        twocol: true,
        req: false,
        reqmessage: 'Please state'
      },
      // employment details
      {
        subheader: 'Employment Details',
        type: 'select',
        name: 'staff_category',
        label: 'Staff Category',
        placeholder: 'Please Select',
        twocol: false,
        options: staffCategory,
        req: true,
        reqmessage: 'Please state'
      },
      {
        type: 'select',
        name: 'company',
        label: 'Company',
        placeholder: 'Please Select',
        twocol: true,
        options: companyList.map(x => ({label: x.name, value: x.name})),
        req: true,
        reqmessage: 'Please state'
      },
      {
        type: 'select',
        name: 'team',
        label: 'Team',
        placeholder: 'Please Select',
        twocol: true,
        options: teamList.map(x => ({label: x.team_name, value: x.name})),
        req: true,
        reqmessage: 'Please state'
      },
      {
        type: 'select',
        name: 'job_title',
        label: 'Job Title',
        placeholder: 'Please Select',
        twocol: true,
        options: jobList.map(x => ({label: x.name, value: x.name})),
        req: true,
        reqmessage: 'Please state'
      },
      {
        type: 'select',
        name: 'position_level',
        label: 'Position Level',
        placeholder: 'Please Select',
        twocol: true,
        options: positionList,
      },
      {
        type: 'select',
        name: 'supervisor',
        label: 'Supervisor',
        placeholder: 'Please Select',
        twocol: false,
        options: staffList.map(x => ({label: x.employee_name, value: x.employee_name})),
      },
      {
        type: 'select',
        name: 'employee_role',
        label: 'Roles',
        placeholder: 'Please Select',
        multiple: true,
        twocol: false,
        options: roleList.map(x => ({label: x.name, value: x.name})),
      },
      {
        type: 'upload',
        name: 'contract_attachment',
        label: 'Attach Contract',
        placeholder: 'Upload Attachment',
        twocol: false,
      },
      // Work hours
      {
        subheader: 'Work Hours',
        type: 'select',
        name: 'work_hour_template',
        label: 'Template',
        placeholder: 'Please Select',
        twocol: false,
        colWidth: '1 0 100%',
        options: templateList,
        req: true,
        reqmessage: 'Please select',
        onChange: onWHChnage
      },
      {
        type: 'array',
        name: 'work_hour_template_detail',
        twocol: false,
        colWidth: '1 0 100%',
        field: fields,
        gap: [10, 10],
        single: false,
        noCard: true,
        child : [
          {
            type: 'input',
            name: 'day',
            label: '',
            static: true,
            req: false,
            twocol: false,
            colWidth: '1 0 100px'
          },    
          {
            type: 'select',
            name: 'work_hour_type',
            label: '',
            placeholder: 'Please Select',
            options: workType,
            static: noEdit,
            req: true,
            twocol: false,
            colWidth: '1 0 100px'
          },
          {
            type: 'input',
            name: 'time_hour',
            label: '',
            req: true,
            number: true,
            min: 1,
            max: 12,
            static: noEdit,
            arrow: false,
            twocol: false,
            colWidth: '0 1 70px'
          },
          {
            type: 'input',
            name: 'time_min',
            label: '',
            number: true,
            arrow: false,
            req: true,
            static: noEdit,
            min: 0,
            max: 59,
            twocol: false,
            colWidth: '0 1 70px'
          },
          {
            type: 'select',
            name: 'time_type',
            label: '',
            placeholder: 'Select',
            options: timelap,
            static: noEdit,
            req: true,
            twocol: false,
            colWidth: '0 1 100px'
          },
          {
            type: 'input',
            name: 'work_hours',
            label: '',
            req: true,
            static: noEdit,
            number:true,
            arrow: false,
            min: 0,
            max: 24,
            placeholder: 'Please state',
            twocol: false,
            colWidth: '1 0 70px'
          },
        ]
      },
      {
        type: 'switch',
        name: 'alternate_saturdays',
        label: 'Alternate Saturdays',
        req: false,
        twocol: false,
        colWidth: '1 0 100%'
      },
      {
        type: 'select',
        name: 'group',
        label: 'Group',
        placeholder: 'Select',
        options: alternateSat,
        req: false,
        twocol: false,
        colWidth: '1 0 100%'
      },
    ];

    const onBack = () => {
        reset();
        setFormVisible(false);
        setRecord(null)
        setVisible({
            set1: true,
            set2: true,
            set3: true,
            set4: true,
        });
    }

    return (
        <ListFormComp 
        control={control}
        errors={errors}
        record={recordData}
        onBack={onBack}
        setValue={setValue}
        mode={mode}
        noButton={mode == 'add' ? true : false}
        title={'Employment Contract'}
        fieldsList={contractDetails}
        backbtnTitle='Employment History'
        extraComp={<Activations id={id} data={recordData} />}
        />
    )
}