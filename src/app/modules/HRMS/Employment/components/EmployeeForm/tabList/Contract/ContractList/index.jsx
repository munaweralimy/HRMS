import React, { useState, useEffect } from 'react';
import { Row, Col, Form, message } from 'antd';
import ListCard from '../../../../../../../../molecules/ListCard';
import ListFormComp from '../../../../../../../../molecules/HRMS/ListFormComp';
import { useForm, useFieldArray } from 'react-hook-form';
import { etypeList, ctypeList, staffCategory, positionList, workType, timelap } from '../../../../../../../../../configs/constantData';
import { getCompany, getJobs, getTeams, getRoles, getStaffs } from '../../../../../../../Application/ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getWHTemplateList } from '../../../../../ducks/action';
import axios from '../../../../../../../../../services/axiosInterceptor';
import { apiMethod } from '../../../../../../../../../configs/constants';
import moment from 'moment';

  const colName = [
    {
      title: 'Contract Type',
      dataIndex: 'contract_type',
      key: 'contract_type',
      sorter: true,
    },
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      key: 'job_title',
      sorter: true,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      sorter: true,
    },
    {
      title: 'Start',
      dataIndex: 'start_date',
      key: 'start_date',
      sorter: true,
    },
    {
      title: 'End',
      dataIndex: 'end_date',
      key: 'end_date',
      sorter: true,
      
    },
  ];

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

export default (props) => {

    const dispatch = useDispatch();
    const { data, updateApi, id, setLoad, setVisible } = props;
    const { control, errors, setValue, reset, handleSubmit } = useForm();
    const [formVisible, setFormVisible] = useState(false);
    const [recordData, setRecord] = useState(null);
    const [templateList, setTemplateList] = useState([]);
    const jobList = useSelector(state => state.global.jobslist);
    const companyList = useSelector(state => state.global.companies);
    const teamList = useSelector(state => state.global.teams);
    const roleList = useSelector(state => state.global.roles);
    const staffList = useSelector(state => state.global.staff);
    const templates = useSelector(state => state.employment.tempData);

    

    useEffect(() => {
      dispatch(getJobs());
      dispatch(getCompany());
      dispatch(getTeams());
      dispatch(getRoles());
      dispatch(getStaffs());
      dispatch(getWHTemplateList())
    }, []);

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

    const { fields, append, remvoe} = useFieldArray({
      control,
      name: 'work_hour_template_detail',
    });

    const onWHChnage = async (e) => {
      console.log(e)
      if(e.label == "Custom Template") {
        console.log('i am her')
        setValue('work_hour_template_detail', custom)
      } else {
        try {
          const res = await axios.get(`${apiMethod}/hrms.api.get_work_hours_temp_data?tempid=${e.label}`);
          let temp = [];
          res?.data?.message.map((x, i) => {
            temp.push({
              id: i,
              day: x.day,
              time_hour: 1,
              time_min: 0,
              time_type: x.time_type ? {label: x.time_type, value: x.time_type } : '',
              work_hour_type: x.work_hour_type ? {label: x.work_hour_type, value: x.work_hour_type } : '  ',
              work_hours: x.work_hours,
            })
          })
          console.log('checking', temp)
          setValue('work_hour_template_detail', temp);
        }catch(e) {
          console.log(e)
        }
      }
    }

    

    const contractDetails = [
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
        req: true,
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
        options: teamList.map(x => ({label: x.team_name, value: x.team_name})),
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
            colWidth: '0 1 150px'
          },    
          {
            type: 'select',
            name: 'work_hour_type',
            label: '',
            placeholder: 'Please Select',
            options: workType,
            req: true,
            twocol: false,
            colWidth: '0 1 150px'
          },
          {
            type: 'input',
            name: 'time_hour',
            label: '',
            req: true,
            number: true,
            min: 1,
            max: 12,
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
            req: true,
            twocol: false,
            colWidth: '0 1 100px'
          },
          {
            type: 'input',
            name: 'work_hours',
            label: '',
            req: true,
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
    ];

    const onClickRow = (record) => {

      return {
        onClick: () => {
          
          setRecord([
            {
              field: 'name',
              value: record.name
            },
            {
              field: 'letter_type',
              value: record.letter_type ? {label: record.letter_type, value: record.letter_type} : ''
            },
          ]);
          setVisible({
              set1: true,
              set2: false,
              set3: false,
              set4: false,
          });
          setFormVisible(true);
        },
      };
    }
    
    const addNew = () => {
        setVisible({
            set1: true,
            set2: false,
            set3: false,
            set4: false,
        });
      setFormVisible(true);
    }

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

    const onFinish = async (val) => {
      
    }

    return (
        <Row gutter={[20,20]}>
          {!formVisible ? 
            <Col span={24}>
                <ListCard
                scrolling={500}
                title="Employment History"
                onRow={onClickRow}
                ListCol={colName}
                ListData={data?.employee_medical}
                pagination={false}
                extraBtn={'+ Add New Contract'}
                extraAction={addNew}
                scrolling={500}
                listClass="nospace-card"
                classes='clickRow'
                />
            </Col>
            :
            <Col span={24}>
              <Form layout='vertical' onFinish={handleSubmit(onFinish)}>
                <ListFormComp 
                control={control}
                errors={errors}
                record={recordData}
                onBack={onBack}
                setValue={setValue}
                title={'Employment Contract'}
                fieldsList={contractDetails}
                backbtnTitle='Employment History'
                />
              </Form>
            </Col>}
        </Row>

    )
}