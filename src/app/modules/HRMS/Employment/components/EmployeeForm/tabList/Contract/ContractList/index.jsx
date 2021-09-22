import React, { useState, useEffect } from 'react';
import { Row, Col, Form, message } from 'antd';
import ListCard from '../../../../../../../../molecules/ListCard';
import ListFormComp from '../../../../../../../../molecules/HRMS/ListFormComp';
import { useForm, useFieldArray } from 'react-hook-form';
import { etypeList, ctypeList, staffCategory, positionList, workType, timelap, alternateSat } from '../../../../../../../../../configs/constantData';
import { getCompany, getJobs, getTeams, getRoles, getStaffs } from '../../../../../../../Application/ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getWHTemplateList } from '../../../../../ducks/action';
import axios from '../../../../../../../../../services/axiosInterceptor';
import { apiMethod } from '../../../../../../../../../configs/constants';
import { uniquiFileName, getSingleUpload } from '../../../../../../../../../features/utility';
import moment from 'moment';
import { contractApi } from '../../../../../ducks/services';

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
    const { data, updateApi, id, setLoad, setVisible, mode, setForm, formObj } = props;
    const [noEdit, setNoedit] = useState(true);
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
      dispatch(getWHTemplateList());
      if (mode == 'add') {
        addNew();
      }
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

    const { fields, append, remove} = useFieldArray({
      control,
      name: 'work_hour_template_detail',
    });

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
        name: 'alt_saturday_group',
        label: 'Group',
        placeholder: 'Select',
        options: alternateSat,
        req: true,
        twocol: false,
        colWidth: '1 0 100%'
      },
    ];

    const onClickRow = (record) => {

      return {
        onClick: () => {
          setRecord([
            {
              field: 'contract_type',
              value: record.contract_type ? {label: record.contract_type,value: record.contract_type}: '' 
            },
            {
              field: 'company',
              value: record.company ? {label: record.company,value: record.company}: '' 
            },
            {
              field: 'employement_type',
              value: record.employement_type ? {label: record.employement_type,value: record.employement_type}: '' 
            },
            {
              field: 'employee_role',
              value: record.employee_role ? {label: record.employee_role,value: record.employee_role}: '' 
            },
            {
              field: 'job_title',
              value: record.job_title ? {label: record.job_title,value: record.job_title}: '' 
            },
            {
              field: 'position_level',
              value: record.position_level ? {label: record.position_level,value: record.position_level}: '' 
            },
            {
              field: 'staff_category',
              value: record.staff_category ? {label: record.staff_category,value: record.staff_category}: '' 
            },
            {
              field: 'supervisor',
              value: record.supervisor ? {label: record.supervisor,value: record.supervisor}: '' 
            },
            {
              field: 'team',
              value: record.team ? {label: record.team,value: record.team}: '' 
            },
            {
              field: 'work_hour_template',
              value: record.work_hour_template ? {label: record.work_hour_template,value: record.work_hour_template}: '' 
            },
            {
              field: 'start_date',
              value: record.start_date ? moment(record.start_date, 'YYYY-MM-DD') : '' 
            },
            {
              field: 'end_date',
              value: record.end_date ? moment(record.end_date, 'YYYY-MM-DD') : '' 
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
      setRecord(null);
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
      setLoad(true);
      let empRole = [];
      let workhours = [];
      let contactPDF = '';

      if (val?.work_hour_template?.value == "Custom Template") {
        val.work_hour_template_detail.map(x => {
          workhours.push({
            day: x.day,
            work_hour_type: x.work_hour_type.value,
            start_time: `${x.time_hour}:${x.time_min}:00`,
            time_type: x.time_type.value,
            work_hours: x.work_hours
          })
        })
      }

      if (val.employee_role.length > 0) {
        val.employee_role.map(x => {
          empRole.push({
            role: x.value
          })
        })
      }
      if (val.contract_attachment) {
        if (val.contract_attachment.fileList[0].uid != '-1') {
          let modifiedName = uniquiFileName(val.contract_attachment?.file?.originFileObj.name)
          let res = await getSingleUpload(modifiedName, 'image',  val.contract_attachment?.file?.originFileObj, 'Employee', id);
          contactPDF = res?.file_url;
        } else {
          contactPDF = val.contract_attachment.fileList[0].url
        }
      }
      const body = {
        party_name: id,
        contract_type: val?.contract_type?.value,
        employement_type: val?.employement_type?.value,
        start_date: val.start_date ? val.start_date : '',
        end_date: val.end_date ? val.end_date : "",
        staff_category: val?.staff_category?.value,
        company: val?.company?.value,
        team: val?.team?.value,
        job_title: val?.job_title?.value,
        position_level: val?.position_level?.value,
        supervisor: val?.supervisor?.value,
        employee_role: empRole,
        contract_attachment: contactPDF,
        work_hour_template: val?.work_hour_template?.value,    
        custom_work_hour_template: val?.work_hour_template?.value == 'Custom Template' ? 1 : 0,
        alternate_saturdays: val.alternate_saturdays ==  true ? 1 : 0,
        alt_saturday_group: val.alternate_saturdays ==  true ? val?.alt_saturday_group.value : ''
      }
      if (workhours.length > 0) {
        body.push({work_hour_template_detail: workhours})
      }
      console.log('val', val, body)

      let getID = null;

      if (recordData != null) {
        getID = 123;
      }
      if (mode == 'edit') {
        contractApi(body, getID).then(res => {
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
          contract: body
        })
      }

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
                ListData={data?.contracts}
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
                mode={mode}
                title={'Employment Contract'}
                fieldsList={contractDetails}
                backbtnTitle='Employment History'
                />
              </Form>
            </Col>}
        </Row>

    )
}