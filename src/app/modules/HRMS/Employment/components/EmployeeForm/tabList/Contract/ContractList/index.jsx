import React, { useState, useEffect } from 'react';
import { Row, Col, Form, message } from 'antd';
import ListCard from '../../../../../../../../molecules/ListCard';
import { useForm } from 'react-hook-form';
import { getCompany, getJobs, getTeams, getRoles, getStaffs } from '../../../../../../../Application/ducks/actions';
import { useDispatch } from 'react-redux';
import { getWHTemplateList } from '../../../../../ducks/action';
import { getFileName, uniquiFileName, getSingleUpload } from '../../../../../../../../../features/utility';
import moment from 'moment';
import { contractApi } from '../../../../../ducks/services';
import MainForm from './MainForm';

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

export default (props) => {

    const dispatch = useDispatch();
    const { data, updateApi, id, setLoad, setVisible, mode, controlOut, errorsOut, setValueOut, resetOut } = props;
    const { control: controlIn, errors: errorsIn, setValue: setValueIn, reset: resetIn, handleSubmit: handleSubmitIn } = useForm();
    const [formVisible, setFormVisible] = useState(false);
    const [recordData, setRecord] = useState(null);
    const [refresh, doRefresh] = useState(0);

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

    const onClickRow = (record) => {

      return {
        onClick: () => {
          let roletemp = [];
          if (record?.employee_role.length > 0) {
          record?.employee_role.map(x => {
            roletemp.push({
              label: x.role_name,
              value: x.role_name,
            })
          })
        } else {
          roletemp = null;
        }

          let temps = [
            {
              field: 'name',
              value: record?.name,
            },
            {
              field: 'default_contract',
              value: [record?.default_contract],
            },
            
            {
              field: 'contract_type',
              value: record?.contract_type ? {label: record.contract_type,value: record.contract_type}: '' 
            },
            {
              field: 'company',
              value: record?.company ? {label: record.company,value: record.company}: '' 
            },
            {
              field: 'employement_type',
              value: record?.employement_type ? {label: record.employement_type,value: record.employement_type}: '' 
            },
            {
              field: 'contract_attachment',
              value: record?.contract_attachment ? {fileList: [{uid: '-1', name: getFileName(record?.contract_attachment), status: 'done', url: `http://cms2dev.limkokwing.net${record?.contract_attachment}`}]} : '', 
            },
            

            {
              field: 'employee_role',
              value: roletemp, 
            },
            {
              field: 'job_title',
              value: record?.job_title ? {label: record.job_title,value: record.job_title}: '' 
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
              field: 'alternate_saturdays',
              value: record.alternate_saturdays == 1 ? true : false, 
            },
            {
              field: 'group',
              value: record.group ? {label: record.group,value: record.group}: '' 
            },
            {
              field: 'team',
              value: record.team ? {label: record.team_name,value: record.team}: '' 
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
            {
              field: 'email_activation_status',
              value: record.email_activation_status 
            },
            {
              field: 'card_activation_status',
              value: record.card_activation_status 
            },

          ];
          if (record?.custom_work_hour_template == 1) {
            let t = [];
            record?.work_hour_template_detail.map((x, i) => {
              t.push({
                id: i,
                day: x.day,
                time_hour: x.start_time ? moment(x.start_time, 'hh:mm:ss').hour() : 0,
                time_min: x.start_time ? moment(x.start_time, 'hh:mm:ss').minute() : 0,
                time_type: x.time_type,
                work_hour_type: x.work_hour_type,
                work_hours: x.work_hours,
              })
            })
            temps.push({
              field: 'work_hour_template_detail',
              value: t,
              notset: true, 
            })
          }
          setRecord(temps);
          setVisible({
              set1: true,
              set2: false,
              set3: false,
              set4: false,
          });
          setFormVisible(true);
          if (record?.custom_work_hour_template == 0) {
            doRefresh(prev => prev + 1)
          }
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
            role_name: x.value
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
      let body = {
        party_name: id,
        default_contract: val?.default_contract && val?.default_contract[0] == 1 ? 1 : 0, 
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
        contract_attachment: contactPDF ? contactPDF.replace('http://cms2dev.limkokwing.net', '') : '',
        work_hour_template: val?.work_hour_template?.value != 'Custom Template' ? val?.work_hour_template?.value : '',    
        custom_work_hour_template: val?.work_hour_template?.value == 'Custom Template' ? 1 : 0,
        alternate_saturdays: val.alternate_saturdays ==  true ? 1 : 0,
        group: val.alternate_saturdays ==  true ? val?.group.value : ''
      }
      if (workhours.length > 0) {
        body['work_hour_template_detail'] = workhours;
      }

      let getID = null;

      if (recordData != null) {
        getID = recordData[0]?.value;
      }

      contractApi(body, getID).then(res => {
        setLoad(false);
        message.success('Detaila Successfully Saved')
        setFormVisible(false);
        setRecord(null)
        setVisible({
            set1: true,
            set2: true,
            set3: true,
            set4: true,
        });
        updateApi();
      }).catch(e => {
        console.log(e);
        setLoad(false);
        message.error('Something went wrong')
        message.error(e);
      })
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
                listClass="nospace-card"
                classes='clickRow'
                />
            </Col>
            :
            <Col span={24}>
              {mode == 'edit' ?
              <Form layout='vertical' onFinish={handleSubmitIn(onFinish)} scrollToFirstError>
                <MainForm control={controlIn} errors={errorsIn} setValue={setValueIn} reset={resetIn} mode={mode} setVisible={setVisible} recordData={recordData} setRecord={setRecord} setFormVisible={setFormVisible} refresh={refresh} id={id} />
              </Form>
              :
              <MainForm control={controlOut} errors={errorsOut} setValue={setValueOut} reset={resetOut} mode={mode} setVisible={setVisible} recordData={recordData} setRecord={setRecord} setFormVisible={setFormVisible} refresh={refresh} />}
            </Col>}
        </Row>

    )
}